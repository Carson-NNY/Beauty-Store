"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef } from "react";

type GL = Renderer["gl"];
type GalleryItem = { image: string; text: string };
type ScrollDirection = "right" | "left";

function debounce<T extends (...args: Parameters<T>) => void>(func: T, wait: number) {
  let timeout: number | undefined;

  return (...args: Parameters<T>) => {
    if (timeout) window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(
  gl: GL,
  text: string,
  font = '600 30px Georgia, "Times New Roman", serif',
  color = "#ffffff",
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get 2d context");

  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = getFontSize(font);
  const textHeight = Math.ceil(fontSize * 1.2);

  canvas.width = textWidth + 28;
  canvas.height = textHeight + 24;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;

  return { texture, width: canvas.width, height: canvas.height };
}

type ScreenSize = { width: number; height: number };
type Viewport = { width: number; height: number };

class GalleryTitle {
  mesh: Mesh;

  constructor({
    gl,
    plane,
    text,
    textColor,
    font,
  }: {
    gl: GL;
    plane: Mesh;
    text: string;
    textColor: string;
    font: string;
  }) {
    const { texture, width, height } = createTextTexture(gl, text, font, textColor);
    const geometry = new Plane(gl);
    const program = new Program(gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });

    this.mesh = new Mesh(gl, { geometry, program });
    const aspect = width / height;
    const textHeightScaled = plane.scale.y * 0.14;
    this.mesh.scale.set(textHeightScaled * aspect, textHeightScaled, 1);
    this.mesh.position.y = -plane.scale.y * 0.5 - textHeightScaled * 0.75;
    this.mesh.setParent(plane);
  }
}

class GalleryMedia {
  extra = 0;
  plane!: Mesh;
  title!: GalleryTitle;
  scale = 1;
  padding = 2;
  width = 0;
  widthTotal = 0;
  x = 0;

  private program!: Program;

  constructor(
    private readonly props: {
      geometry: Plane;
      gl: GL;
      image: string;
      index: number;
      length: number;
      scene: Transform;
      screen: ScreenSize;
      text: string;
      viewport: Viewport;
      bend: number;
      textColor: string;
      borderRadius: number;
      font: string;
    },
  ) {
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.props.gl, { generateMipmaps: true });
    this.program = new Program(this.props.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.1 + cos(p.y * 2.0 + uTime) * 1.1) * (0.08 + uSpeed * 0.32);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5);
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [1, 1] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.props.borderRadius },
      },
      transparent: true,
    });

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = this.props.image;
    image.onload = () => {
      texture.image = image;
      this.program.uniforms.uImageSizes.value = [image.naturalWidth, image.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.props.gl, {
      geometry: this.props.geometry,
      program: this.program,
    });
    this.plane.setParent(this.props.scene);
  }

  createTitle() {
    this.title = new GalleryTitle({
      gl: this.props.gl,
      plane: this.plane,
      text: this.props.text,
      textColor: this.props.textColor,
      font: this.props.font,
    });
  }

  update(scroll: { current: number; last: number }, direction: ScrollDirection) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const halfViewport = this.props.viewport.width / 2;

    if (this.props.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const bendAbs = Math.abs(this.props.bend);
      const radius = (halfViewport * halfViewport + bendAbs * bendAbs) / (2 * bendAbs);
      const effectiveX = Math.min(Math.abs(x), halfViewport);
      const arc = radius - Math.sqrt(radius * radius - effectiveX * effectiveX);

      this.plane.position.y = this.props.bend > 0 ? -arc : arc;
      this.plane.rotation.z =
        (this.props.bend > 0 ? -1 : 1) * Math.sign(x) * Math.asin(effectiveX / radius);
    }

    const speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.props.viewport.width / 2;
    const isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    const isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === "right" && isBefore) this.extra -= this.widthTotal;
    if (direction === "left" && isAfter) this.extra += this.widthTotal;
  }

  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (screen) this.props.screen = screen;
    if (viewport) this.props.viewport = viewport;

    this.scale = this.props.screen.height / 1500;
    this.plane.scale.y = (this.props.viewport.height * (900 * this.scale)) / this.props.screen.height;
    this.plane.scale.x = (this.props.viewport.width * (700 * this.scale)) / this.props.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.props.length;
    this.x = this.width * this.props.index;
  }
}

class GalleryApp {
  private renderer!: Renderer;
  private gl!: GL;
  private camera!: Camera;
  private scene!: Transform;
  private planeGeometry!: Plane;
  private medias: GalleryMedia[] = [];
  private screen!: ScreenSize;
  private viewport!: Viewport;
  private raf = 0;
  private isDown = false;
  private start = 0;
  private scroll = { ease: 0.05, current: 0, target: 0, last: 0, position: 0 };
  private readonly onCheckDebounce = debounce(() => this.onCheck(), 200);

  constructor(
    private readonly container: HTMLElement,
    private readonly config: Required<CircularGalleryProps>,
  ) {
    this.scroll.ease = config.scrollEase;
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias() {
    const galleryItems = this.config.items.length ? this.config.items : [];
    const duplicatedItems = galleryItems.concat(galleryItems);
    this.medias = duplicatedItems.map(
      (item, index) =>
        new GalleryMedia({
          geometry: this.planeGeometry,
          gl: this.gl,
          image: item.image,
          index,
          length: duplicatedItems.length,
          scene: this.scene,
          screen: this.screen,
          text: item.text,
          viewport: this.viewport,
          bend: this.config.bend,
          textColor: this.config.textColor,
          borderRadius: this.config.borderRadius,
          font: this.config.font,
        }),
    );
  }

  onTouchDown(event: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = "touches" in event ? event.touches[0].clientX : event.clientX;
  }

  onTouchMove(event: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = "touches" in event ? event.touches[0].clientX : event.clientX;
    const distance = (this.start - x) * (this.config.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(event: WheelEvent) {
    this.scroll.target += (event.deltaY > 0 ? this.config.scrollSpeed : -this.config.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.scroll.target += this.config.scrollSpeed * 5;
      this.onCheckDebounce();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.scroll.target -= this.config.scrollSpeed * 5;
      this.onCheckDebounce();
    }
  }

  onCheck() {
    const width = this.medias[0]?.width;
    if (!width) return;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: Math.max(this.container.clientWidth, 1),
      height: Math.max(this.container.clientHeight, 1),
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    this.medias.forEach((media) => media.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(() => this.update());
  }

  addEventListeners() {
    this.container.addEventListener("wheel", this.onWheelBound, { passive: true });
    this.container.addEventListener("mousedown", this.onTouchDownBound);
    this.container.addEventListener("mousemove", this.onTouchMoveBound);
    this.container.addEventListener("mouseup", this.onTouchUpBound);
    this.container.addEventListener("mouseleave", this.onTouchUpBound);
    this.container.addEventListener("touchstart", this.onTouchDownBound, { passive: true });
    this.container.addEventListener("touchmove", this.onTouchMoveBound, { passive: true });
    this.container.addEventListener("touchend", this.onTouchUpBound);
    this.container.addEventListener("keydown", this.onKeyDownBound);
    window.addEventListener("resize", this.onResizeBound);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    this.container.removeEventListener("wheel", this.onWheelBound);
    this.container.removeEventListener("mousedown", this.onTouchDownBound);
    this.container.removeEventListener("mousemove", this.onTouchMoveBound);
    this.container.removeEventListener("mouseup", this.onTouchUpBound);
    this.container.removeEventListener("mouseleave", this.onTouchUpBound);
    this.container.removeEventListener("touchstart", this.onTouchDownBound);
    this.container.removeEventListener("touchmove", this.onTouchMoveBound);
    this.container.removeEventListener("touchend", this.onTouchUpBound);
    this.container.removeEventListener("keydown", this.onKeyDownBound);
    window.removeEventListener("resize", this.onResizeBound);

    const loseContext = this.gl.getExtension("WEBGL_lose_context");
    loseContext?.loseContext();
    this.gl.canvas.remove();
  }

  private readonly onResizeBound = () => this.onResize();
  private readonly onWheelBound = (event: WheelEvent) => this.onWheel(event);
  private readonly onTouchDownBound = (event: MouseEvent | TouchEvent) => this.onTouchDown(event);
  private readonly onTouchMoveBound = (event: MouseEvent | TouchEvent) => this.onTouchMove(event);
  private readonly onTouchUpBound = () => this.onTouchUp();
  private readonly onKeyDownBound = (event: KeyboardEvent) => this.onKeyDown(event);
}

export type CircularGalleryProps = {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
};

export default function CircularGallery({
  items = [],
  bend = 1,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = '600 30px Georgia, "Times New Roman", serif',
  scrollSpeed = 2,
  scrollEase = 0.05,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const app = new GalleryApp(container, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
    });

    return () => app.destroy();
  }, [bend, borderRadius, font, items, scrollEase, scrollSpeed, textColor]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-grab overflow-hidden active:cursor-grabbing"
      tabIndex={0}
      role="region"
      aria-label="Treatment showcase gallery. Use left and right arrow keys or horizontal gestures to navigate."
    />
  );
}

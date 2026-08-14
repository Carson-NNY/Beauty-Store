import {
  businessProfile,
  faqs,
  trustHighlights,
  workShowcaseItems,
} from "@/lib/mock-data/customer";
import type { PublicService, ServiceCategory } from "@/modules/services/domain/service";
import { getServiceImageUrl } from "@/modules/services/domain/service-image-catalog";

export type Language = "zh" | "en";

export const defaultLanguage: Language = "zh";

export const languageLabels: Record<Language, string> = {
  zh: "中文",
  en: "English",
};

export const languageDictionary = {
  zh: {
    nav: {
      home: "首页",
      services: "服务",
      owner: "店主介绍",
      contact: "联系",
      call: "电话",
      bookNow: "立即预约",
      openMenu: "打开菜单",
      closeMenu: "关闭菜单",
      visit: "到店信息",
      care: "护理服务",
      connect: "联系店铺",
      allServices: "全部服务",
      callStudio: "电话咨询",
      confirmation: "预约确认",
      switchLanguage: "Switch to English",
    },
    hero: {
      brandPlaceholder: "[店名 Placeholder]",
      languageNote: "中文 / English",
      eyebrow: "预约制专业护理",
      headline: "放松身心 · 美容护理",
      subheadline: "为你定制按摩与美容护理，帮助你恢复轻松、平衡与被照顾的感觉。",
      locationLine: "San Jose, CA · 预约制 · 中文 / English",
      imageAlt: "温暖安静的护理室细节",
    },
    home: {
      workEyebrow: "护理展示",
      workTitle: "温柔呈现护理时刻",
      servicesEyebrow: "护理分类",
      servicesTitle: "从今天需要的护理开始",
      servicesDescription: "六类精选护理，先找到你今天最需要的方向，再到服务页查看完整项目。",
      allServices: "查看全部服务",
      homeVisitEyebrow: "上门服务",
      homeVisitTitle: "不方便到店？可以选择上门护理",
      homeVisitDescription: "预约时选择“上门服务”并填写地址即可。上门服务会根据距离和安排另外加收费用，店员会在确认时说明。",
      homeVisitCta: "预约上门服务",
      questionsEyebrow: "常见问题",
      questionsTitle: "预约前说明",
      questionsDescription: "顾客常从微信、Google Maps、Yelp、短信或二维码进入网站。这里会让下一步预约更清楚。",
      finalTitle: "准备预约一段放松时间了吗？",
      finalDescription: "选择服务并留下简单信息，不到一分钟即可提交预约请求。",
    },
    services: {
      eyebrow: "服务项目",
      title: "为每一种状态，找到合适的护理",
      description: "从面部、头皮到身体与减肥塑形管理，再到组合套餐，按分类浏览完整项目。时长与价格为当前参考，预约确认时以店内信息为准。",
      navigation: "服务分类",
      sectionDescriptions: {
        facial: "根据肤质与当下状态定制，从基础补水到紧致焕亮，温和照顾肌肤。",
        scalp: "结合头皮清洁、按摩与舒缓步骤，为头部和肩颈带来轻松体验。",
        body: "针对肩背疲劳、身体紧绷与肌肤状态，提供放松和细致护理。",
        weightManagement: "围绕减肥、瘦身塑形与重点部位管理，通过按摩和紧致护理帮助改善腰腹、手臂与腿部的线条感。",
        hairRemoval: "一个项目选择多个面部与身体部位，提供更舒适、清晰的预约方式。",
        package: "把两到三项护理组合在一次到店中，获得更完整的放松与保养体验。",
      },
      weightManagementNotice: "美容与身体管理服务，不代替医疗减重。实际体验与效果会因个人状态、生活方式及护理次数而异。",
    },
    contact: {
      eyebrow: "联系",
      title: "电话、微信或到店咨询",
      description: "是一家本地预约制美容按摩店。如需了解服务或时间安排，欢迎提前电话咨询。",
      visitStudio: "到店信息",
      map: "地图",
      mapDescription: "地图会根据店铺地址打开，可点击查看路线。",
      directions: "查看路线",
      wechatPlaceholder: "微信占位",
      address: "地址",
      hours: "营业时间",
      phone: "电话",
      quickLinks: "快捷链接",
      bookAppointment: "预约服务",
    },
      booking: {
        pageEyebrow: "预约服务",
      pageTitle: "提交预约信息",
      pageDescription: "五个简单步骤，无需账号。请告诉我们想预约的服务和时间。",
      steps: ["服务", "日期", "时间", "信息", "确认"],
      chooseService: "选择服务",
      chooseServiceSubtitle: "请先选择护理大类，再选择想预约的具体项目。",
      chooseDate: "选择日期",
      chooseDateSubtitle: "请选择想预约的日期。",
      chooseTime: "选择时间",
      chooseTimeSubtitle: "请选择想预约的时间。店里会在需要调整时联系你。",
      infoTitle: "你的联系信息",
      infoSubtitle: "无需账号。姓名和电话为必填。",
      name: "姓名",
      nameRequired: "请填写姓名。",
      phone: "电话",
      phoneHelper: "请输入 10 位美国电话号码。",
      phoneRequired: "请填写电话。",
      phoneInvalid: "电话需要刚好 10 位数字。",
      email: "邮箱（选填）",
      emailHelper: "填写邮箱后会收到预约确认邮件。",
      emailInvalid: "请输入有效邮箱地址。",
      notes: "备注（选填）",
      notesPlaceholder: "有什么需要提前告诉我们？",
      reviewTitle: "确认信息",
      reviewSubtitle: "提交后店里会收到你的预约信息。",
      service: "服务",
      visitType: "服务方式",
      inStore: "到店服务",
      inStoreDescription: "到店接受护理。",
      homeVisit: "上门服务",
      homeVisitDescription: "工作人员到你的地址服务，上门会另外加收费用。",
      address: "上门地址",
      addressPlaceholder: "请输入街道地址、门牌号或备注",
      addressRequired: "选择上门服务后需要填写地址。",
      required: "必填",
      date: "日期",
      time: "时间",
      notEntered: "未填写",
      back: "返回",
      continue: "继续",
      confirm: "提交预约",
      submitting: "正在提交…",
      submitted: "预约已提交",
      booked: "预约信息已提交。",
      unavailable: "暂时无法提交，请稍后重试或电话联系店里。",
      failed: "暂时无法提交预约信息，请稍后重试或电话联系店里。",
    },
    confirmation: {
      eyebrow: "预约信息已收到",
      title: "预约信息",
      description: "您的预约信息已收到。如需调整时间，我们会尽快联系您。",
      customer: "顾客",
      emailNotice: "如果你填写了邮箱，确认邮件可能需要一点时间送达。",
      date: "预约时间",
      time: "预约时间",
      address: "地址",
      callStudio: "电话咨询",
      mapNote: "可在联系页面查看地图和路线。",
      bookAnother: "再预约一次",
      fallbackService: "招牌焕亮面部护理",
      fallbackDate: "7月8日 周三",
    },
    common: {
      book: "预约",
      bookNow: "立即预约",
      call: "电话",
      minute: "分钟",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      owner: "Owner",
      contact: "Contact",
      call: "Call",
      bookNow: "Book now",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      visit: "Visit",
      care: "Care",
      connect: "Connect",
      allServices: "All services",
      callStudio: "Call studio",
      confirmation: "Confirmation",
      switchLanguage: "切换到中文",
    },
    hero: {
      brandPlaceholder: "[店名 Placeholder]",
      languageNote: "中文 / English",
      eyebrow: "Premium appointment care",
      headline: "RELAXATION & BEAUTY CARE",
      subheadline: "Personalized massage and beauty treatments designed to help you feel renewed, balanced, and cared for.",
      locationLine: "San Jose, CA · By appointment · 中文 / English",
      imageAlt: "Dimly lit spa treatment detail with warm towels and botanical care",
    },
    home: {
      workEyebrow: "Our work",
      workTitle: "Treatment moments, softly showcased",
      servicesEyebrow: "Care categories",
      servicesTitle: "Start with what you need today",
      servicesDescription: "Explore six focused paths, then view the full treatment menu when you are ready to choose.",
      allServices: "All services",
      homeVisitEyebrow: "Home visit",
      homeVisitTitle: "Prefer care at home?",
      homeVisitDescription:
        "Choose Home visit during booking and enter your address. Extra travel/service fees may apply and the studio will explain them when following up.",
      homeVisitCta: "Book home visit",
      questionsEyebrow: "Questions",
      questionsTitle: "Before you book",
      questionsDescription:
        "Most customers arrive from WeChat, Maps, Yelp, SMS, or a QR code. The goal is to make the next step obvious.",
      finalTitle: "Ready for a calm appointment?",
      finalDescription: "Choose a service and send a simple request in under a minute.",
    },
    services: {
      eyebrow: "Services",
      title: "The right care for how you feel today",
      description: "Browse the complete menu by category, from facial and scalp rituals to body and weight-management care. Times and prices are current guides and will be confirmed by the studio.",
      navigation: "Service categories",
      sectionDescriptions: {
        facial: "Personalized care for hydration, clarity, calm, brightness, and a refreshed look.",
        scalp: "Scalp cleansing, massage, and calming rituals designed for a lighter head-and-shoulder reset.",
        body: "Focused relaxation and skin care for back tension, body fatigue, texture, and tone.",
        weightManagement: "Firming and focused body care designed to support smoother-looking skin and more defined contours.",
        hairRemoval: "Choose from multiple face and body areas within one clear, comfort-focused service.",
        package: "Combine two or three treatments in one visit for a fuller relaxation and beauty ritual.",
      },
      weightManagementNotice: "A beauty and body-management service, not medical weight-loss treatment. Experiences and results vary by individual, lifestyle, and treatment frequency.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Call, message, or visit",
      description:
        "is a local appointment-based studio. Call ahead if you have questions about services or timing.",
      visitStudio: "Visit the studio",
      map: "Map",
      mapDescription: "The map opens from the studio address. Tap for directions.",
      directions: "Get directions",
      wechatPlaceholder: "WeChat placeholder",
      address: "Address",
      hours: "Hours",
      phone: "Phone",
      quickLinks: "Quick links",
      bookAppointment: "Book appointment",
    },
      booking: {
        pageEyebrow: "Book appointment",
      pageTitle: "Submit appointment information",
      pageDescription: "Five short steps. No account required. Tell us the service and time you want to request.",
      steps: ["Service", "Date", "Time", "Info", "Review"],
      chooseService: "Choose a service",
      chooseServiceSubtitle: "Choose a service category, then select a treatment.",
      chooseDate: "Choose a date",
      chooseDateSubtitle: "Choose the date you prefer.",
      chooseTime: "Choose a time",
      chooseTimeSubtitle: "Choose the appointment time you want to request. The studio will contact you if anything needs to be adjusted.",
      infoTitle: "Your information",
      infoSubtitle: "No account needed. Name and phone are required.",
      name: "Name",
      nameRequired: "Enter your name.",
      phone: "Phone",
      phoneHelper: "Enter a 10-digit US phone number.",
      phoneRequired: "Enter your phone number.",
      phoneInvalid: "Phone number must contain exactly 10 digits.",
      email: "Email optional",
      emailHelper: "Add an email if you want a confirmation message.",
      emailInvalid: "Enter a valid email address.",
      notes: "Notes optional",
      notesPlaceholder: "Anything we should know?",
      reviewTitle: "Review information",
      reviewSubtitle: "Submitting sends your appointment information to the studio.",
      service: "Service",
      visitType: "Visit type",
      inStore: "In-store visit",
      inStoreDescription: "Come to the studio for your treatment.",
      homeVisit: "Home visit",
      homeVisitDescription: "We come to your address. Extra travel/service fees may apply.",
      address: "Home visit address",
      addressPlaceholder: "Street address, unit, or access notes",
      addressRequired: "Address is required for home visit appointments.",
      required: "Required",
      date: "Date",
      time: "Time",
      notEntered: "Not entered",
      back: "Back",
      continue: "Continue",
      confirm: "Submit Appointment",
      submitting: "Submitting...",
      submitted: "Appointment submitted",
      booked: "Appointment information submitted.",
      unavailable: "We could not submit that appointment right now. Please try again or call the studio.",
      failed: "We could not submit that appointment right now. Please try again or call the studio.",
    },
    confirmation: {
      eyebrow: "Appointment request received",
      title: "Appointment information",
      description: "Your appointment information has been received. We will contact you if anything needs to be adjusted.",
      customer: "Customer",
      emailNotice: "If you provided an email, the confirmation message may take a moment to arrive.",
      date: "Appointment time",
      time: "Appointment time",
      address: "Address",
      callStudio: "Call studio",
      mapNote: "Map and directions are available on the contact page.",
      bookAnother: "Book another appointment",
      fallbackService: "Signature Glow Facial",
      fallbackDate: "Wed, Jul 8",
    },
    common: {
      book: "Book",
      bookNow: "Book Now",
      call: "Call",
      minute: "min",
    },
  },
} as const;

export type CustomerService = PublicService & {
  duration: string;
  price: string;
};

type LocalizedBusinessProfile = typeof businessProfile;

const businessProfileZh: Partial<LocalizedBusinessProfile> = {
  name: "美兰养生美容馆",
  tagline: "本地预约制面部护理、按摩与安静放松时间。",
  intro: "一家小而温暖的预约制美容按摩店，提供轻松服务、简单预约和中英双语友好接待。",
  hoursSummary: "每日营业，上午 9:00 - 晚上 7:00",
  wechat: "微信：MeiLanSpa",
  mapLabel: "3707三楼319 main st flushing 11354",
};

const serviceZh: Record<string, Partial<Pick<CustomerService, "name" | "description">>> = {
  "custom-facial": { name: "基础定制面部护理", description: "根据个人肤质进行定制护理，通过温和清洁、补水和基础修护，帮助肌肤恢复柔软、水润与自然光泽。" },
  "deep-cleansing-facial": { name: "深层清洁净肤护理", description: "深层清洁毛孔和肌肤表面的多余油脂，帮助改善毛孔堵塞、油脂堆积和肤色不清透，使肌肤更加清爽、细腻。" },
  "hydro-oxygen-facial": { name: "水氧补水面部护理", description: "结合深层补水、精华导入和舒缓护理，为肌肤补充水分，帮助改善干燥、紧绷和缺乏光泽。" },
  "calming-barrier-facial": { name: "舒缓维稳面部护理", description: "采用温和的清洁、补水和舒缓步骤，帮助缓解肌肤干燥、泛红和不适感，支持肌肤恢复稳定状态。" },
  "brightening-facial": { name: "焕亮匀净面部护理", description: "结合温和清洁、抗氧化护理和亮肤精华，帮助改善暗沉、肤色不均和疲惫感，使肌肤显得更加明亮有光泽。" },
  "firming-facial": { name: "紧致抗初老面部护理", description: "通过按摩、精华护理和紧致步骤，帮助改善松弛与缺乏弹性的状态，使肌肤看起来更加饱满有活力。" },
  "luxury-vitality-facial": { name: "奢华全方位活肤护理", description: "从面部延伸至颈部、肩部、手臂和双手，结合深层清洁、补水滋养、按摩和面膜，带来完整放松体验。" },
  "essential-head-spa": { name: "基础舒缓头疗", description: "结合头皮清洁、头部按摩、肩颈放松和草本冲洗，帮助放松头部压力，清洁头皮并改善日常疲劳感。" },
  "luxury-head-spa": { name: "豪华深层头疗", description: "在基础头疗之上加入更完整的头皮清洁、热敷、按摩和护理步骤，帮助舒缓紧绷头皮，带来深度放松。" },
  "custom-scalp-care": { name: "定制头皮护理", description: "根据头皮油脂、敏感度、干燥程度和头发状态制定方案，结合清洁、精华与按摩，帮助维持清爽健康的头皮环境。" },
  "deep-scalp-purifying": { name: "深层净化头皮护理", description: "通过头皮检测、深层清洁和精华护理，帮助去除头皮油脂和产品残留，使头皮保持清爽洁净。" },
  "back-relaxation-massage": { name: "背部舒缓按摩", description: "针对肩背部紧绷和疲劳进行按摩放松，帮助舒缓肌肉压力，改善久坐或日常劳累带来的不适感。" },
  "full-body-relaxation": { name: "全身舒缓按摩", description: "通过全身按摩帮助放松肌肉、舒缓疲劳与压力，使身体恢复轻松舒适的状态。" },
  "body-firming-contour": { name: "减肥瘦身塑形护理", description: "为减肥塑形目标设计的身体管理护理，结合按摩与紧致步骤，重点护理腰腹、腿部或手臂，帮助改善身体线条与肌肤松弛感。" },
  "back-clearing-care": { name: "背部净肤护理", description: "针对背部油脂、毛孔堵塞和粗糙进行清洁、去角质、舒缓和补水护理，帮助背部肌肤更加干净、细腻。" },
  "deep-back-renewal": { name: "背部深层调理护理", description: "在背部清洁基础上加入更完整的焕肤、舒缓和滋养步骤，针对粗糙、痘后暗沉和肤色不均加强护理。" },
  "cool-comfort-hair-removal": { name: "冰感舒适脱毛", description: "采用带有冰感舒适设计的脱毛护理，可选择面部、唇部、腋下、手臂、背部、小腿或全腿，帮助减少频繁除毛的麻烦。" },
  "head-spa-back-package": { name: "头疗与背部放松套餐", description: "将舒缓头疗与背部按摩结合，一次放松头部、肩颈和背部，适合久坐、工作疲劳和压力较大的顾客。" },
  "head-spa-body-package": { name: "头疗与全身放松套餐", description: "将头皮清洁、头部按摩和全身舒缓按摩结合，为顾客提供更完整的深度放松体验。" },
  "head-spa-facial-package": { name: "头疗与焕肤护理套餐", description: "结合舒缓头疗与定制面部护理，同时照顾头皮和面部肌肤，在放松的同时完成日常美容保养。" },
  "facial-body-package": { name: "焕肤与全身放松套餐", description: "将面部护理和全身按摩结合，在改善肌肤状态的同时舒缓身体疲劳，适合需要全面放松和保养的顾客。" },
  "triple-renewal-package": { name: "三项焕新护理套餐", description: "包含头疗、面部护理和背部按摩，通过三种护理项目带来完整的放松与焕新体验。" },
  "luxury-complete-package": { name: "豪华全方位护理套餐", description: "包含头疗、定制面部护理和全身按摩，适合希望进行深度放松和全面保养的顾客。" },
};

const categoryLabels: Record<Language, Record<ServiceCategory, string>> = {
  zh: {
    facial: "面部护理",
    scalp: "头疗护理",
    body: "身体护理",
    "weight-management": "减肥塑形管理",
    "hair-removal": "脱毛护理",
    package: "精选套餐",
  },
  en: {
    facial: "Facial care",
    scalp: "Head spa",
    body: "Body care",
    "weight-management": "Weight management",
    "hair-removal": "Hair removal",
    package: "Packages",
  },
};

const showcaseTextZh: Record<string, string> = {
  "Glow Facial": "焕亮面护",
  "Deep Cleanse": "深层清洁",
  "Massage Care": "舒缓按摩",
  Bodywork: "身体调理",
  "Neck Reset": "头颈放松",
};

const faqZh: typeof faqs = [
  {
    question: "预约需要注册账号吗？",
    answer: "不需要。选择服务和时间，留下姓名与电话即可。",
  },
  {
    question: "预约前可以先打电话咨询吗？",
    answer: "可以。如果不确定哪项护理适合你，欢迎先电话咨询店里。",
  },
  {
    question: "第一次到店需要提前到吗？",
    answer: "建议提前 5-10 分钟到达，方便简单沟通护理需求。",
  },
];

const trustHighlightsZh = ["干净护理空间", "专业细致服务", "预约制到店", "中英双语友好"];

export function getBusinessProfile(language: Language) {
  return language === "zh" ? { ...businessProfile, ...businessProfileZh } : businessProfile;
}

export function getCustomerServices(services: PublicService[], language: Language): CustomerService[] {
  return services.map((service) => {
    const localizedService = language === "zh" ? serviceZh[service.id] : undefined;

    return {
      ...service,
      ...localizedService,
      imageUrl: getServiceImageUrl(service.id, service.imageUrl),
      duration: language === "zh" ? `${service.durationMinutes} 分钟` : `${service.durationMinutes} min`,
      price: formatPrice(service.priceCents),
    };
  });
}

export function getServiceCategoryLabel(category: ServiceCategory, language: Language) {
  return categoryLabels[language][category];
}

export function getWorkShowcaseItems(language: Language) {
  if (language === "en") return workShowcaseItems;

  return workShowcaseItems.map((item) => ({
    ...item,
    text: showcaseTextZh[item.text] ?? item.text,
  }));
}

export function getFaqs(language: Language) {
  return language === "zh" ? faqZh : faqs;
}

export function getTrustHighlights(language: Language) {
  return language === "zh" ? trustHighlightsZh : trustHighlights;
}

function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}

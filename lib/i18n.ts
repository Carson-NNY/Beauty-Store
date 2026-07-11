import {
  businessProfile,
  faqs,
  trustHighlights,
  workShowcaseItems,
} from "@/lib/mock-data/customer";
import type { PublicService, ServiceCategory } from "@/modules/services/domain/service";

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
      workDescription: "这里先使用示例图片展示护理环境、服务细节与疗愈氛围，之后可替换成真实店铺照片。",
      servicesEyebrow: "热门服务",
      servicesTitle: "从今天需要的护理开始",
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
      title: "面部护理、按摩与身体护理",
      description: "当前为示例服务内容。真实介绍、时长、价格与可预约时间可以后续编辑。",
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
      chooseServiceSubtitle: "请选择想预约的护理项目。",
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
      workDescription:
        "A placeholder visual gallery for finished looks, calming rooms, and signature care details. Images and labels can be replaced when the real business media is ready.",
      servicesEyebrow: "Popular services",
      servicesTitle: "Start with what you need today",
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
      title: "Facials, massage, and body care",
      description: "Mock service details for now. Real descriptions, durations, pricing, and availability can be edited later.",
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
      chooseServiceSubtitle: "Pick the treatment you want to request.",
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
  hoursSummary: "每日营业，上午 10:00 - 晚上 8:00",
  wechat: "微信：MeiLanSpa",
  mapLabel: "4309, Flushing, NY",
};

const serviceZh: Record<string, Partial<Pick<CustomerService, "name" | "description">>> = {
  "signature-facial": {
    name: "招牌焕亮面部护理",
    description: "温和清洁、蒸汽、按摩、面膜与补水护理，适合日常恢复清透光泽。",
  },
  "deep-cleansing-facial": {
    name: "深层清洁面部护理",
    description: "针对堵塞、暗沉与毛孔堆积的面部护理，最后以舒缓补水收尾。",
  },
  "relaxation-massage": {
    name: "舒缓放松按摩",
    description: "轻至中等力度按摩，适合肩颈疲劳、背部紧张和日常压力。",
  },
  "neck-shoulder-relief": {
    name: "颈肩舒缓护理",
    description: "针对久坐、屏幕疲劳、颈肩紧绷的上半身重点舒缓护理。",
  },
  "body-oil-massage": {
    name: "全身精油按摩",
    description: "流畅舒缓的全身精油按摩，以稳定力度帮助深度放松与身体舒展。",
  },
  "gentle-beauty-care": {
    name: "温和美容护理",
    description: "适合敏感或疲惫状态的轻柔护理，帮助肌肤与身心安静恢复。",
  },
};

const categoryLabels: Record<Language, Record<ServiceCategory, string>> = {
  zh: {
    facial: "面部护理",
    massage: "按摩",
    body: "身体护理",
  },
  en: {
    facial: "Facial",
    massage: "Massage",
    body: "Body care",
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

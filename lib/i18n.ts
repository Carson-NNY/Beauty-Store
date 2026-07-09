import {
  businessProfile,
  customerServices,
  faqs,
  trustHighlights,
  workShowcaseItems,
  type CustomerService,
} from "@/lib/mock-data/customer";

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
      mapDescription: "确认最终地址和地图服务后，可在这里加入真实地图。",
      directions: "路线占位",
      wechatPlaceholder: "微信占位",
      address: "地址",
      hours: "营业时间",
      phone: "电话",
      quickLinks: "快捷链接",
      bookAppointment: "预约服务",
    },
    booking: {
      pageEyebrow: "预约服务",
      pageTitle: "提交预约时间",
      pageDescription: "五个简单步骤，无需账号。当前为界面示例，还不会创建真实预约。",
      steps: ["服务", "日期", "时间", "信息", "确认"],
      chooseService: "选择服务",
      chooseServiceSubtitle: "请选择想预约的护理项目。",
      chooseDate: "选择日期",
      chooseDateSubtitle: "这里显示的是用于排版的示例日期。",
      chooseTime: "选择时间",
      chooseTimeSubtitle: "可选时间目前为示例数据。",
      infoTitle: "你的联系信息",
      infoSubtitle: "无需账号。姓名和电话为必填。",
      name: "姓名",
      phone: "电话",
      phoneHelper: "请输入 10 位美国电话号码。",
      phoneInvalid: "电话需要刚好 10 位数字。",
      notes: "备注（选填）",
      notesPlaceholder: "有什么需要提前告诉我们？",
      reviewTitle: "确认预约请求",
      reviewSubtitle: "这里暂时不会创建真实预约。",
      service: "服务",
      visitType: "服务方式",
      inStore: "到店服务",
      inStoreDescription: "到店接受护理。",
      homeVisit: "上门服务",
      homeVisitDescription: "工作人员到你的地址服务，上门会另外加收费用。",
      address: "上门地址",
      addressPlaceholder: "请输入街道地址、门牌号或备注",
      addressRequired: "选择上门服务后需要填写地址。",
      date: "日期",
      time: "时间",
      notEntered: "未填写",
      back: "返回",
      continue: "继续",
      confirm: "确认请求",
    },
    confirmation: {
      eyebrow: "已收到请求",
      title: "预约摘要",
      description: "这是预约确认页的界面占位。真实确认规则和通知功能尚未实现。",
      date: "日期",
      time: "时间",
      address: "地址",
      callStudio: "电话咨询",
      addCalendar: "加入日历",
      mapNote: "真实地图和导航会在最终地址确认后加入。",
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
        "Choose Home visit during booking and enter your address. Extra travel/service fees may apply and can be confirmed by the studio.",
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
      mapDescription: "A real embedded map can be added after the final address and provider decision.",
      directions: "Directions placeholder",
      wechatPlaceholder: "WeChat placeholder",
      address: "Address",
      hours: "Hours",
      phone: "Phone",
      quickLinks: "Quick links",
      bookAppointment: "Book appointment",
    },
    booking: {
      pageEyebrow: "Book appointment",
      pageTitle: "Request a time",
      pageDescription: "Five short steps. No account required. This is a mock flow and does not create a real appointment yet.",
      steps: ["Service", "Date", "Time", "Info", "Review"],
      chooseService: "Choose a service",
      chooseServiceSubtitle: "Pick the treatment you want to request.",
      chooseDate: "Choose a date",
      chooseDateSubtitle: "Mock dates are shown for layout only.",
      chooseTime: "Choose a time",
      chooseTimeSubtitle: "Available times are mock options for now.",
      infoTitle: "Your information",
      infoSubtitle: "No account needed. Name and phone are required.",
      name: "Name",
      phone: "Phone",
      phoneHelper: "Enter a 10-digit US phone number.",
      phoneInvalid: "Phone number must contain exactly 10 digits.",
      notes: "Notes optional",
      notesPlaceholder: "Anything we should know?",
      reviewTitle: "Review request",
      reviewSubtitle: "This does not create a real appointment yet.",
      service: "Service",
      visitType: "Visit type",
      inStore: "In-store visit",
      inStoreDescription: "Come to the studio for your treatment.",
      homeVisit: "Home visit",
      homeVisitDescription: "We come to your address. Extra travel/service fees may apply.",
      address: "Home visit address",
      addressPlaceholder: "Street address, unit, or access notes",
      addressRequired: "Address is required for home visit appointments.",
      date: "Date",
      time: "Time",
      notEntered: "Not entered",
      back: "Back",
      continue: "Continue",
      confirm: "Confirm request",
    },
    confirmation: {
      eyebrow: "Request received",
      title: "Appointment summary",
      description:
        "This confirmation page is a UI placeholder. Real confirmation rules and notifications are intentionally not implemented.",
      date: "Date",
      time: "Time",
      address: "Address",
      callStudio: "Call studio",
      addCalendar: "Add to calendar",
      mapNote: "Map and directions integration will be added after the real address is finalized.",
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

type LocalizedBusinessProfile = typeof businessProfile;

const businessProfileZh: Partial<LocalizedBusinessProfile> = {
  name: "美兰养生美容馆",
  tagline: "本地预约制面部护理、按摩与安静放松时间。",
  intro: "一家小而温暖的预约制美容按摩店，提供轻松服务、简单预约和中英双语友好接待。",
  hoursSummary: "每日营业，上午 10:00 - 晚上 8:00",
  wechat: "微信：MeiLanSpa",
  mapLabel: "地图预览占位",
};

const serviceZh: Record<string, Pick<CustomerService, "name" | "category" | "duration" | "description">> = {
  "signature-facial": {
    name: "招牌焕亮面部护理",
    category: "facial",
    duration: "60 分钟",
    description: "温和清洁、蒸汽、按摩、面膜与补水护理，适合日常恢复清透光泽。",
  },
  "deep-cleansing-facial": {
    name: "深层清洁面部护理",
    category: "facial",
    duration: "75 分钟",
    description: "针对堵塞、暗沉与毛孔堆积的面部护理，最后以舒缓补水收尾。",
  },
  "relaxation-massage": {
    name: "舒缓放松按摩",
    category: "massage",
    duration: "60 分钟",
    description: "轻至中等力度按摩，适合肩颈疲劳、背部紧张和日常压力。",
  },
  "meridian-bodywork": {
    name: "经络调理按摩",
    category: "massage",
    duration: "90 分钟",
    description: "较长的身体护理，结合传统按压点与拉伸感，帮助身体放松。",
  },
  "head-neck-care": {
    name: "头颈肩护理",
    category: "body",
    duration: "45 分钟",
    description: "适合久坐、看屏幕疲劳、颈部紧绷和忙碌工作日的短时护理。",
  },
};

const categoryLabels: Record<Language, Record<CustomerService["category"], string>> = {
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

export function getCustomerServices(language: Language): CustomerService[] {
  if (language === "en") return customerServices;

  return customerServices.map((service) => ({
    ...service,
    ...serviceZh[service.id],
  }));
}

export function getServiceCategoryLabel(category: CustomerService["category"], language: Language) {
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

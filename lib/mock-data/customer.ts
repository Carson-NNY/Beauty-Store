export type ServiceCategory = "facial" | "massage" | "body";

export type CustomerService = {
  id: string;
  name: string;
  category: ServiceCategory;
  duration: string;
  price: string;
  description: string;
  imageUrl: string;
};

export const businessProfile = {
  name: "Mei Lan Wellness Spa",
  tagline: "Facial care, massage, and quiet reset time in one local studio.",
  intro:
    "A small appointment-based beauty and massage studio offering calm service, simple scheduling, and bilingual-friendly care.",
  address: "1288 Willow Street, Suite 6, Richmond, BC",
  hoursSummary: "Open daily, 10:00 AM - 8:00 PM",
  phone: "(604) 555-0188",
  wechat: "WeChat: MeiLanSpa",
  mapLabel: "Map preview placeholder",
};

export const customerServices: CustomerService[] = [
  {
    id: "signature-facial",
    name: "Signature Glow Facial",
    category: "facial",
    duration: "60 min",
    price: "$88",
    description: "Gentle cleansing, steam, massage, mask, and hydration for a fresh everyday glow.",
    imageUrl:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "deep-cleansing-facial",
    name: "Deep Cleansing Facial",
    category: "facial",
    duration: "75 min",
    price: "$108",
    description: "A focused facial for congestion, dullness, and buildup, finished with calming hydration.",
    imageUrl:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "relaxation-massage",
    name: "Relaxation Massage",
    category: "massage",
    duration: "60 min",
    price: "$78",
    description: "A light-to-medium pressure massage for tired shoulders, back tension, and general stress.",
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "meridian-bodywork",
    name: "Meridian Bodywork",
    category: "massage",
    duration: "90 min",
    price: "$128",
    description: "Longer bodywork session inspired by traditional pressure-point techniques and stretching.",
    imageUrl:
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "head-neck-care",
    name: "Head, Neck & Shoulder Care",
    category: "body",
    duration: "45 min",
    price: "$68",
    description: "Short, practical care for screen fatigue, neck tightness, and busy workdays.",
    imageUrl:
      "https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?auto=format&fit=crop&w=900&q=80",
  },
];

export const bookingDates = [
  { value: "2026-07-08", label: "Wed, Jul 8" },
  { value: "2026-07-09", label: "Thu, Jul 9" },
  { value: "2026-07-10", label: "Fri, Jul 10" },
  { value: "2026-07-11", label: "Sat, Jul 11" },
  { value: "2026-07-12", label: "Sun, Jul 12" },
];

export const availableTimes = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "6:30 PM"];

export const trustHighlights = [
  "Clean treatment rooms",
  "Licensed professional care",
  "Appointment-based visits",
  "Friendly bilingual service",
];

export const faqs = [
  {
    question: "Do I need an account to book?",
    answer: "No. Choose a service, pick a time, and leave your name and phone number.",
  },
  {
    question: "Can I call before booking?",
    answer: "Yes. Call the studio if you are unsure which treatment fits your needs.",
  },
  {
    question: "Should I arrive early?",
    answer: "Please arrive 5-10 minutes early for your first appointment.",
  },
];

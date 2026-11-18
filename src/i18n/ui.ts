import type { Locale } from "@/lib/utils";
const ui = {
  ar: {
    facts_title: "حقائق مهمة", learn_title: "ماذا ستتعلم من هذا المحور؟", related_themes: "محاور ذات صلة",
    back_culture: "العودة إلى الثقافة", explore: "استكشف المحور", place_info: "معلومات عملية",
    best_time: "أفضل وقت للزيارة", how_to_reach: "كيف تصل", where_to_sleep: "أين تنام", distance: "كم تبعد",
    gallery: "معرض الصور", related_places: "أماكن ذات صلة",
  },
  fr: {
    facts_title: "À retenir", learn_title: "Ce que vous allez apprendre", related_themes: "Thèmes liés",
    back_culture: "Retour à la culture", explore: "Explorer le thème", place_info: "Infos pratiques",
    best_time: "Meilleure période", how_to_reach: "Comment y aller", where_to_sleep: "Où dormir", distance: "Distance",
    gallery: "Galerie", related_places: "Lieux liés",
  },
  en: {
    facts_title: "Key facts", learn_title: "What you will learn", related_themes: "Related themes",
    back_culture: "Back to culture", explore: "Explore this theme", place_info: "Practical info",
    best_time: "Best time to visit", how_to_reach: "How to get there", where_to_sleep: "Where to stay", distance: "How far",
    gallery: "Gallery", related_places: "Related places",
  },
} as const;
export type UiKey = keyof typeof ui.ar;
export const u = (key: UiKey, l: Locale): string => ui[l][key];
export const heroMetrics = [
  {
    value: "Next.js + TypeScript",
    label: "תשתית מודרנית וקריאה",
    note: "App Router, קבצים מסודרים וכניסה נקייה להרחבה.",
  },
  {
    value: "Adobe Font",
    label: "טיפוגרפיה מחוברת גלובלית",
    note: "ה־Typekit נטען ב־layout וזמין לכל ה־sections.",
  },
  {
    value: "Vercel Ready",
    label: "מוכן לבנייה והעלאה",
    note: "מבנה סטנדרטי שמתאים ישירות ל־deploy.",
  },
] as const;

export const featureCards = [
  {
    eyebrow: "Hero ראשון",
    title: "מסר חד כבר במסך הפתיחה",
    description:
      "כותרת, תת־כותרת, CTA מרכזי והוכחה תומכת בנויים כך שאפשר להחליף את הקופי בלי לפרק את המבנה.",
  },
  {
    eyebrow: "Sections מודולריים",
    title: "כל מקטע מוכן להחלפה או הרחבה",
    description:
      "כרטיסי ערך, שלבי עבודה וקריאת פעולה סופית מופרדים לקומפוננטות כדי שיהיה פשוט להוסיף בלוקים נוספים.",
  },
  {
    eyebrow: "Responsive",
    title: "נראה יציב גם במובייל וגם בדסקטופ",
    description:
      "העמוד משתמש בגריד, spacing וטיפוגרפיה שמגיבים טוב למסכים צרים ורחבים בלי עיצוב כפול.",
  },
] as const;

export const architectureCards = [
  {
    path: "src/app/layout.tsx",
    title: "מסגרת גלובלית",
    description:
      "כאן יושבים ה־metadata, ה־Typekit והגדרות ה־RTL כך שכל האתר יורש את אותם foundations.",
  },
  {
    path: "src/components/landing/*",
    title: "רכיבי UI חוזרים",
    description:
      "עמוד הנחיתה עצמו מחולק לרכיבי sections ברורים, כדי שלא תצטרך לנהל את כל ה־markup בקובץ אחד.",
  },
  {
    path: "src/content/landing.ts",
    title: "תוכן במיקום אחד",
    description:
      "הטקסטים, הכרטיסים והשלבים יושבים בקובץ ייעודי, כך ששינוי מסרים לא מחייב חיפוש עמוק בקומפוננטות.",
  },
] as const;

export const launchSteps = [
  {
    step: "01",
    title: "מעדכנים מסר ותועלת",
    description:
      "מחליפים כותרות, כרטיסי ערך ו־CTA לפי המוצר או השירות שמוכרים.",
  },
  {
    step: "02",
    title: "מחברים אינטגרציות",
    description:
      "טופס לידים, analytics, pixels או WhatsApp button יכולים להיכנס בלי לשנות את הבסיס.",
  },
  {
    step: "03",
    title: "עולים ל־Vercel",
    description:
      "מחברים repository, מריצים deploy ומקבלים preview/live URL בצורה סטנדרטית.",
  },
] as const;

export const checklist = [
  "Header עם ניווט פנימי ו־CTA קבוע.",
  "Hero עם הצעת ערך ראשית ופאנל תמיכה.",
  "מקטע יתרונות עם כרטיסים קלים לעריכה.",
  "מקטע ארכיטקטורה שמסביר איפה עורכים כל דבר.",
  "CTA מסכם שמוכן לחיבור לטופס או ללינק חיצוני.",
] as const;

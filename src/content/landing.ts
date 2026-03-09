export const navigation = [
  { name: "הירו", href: "#hero" },
  { name: "יכולות", href: "#features" },
  { name: "מבנה", href: "#architecture" },
  { name: "השקה", href: "#cta" },
] as const;

export const heroChecklist = [
  "טיפול מלא בלידים",
  "תיאום פגישות ושיפור מערך המכירות",
  "שקיפות מלאה ודוחות KPI",
] as const;

export const heroProofPoints = [
  "שקיפות מלאה",
  "CRM מסודר",
  "דוחות KPI",
  "תהליך ברור",
] as const;

export const featureCards = [
  {
    eyebrow: "Premium System",
    title: "שפת מותג שמתחילה בטוקנים ונגמרת בחוויה",
    description:
      "הצבעים, המשטחים, הכפתורים והטיפוגרפיה נשענים כולם על אותה פלטה, כדי שכל העמוד ירגיש מוצר אחד ולא חיבור של בלוקים.",
  },
  {
    eyebrow: "Reusable UI",
    title: "רכיבי בסיס שחוזרים בכל האתר",
    description:
      "כפתורים, badges ו־panels הוגדרו סביב טוקנים גלובליים כך שכל הרחבה עתידית ממשיכה את אותה השפה הוויזואלית.",
  },
  {
    eyebrow: "Responsive Precision",
    title: "נוכחות נקייה בכל breakpoint",
    description:
      "ה־header, ה־hero והכרטיסים מתנהגים באופן עקבי במובייל ובדסקטופ בלי לאבד את תחושת הפרימיום.",
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
  "Hero עם תמונת רקע, overlay וטקסט מעליה.",
  "מקטע יתרונות עם כרטיסים קלים לעריכה.",
  "מקטע ארכיטקטורה שמסביר איפה עורכים כל דבר.",
  "CTA מסכם שמוכן לחיבור לטופס או ללינק חיצוני.",
] as const;

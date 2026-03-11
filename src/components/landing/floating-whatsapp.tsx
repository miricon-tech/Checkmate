const whatsappNumber = "972546712130";

const whatsappMessage = encodeURIComponent(
  "היי אופק,\nיש לי עסק שמתמחה ב/אני עוסק ב\nוהייתי רוצה להבין קצת יותר פרטים לגבי השירותים שלך"
);

export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
      target="_blank"
      rel="noreferrer"
      aria-label="פתיחת שיחה ב-WhatsApp עם Checkmate"
      className="whatsapp-fab"
    >
      <span className="whatsapp-fab__halo" aria-hidden="true" />
      <span className="whatsapp-fab__content">
        <span className="whatsapp-fab__eyebrow">מענה מהיר ב־WhatsApp</span>
        <span className="whatsapp-fab__copy">
          יש שאלה לפני בדיקת ההתאמה? כתבו לנו עכשיו.
        </span>
      </span>
      <span className="whatsapp-fab__icon-shell" aria-hidden="true">
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
          <path
            d="M16.01 4C9.39 4 4 9.26 4 15.77c0 2.33.7 4.58 2.02 6.5L4.7 28l5.96-1.56a12.08 12.08 0 0 0 5.35 1.26h.01C22.63 27.7 28 22.44 28 15.93 28 9.42 22.63 4 16.01 4Zm0 21.73c-1.77 0-3.5-.48-5-1.39l-.36-.21-3.54.93.95-3.41-.23-.35a9.68 9.68 0 0 1-1.55-5.19c0-5.3 4.4-9.62 9.79-9.62 5.4 0 9.8 4.32 9.8 9.62 0 5.3-4.4 9.62-9.8 9.62Zm5.37-7.18c-.3-.15-1.79-.88-2.07-.98-.27-.1-.47-.15-.67.15-.2.29-.77.97-.95 1.17-.17.2-.35.23-.64.08-.3-.14-1.24-.45-2.36-1.44-.87-.76-1.46-1.69-1.64-1.98-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.14-.67-1.6-.92-2.18-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.08-.79.38-.27.29-1.04 1-1.04 2.44 0 1.44 1.07 2.83 1.21 3.02.15.2 2.1 3.33 5.18 4.53.73.3 1.3.47 1.74.6.73.23 1.4.2 1.93.12.59-.09 1.79-.72 2.04-1.4.25-.67.25-1.25.17-1.39-.07-.14-.27-.23-.57-.38Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </a>
  );
}

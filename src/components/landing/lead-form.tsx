import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export function LeadForm() {
  return (
    <Panel tone="dark" className="p-6">
      <form className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-white">השאירו פרטים</p>
          <p className="text-sm leading-6 text-white/68">
            נחזור אליכם לבדיקת התאמה קצרה של 15 דקות.
          </p>
        </div>

        <div className="grid gap-3">
          <label className="ui-field">
            <span className="ui-field__label">שם מלא</span>
            <input
              type="text"
              name="fullName"
              placeholder="איך קוראים לך?"
              className="ui-input"
            />
          </label>

          <label className="ui-field">
            <span className="ui-field__label">טלפון</span>
            <input
              type="tel"
              name="phone"
              placeholder="050-000-0000"
              className="ui-input"
            />
          </label>

          <label className="ui-field">
            <span className="ui-field__label">אימייל</span>
            <input
              type="email"
              name="email"
              placeholder="name@business.co.il"
              className="ui-input"
            />
          </label>

          <label className="ui-field">
            <span className="ui-field__label">שם העסק</span>
            <input
              type="text"
              name="company"
              placeholder="שם העסק או התחום"
              className="ui-input"
            />
          </label>

          <label className="ui-field">
            <span className="ui-field__label">מה חשוב לכם לשפר?</span>
            <textarea
              name="message"
              rows={4}
              placeholder="לידים, תיאום פגישות, מכירות, שליטה בדוחות..."
              className="ui-input ui-textarea"
            />
          </label>
        </div>

        <Button href="#cta" variant="gold" className="w-full justify-center">
          בדיקת התאמה (15 דק׳)
        </Button>

        <p className="ui-form-note">
          שליחה בטופס הסופי תתחבר ל־CRM, WhatsApp או לאוטומציה שתבחרו.
        </p>
      </form>
    </Panel>
  );
}

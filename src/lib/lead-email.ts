import "server-only";
import nodemailer from "nodemailer";
import {
  monthlyRevenueOptions,
  type LeadFormValues,
} from "@/lib/lead-form-schema";

const monthlyRevenueLabels = Object.fromEntries(
  monthlyRevenueOptions.map((option) => [option.value, option.label])
) as Record<LeadFormValues["monthlyRevenue"], string>;

let transporter: nodemailer.Transporter | null = null;

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getPort(value: string) {
  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("SMTP_PORT must be a positive integer.");
  }

  return port;
}

function getSmtpConfig() {
  const host = getRequiredEnv("SMTP_HOST");
  const port = getPort(process.env.SMTP_PORT ?? "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if ((user && !pass) || (!user && pass)) {
    throw new Error("SMTP_USER and SMTP_PASS must be provided together.");
  }

  const fromEmail = process.env.LEAD_FORM_FROM_EMAIL ?? user;

  if (!fromEmail) {
    throw new Error(
      "Missing required environment variable: LEAD_FORM_FROM_EMAIL or SMTP_USER"
    );
  }

  return {
    auth: user && pass ? { user, pass } : undefined,
    fromEmail,
    host,
    port,
    secure,
    toEmail: process.env.LEAD_FORM_TO_EMAIL ?? "ofek@checkmate.co.il",
  };
}

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const config = getSmtpConfig();

  transporter = nodemailer.createTransport({
    auth: config.auth,
    connectionTimeout: 10_000,
    disableFileAccess: true,
    disableUrlAccess: true,
    greetingTimeout: 10_000,
    host: config.host,
    port: config.port,
    secure: config.secure,
    socketTimeout: 15_000,
    tls: {
      minVersion: "TLSv1.2",
    },
  });

  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendLeadNotification(values: LeadFormValues) {
  const config = getSmtpConfig();
  const emailTransporter = getTransporter();
  const revenueLabel =
    monthlyRevenueLabels[values.monthlyRevenue] ?? values.monthlyRevenue;
  const submittedAt = new Intl.DateTimeFormat("he-IL", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jerusalem",
  }).format(new Date());

  const lines = [
    "פנייה חדשה מטופס הלידים של Checkmate",
    "",
    `שם מלא: ${values.fullName}`,
    `טלפון: ${values.phone}`,
    `שם העסק: ${values.company}`,
    `מחזור חודשי משוער: ${revenueLabel}`,
    `מועד שליחה: ${submittedAt}`,
    "",
    "האתגר המרכזי:",
    values.challenge,
  ];

  await emailTransporter.sendMail({
    from: config.fromEmail,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.7; color: #111a1f;">
        <h2 style="margin: 0 0 16px;">פנייה חדשה מטופס הלידים של Checkmate</h2>
        <p style="margin: 0 0 8px;"><strong>שם מלא:</strong> ${escapeHtml(values.fullName)}</p>
        <p style="margin: 0 0 8px;"><strong>טלפון:</strong> ${escapeHtml(values.phone)}</p>
        <p style="margin: 0 0 8px;"><strong>שם העסק:</strong> ${escapeHtml(values.company)}</p>
        <p style="margin: 0 0 8px;"><strong>מחזור חודשי משוער:</strong> ${escapeHtml(revenueLabel)}</p>
        <p style="margin: 0 0 16px;"><strong>מועד שליחה:</strong> ${escapeHtml(submittedAt)}</p>
        <p style="margin: 0 0 8px;"><strong>האתגר המרכזי:</strong></p>
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(values.challenge)}</p>
      </div>
    `,
    subject: `ליד חדש מ-Checkmate | ${values.fullName} | ${values.company}`,
    text: lines.join("\n"),
    to: config.toEmail,
  });
}

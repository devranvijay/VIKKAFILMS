import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, shootType, budget, details } = body;

    if (!name || !email || !shootType || !details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #0e0e0e; color: #e2e2e2; margin: 0; padding: 0; }
    .wrap { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
    .logo { font-size: 22px; font-weight: 700; letter-spacing: -0.03em; color: #fff; margin-bottom: 32px; }
    .tag { font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: #8e9192; margin-bottom: 8px; }
    h2 { font-size: 24px; color: #fff; margin: 0 0 28px; font-weight: 500; }
    .row { padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.07); display: flex; gap: 16px; }
    .row:last-child { border-bottom: none; }
    .label { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #444748; min-width: 100px; padding-top: 2px; }
    .val { font-size: 15px; color: #c4c7c8; line-height: 1.6; }
    .msg-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 6px; padding: 18px; margin-top: 24px; }
    .msg-box .label { margin-bottom: 10px; display: block; }
    .msg-box .val { white-space: pre-wrap; }
    .footer { margin-top: 40px; font-size: 11px; color: #444748; letter-spacing: 0.1em; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="logo">VikaFilms</div>
    <div class="tag">New Inquiry</div>
    <h2>Project Booking Request</h2>
    <div class="row"><span class="label">Name</span><span class="val">${name}</span></div>
    ${company ? `<div class="row"><span class="label">Company</span><span class="val">${company}</span></div>` : ""}
    <div class="row"><span class="label">Email</span><span class="val"><a href="mailto:${email}" style="color:#c4c7c8">${email}</a></span></div>
    ${phone ? `<div class="row"><span class="label">Phone</span><span class="val"><a href="tel:${phone}" style="color:#c4c7c8">${phone}</a></span></div>` : ""}
    <div class="row"><span class="label">Shoot Type</span><span class="val">${shootType}</span></div>
    ${budget ? `<div class="row"><span class="label">Budget</span><span class="val">${budget}</span></div>` : ""}
    <div class="msg-box">
      <span class="label">Project Details</span>
      <span class="val">${details.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>
    </div>
    <div class="footer">VikaFilms · Mumbai, India · vikafilms15@gmail.com</div>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"VikaFilms Inquiry" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Inquiry — ${shootType} · ${name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

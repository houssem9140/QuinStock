const nodemailer = require("nodemailer");

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass || user.includes("change-me") || pass.includes("change-me")) {
    return null;
  }

  return {
    host,
    port,
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true" || port === 465,
    auth: { user, pass },
  };
}

function createTransporter() {
  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    return null;
  }

  return nodemailer.createTransport(smtpConfig);
}

async function sendQuoteEmail({ quote, pdfBuffer }) {
  const transporter = createTransporter();

  if (!transporter) {
    return { sent: false, reason: "SMTP_NOT_CONFIGURED" };
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const adminEmail = process.env.QUOTE_NOTIFICATION_EMAIL || process.env.SMTP_USER;
  const recipients = Array.from(new Set([quote.contactEmail, adminEmail].filter(Boolean)));

  await transporter.sendMail({
    from,
    to: recipients.join(","),
    subject: `Devis QuinStock ${quote.quoteNumber}`,
    text: `Bonjour,\n\nVotre demande de devis ${quote.quoteNumber} est bien recue. Le PDF est joint a cet email.\n\nQuinStock`,
    html: `
      <div style="font-family:Arial,sans-serif;color:#1C1C1E">
        <h2 style="color:#D4820A">Devis QuinStock ${quote.quoteNumber}</h2>
        <p>Bonjour,</p>
        <p>Votre demande de devis est bien recue. Le PDF est joint a cet email.</p>
        <p><strong>Total estime :</strong> ${quote.totalEstimate.toFixed(2)} EUR</p>
        <p>QuinStock</p>
      </div>
    `,
    attachments: [
      {
        filename: `${quote.quoteNumber}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });

  return { sent: true };
}

module.exports = { sendQuoteEmail };

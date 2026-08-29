const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Sundhar Karthick Art Gallery" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);

    return {
      success: true,
    };
  } catch (error) {
    console.error("❌ Email Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = sendEmail;
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {

      const { SMTP_HOST, 
              SMTP_PORT, 
              SMTP_SECURE, 
              SMTP_USER, 
              SMTP_PASS, 
              FROM_NAME, 
              FROM_EMAIL } = process.env;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const message = {
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    const info = await transporter.sendMail(message);

    console.log("Email sent successfully!");
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

module.exports = sendEmail;
const axios = require("axios");

const sendEmail = async (options) => {
  const emailData = {
    sender: {
      name: process.env.FROM_NAME,
      email: process.env.FROM_EMAIL,
    },
    to: [{ email: options.email }],
    subject: options.subject,
    textContent: options.message,
  };

  try {
    const response = await axios({
      method: "post",
      url: process.env.BREVO_URL || "https://api.brevo.com/v3/smtp/email",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: emailData,
    });

    console.log(
      `Email sent successfully! Message ID: ${response.data.messageId}`,
    );
  } catch (error) {
    console.error("Brevo API Error:");
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw new Error("Email sending failed via Brevo API");
  }
};

module.exports = sendEmail;
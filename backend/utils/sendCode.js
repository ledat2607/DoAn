const nodemailer = require("nodemailer");

const sendCode = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  // Generate a random verification code (you can use a library for more robust code generation)
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: `
      <p style="font-size: 18px; color: #007BFF; font-weight: bold;">
        Mã xác thực của bạn là: <span style="font-size: 24px;">${verificationCode}</span>
      </p>
      <p style="font-size: 16px; margin-top: 10px;">${options.message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return verificationCode; // Return the generated verification code
  } catch (error) {
    throw new Error("Failed to send email");
  }
};

module.exports = sendCode;

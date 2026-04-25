import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const verifyEmail = async (email, token) => {
  try {
    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
      throw new Error("FRONTEND_URL is not defined in .env");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const verificationLink = `${frontendUrl}/verify-email/${token}`;

    const mailConfiguration = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Verify your email",
      text: `Click this link to verify your email: ${verificationLink}`,
    };

    const info = await transporter.sendMail(mailConfiguration);

    console.log("Email sent successfully");
    console.log(info.response);
    return true;

  } catch (error) {
    console.error("Email error:", error.message);
    throw error;
  }
};

export default verifyEmail;
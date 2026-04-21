import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendOTPMail = async (otp, email) => {
  try {
    const mailConfiguration = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `
        <p>Your OTP is: <b>${otp}</b> for reset password</p>
        <p>This OTP will expire in 10 minutes</p>
      `
    };

    const info = await transporter.sendMail(mailConfiguration);

    console.log("Email sent successfully");
    console.log(info.response);

    return true;

  } catch (error) {
    console.log("Email error:", error);
    return false;
  }
};

export default sendOTPMail;
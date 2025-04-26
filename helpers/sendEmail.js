import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_NET_DOMAIN, UKR_NET_PASSWORD, APP_DOMAIN } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_DOMAIN,
    pass: UKR_NET_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (email, verificationToken) => {
  const verifyEmail = {
    from: UKR_NET_DOMAIN,
    to: email,
    subject: "Verify email",
    html: `<a href="${APP_DOMAIN}/api/auth/verify/${verificationToken}" target="_blank">Verify email</a>`,
  };

  return transporter.sendMail(verifyEmail);
};

export default sendEmail;

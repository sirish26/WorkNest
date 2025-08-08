// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail", // or use "ethereal.email" for dev/testing
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// interface MailOptions {
//   to: string;
//   subject: string;
//   html: string;
// }

// export const sendOTPToEmail = async ({ to, subject, html }: MailOptions) => {
//   const mailOptions = {
//     from: `"WorkNest Support" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.messageId);
//     return { success: true };
//   } catch (err) {
//     console.error("Email sending failed:", err);
//     return { success: false, error: err };
//   }
// };


import nodemailer from "nodemailer";

let testAccount: any = null;
let transporter: nodemailer.Transporter;

export const initEthereal = async () => {
  testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  console.log("📧 Ethereal email test account created:");
  console.log("🔐 Login:", testAccount.user);
  console.log("🔑 Password:", testAccount.pass);
};

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendOTPToEmail = async ({ to, subject, html }: MailOptions) => {
  if (!transporter) {
    await initEthereal();
  }

  const info = await transporter.sendMail({
    from: `"WorkNest Support" <${testAccount.user}>`,
    to,
    subject,
    html,
  });

  console.log("✅ Email sent:", info.messageId);
  console.log("🔗 Preview URL:", nodemailer.getTestMessageUrl(info));

  return {
    success: true,
    previewUrl: nodemailer.getTestMessageUrl(info),
  };
};

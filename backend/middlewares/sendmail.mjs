import { createTransport } from 'nodemailer';

export const sendmail = async (text) => {
  const transporter = createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  await transporter.sendMail({
    subject: 'contact request from portfolio',
    to: process.env.MYMAIL,
    from: process.env.MYMAIL,
    text,
  });
};

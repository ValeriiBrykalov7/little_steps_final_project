import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: '"App" <no-reply@app.com>',
    to: email,
    subject: 'Підтвердіть новий email',
    html: `
      <p>Для підтвердження нового email перейдіть за посиланням:</p>
      <a href="${url}">${url}</a>
      <p>Посилання дійсне 1 годину.</p>
    `,
  });
};

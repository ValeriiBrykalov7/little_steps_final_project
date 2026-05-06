import nodemailer from 'nodemailer';

const mailPort = Number(process.env.MAIL_PORT || process.env.SMTP_PORT || 587);

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || process.env.SMTP_HOST,
  port: mailPort,
  secure: mailPort === 465,
  auth: {
    user: process.env.MAIL_USER || process.env.SMTP_USER,
    pass: process.env.MAIL_PASS || process.env.SMTP_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  const bannerUrl = process.env.EMAIL_BANNER_URL;

  await transporter.sendMail({
    from:
      process.env.SMTP_FROM ||
      '"Little Steps" <no-reply@little-steps-leleka.com>',
    to: email,
    subject: 'Confirm your new email',
    text: [
      'Confirm your new email address',
      '',
      'Open this link to confirm the email change:',
      url,
      '',
      'This link is valid for 1 hour.',
    ].join('\n'),
    html: `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title>Confirm your new email</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f6f7fb; font-family:Arial, Helvetica, sans-serif; color:#243042;">
          <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
            Confirm your new email address for Little Steps.
          </div>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; background-color:#f6f7fb;">
            <tr>
              <td align="center" style="padding:32px 16px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; max-width:600px;">
                  <tr>
                    <td align="center" style="padding:0 0 20px;">

                    </td>
                  </tr>

                  ${
                    bannerUrl
                      ? `<tr>
                          <td style="padding:0;">
                            <img src="${bannerUrl}" width="600" alt="" style="display:block; width:100%; max-width:600px; height:auto; border:0; border-radius:16px 16px 0 0;" />
                          </td>
                        </tr>`
                      : ''
                  }

                  <tr>
                    <td style="background-color:#ffffff; border-radius:${
                      bannerUrl ? '0 0 16px 16px' : '16px'
                    }; padding:36px 32px; box-shadow:0 12px 32px rgba(31, 41, 55, 0.08);">
                      <h1 style="margin:0 0 16px; font-size:24px; line-height:32px; font-weight:700; color:#182235;">
                        Confirm your new email
                      </h1>

                      <p style="margin:0 0 18px; font-size:16px; line-height:24px; color:#526071;">
                        We received a request to confirm this email address for your Little Steps account.
                      </p>

                      <p style="margin:0 0 28px; font-size:16px; line-height:24px; color:#526071;">
                        Use the button below to complete the change. The link is valid for 1 hour.
                      </p>

                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 28px;">
                        <tr>
                          <td align="center" bgcolor="#6c63ff" style="border-radius:8px;">
                            <a href="${url}" style="display:inline-block; padding:14px 22px; font-size:16px; line-height:20px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:8px;">
                              Confirm email
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:0 0 10px; font-size:14px; line-height:21px; color:#6b7280;">
                        If the button does not work, copy and paste this link into your browser:
                      </p>

                      <p style="margin:0 0 28px; font-size:14px; line-height:21px; color:#6c63ff; word-break:break-all;">
                        <a href="${url}">${url}</a>
                      </p>

                      <p style="margin:0; font-size:14px; line-height:21px; color:#6b7280;">
                        If you did not request this change, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding:20px 12px 0; font-size:12px; line-height:18px; color:#8a94a6;">
                      Little Steps<br />
                      This is an automated message. Please do not reply to this email.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
};

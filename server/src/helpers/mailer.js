import nodemailer from 'nodemailer';

import { MAILGUN_USER, MAILGUN_PASS } from '../config';

const transport = nodemailer.createTransport({
  service: 'Mailgun',
  auth: { user: MAILGUN_USER, pass: MAILGUN_PASS },
  tls: { rejectUnauthorized: false }
});

// eslint-disable-next-line
export const mailer = (from, to, subject, html) => {
  return new Promise((resolve, reject) => {
    transport.sendMail({ from, subject, to, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

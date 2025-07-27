import nodeMailer from 'nodemailer';
import { MAIL, MAIL_PASS } from '../config/env.js';

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        
        user: MAIL,
        pass: MAIL_PASS,
    },
});

export default transporter;
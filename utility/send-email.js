import dayjs from "dayjs";
import { emailTemplates } from "./email-templet.js";
import { MAIL } from "../config/env.js";
import transporter from '../config/nodemailer.js'

const sendReminderEmail = async ({ to, type, subcription }) => {
    if (!to || !type) throw new Error('Missing required parameters');

    const template = emailTemplates.find((t) => t.label === type);
    
    if (!template) throw new Error('Invalid email type');

    console.log(subcription.name);
    

    const mailInfo = {
        userName: subcription.user.name,
        subcriptionName: subcription.name,
        renewalDate: dayjs(subcription.renewalDate).format('MMM D, YYYY'),
        planName: subcription.name,
        price: `${subcription.currency} ${subcription.price} (${subcription.frequency})`,
        paymentMethod: subcription.paymentMethod,
    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);


    const mailOptions = {
        from: MAIL,
        to: to,
        subject: subject,
        html: message,
    }


    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return console.log("Nodemailer error ❌:", error);
            console.log('Email sent ✅:', info.response);
        });
    } catch (err) {
        console.log("Unexpected error sending email ❌:", err);
    }

}

export default sendReminderEmail;

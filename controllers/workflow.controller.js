import dayjs from 'dayjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
import Subcription from '../models/subcription.model.js'
import sendReminderEmail from '../utility/send-email.js'


const REMINDERS = [7, 5, 3, 1];

export const sendReminders = serve(async (context) => {

    const { subcriptionId } = context.requestPayload;

    const subcription = await fetchSubcription(context, subcriptionId)

    if (!subcription || subcription.status !== 'active') {
        console.log("No active subscription found ❌")
        return
    }

    const renewalDate = dayjs(subcription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subcription ${subcriptionId}. Stopping workflow`);
        return;
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day')

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate)
        }

        if (dayjs().isSame(reminderDate, 'days')) {
            const label = `${daysBefore} ${daysBefore === 1 ? 'day' : 'days'} before renewal`;
            await triggerReminder(context, label, subcription);

        }

    }

})

const fetchSubcription = async (context, subcriptionId) => {
    return await context.run('get subcription', async () => {
        const sub = await Subcription.findById(subcriptionId).populate('user', 'name email');
        console.log(sub)
        return sub
    });
}


const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async (context, label, subcription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);

        await sendReminderEmail({
            to: subcription.user.email,
            type: label,
            subcription,
        });
    });
};

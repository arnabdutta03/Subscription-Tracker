export const generateEmailTemplate = ({
  userName,
  subcriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="color-scheme" content="light dark">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Tracker Reminder</title>
  <!--[if !mso]><!-->
  <style>
  @media only screen and (max-width: 600px) {
    .container {
      padding: 12px !important;
    }
    .box {
      padding: 18px !important;
    }
    h1 {
      font-size: 22px !important;
      line-height: 28px !important;
    }
    .header, .footer {
      padding: 20px 10px !important;
    }
    .details-table td {
      font-size: 14px !important;
    }
  }
  </style>
  <!--<![endif]-->
</head>
<body style="margin:0; padding:0; background-color: #f1f5f9; font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; color:#1e293b;">
  <div class="container" style="max-width:600px;margin:0 auto;background:#fff;box-shadow:0 6px 36px rgba(0,0,0,0.08);padding:40px;">
    <!-- Header -->
    <div class="header" style="background: linear-gradient(96deg,#0d9488,#22d3ee);padding:32px 24px;text-align:center;border-radius:12px 12px 0 0;">
      <h1 style="margin:0;color:#fff;font-size:28px;letter-spacing:.5px;font-weight:700;letter-spacing:.02em;">Subscription Tracker</h1>
      <p style="margin:8px 0 0 0;color:#fff;opacity:.94;font-size:16px;letter-spacing:.1px;">Smart Reminders for Smarter Spending</p>
    </div>

    <!-- Main Content -->
    <div class="box" style="padding:32px;">
      <p style="font-size:16px;margin:0 0 16px 0;">Hey <b>${userName}</b>,</p>
      <p style="margin: 0 0 20px 0;font-size:16px;line-height:1.6;">
        Just a heads-up! Your <b>${subcriptionName}</b> subscription is set to renew on <b>${renewalDate}</b>,
        which is <b>${daysLeft} ${daysLeft === 1 ? "day" : "days"}</b> from today.
      </p>
      <div style="background-color:#f0fdfa;border:1px solid #0d9488;padding:24px;border-radius:14px;margin:28px 0;">
        <h3 style="margin:0 0 18px 0;font-size:18px;color:#0f766e;font-weight:600;">📋 Subscription Details</h3>
        <table class="details-table" style="width:100%;font-size:15px;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0 8px 0;font-weight:600;color:#334155;">Plan</td>
            <td style="padding:8px 0;text-align:right;color:#0f172a;">${planName}</td>
          </tr>
          <tr>
            <td style="padding:8px 0 8px 0;font-weight:600;color:#334155;">Price</td>
            <td style="padding:8px 0;text-align:right;color:#22c55e;font-weight:700;">₹${price}</td>
          </tr>
          <tr>
            <td style="padding:8px 0 8px 0;font-weight:600;color:#334155;">Payment Method</td>
            <td style="padding:8px 0;text-align:right;color:#0f172a;">${paymentMethod}</td>
          </tr>
        </table>
      </div>
      <p style="font-size:15px;margin-top:28px;margin-bottom:10px;line-height:1.5;">
        To review or manage your subscription, head over to your
        <a href="${accountSettingsLink}" style="color:#0d9488;text-decoration:underline;font-weight:500;">account settings</a>.
      </p>
      <p style="font-size:15px;margin:8px 0 0 0;">
        Need help? Reach out to our
        <a href="${supportLink}" style="color:#0d9488;text-decoration:underline;font-weight:500;">support team</a>.
      </p>
      <p style="margin-top:32px;font-size:15.5px;line-height:1.6;color:#475569;">
        Warm wishes,<br><b>Team Subscription Tracker</b>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer" style="background:#e2e8f0;color:#475569;text-align:center;padding:20px 24px 15px 24px;border-radius: 0 0 12px 12px;font-size:13.2px;letter-spacing:.01em;">
      <p style="margin:0 0 3px 0;">Subscription Tracker • Your Digital Wallet’s Best Friend</p>
      <p style="margin:6px 0 0 0;">
        <a href="#" style="color:#0d9488;text-decoration:none;font-weight:500;margin:0 10px;">Unsubscribe</a> |
        <a href="#" style="color:#0d9488;text-decoration:none;font-weight:500;margin:0 10px;">Privacy</a> |
        <a href="#" style="color:#0d9488;text-decoration:none;font-weight:500;margin:0 10px;">Terms</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

export const emailTemplates = [
  {
    label: "7 days before renewal",
    generateSubject: (data) =>
      `📅 Your ${data.subcriptionName} plan renews in 7 days`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
  },
  {
    label: "5 days before renewal",
    generateSubject: (data) =>
      `⏳ Just 5 days left for ${data.subcriptionName} renewal`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
  },
  {
    label: "3 days before renewal",
    generateSubject: (data) => `🚀 ${data.subcriptionName} renewal in 3 days`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 3 }),
  },
  {
    label: "1 day before renewal",
    generateSubject: (data) =>
      `⚡ Final call: ${data.subcriptionName} renews tomorrow`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
  },
];

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email] RESEND_API_KEY not set, skipping email to:", options.to);
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.EMAIL_FROM ?? "noreply@accessitools.app";

  try {
    await resend.emails.send({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  } catch (err) {
    console.error("[email] Failed to send email:", err);
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  await sendEmail({
    to: email,
    subject: "Welcome to AccessiTools - Your alt text & read-aloud toolkit",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4f46e5;">Welcome to AccessiTools, ${name || "there"}!</h1>
        <p>Thanks for signing up. You have <strong>10 free alt text generations</strong> and <strong>3 read-aloud sessions</strong> to get started.</p>
        <h2>What you can do:</h2>
        <ul>
          <li>Generate alt text for images (concise, descriptive, and ecommerce variants)</li>
          <li>Upload PDFs and screenshots to read aloud in your browser</li>
          <li>Export alt text results as CSV</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://accessitools.app"}/dashboard"
           style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 16px;">
          Go to Dashboard
        </a>
        <p style="color: #6b7280; font-size: 14px; margin-top: 32px;">
          Need help? Reply to this email and we'll get back to you within 24 hours.
        </p>
      </div>
    `,
  });
}

export async function sendUsageReminderEmail(email: string, name: string, creditsLeft: number) {
  await sendEmail({
    to: email,
    subject: "You're almost out of alt text credits",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4f46e5;">Almost out of credits, ${name || "there"}!</h1>
        <p>You have <strong>${creditsLeft} alt text credits remaining</strong>.</p>
        <p>Upgrade to Pro to get 500 credits/month plus batch upload and CSV export.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://accessitools.app"}/pricing"
           style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 16px;">
          Upgrade Now - $19/month
        </a>
      </div>
    `,
  });
}

export async function sendUpgradePromptEmail(email: string, name: string) {
  await sendEmail({
    to: email,
    subject: "You've used all your free credits - Upgrade to continue",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4f46e5;">Credits exhausted, ${name || "there"}</h1>
        <p>You've used all your free alt text credits. Upgrade to Pro to keep generating alt text at scale.</p>
        <h2>Pro Plan - $19/month</h2>
        <ul>
          <li>500 alt text credits/month</li>
          <li>50 read-aloud sessions/month</li>
          <li>Batch upload</li>
          <li>CSV export</li>
          <li>Priority support</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://accessitools.app"}/pricing"
           style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 16px;">
          Upgrade to Pro
        </a>
      </div>
    `,
  });
}

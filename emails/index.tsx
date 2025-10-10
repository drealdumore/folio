interface InquiryEmailProps {
  username: string;
  email: string;
  organization?: string;
  service: string;
  message: string;
}

const InquiryEmail = ({
  username,
  email,
  organization,
  service,
  message,
}: InquiryEmailProps) => {
  return `
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; background-color: #1a1a1a; padding: 40px 20px; margin: 0;">
        <div style="background-color: #1a1a1a; border: 1px solid #333333; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f2f2f2; font-size: 24px; font-weight: 600; margin-bottom: 8px; margin-top: 0;">New Contact Inquiry</h1>
          
          <p style="font-size: 16px; color: #eaeaea; margin-bottom: 24px;">Someone reached out through your portfolio contact form.</p>

          <div style="background-color: #262626; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
            <div style="margin-bottom: 16px;">
              <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
              <p style="font-size: 16px; color: #f2f2f2; margin: 0; font-weight: 500;">${username}</p>
            </div>

            <div style="margin-bottom: 16px;">
              <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
              <a href="mailto:${email}" style="font-size: 16px; color: #60a5fa; text-decoration: none; font-weight: 500;">${email}</a>
            </div>

            ${organization ? `
            <div style="margin-bottom: 16px;">
              <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Organization</p>
              <p style="font-size: 16px; color: #f2f2f2; margin: 0; font-weight: 500;">${organization}</p>
            </div>
            ` : ''}

            <div style="margin-bottom: 16px;">
              <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Service Needed</p>
              <p style="font-size: 16px; color: #f2f2f2; margin: 0; font-weight: 500;">${service}</p>
            </div>

            <div>
              <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
              <p style="font-size: 16px; color: #eaeaea; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #333333; margin: 24px 0;" />

          <p style="font-size: 14px; color: #a1a1aa; margin: 0; text-align: center;">
            Sent from <a href="https://drealdumore.vercel.app" style="color: #60a5fa; text-decoration: none;">Samuel's Portfolio</a>
          </p>
        </div>
      </body>
    </html>
  `;
};

export default InquiryEmail;

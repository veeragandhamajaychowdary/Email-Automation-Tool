import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Function to fetch unread emails
export const fetchGmailEmails = async (authClient: OAuth2Client) => {
  const gmail = google.gmail({ version: 'v1', auth: authClient });
  const res = await gmail.users.messages.list({ userId: 'me', q: 'is:unread',maxResults: 10, });
  const messages = res.data.messages || [];

  
  const emails = [];

  for (const message of messages) {
    if (message.id) {
      const msg = await gmail.users.messages.get({ userId: 'me', id: message.id });
      if (msg.data) {
        emails.push({
          id: message.id,
          threadId: msg.data.threadId,
          snippet: msg.data.snippet,
        });
      }
    }
  }

  return emails;
};

// Function to send a reply to an email
export const sendGmailReply = async (authClient: OAuth2Client, message: string, threadId: string) => {
  const gmail = google.gmail({ version: 'v1', auth: authClient });

  // Fetch the original email to get the required headers
  const originalEmail = await gmail.users.messages.get({ userId: 'me', id: threadId });
  
  if (!originalEmail.data) {
    throw new Error('Original email not found');
  }

  const headers = originalEmail.data.payload?.headers || [];
  const subject = headers.find(header => header.name === 'Subject')?.value || 'Re: Your Email';
  const inReplyTo = headers.find(header => header.name === 'Message-ID')?.value;
  const from = headers.find(header => header.name === 'From')?.value;

  if (!from) {
    throw new Error('Recipient address not found');
  }

  const rawMessage = [
    `From: "Raghava Chowdary" <raghavav2000@gmail.com>`, // Replace with your email
    `To: ${from}`,
    `Subject: ${subject}`,
    `In-Reply-To: ${inReplyTo}`,
    `References: ${inReplyTo}`,
    '',
    message,
  ].join('\n');

  const encodedMessage = Buffer.from(rawMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
        threadId: threadId,
      },
    });
    console.log(`Reply sent successfully to thread ID: ${threadId}`);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
};

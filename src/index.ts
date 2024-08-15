/*import express, { Request, Response } from 'express';
import { getGoogleAuthUrl, handleGoogleCallback, getOAuth2Client } from './auth/googleAuth';
import { fetchGmailEmails, sendGmailReply } from './services/emailService';
import { analyzeEmailContent } from './services/aiService';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/google/auth', (req: Request, res: Response) => {
  const url = getGoogleAuthUrl();
  res.redirect(url);
});

app.get('/google/callback', async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const tokens = await handleGoogleCallback(code);
    res.json(tokens);
  } catch (error) {
    console.error('Error handling Google callback:', error);
    res.status(500).json({ error: 'Failed to handle Google callback' });
  }
});

app.get('/gmail/fetch', async (req: Request, res: Response) => {
  try {
    const oAuth2Client = getOAuth2Client();
    const emails = await fetchGmailEmails(oAuth2Client);

    for (const email of emails) {
      const snippet = email.snippet || "";  // Default to an empty string if snippet is null or undefined
      const label = await analyzeEmailContent(snippet);

      if (label) {  // Check if label is not undefined
        const replyMessage = generateReplyMessage(label);

        if (replyMessage && email.threadId) {
          await sendGmailReply(oAuth2Client, replyMessage, email.threadId);
        }
      }
    }

    res.send('Emails processed and replies sent successfully!');
  } catch (error) {
    console.error('Error fetching and processing emails:', error);
    res.status(500).json({ error: 'Failed to process emails' });
  }
});

const generateReplyMessage = (label: string): string | null => {
  switch (label) {
    case 'Interested':
      return 'Thank you for your interest! Would you like to schedule a demo call?';
    case 'Not Interested':
      return 'Thank you for your time. If you change your mind, feel free to reach out.';
    case 'More Information':
      return 'Here is more information about our services...';
    default:
      return null;
  }
};

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});*/
import express, { Request, Response } from 'express';
import cron from 'node-cron';
import { getGoogleAuthUrl, handleGoogleCallback, getOAuth2Client } from './auth/googleAuth';
import { fetchGmailEmails, sendGmailReply } from './services/emailService';
import { analyzeEmailContent } from './services/aiService';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/google/auth', (req: Request, res: Response) => {
  const url = getGoogleAuthUrl();
  res.redirect(url);
});

app.get('/google/callback', async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const tokens = await handleGoogleCallback(code);
    res.json(tokens);
  } catch (error) {
    console.error('Error handling Google callback:', error);
    res.status(500).json({ error: 'Failed to handle Google callback' });
  }
});

// Automatically fetch and process emails every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('Running email processing job...');
  try {
    const oAuth2Client = getOAuth2Client();
    const emails = await fetchGmailEmails(oAuth2Client);

    for (const email of emails) {
      const snippet = email.snippet || "";  // Default to an empty string if snippet is null or undefined
      const label = await analyzeEmailContent(snippet);

      if (label) {  // Check if label is not undefined
        const replyMessage = generateReplyMessage(label);

        if (replyMessage && email.threadId) {
          await sendGmailReply(oAuth2Client, replyMessage, email.threadId);
        }
      }
    }

    console.log('Emails processed and replies sent successfully!');
  } catch (error) {
    console.error('Error fetching and processing emails:', error);
  }
});

const generateReplyMessage = (label: string): string | null => {
  switch (label) {
    case 'Interested':
      return 'Thank you for your interest! Would you like to schedule a demo call?';
    case 'Not Interested':
      return 'Thank you for your time. If you change your mind, feel free to reach out.';
    case 'More Information':
      return 'Here is more information about our services...';
    default:
      return null;
  }
};

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// local host port

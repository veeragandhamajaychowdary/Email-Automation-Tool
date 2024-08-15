import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyzeEmailContent = async (emailBody: string): Promise<string | undefined> => {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Classify the following email into one of these categories: "Interested", "Not Interested", "More Information".' },
          { role: 'user', content: `Email:\n${emailBody}` }
        ],
        max_tokens: 500,
        temperature: 0.3,
      });

      const label = response.choices[0].message?.content?.trim();
      return label;
    } catch (error: any) {
      if (error.status === 429 && attempts < maxAttempts) { // 429 is the status code for "Too Many Requests"
        attempts++;
        console.warn(`Rate limit exceeded, retrying... (${attempts}/${maxAttempts})`);
        await delay(5000); // Wait 5 seconds before retrying
      } else {
        console.error('Error analyzing email content:', error);
        throw new Error('Failed to analyze email content');
      }
    }
  }
  throw new Error('Failed to analyze email content after multiple attempts');
};

1. **Project Overview**
Title: Email Automation Tool
Description: This project is an automation tool designed to interact with Gmail. It automatically fetches unread emails, analyzes their content using OpenAI, and sends appropriate responses based on the email classification. The tool is built using TypeScript and runs on Node.js, with scheduled tasks managed by node-cron for automated execution.
2. **Features**
Gmail Integration: Authenticate with Gmail using OAuth2 and fetch unread emails.
Content Analysis: Utilize OpenAI's GPT models to classify emails into categories such as "Interested," "Not Interested," and "More Information."
Automated Replies: Based on the classification, the tool sends predefined responses automatically.
Scheduled Tasks: Automate the email fetching and processing tasks using node-cron.
3. **Technologies and Tools Used**
Node.js: JavaScript runtime used to run the backend server.
TypeScript: Superset of JavaScript that adds static typing.
Express: Web framework used for building the API endpoints.
OpenAI API: Used to analyze the content of emails for classification.
Google APIs: Used for authenticating with Gmail and interacting with the Gmail API.
node-cron: A cron-like task scheduler used to automate the running of specific tasks at set intervals.
OAuth2: Used for securely authorizing access to Gmail.
dotenv: Used to manage environment variables, particularly for storing API keys and secrets.
Gaxios: A promise-based HTTP client used for making requests to external APIs.
Git: Version control system used for tracking changes to the project.
GitHub: Hosting platform for version control and collaboration.
4. **Installation**
Prerequisites: Ensure you have Node.js and npm installed on your system.
Steps:
Clone the repository:
bash
Copy code
git clone(https://github.com/veeragandhamajaychowdary/Email-Automation-Tool.git)
Navigate to the project directory:
bash
Copy code
cd email-automation-tool
Install the dependencies:
bash
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory.
Add your environment variables (e.g., GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, OPENAI_API_KEY).
5. **Usage**
Running the Project:
bash
Copy code
npx ts-node src/index.ts
Manual Trigger: You can manually trigger the email processing by visiting:
bash
Copy code
http://localhost:3000/gmail/fetch
Automated Execution: The email processing is set to run automatically every hour by default, managed by node-cron.
6. **Project Structure**
src/: Contains all the source code.
auth/: Handles Google OAuth2 authentication.
services/: Contains service files for interacting with Gmail and OpenAI.
index.ts: The main entry point of the application.
.env: Environment variables for API keys and secrets.
package.json: Lists the project dependencies and scripts.
tsconfig.json: TypeScript configuration file.
7.** Environment Variables**
GOOGLE_CLIENT_ID: Your Google client ID.
GOOGLE_CLIENT_SECRET: Your Google client secret.
GOOGLE_REDIRECT_URI: The redirect URI for Google OAuth2.
OPENAI_API_KEY: Your OpenAI API key.

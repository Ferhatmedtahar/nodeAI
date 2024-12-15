Telegram Bot and Gemini AI Setup Guide

## Project Overview

This project combines a Telegram bot and vite app with the power of Gemini AI to create an interactive chat experience. you can message the Telegram bot, which uses the Gemini AI API to generate intelligent responses. The bot's backend is built using Node.js, and there are basic front end using Vite for testing and interacting with the AI outside of Telegram.

### Features:

- Interactive Telegram bot for responding to user messages.
- Integration with Gemini AI for natural language processing and intelligent responses.
- Webhook for handling Telegram updates.
- A simple frontend built using Vite to send test messages to the AI backend.

## Project Routes

The project includes the following routes:

- **Telegram Bot Route:**
  - `/webhook`: Handles incoming Telegram updates sent via the webhook.
  - `/telegram`: A custom route to send messages to Telegram users from the backend.
- **Gemini AI Route:**
  - `/ai`: Handles requests from the frontend or Telegram bot and forwards them to the Gemini AI API to generate a response.

## Frontend (Vite Application)

The frontend is a simple Vite-based application that allows users to test the AI integration outside Telegram. It includes a basic form to input messages and display the AI's responses.

# Telegram Bot and Gemini AI Setup Guide

## Step 1: Create a Telegram Bot

1.  Open the Telegram app on your phone or desktop.
2.  Search for **BotFather** and select the verified bot.
3.  Start a conversation with BotFather by clicking the "Start" button.
4.  Type `/newbot` and follow the instructions:
    - Choose a name for your bot (this is the display name).
    - Choose a username for your bot (it must end with "bot", e.g., `myawesomebot`).
5.  BotFather will provide an API token. Copy this token for later use.

## Step 2: Obtain the Gemini AI API Key

1.  Go to the [Google Generative AI website](https://aistudio.google.com/app/apikey).
2.  Log in or create an account.
3.  Create a new project if required.
4.  Go to the "Credentials" section and generate an API key.
5.  Copy this key; you will need it for the Gemini AI integration.

## Step 3: Set Up ngrok for Local Testing (Optional)

1.  Download and install [ngrok](https://ngrok.com/download).
2.  Authenticate your ngrok installation:

    ngrok config add-authtoken YOUR_NGROK_AUTH_TOKEN

3.  Start an ngrok tunnel for your application:

    ngrok http 3000

4.  Copy the HTTPS URL provided by ngrok. This will be used as your bot’s webhook.

## Step 4: Set Up the Project

1.  Install Node.js:
    - Download and install Node.js (LTS version) from [https://nodejs.org](https://nodejs.org).
2.  Create a new project folder:
3.       mkdir my-telegram-bot
        cd my-telegram-bot
        git clone https://github.com/Ferhatmedtahar/nodeAI.git .
4.  Install the required libraries:

    npm install

## Step 5: Create the `.env` File

1.  In your project folder, create a file named `.env`.
2.  Add the following environment variables:

    GEMENI_API_KEY=your-gemini-ai-api-key
    SECRET_TOKEN=your-secret-token
    BOT_TOKEN=your-telegram-bot-token

    -the secret token is chosen by you

## Step 6: Set Up Webhooks with ngrok

1.  Start your ngrok tunnel:

    ngrok http 3000

2.  Copy the HTTPS URL provided by ngrok.
3.  Set up the Telegram webhook using the ngrok URL:

    curl -F "url=https://your-ngrok-url.com" "https://api.telegram.org/botYOUR\_BOT\_TOKEN/setWebhook"

    Replace `https://your-ngrok-url.com` with your actual ngrok URL and `YOUR_BOT_TOKEN` with your Telegram bot token.

## Step 6: Run the Bot

1.  Start your bot: feel free to adjust the package.json to your needs
    npm run dev
2.  Open Telegram and send a message to your bot. The bot will respond using Gemini AI.

## Step 7: Final Security Tips

- Add `.env` to `.gitignore`:

  echo ".env" >> .gitignore

- Never share your API keys publicly.

## Summary

1.  Create a Telegram bot via BotFather and get the bot token.
2.  Obtain the Gemini AI API key from Google Generative AI.
3.  Install Node.js, ngrok, and the necessary libraries.
4.  Set up the bot code with environment variables.
5.  Test your bot locally or with a public ngrok tunnel.

Now your Telegram bot is ready to h

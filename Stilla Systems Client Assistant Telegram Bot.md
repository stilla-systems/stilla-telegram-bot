# Stilla Systems Client Assistant Telegram Bot

This bot acts as a front-desk discovery assistant for Stilla Systems, qualifying inquiries and converting them into structured project leads.

## Features
- **Automated Lead Qualification**: Guides users through a structured discovery process.
- **Service Routing**: Categorizes leads into Website Development, AI Customer Support, Voice AI, Business Automation, or Consultation.
- **Lead Summary Generation**: Produces a formatted summary of the lead's information.

## Production Deployment Instructions

To keep the bot running 24/7, it is recommended to use a process manager like **PM2**.

### 1. Install PM2
```bash
sudo npm install -g pm2
```

### 2. Start the Bot
```bash
pm2 start index.js --name "stilla-bot"
```

### 3. Monitor the Bot
```bash
pm2 status
pm2 logs stilla-bot
```

## Setup Instructions

### 1. Prerequisites
- Node.js installed on your machine.
- A Telegram Bot Token (get one from [@BotFather](https://t.me/botfather)).

### 2. Installation
1. Clone or download this project.
2. Open a terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### 3. Configuration
1. Create a `.env` file in the root directory.
2. Add your Telegram Bot Token:
   ```env
   BOT_TOKEN=your_telegram_bot_token_here
   ```

### 4. Running the Bot
Start the bot with:
```bash
node index.js
```

## Conversation Flow
1. **Welcome**: Greets the user and introduces Stilla Systems.
2. **Service Identification**: Asks the user to select a service category.
3. **Discovery Questions**: Collects business name, industry, problem, goal, existing systems, timeline, budget, and contact info.
4. **Lead Structuring**: Displays a formatted summary of the lead.
5. **Closing**: Confirms receipt and offers a project estimate preview.

## Project Structure
- `index.js`: Main bot logic using the Telegraf framework.
- `package.json`: Project dependencies and metadata.
- `.env`: Configuration file for the bot token.

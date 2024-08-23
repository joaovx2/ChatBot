# Sarcastic Discord AI Bot

A Discord bot that responds to messages with sarcasm and irony using OpenAI's GPT-3.5 model.

## Features

- Responds to messages in specified channels or when mentioned
- Uses OpenAI's GPT-3.5-turbo model for generating responses
- Maintains conversation context from previous messages
- Splits long responses into multiple messages to comply with Discord's character limit

## Prerequisites

- Node.js (v12.0.0 or higher)
- Discord Bot Token
- OpenAI API Key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sarcastic-discord-ai-bot.git
   cd sarcastic-discord-ai-bot
   ```

2. Install dependencies:
   ```
   npm install discord.js dotend openai
   ```

3. Create a `.env` file in the project root and add your tokens:
   ```
   TOKEN=your_discord_bot_token
   OPENAI_KEY=your_openai_api_key
   ```

## Usage

1. Start the bot:
   ```
   node index.js
   ```

2. The bot will respond to messages in the specified channels or when mentioned.

## Configuration

- `IGNORE_PREFIX`: Messages starting with this prefix will be ignored (default: "!")
- `CHANNELS`: Array of channel IDs where the bot will respond without being mentioned

## License

[MIT License](LICENSE)

## Disclaimer

This bot is for entertainment purposes. Please use responsibly and in compliance with Discord's Terms of Service and OpenAI's use policies.

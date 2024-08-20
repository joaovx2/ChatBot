Step by Step to use the chat bot

Pre-Requisites
   Node.JS
   Initiate a NPM Project (npm init -y)
   install discord and openai dependecies (npm discord.js dotend openai)

Create a .env file with your DISCORD BOT TOKEN and OPENAI SECRET KEY TOKEN
Modify the content to your desire initial prompt.

node index.js starts the bot.

This bot will read your message, remember your previous 100 message and reply to every message you send, it will also send messages that are over the limit 2000 characters by breaking it into different messages 


require('dotenv/config');
const  { Client, Message } = require('discord.js');
const{OpenAI} = require('openai');

const client = new Client({
    intents: ['Guilds', 'GuildMembers','GuildMessages','MessageContent']
});

client.on('ready', ()=>{
    console.log('Bot is online')
});

const IGNORE_PREFIX = "!";
const CHANNELS = ['1275197950296854612'];
const openai = new OpenAI({
    apiKey : process.env.OPENAI_KEY
})



client.on('messageCreate', async (message) => {
    try {
        if (message.author.bot) return;
        if (message.content.startsWith(IGNORE_PREFIX)) return;
        if (!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id)) return;
        
        let conversation = [];
             conversation.push({
             role: 'system',
             content : 'Responda somente com sarcasmo e ironia como se eu fosse burro.',
        });

        let prevMessages  = await message.channel.messages.fetch({limit:100});
        prevMessages.reverse();

        prevMessages.forEach((msg) => {
            if (msg.author.bot && msg.author.id !== client.user.id) return;
            if (msg.content.startsWith(IGNORE_PREFIX)) return;

            const username =  msg.author.username.replace(/\s+/g, '_').replace(/[^\w\s]/gi, '');

            if (msg.author.id === client.user.id) {
                conversation.push({
                    role:'assistant',
                    name:username,
                    content: msg.content,
                });

                return;
            
            } 
            conversation.push({
                role: 'user',
                name : username,
                content : msg.content,
            })
        
        })
        
        console.log('Sending request to OpenAI API...');
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: conversation,
        });
        console.log('Received response from OpenAI API:', response);

        if (!response || !response.choices || response.choices.length === 0) {
            throw new Error('Invalid or empty response from OpenAI API');
        }

        const responseMessage = response.choices[0].message.content;
        const maxcharlimit = 2000;
        for (let i = 0; i < responseMessage.length; i += maxcharlimit) {
            const chunk = responseMessage.substring(i, i + maxcharlimit);
            await message.reply(chunk);
        }
    } catch (error) {
        console.error('Error in messageCreate event:', error);
        console.error('Error stack:', error.stack);
        await message.reply('Sorry, there was an error responding to your message.');
    }
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

client.on('error', (error) => {
    console.error('Discord client error:', error);
});

client.login(process.env.TOKEN);

require('dotenv').config()
const prefix = process.env.PREFIX;
const request = require('request');
const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => 
{
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => 
{
    if (!msg.content.startsWith(prefix) || msg.author.bot) 
		return;
	const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    if (msg.author.bot) 
		return;
    if (msg.content === `${prefix}invite`) 
    {
	    msg.reply('https://discordapp.com/oauth2/authorize?client_id=697579011005481021&scope=bot&permissions=387072');
	}
		
    if (msg.content === `${prefix}ping`) 
    {
	    msg.reply('Pong!');
	}
    
	if (msg.content === `${prefix}rule`) 
	{
        msg.reply('rules are not yet implemented, check out https://5thsrd.org/ for rules in the meantime');
    }

    if (msg.content.startsWith(`${prefix}spell`)) 
	{
        request(`http://www.dnd5eapi.co/api/spells/${args}`, {json: true}, (err, res, body) => 
		{
			if (err) 
			{
                return console.log(err);
            } 
			else if (command === 'spell')
			{
                msg.channel.send(`Name: ${body.name}`);
            	msg.channel.send(`${body.desc}`);
            	msg.channel.send(`At Higher Levels: ${body.higher_level}`)
			}	
		});
    }
	if (msg.content.startsWith(`${prefix}class`)) 
	{
    	request(`http://www.dnd5eapi.co/api/classes/${args}`, {json: true}, (err, res, body) => 
		{
        	if (err) 
			{
            	return console.log(err);
            } 
			else if (command === 'class')
			{
             	msg.channel.send(`Name: ${body.name}`);
                msg.channel.send(`Hit Dice:${body.hit_die}`);
                msg.channel.send(`Proficiency Options: ${body.proficiency_choices}`);
                msg.channel.send(`Starting Equipment: ${body.starting_equipment}`);
                msg.channel.send(`Proficiencies: ${body.proficiencies}`);
                msg.channel.send(`Subclasses: ${body.subclasses}`);
			}

        });
	}
});

client.login();
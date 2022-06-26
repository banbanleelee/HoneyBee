require('dotenv').config();
const axios = require('axios');
const Discord = require("discord.js")
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, generateDependencyReport } = require('@discordjs/voice');

//api doc https://discord.com/developers/docs/topics/gateway
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILD_MESSAGE_TYPING"] });

client.login(process.env.TOKEN)


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async msg => {
  switch (msg.content.substring(0,2)) {
    case "hi":
      msg.reply("Hello World!");
      break;
    case "pp":
      msg.channel.send("Here's your music!🐝"); //Replies to user command
      const music = await getMusic(msg.content.substring(2)); //fetches an URL from YTB API
      const audio = ytdl(music, {
        filter: 'audioonly',
        quality: 'lowestaudio'});
      const player = createAudioPlayer();
      const resource = createAudioResource(audio);
      const connection = joinVoiceChannel({
        channelId: msg.member.voice.channel.id,
        guildId: msg.guild.id,
        adapterCreator: msg.guild.voiceAdapterCreator
    });
    try{
      connection.subscribe(player);
      player.play(resource);
      msg.channel.send(music); //send the music URL
    } catch (error) {
      connection.destroy();
      throw error;
    }
      break;
    case "??":
      msg.channel.send("wait, I am still developing a help doc lol");
      break;
    // default:
    //   msg.channel.send("oops, invalid command! type ?? for help!");
  }
})

//functions need to have separate files
async function getMusic(keyword){
  let query="";
    query+="https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=";
    query+=encodeURI(keyword);
    query+="&key=";
    query+=process.env.MUSIC_KEY;

  // console.log("query", query);

  const res = await axios.get(query);

  console.log(res.data.items[0]);
  return `https://www.youtube.com/watch?v=${res.data.items[0].id.videoId}`;
}

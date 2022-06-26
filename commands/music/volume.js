const maxVol = client.config.options.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['v','音量'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`🐝 I'm not playing any song ${message.author}...`);

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send(`🐝 The current volume is ${queue.volume} \n*To change the volume enter a valid number between **1** and **${maxVol}**.*`);

        if (queue.volume === vol) return message.channel.send(`🐝 You didn't change the volume, maybe enter another number... ${message.author}`);

        if (vol < 0 || vol > maxVol) return message.channel.send(`🐝 It was not a valid number \nPlease enter between **1** and **${maxVol}**... ${message.author}`);

        const success = queue.setVolume(vol);

        return message.channel.send(success ? `🐝 The current volume is **${vol}**/**${maxVol}**%` : `🐝 Something went wrong... try again? ${message.author}`);
    },
};
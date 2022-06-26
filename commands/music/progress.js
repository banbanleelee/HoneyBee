module.exports = {
    name: 'progress',
    aliases: ['pg','歌曲进度'],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`🐝 I'm not playing any song ${message.author}...`);

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send(`🐝 Live stream is on, to infinity and beyond!`);

        message.channel.send(`${progress} (**${timestamp.progress}**%)`);
    },
};
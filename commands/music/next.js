module.exports = {
    name: 'next',
    aliases: ['n','下一首'],
    utilisation: '{prefix}next',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`🐝 I'm not playing any song ${message.author}...`);

        const success = queue.skip();

        return message.channel.send(success ? `🐝 I just skipped ${queue.current.title}` : `🐝 Something went wrong ${message.author}... try again?`);
    },
};
module.exports = {
    name: 'pause',
    aliases: ['ps','暂停'],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`🐝 I'm not playing any song ${message.author}...`);

        const success = queue.setPaused(true);

        return message.channel.send(success ? `🐝 ${queue.current.title} paused ` : `🐝 Something went wrong ${message.author}... try again?`);
    },
};
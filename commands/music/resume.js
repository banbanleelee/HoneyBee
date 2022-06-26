module.exports = {
    name: 'resume',
    aliases: ['rs','继续'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`🐝 I'm not playing any song ${message.author}...`);

        const success = queue.setPaused(false);

        return message.channel.send(success ? `🐝 ${queue.current.title} resumed ` : `🐝 Something went wrong ${message.author}... try again?`);
    },
};
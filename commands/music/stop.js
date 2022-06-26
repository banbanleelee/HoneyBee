module.exports = {
    name: 'stop',
    aliases: ['st','停止'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`🐝 I'm not playing any song ${message.author}...`);

        queue.destroy();

        message.channel.send(`🐝 I will be quietly missing you then...`);
    },
};
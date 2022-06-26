const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loopqueue',
    aliases: ['lq','列表循环'],
    utilisation: '{prefix}loopqueue',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`🐝 I'm not playing any song... ${message.author}`);

        // if (queue.repeatMode === 1) return message.channel.send(`🐝 You need to turn off the current track-looping first (Enter ~lt)... try again? ${message.author}`);

        const success = queue.setRepeatMode(queue.repeatMode === 0 || queue.repeatMode === 1 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

        return message.channel.send(success ? `🐝 Toggle queue-looping **${queue.repeatMode === 0 ? 'OFF' : 'ON'}**` : `🐝 Something went wrong... try again? ${message.author}`);
    },
};
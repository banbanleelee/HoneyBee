const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loopqueue',
    aliases: ['lq','εθ‘¨εΎͺη―'],
    utilisation: '{prefix}loopqueue',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`π I'm not playing any song... ${message.author}`);

        // if (queue.repeatMode === 1) return message.channel.send(`π You need to turn off the current track-looping first (Enter ~lt)... try again? ${message.author}`);

        const success = queue.setRepeatMode(queue.repeatMode === 0 || queue.repeatMode === 1 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

        return message.channel.send(success ? `π Toggle queue-looping **${queue.repeatMode === 0 ? 'OFF' : 'ON'}**` : `π Something went wrong... try again? ${message.author}`);
    },
};
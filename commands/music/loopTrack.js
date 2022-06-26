const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loopsong',
    aliases: ['ls','单曲循环'],
    utilisation: '{prefix}loopsong',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`🐝 I'm not playing any song...${message.author}`);

        // if (queue.repeatMode === 2) return message.channel.send(`🐝 You need to turn off the current queue-looping first (Enter ~lq)... try again? ${message.author}`);

        const success = queue.setRepeatMode(queue.repeatMode === 0  || queue.repeatMode === 2 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

        return message.channel.send(success ? `🐝 Toggle song-looping **${queue.repeatMode === 0 ? 'OFF' : 'ON'}**` : `🐝 Something went wrong... try again? ${message.author}`);
    },
};
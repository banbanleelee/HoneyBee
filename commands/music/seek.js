const ms = require('ms');

module.exports = {
    name: 'seek',
    aliases: ['sk', 'θ°ζ΄θΏεΊ¦'],
    utilisation: '{prefix}seek [time]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`π I'm not playing any song ${message.author}...`);

        const timeToMS = ms(args.join(' '));

        if (timeToMS >= queue.current.durationMS) return message.channel.send(`π Invalid time input... try again? \n*Examples: **5s, 10s, 20 seconds, 1m**...* ${message.author}`);

        await queue.seek(timeToMS);

        message.channel.send(`π Time set on the current song **${ms(timeToMS, { long: true })}** `);
    },
};
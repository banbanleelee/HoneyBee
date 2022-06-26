module.exports = {
    name: 'clear',
    aliases: ['c','清空'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`🐝 I'm not playing any song ${message.author}...`);

        // if (!queue.tracks[0]) return message.channel.send(`🐝 No more song after this one...`);

        await queue.clear();

        message.channel.send(`🐝 I just emptied the playlist for you `);
    },
};
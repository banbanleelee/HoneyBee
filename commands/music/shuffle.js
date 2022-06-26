module.exports = {
    name: 'shuffle',
    aliases: ['sf','随机'],
    utilisation: '{prefix}shuffle',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`🐝 I'm not playing any song ${message.author}...`);

        if (!queue.tracks[0]) return message.channel.send(`🐝 This is the last song in your queue ${message.author}...`);

        await queue.shuffle();

        return message.channel.send(`🐝 I just shuffled **${queue.tracks.length}** songs in your queue`);
    },
};
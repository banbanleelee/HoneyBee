module.exports = {
    name: 'last',
    aliases: ['l','δΈδΈι¦'],
    utilisation: '{prefix}last',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`π Add a song to your queue first ${message.author}...`);

        if (!queue.previousTracks[1]) return message.channel.send(`π There was no song played before ${message.author}...`);

        await queue.back();

        message.channel.send(`π Playing the **last** song`);
    },
};
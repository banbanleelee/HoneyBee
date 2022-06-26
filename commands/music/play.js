const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p', '点歌'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`🐝 I can't find it... Maybe try again? ${message.author}`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`🐝 I can't find it... Maybe try again? ${message.author}`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send(`🐝 I can't join the voice channel ${message.author}... Maybe try again?`);
        }

        await message.channel.send(`🐝 Loading your ${res.playlist ? 'playlist' : 'track'}`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
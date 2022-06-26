const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['s','搜歌'],
    utilisation: '{prefix}search [song name]',
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

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setAuthor(`Results for ${args.join(' ')}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\n 🐝 Enter a number between **1** and **${maxTracks.length}**, or **cancel** `);

        embed.setTimestamp();
        embed.setFooter(`GGWP, ${message.author.username}!!!`, message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 30000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send(`🐝 Search cancelled `) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`🐝 Please type a number between **1** and **${maxTracks.length}**`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return message.channel.send(`🐝 I can't join the voice channel ${message.author}... try again?`);
            }

            await message.channel.send(`🐝 Loading...`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send(`🐝 Search timed out ${message.author}... try again?`);
        });
    },
};
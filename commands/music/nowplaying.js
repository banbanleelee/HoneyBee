const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np','正在播放'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`🐝 I'm not playing any song ${message.author}...`);

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        embed.setDescription(`Volume **${queue.volume}**%\nDuration **${trackDuration}**\nLooping **${methods[queue.repeatMode]==='track' ? 'ON: song' : methods[queue.repeatMode]==='queue' ? 'ON: queue' : 'OFF'}**\nRequested by ${track.requestedBy}`);

        embed.setTimestamp();
        embed.setFooter(`GGWP, ${message.author.username}!!!`, message.author.avatarURL({ dynamic: true }));

        const saveButton = new MessageButton();

        saveButton.setLabel('💛Save this song');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SECONDARY');

        const row = new MessageActionRow().addComponents(saveButton);

        message.channel.send({ embeds: [embed], components: [row] });
    },
};
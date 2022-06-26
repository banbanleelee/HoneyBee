module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
            if (!queue || !queue.playing) return int.reply({ content: `🐝 No music is playing, try the ~p command! `, ephemeral: true, components: [] });

            int.member.send(`🐝 You just saved the track ${queue.current.title} | ${queue.current.author} from the server ${int.member.guild.name} `).then(() => {
                return int.reply({ content: `🐝 This song is in your DM inbox `, ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `🐝 I couldn't dm you... try again? `, ephemeral: true, components: [] });
            });
        }
    }
};
module.exports = {
    name: 'save',
    aliases: ['sv','保存'],
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`🐝 I'm not playing any song ${message.author}...`);

        message.author.send(`🐝 You saved the track ${queue.current.title} | ${queue.current.author} from the server ${message.guild.name}`).then(() => {
            message.channel.send(`🐝 This song's title is in your DM inbox`);
        }).catch(error => {
            message.channel.send(`🐝 I couldn't dm you... try again? ${message.author}`);
        });
    },
};
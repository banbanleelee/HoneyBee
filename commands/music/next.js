module.exports = {
    name: 'next',
    aliases: ['n','δΈδΈι¦'],
    utilisation: '{prefix}next',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`π I'm not playing any song ${message.author}...`);

        const success = queue.skip();

        return message.channel.send(success ? `π I just skipped ${queue.current.title}` : `π Something went wrong ${message.author}... try again?`);
    },
};
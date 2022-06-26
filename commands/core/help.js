const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h', '?'],
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setDescription('我给你放好听的歌听 💛 所以今天一起玩游戏好不好呀\n');
        embed.addField(`🐝 Use these ${commands.size} commands 🐝`, commands.map(x => `\`${client.config.app.prefix}${x.name}${x.aliases[0] ? ` | ${x.aliases.map(y => `${client.config.app.prefix}${y}`).join(' | ')}\`` : '\`'}`).join(' \n '));
        
        embed.addField(`🐝 Use these ${commands.size} commands 🐝`, `
            ~点歌 | **~p** | **~play**
            ~搜歌 | **~s** | **~search**
            ~播放列表 | **~q** | **~queue**
            ~单曲循环 | **~ls** | **~loopsong**
            ~列表循环 | **~lq** | **~loopqueue**
            ~随机 | **~sf** | **~shuffle**
            ~正在播放 | **~np** | **~nowplaying**
            ~上一首 | **~l** | **~last**
            ~下一首 | **~n** | **~next**
            ~歌曲进度 | **~pg** | **~progress**
            ~调整进度 **~sk** | **~seek**
            ~暂停 | **~ps** | **~pause**
            ~继续 | **~rs** | **~resume**
            ~停止 | **~st** | **~stop**
            ~清空 | **~e** | **~empty**
            ~音量 | **~v** | **~volume**
            ~保存 | **~sv** | **~save**
            `);
        embed.setTimestamp();
        
        embed.setFooter(`GGWP, ${message.author.username}!!!`, message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
    },
};
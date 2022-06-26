player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.options.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send(`🐝 Playing ${track.title} in **${queue.connection.channel.name}**`);
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`🐝 Adding ${track.title}`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('🐝 Cleaning up and get going ');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('🐝 Guess I can have a rest now ');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('🐝 Queue is finished ');
});
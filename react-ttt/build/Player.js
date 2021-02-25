let ws = new WebSocket('ws://localhost:3000');
ws.onmessage = function(e){ console.log(e.data); };
ws.onopen = () => {
    // console.log("Connected.");
    // ws.send(JSON.stringify({'message': 'Welcome'}));
    ws.send('helo');
}
ws.onclose = () => {
    console.log("Disconnected.")
}
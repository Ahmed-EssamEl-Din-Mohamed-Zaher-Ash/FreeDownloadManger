let socket;

function connect() {
  socket = new WebSocket("ws://127.0.0.1:6800");
  socket.onclose = () => setTimeout(connect, 2000);
}

connect();

chrome.downloads.onCreated.addListener((item) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return;
  }
  socket.send(JSON.stringify({
    type: "capture_download",
    url: item.url,
    filename: item.filename?.split("/").pop(),
    segments: 8
  }));
});

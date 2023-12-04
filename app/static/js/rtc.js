// 创建本地 RTCPeerConnection 对象
const peerConnection = new RTCPeerConnection();

// 创建一个 RTCDataChannel 对象作为 sendChannel，用于将数据发送到远程端
const sendChannel = peerConnection.createDataChannel('sendChannel');

// 本地调用 createOffer 创建一个 offer，将创建好的 offer 设置为 localDescription。然后再将 offer 发送到远程端
peerConnection.createOffer().then(offer => {
  peerConnection.setLocalDescription(offer);
  // 将 offer 发送到远程端
});

// 当远程端收到 offer 后，创建一个远程的 RTCPeerConnection 对象，并将收到的 offer 设置为 remoteDescription
const remotePeerConnection = new RTCPeerConnection();
remotePeerConnection.setRemoteDescription(offer);

// 远程端调用 createAnswer 创建一个 answer，将创建好的 answer 设置为 remoteDescription。然后再将 answer 发送到本地端
remotePeerConnection.createAnswer().then(answer => {
  remotePeerConnection.setLocalDescription(answer);
  // 将 answer 发送到本地端
});

// 本地端收到 answer 后，将 answer 设置为 localDescription
peerConnection.setRemoteDescription(answer);

// 现在，两个端都已经建立了连接，可以通过 DataChannel API 来传输文件
sendChannel.send(file);

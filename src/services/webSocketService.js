import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (
  roomId,
  onMessageReceived,
  onTypingReceived
) => {
const socket = new SockJS(
  import.meta.env.VITE_WS_URL
);
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("WebSocket Connected");

      stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        onMessageReceived(receivedMessage);
      });

      stompClient.subscribe(`/topic/typing/${roomId}`, (message) => {
        const typingData = JSON.parse(message.body);

        if (onTypingReceived) {
          onTypingReceived(typingData);
        }
      });
    },

    onDisconnect: () => {
      console.log("WebSocket Disconnected");
    },

    onStompError: (frame) => {
      console.error("STOMP Error:", frame);
    },

    onWebSocketError: (error) => {
      console.error("WebSocket Error:", error);
    },
  });

  stompClient.activate();
};

export const sendWebSocketMessage = (
  roomId,
  content,
  username,
  email
) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/chat.send",
      body: JSON.stringify({
        roomId,
        content,
        username,
        email,
      }),
    });
  }
};

export const sendTypingEvent = (
  roomId,
  username
) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/chat.typing",
      body: JSON.stringify({
        roomId,
        username,
      }),
    });
  }
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};
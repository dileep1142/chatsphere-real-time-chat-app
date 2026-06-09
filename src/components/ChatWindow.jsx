import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";

function ChatWindow({
  selectedRoom,
  messages,
  onSendMessage,
  onTyping,
  typingUser,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUser]);

  return (
    <div className="chat-window">
      {selectedRoom ? (
        <>
          <div className="chat-header">
            <h2>#{selectedRoom.roomName}</h2>
            <p>Real-time room chat</p>
          </div>

          <div className="messages-area">
            {messages.length === 0 ? (
              <p className="empty-text">No messages yet. Start the conversation.</p>
            ) : (
              messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))
            )}

            <TypingIndicator username={typingUser} />

            <div ref={bottomRef}></div>
          </div>

          <MessageInput
            onSendMessage={onSendMessage}
            onTyping={onTyping}
            disabled={!selectedRoom}
          />
        </>
      ) : (
        <div className="chat-placeholder">
          <h2>Select a room</h2>
          <p>Choose a room from the sidebar to start chatting.</p>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
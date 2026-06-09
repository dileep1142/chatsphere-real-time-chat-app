import { useState } from "react";

function MessageInput({ onSendMessage, onTyping, disabled }) {
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);

    if (onTyping) {
      onTyping();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    onSendMessage(content);
    setContent("");
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={
          disabled ? "Select a room to start chatting" : "Type a message..."
        }
        value={content}
        onChange={handleChange}
        disabled={disabled}
      />

      <button type="submit" disabled={disabled}>
        Send
      </button>
    </form>
  );
}

export default MessageInput;
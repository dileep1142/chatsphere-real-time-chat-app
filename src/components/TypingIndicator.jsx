function TypingIndicator({ username }) {
  if (!username) return null;

  return (
    <div className="typing-indicator">
      <span>{username} is typing</span>
      <div className="typing-dots">
        <b></b>
        <b></b>
        <b></b>
      </div>
    </div>
  );
}

export default TypingIndicator;
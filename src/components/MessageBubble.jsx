import { useAuth } from "../context/AuthContext";

function MessageBubble({ message }) {
  const { user } = useAuth();

  const isOwnMessage =
    message.senderEmail === user?.email ||
    message.senderUsername === user?.username;

  const formattedTime = message.sentAt
    ? new Date(message.sentAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className={
        isOwnMessage
          ? "message-row own"
          : "message-row"
      }
    >
      <div
        className={
          isOwnMessage
            ? "message-bubble own"
            : "message-bubble"
        }
      >
        {!isOwnMessage && (
          <div className="message-user">
            <div className="message-avatar">
              {message.senderUsername
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

            <strong>
              {message.senderUsername}
            </strong>
          </div>
        )}

        <p>{message.content}</p>

        <span className="message-time">
          {formattedTime}
        </span>
      </div>
    </div>
  );
}

export default MessageBubble;
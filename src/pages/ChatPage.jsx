import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RoomList from "../components/RoomList";
import ChatWindow from "../components/ChatWindow";
import CreateRoomModal from "../components/CreateRoomModal";
import { useAuth } from "../context/AuthContext";
import { getRooms, createRoom } from "../services/roomService";
import { getMessagesByRoom } from "../services/messageService";
import {
  connectWebSocket,
  sendWebSocketMessage,
  sendTypingEvent,
  disconnectWebSocket,
} from "../services/webSocketService";
import "../App.css";

function ChatPage() {
  const { user } = useAuth();

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    loadRooms();

    return () => {
      disconnectWebSocket();
    };
  }, []);

  const loadRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);

      if (data.length > 0) {
        setSelectedRoom(data[0]);
        loadMessages(data[0].id);
        connectToRoom(data[0].id);
      }
    } catch (error) {
      console.log("ROOM LOAD ERROR:", error);
    }
  };

  const loadMessages = async (roomId) => {
    try {
      const data = await getMessagesByRoom(roomId);
      setMessages(data);
    } catch (error) {
      console.log("MESSAGE LOAD ERROR:", error);
    }
  };

  const connectToRoom = (roomId) => {
    disconnectWebSocket();

    connectWebSocket(
      roomId,
      (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
        setTypingUser("");
      },
      (typingData) => {
        if (
          typingData?.username &&
          typingData.username !== user?.username
        ) {
          setTypingUser(typingData.username);

          setTimeout(() => {
            setTypingUser("");
          }, 1500);
        }
      }
    );
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setTypingUser("");
    loadMessages(room.id);
    connectToRoom(room.id);
  };

  const handleCreateRoom = async (roomName) => {
    try {
      const room = await createRoom(roomName);

      setRooms((prev) => [...prev, room]);
      setSelectedRoom(room);
      setMessages([]);
      setTypingUser("");
      connectToRoom(room.id);
      setShowCreateModal(false);

      return room;
    } catch (error) {
      console.log("CREATE ROOM ERROR:", error);
      throw error;
    }
  };

  const handleSendMessage = (content) => {
    if (!selectedRoom || !user) return;
      sendWebSocketMessage(
  selectedRoom.id,
  content,
  user.username,
  user.email
);
  };
    
  const handleTyping = () => {
    if (!selectedRoom || !user?.username) return;

    sendTypingEvent(
      selectedRoom.id,
      user.username
    );
  };

  return (
    <div className="chat-page">
      <Navbar />

      <div className="chat-layout">
        <RoomList
          rooms={rooms}
          selectedRoom={selectedRoom}
          onSelectRoom={handleSelectRoom}
          onOpenCreateModal={() => setShowCreateModal(true)}
        />

        <ChatWindow
          selectedRoom={selectedRoom}
          messages={messages}
          onSendMessage={handleSendMessage}
          onTyping={handleTyping}
          typingUser={typingUser}
        />
      </div>

      {showCreateModal && (
        <CreateRoomModal
          onClose={() => setShowCreateModal(false)}
          onCreateRoom={handleCreateRoom}
        />
      )}
    </div>
  );
}

export default ChatPage;
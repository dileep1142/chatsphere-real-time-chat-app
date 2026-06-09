import { useState } from "react";

function CreateRoomModal({ onClose, onCreateRoom }) {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!roomName.trim()) {
      setError("Room name is required");
      return;
    }

    try {
      await onCreateRoom(roomName.trim());
      setRoomName("");
      onClose();
    } catch {
      setError("Room already exists or failed to create");
    }
  };

  return (
    <div className="modal-overlay">
      <form className="modal-card" onSubmit={handleSubmit}>
        <h2>Create New Room</h2>

        {error && <div className="error">{error}</div>}

        <input
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          autoFocus
        />

        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreateRoomModal;
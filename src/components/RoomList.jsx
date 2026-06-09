import { useState } from "react";

function RoomList({
  rooms,
  selectedRoom,
  onSelectRoom,
  onOpenCreateModal,
}) {
  const [search, setSearch] = useState("");

  const filteredRooms = rooms.filter((room) =>
    room.roomName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="room-list">
      <div className="room-header">
        <h3>Rooms</h3>

        <button
          className="add-room-btn"
          onClick={onOpenCreateModal}
        >
          +
        </button>
      </div>

      <input
        className="room-search"
        type="text"
        placeholder="Search rooms..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredRooms.length === 0 ? (
        <p className="empty-text">
          No rooms found
        </p>
      ) : (
        filteredRooms.map((room) => (
          <button
            key={room.id}
            className={
              selectedRoom?.id === room.id
                ? "room-item active"
                : "room-item"
            }
            onClick={() => onSelectRoom(room)}
          >
            #{room.roomName}
          </button>
        ))
      )}
    </div>
  );
}

export default RoomList;
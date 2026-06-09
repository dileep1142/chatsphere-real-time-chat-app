import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const firstLetter = user?.username?.charAt(0)?.toUpperCase();

  return (
    <div className="navbar">
      <h2>💬 ChatSphere</h2>

      <div className="navbar-user">
        <div className="avatar">
          {firstLetter}
        </div>

        <div className="user-info">
          <span>{user?.username}</span>
          <small className="online-status">
            ● Online
          </small>
        </div>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
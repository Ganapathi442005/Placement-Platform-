import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout: authLogout } = useContext(AuthContext);

  const handleLogout = () => {
    authLogout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 fixed-top">
      <Link className="navbar-brand" to="/">
        <strong>Placement Platform</strong>
      </Link>

      <div className="ms-auto text-light">
        {!user ? (
          <>
            <Link className="btn btn-outline-light me-2" to="/signup">
              Sign Up
            </Link>
            <Link className="btn btn-light" to="/login">
              Login
            </Link>
          </>
        ) : (
          <div className="d-flex align-items-center gap-3">
            <span className="text-light">{user.username}</span>
            {user.role === "admin" && (
              <Link className="btn btn-info btn-sm" to="/admin">
                Admin Dashboard
              </Link>
            )}
            <Link className="btn btn-secondary btn-sm" to="/test">
              Assessments
            </Link>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
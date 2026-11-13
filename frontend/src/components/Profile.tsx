import "./Sidebar.css";
import Avatar from "./Avatar";
import { useAuth } from "../context/UserContext";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="profile">
      <div className="left">
        <Avatar />
        <div className="username">{user?.username}</div>
      </div>
      <div className="right">
        <p>+</p>
      </div>
    </div>
  );
};

export default Profile;

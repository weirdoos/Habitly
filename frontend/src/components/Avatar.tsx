import { useAuth } from "../context/UserContext";
import "./Sidebar.css";

const Avatar = () => {
  const { user } = useAuth();
  return <div className="avatar">{user?.username[0]}</div>;
};

export default Avatar;

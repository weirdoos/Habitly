import "./Sidebar.css";
import Avatar from "./Avatar";

const Profile = () => {
  return (
    <div className="profile">
      <div className="left">
        <Avatar />
        <div className="username">cscscs</div>
      </div>
      <div className="right">
        <p>+</p>
      </div>
    </div>
  );
};

export default Profile;

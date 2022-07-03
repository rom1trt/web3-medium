import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import HomeIcon from "@mui/icons-material/Home";
import BookmarksIcon from "@mui/icons-material/Book";
import Logout from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";
import logo from "../images/m.png";

const Sidebar = () => {
  const { logout } = useMoralis();

  const logOut = async () => {
    await logout();
  };

  return (
    <>
      <div className="siderContent">
      <Link to="/">
        <img className="logo" src={logo}></img>
      </Link>
        <div className="menu">
          <Link to="/" className="link">
            <div className= "tooltip fade" data-title="Home">
            <HomeIcon />
            </div>
          </Link>
          <Link to="/myBlogs" className="link">
            <div className="tooltip fade" data-title="Stories">
              <BookmarksIcon />
            </div>
          </Link>
          <Link to="/newStory" className="link">
            <div className="tooltip fade" data-title="Write">
              <RateReviewIcon />
            </div>
          </Link>
        </div>
        <Link to="/" className="link" onClick={logout}>
        <div className="tooltip fade" data-title="Quit">
          <Logout />
        </div>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;

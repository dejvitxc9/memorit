import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import "./NavBar.scss";

const NavBar = () => {
  const setLevel = useStore((store) => store.setLevel);
  const navigate = useNavigate();

  return (
    <div className="nabar">
      <Link className="navbar-item" to={"/"}>
        <p>Game</p>
      </Link>

      <Link className="navbar-item" to={"/stats"}>
        <p>Stats</p>
      </Link>

      <select
        className="navbar-item level-selector"
        onChange={(e) => {
          setLevel(parseInt(e.target.value));
          navigate("/");
        }}
      >
        <option className="level-option" value={3}>
          Level 1
        </option>
        <option className="level-option" value={6}>
          Level 2
        </option>
        <option className="level-option" value={9}>
          Level 3
        </option>
        <option className="level-option" value={12}>
          Level 4
        </option>
        <option className="level-option" value={15}>
          Level 5
        </option>
      </select>
    </div>
  );
};
export default NavBar;

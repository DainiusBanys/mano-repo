import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/articles">Articles</NavLink>
      <NavLink to="/categories">Categories</NavLink>
    </div>
  );
}

export default Header;

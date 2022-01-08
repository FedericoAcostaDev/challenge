import React from "react";
import { Nav, NavLink } from "./Navbar";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>Home</h1>
        </NavLink>
        <NavLink to="/about" activeStyle>
          About
        </NavLink>
      </Nav>
    </>
  );
};

export default Navbar;

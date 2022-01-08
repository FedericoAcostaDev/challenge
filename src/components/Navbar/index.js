import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./Navbar";
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img src="" alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;

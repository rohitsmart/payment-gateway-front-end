import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

function Header() {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Payment Gateway</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#payment-form">Pay Now</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default Header;

import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="blue" dark expand="md">
        <NavbarBrand
          href="/"
          style={{ fontWeight: "bold" }}
          style={{ fontSize: "30px" }}
        >
          Blue Film
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="mr-5" style={{ fontSize: "20px" }}>
              <Link to={"/manageadmin"}>Admin</Link>
            </NavItem>
            {props.namauser === "" ? (
              <NavItem style={{ fontSize: "20px" }}>
                <Link to={"/login"}>Login</Link>
              </NavItem>
            ) : null}
            {props.namauser === "" ? null : (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {props.namauser}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
const MapstateToprops = state => {
  return {
    namauser: state.Auth.username
  };
};
export default connect(MapstateToprops)(Header);

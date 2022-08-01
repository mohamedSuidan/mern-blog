// <NavLinke to='/' />Home</NavLink>
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
function Navbars() {
  let sginout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          Blog
        </Link>
        <Navbar.Toggle aria-controls="basic-nav-bar"></Navbar.Toggle>
        <Navbar.Collapse id="basic-nav-bar">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/">
              Posts
            </Link>
            <Link className="nav-link" to="/add-post">
              Add Post
            </Link>
          </Nav>
          <Nav className="ms-auto">
            {!localStorage.getItem("token") ? (
              <Link className="nav-link" to="/sgin-in">
                Sgin In
              </Link>
            ) : (
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {JSON.parse(localStorage.getItem("token")).name
                    ? JSON.parse(localStorage.getItem("token")).name
                    : ""}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Link
                    data-rr-ui-dropdown-item
                    className="dropdown-item"
                    role="button"
                    tabIndex="0"
                    to={`/acount/${
                      JSON.parse(localStorage.getItem("token")).id
                    }`}
                  >
                    My Acount
                  </Link>
                  <Link
                    data-rr-ui-dropdown-item
                    className="dropdown-item"
                    role="button"
                    tabIndex="0"
                    to={`/user-post`}
                  >
                    My Postest
                  </Link>
                  <Dropdown.Item href="#" onClick={sginout}>
                    Sgin Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {!localStorage.getItem("token") ? (
              <Link className="nav-link" to="/sgin-up">
                Sgin Up
              </Link>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;

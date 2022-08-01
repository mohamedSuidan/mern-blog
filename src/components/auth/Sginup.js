import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
function Sginup() {
  let styleObj = {
    backgroundColor: "#e9ecef",
    padding: "12px",
    borderToprightRadius: "5px",
    borderBottomRightRadius: "5px",
    cursor: "pointer",
  };
  let [typeFirstInput, setFirstInp] = useState("password");
  let [typeSecondInput, setSecondInp] = useState("password");
  let [name, setName] = useState("");
  let [emai, setEmai] = useState("");
  let [password, setPassword] = useState("");
  let [password2, setPassword2] = useState("");
  let [err, setErr] = useState("");
  let navigate = useNavigate();

  let showPass1 = () => {
    if (typeFirstInput === "password") {
      setFirstInp("text");
    } else {
      setFirstInp("password");
    }
  };
  let showPass2 = () => {
    if (typeSecondInput === "password") {
      setSecondInp("text");
    } else {
      setSecondInp("password");
    }
  };
  let sginup = async (e) => {
    e.preventDefault();
    // console.log(`${name} ${emai} ${password} ${password2}`);
    if (name === "") {
      setErr("Please Write Your name");
    } else if (emai === "") {
      setErr("Please Write Your Email");
    } else if (password.length <= 6) {
      setErr("You must Write Password Has 6 litters or more");
    } else if (password !== password2) {
      setErr("Password not equal another password");
    } else {
      try {
        await axios.post(
          "http://localhost:4000/sgin-up",
          {
            name: name,
            email: emai,
            password: password,
          },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        return navigate("/sgin-in");
      } catch (error) {
        console.log(error);
      }
      setErr("");
    }
  };
  return (
    <Form className="container" method="POST">
      <h1 className="mb-4 mt-4 text-center">Sgin Up</h1>
      {err !== "" ? <Alert variant="danger">{err}</Alert> : ""}
      <Form.Group className="mb-3">
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email Adress</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email Adress"
          onChange={(e) => setEmai(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Add Password</Form.Label>
        <div className="input-group">
          <Form.Control
            type={typeFirstInput}
            placeholder="Add Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon icon={faEye} style={styleObj} onClick={showPass1} />
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Retry Password</Form.Label>
        <div className="input-group">
          <Form.Control
            type={typeSecondInput}
            placeholder="Retry Password"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <FontAwesomeIcon icon={faEye} style={styleObj} onClick={showPass2} />
        </div>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={sginup}>
        sgin up
      </Button>
    </Form>
  );
}

export default Sginup;

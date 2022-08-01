import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

function Sginin() {
  let [emai, setEmai] = useState("");
  let [password, setPassword] = useState("");
  let [typeFirstInput, setFirstInp] = useState("password");
  let [err, setErr] = useState("");
  // let [token, useToken] = useState("");
  let navigate = useNavigate();

  let styleObj = {
    backgroundColor: "#e9ecef",
    padding: "12px",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
    cursor: "pointer",
  };
  let showPass1 = () => {
    if (typeFirstInput === "password") {
      setFirstInp("text");
    } else {
      setFirstInp("password");
    }
  };
  let sginin = async (e) => {
    e.preventDefault();
    if (emai === "") {
      setErr("Please Write Your Email");
    } else if (password.length <= 6) {
      setErr("You must Write Password Has 6 litters or more");
    } else {
      try {
        let token = await axios.post(
          "http://localhost:4000/sgin-in",
          {
            email: emai,
            password: password,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        localStorage.setItem("token", JSON.stringify(token.data));
        // console.log(localStorage);
        window.location.reload();
        return navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Form className="container" method="POST">
      <h1 className="mb-4 mt-4 text-center">Sgin Up</h1>
      {err !== "" ? <Alert variant="danger">{err}</Alert> : ""}

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
      <Button variant="primary" type="submit" onClick={sginin}>
        sgin in
      </Button>
    </Form>
  );
}

export default Sginin;

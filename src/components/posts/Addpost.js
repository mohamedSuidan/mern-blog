import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import axios from "axios";
function Addpost() {
  let [topic, setTopic] = useState("");
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");
  let [img, setImg] = useState("");
  let [err, setErr] = useState("");
  let addPost = async () => {
    if (topic === "") {
      setErr("Make Topic");
    } else if (title === "") {
      setErr("Make title");
    } else if (text.length < 20) {
      setErr("You Should Write 20 letter or more");
    } else if (!img) {
      setErr("Add Img");
    } else {
      let formData = new FormData();
      formData.append("topic", topic);
      formData.append("title", title);
      formData.append("paragraph", text);
      formData.append("user_id", JSON.parse(localStorage.getItem("token")).id);
      formData.append("img", img);
      try {
        await axios.post("http://localhost:4000/post/add-post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        });
        console.log("good");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Form>
      <Container>
        <h1 className="text-center mt-5 mb-3">Add Post</h1>
        {err === "" ? "" : <Alert variant="danger">{err}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Add Topic</Form.Label>
          <Form.Control
            type="text"
            placeholder="Topic"
            onChange={(e) => setTopic(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Add Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Add Paragraph</Form.Label>
          <textarea
            className="form-control"
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Add Image</Form.Label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" onClick={addPost}>
          Add Post
        </Button>
      </Container>
    </Form>
  );
}

export default Addpost;

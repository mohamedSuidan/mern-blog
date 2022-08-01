import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
function Post() {
  let { id } = useParams();
  let [post, setPost] = useState();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  if (!localStorage.getItem("user_num")) {
    localStorage.setItem("user_num", Math.ceil(Math.random() * 1000000000000));
  }
  useEffect(() => {
    axios
      .get(`http://localhost:4000/post/${id}`, {
        params: {
          user_id: JSON.parse(localStorage.getItem("token"))
            ? JSON.parse(localStorage.getItem("token")).id
            : localStorage.getItem("user_num"),
        },
      })
      .then((res) => {
        return res;
      })
      .then((data) => {
        setPost(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="blog-detals">
      <Container>
        {post === undefined ? (
          ""
        ) : (
          <div className="post">
            <p className="date">
              {`${new Date(post.post.timestamp).getFullYear()} 
            / ${months[new Date(post.post.timestamp).getMonth()]} 
            / ${days[new Date(post.post.timestamp).getDay()]}`}{" "}
              - {post.post.topic}
            </p>
            <h1>{post.post.title} ?</h1>
            <div className="img">
              <img src={post.post.img} alt={post.post.title} />
            </div>
            <p>{post.post.paragraph}</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Post;

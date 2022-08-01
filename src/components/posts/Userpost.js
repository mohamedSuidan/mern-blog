import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
function Userpost() {
  let [post, setPost] = useState([]);
  let [seen, setSeen] = useState([]);
  let arr = [];
  let ano = [];
  // let { userId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/user-post`, {
        params: {
          id: JSON.parse(localStorage.getItem("token")).id,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setPost(data.post);
        setSeen(data.seen);
      })
      .catch((err) => console.log(err));
  }, []);
  seen.forEach((ele) => {
    // console.log(ele.length);
    if (ele.length != 0) {
      arr.push(...ele);
    } else {
      ano.push(ele);
    }
  });
  let all = arr.concat(ano);
  // console.log(ano);
  // console.log(!arr ? arr[0].name : "");
  return (
    <Container>
      {post.length == 0 ? (
        <Alert variant="danger" className="mt-5">
          Not Found Any Posts
        </Alert>
      ) : (
        <Row>
          {post.map((ele) => {
            return (
              <Col key={ele._id} xs={12} md={6} lg={4}>
                <div className="post">
                  <img src={ele.img} alt={ele.topic} />
                  <h3>{ele.topic}</h3>
                  <Link to={`/post/${ele._id}`}>
                    <h2>{ele.title}</h2>
                  </Link>
                  <p className="paragraph">{ele.paragraph.slice(0, 150)} ...</p>
                  <hr />
                  <Row className="made">
                    <Col lg={12}>
                      <p className="vs">Viwers</p>
                      <div>
                        {!all
                          ? ""
                          : all.map((user, i) => {
                              return (
                                <p className="views" key={i}>
                                  {user.name ? user.name : "anonomus"}
                                </p>
                              );
                            })}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}

export default Userpost;

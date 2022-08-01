import axios from "axios";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Home() {
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    let getPosts = async () => {
      try {
        let data = await axios.get("http://localhost:4000/post");
        setPosts(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);
  // console.log(posts);
  return (
    <div>
      {posts.post == undefined ? (
        "loding"
      ) : (
        <Container>
          <Row>
            {posts.post.map((ele) => {
              // return posts.user.map((users) => {
              // if (String(users._id) === ele.user_id) {
              return (
                <Col key={ele._id} xs={12} md={6} lg={4}>
                  <div className="post">
                    <img src={ele.img} alt={ele.topic} />
                    <h3>{ele.topic}</h3>
                    <Link to={`/post/${ele._id}`}>
                      <h2>{ele.title}</h2>
                    </Link>
                    <p className="paragraph">
                      {ele.paragraph.slice(0, 150)} ...
                    </p>
                    <hr />
                    <Row className="made">
                      <Col lg={6}>
                        <div>
                          <p className="added">
                            <FontAwesomeIcon icon={faUser} />
                            Added By:
                            {posts.user.map((users, i) => {
                              if (users === ele.user_id) {
                                {
                                  return (
                                    <Link key={i} to={`/acount/${users}`}>
                                      {posts.user_name[i].split(" ")[0]}
                                    </Link>
                                  );
                                }
                              }
                            })}
                          </p>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div>
                          <p className="views">
                            <FontAwesomeIcon icon={faEye} />: {ele.views.length}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              );
              // }
              // });
            })}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Home;

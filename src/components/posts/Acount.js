import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
function Acount() {
  let { id } = useParams();
  let [user, setUser] = useState();
  let [follow, setFollow] = useState(0);
  let found = false;
  // console.log(found);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/acount/${id}`)
      .then((res) => {
        return res;
      })
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => console.log(err));
  }, [id, follow]);
  //   console.log(user);

  let toggle = async (e) => {
    follow == 0 ? setFollow(1) : setFollow(0);
    // console.log(e.target.textContent);
    if (e.target.textContent == "follow") {
      e.target.textContent = "unfollow";
      e.target.className = "unfollow";
      // console.log(user.data.name);

      try {
        await axios.post(
          "http://localhost:4000/follow",
          {
            ownerId: id,
            added_id: JSON.parse(localStorage.getItem("token")).id,
            name_id: JSON.parse(localStorage.getItem("token")).name,
            ownerName: user.data.name,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token")
                ? JSON.parse(localStorage.getItem("token")).token
                : "",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      e.target.textContent = "follow";
      e.target.className = "follow";

      try {
        await axios.post(
          "http://localhost:4000/unfollow",
          {
            ownerId: id,
            added_id: JSON.parse(localStorage.getItem("token")).id,
            name_id: JSON.parse(localStorage.getItem("token")).name,
            ownerName: user.data.name,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token")
                ? JSON.parse(localStorage.getItem("token")).token
                : "",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    console.log(follow);
  };
  return (
    <div>
      <Container>
        <Row className="profile">
          {console.log("good")}
          <Col lg={4} className="img">
            <img
              src="http://localhost:4000/img/avatar.png"
              className="avatar"
            />
          </Col>
          <Col lg={4}>
            <h2>{user ? user.data.name : ""}</h2>
            <p>
              <span>{user ? user.post.length : ""}</span> Postes
            </p>
            <p>
              <span>{user ? user.data.flowewrs.length : ""}</span> Followers
            </p>
            <p>
              <span>{user ? user.data.folowing.length : ""}</span> Follow
            </p>
          </Col>
          {id == JSON.parse(localStorage.getItem("token")).id ? (
            ""
          ) : (
            <Col lg={4}>
              {user && user.data.flowewrs.length == 0
                ? ""
                : user
                ? user.data.flowewrs.map((ele, i) => {
                    if (
                      ele.user_id ==
                      JSON.parse(localStorage.getItem("token")).id
                    ) {
                      found = true;
                      return (
                        <button key={i} onClick={toggle} className="unfollow">
                          unfollow
                        </button>
                      );
                    }
                  })
                : "bad"}
              {!found ? (
                <button onClick={toggle} className="follow">
                  follow
                </button>
              ) : (
                ""
              )}
            </Col>
          )}
        </Row>
        <Row>
          {!user || user.post.length == 0 ? (
            <Alert variant="danger">Not Found Post</Alert>
          ) : (
            user.post.map((ele) => {
              return (
                <Col lg={4} key={ele._id}>
                  <div className="acount-post">
                    <img src={ele.img} />
                    <div className="see-more">
                      <Link to={`/post/${ele._id}`}>See Post</Link>
                    </div>
                  </div>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Acount;

// user.data.flowewrs.map((ele) => {
//   if (
//     ele.user_id == JSON.parse(localStorage.getItem("token")).id
//   ) {
//    return <button className="unfollow">unfollow</button>;
//   } else {
//    return <button className="follow">Follow</button>;
//   }
// })

{
  /* <button key={i} onClick={toggle} className="follow">follow</button> */
}

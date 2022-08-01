import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sginup from "./components/auth/Sginup";
import Sginin from "./components/auth/Sginin";
import GurdRoute from "./components/auth/GurdRoute";
import Navbars from "./components/layout/Navbar";
import Addpost from "./components/posts/Addpost";
import GurdAll from "./components/gurd/GurdAll";
import Home from "./components/posts/Home";
import Post from "./components/posts/Post";
import Userpost from "./components/posts/Userpost";
import Acount from "./components/posts/Acount";
function App() {
  return (
    <div className="app">
      <Router>
        <Navbars />
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route element={<GurdRoute />}>
            <Route path="/sgin-up" element={<Sginup />} />
            <Route path="/sgin-in" element={<Sginin />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/acount/:id" element={<Acount />} />
          <Route element={<GurdAll />}>
            <Route path="/user-post" element={<Userpost />} />
            <Route path="/add-post" element={<Addpost />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

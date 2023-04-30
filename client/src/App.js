import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Pages/Home";
import Group from "./components/Pages/Group";
import SharedWithMe from "./components/Pages/SharedWithMe";
import SnackBar from "./components/common/SnackBar";
import "./App.css";

function App() {
  const user = useSelector((state) => state.userAuth.authData);
  const [isloading, setIsloading] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                user={user}
                isloading={isloading}
                setIsloading={setIsloading}
              />
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/shared-with-me"
            element={<SharedWithMe user={user} />}
          />
          <Route
            path="/groups"
            element={
              <Group
                user={user}
                isloading={isloading}
                setIsloading={setIsloading}
              />
            }
          >
            <Route
              exact
              path=":id"
              element={<div style={{ margin: "100px" }}>Hello</div>}
            />
          </Route>
        </Routes>
        <SnackBar />
      </BrowserRouter>
    </>
  );
}

export default App;

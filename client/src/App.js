import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Pages/Home";
import Group from "./components/Pages/Group";
import SharedWithMe from "./components/Pages/SharedWithMe";
import SnackBar from "./components/common/SnackBar";
import "./App.css";
import GroupDetail from "./components/Pages/GroupDetail";

function App() {
  const [isloading, setIsloading] = useState(true);
  // const [loacation,setLocation]=useState(null);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home isloading={isloading} setIsloading={setIsloading} />}
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/shared-with-me" element={<SharedWithMe />} />
          <Route
            path="/groups"
            element={
              <Group isloading={isloading} setIsloading={setIsloading} />
            }
          />
          <Route exact path="/groups/:id" element={<GroupDetail />} />
        </Routes>
        <SnackBar />
      </BrowserRouter>
    </>
  );
}

export default App;

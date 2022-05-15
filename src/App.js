
import React from 'react';
import {
  BrowserRouter, Routes,
  Route
} from "react-router-dom";
import Landing from "./landing/pages/Landing.jsx"
import Billboards from "./billboards/Pages/Billboards.jsx"
import Request from "./users/Pages/Request.jsx"
import { UserContextProvider, userContext } from "./user.context"

const config = {
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
}
function App() {
  // useEffect(() => {
  //   axios.post("http://localhost:8000/user/login",
  //     {
  //       "username": "oma222r",
  //       "password": "aaa1"
  //     }, config)
  //     .then(response => { console.log(response) })
  //     .catch(error => { console.log(error) })
  // }, [])

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/requests" element={<Request />}></Route>
          <Route path="/billboards" element={<Billboards />}></Route>
        </Routes>

      </BrowserRouter>
    </UserContextProvider>

  );
}

export default App;

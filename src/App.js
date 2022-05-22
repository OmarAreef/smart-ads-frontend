
import React from 'react';
import {
  BrowserRouter, Routes,
  Route
} from "react-router-dom";
import Landing from "./landing/pages/Landing.jsx"
import Billboards from "./billboards/Pages/Billboards.jsx"
import Request from "./users/Pages/Request.jsx"
import Agency from "./users/Pages/Agency"
import Admin from "./users/Pages/Admin.jsx"
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

    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/user/requests" element={<Request />}></Route>
          <Route path="/agency/requests" element={<Agency />}></Route>
          <Route path="/billboards" element={<Billboards />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>


  );
}

export default App;

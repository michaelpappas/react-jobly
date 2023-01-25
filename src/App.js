import { BrowserRouter } from "react-router-dom";
import RouteList from "./RouteList";
import NavBar from "./NavBar";
import { useState } from "react";
import userContext from "./userContext";
import JoblyApi from "./api";

/**
 * App: Renders Navbar and Routelist
 * App -> {NavBar, RouteList}
 */
function App() {
  const [user, setUser] = useState({
    data: null,
    isLoading: true,
    errors: null
  });
  const [token, setToken] = useState()
  // fetch token from local storage

  async function login({username, password}) {
    //import login from api
    // setUser(userFromAPI)
    try{
      const response = await JoblyApi.login(username, password)
      setUser({
        data: response,
        isLoading: false,
        errors: null
      })
    }
    catch(err){
      setUser({
        data: null,
        isLoading: false,
        errors: err
      })
    }
  }


  return (
    <userContext.Provider value={{user}}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <RouteList />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import RouteList from "./RouteList";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import userContext from "./userContext";
import JoblyApi from "./api";
import Loading from "./Loading";
import jwt_decode from "jwt-decode";

/**
 * state:
 * - user - contains data like  {username, firstName, lastName, isAdmin, jobs}
 *          isLoading boolean
 *          errors
 * - token - contains JWT used for authentication in the form of a string
 *
 * App: Renders Navbar and Routelist
 * App -> {NavBar, RouteList}
 */
function App() {

  //user.data will contain user
  const [user, setUser] = useState({
    data: null,
    isLoading: true,
    errors: null
  });
  const [token, setToken] = useState("");

  // fetch token from local storage

  useEffect(fetchUserData, [token]);

  function fetchUserData() {
    async function fetchUser() {
      try {
        const { username } = jwt_decode(token);
        const resp = await JoblyApi.getUser(username);
        setUser(curr => ({ ...curr, data: resp }));
      }
      catch (err) {
        setUser({
          data: null,
          isLoading: false,
          errors: err
        });
      }
    }
    fetchUser();
  }

  /** function for logging in
   * must pass an object like {username, password}
   * sets token api response
   */
  async function login(data) {

    const response = await JoblyApi.login(data);
    setToken(response);
  }

  /** logs out user */
  function logout() {
    setUser({ data: null });
    setToken(null);
  }
  /** function for signing up user
   * must pass an object like {username, firstName, lastName, password, email}
   * sets token and user state.
  */
  async function signUp(data) {
    try {
      const response = await JoblyApi.signUp(data);
      setUser({
        data: { username: data.username },
        isLoading: false,
        errors: null
      });
      setToken(response);
    }
    catch {

    }
  }


  if (user.isLoading) return <Loading />;
  else if (user.errors) return <b> Error: {user.errors}</b>;


  return (
    <userContext.Provider value={{ user }}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <RouteList />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
};

export default App;

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
  const [user, setUser] = useState({
    data: null,
    isLoading: false,
    errors: null,
  });
  const [token, setToken] = useState("");
  // fetch token from local storage

  useEffect(fetchUserData, [token]);

  function fetchUserData() {
    async function fetchUser() {
      if (token) {
        setUser((curr) => ({ ...curr, isLoading: true }));
        try {
          // decode token and destruct username
          const decoded = jwt_decode(token);
          const { username } = decoded;
          JoblyApi.token = token;
          console.log('token',token);
          console.log('username',username);
          // use username from payload to request user data from API
          const resp = await JoblyApi.getUser(username);
          console.log('resp',resp);
          // update user with user data
          setUser((curr) => ({ ...curr, data: resp, isLoading: false }));

        } catch (err) {
          setUser({
            data: null,
            isLoading: false,
            errors: err,
          });
        }
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
    setToken(response.token);
  }

  /** logs out user */
  function logout() {
    setUser((curr) => ({ ...curr, data: null }));
    setToken(null);
  }
  /** function for signing up user
   * must pass an object like {username, firstName, lastName, password, email}
   * sets token and user state.
   */
  async function signUp(data) {
    const response = await JoblyApi.signUp(data);
    setToken(response);
  }

  if (user.isLoading) return <Loading />;
  else if (user.errors) return <div>{user.errors.message}</div>;

  return (
    <userContext.Provider value={{ user }}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <RouteList login={login} />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;

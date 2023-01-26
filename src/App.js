import { BrowserRouter, useNavigate } from "react-router-dom";
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
  const [token, setToken] = useState(localStorage.token || '');
  // fetch token from local storage


  useEffect(fetchUserData, [token]);

  //TODO: add specific error state just for App.js

  /** triggers from token useEffect
   * fetches user data from the API with username in token
   * sets user state to api user data response.
   * like: {username, firstName, lastName, isAdmin, jobs}
  */
  function fetchUserData() {
    async function fetchUser() {
      if (token) {
        // setUser((curr) => ({ ...curr, isLoading: true })); //redundant
        try {
          // decode token and destructure username
          const decoded = jwt_decode(token);
          const { username } = decoded;
          JoblyApi.token = token;

          // use username from payload to request user data from API
          const resp = await JoblyApi.getUser(username);

          // update user with user data
          setUser((curr) => ({ ...curr, data: resp, isLoading: false }));
        } catch (err) {
          setUser({
            data: null,
            isLoading: false,
            errors: err,
          });
        } //add else statement if there is no token and set isLoading to false.
      }
    }
    fetchUser();
  }

  /** stores token in local storage sets token state  */
  function handleToken(token) {
    setToken(token);
    localStorage.setItem("token", token);
  }

  /** function for logging in
   * must pass an object like {username, password}
   * sets token api response
   */
  async function login(data) {
    const token = await JoblyApi.login(data);
    setToken(token);
    // const response = await JoblyApi.login(data);
    // handleToken(response.token);
  }

  /** logs out user */
  function logout() {
    // setUser((curr) => ({ ...curr, data: null })); //can remove redundant
    setToken(null);
    localStorage.removeItem("token");
  }
  /** function for signing up user
   * must pass an object like {username, firstName, lastName, password, email}
   * sets token and user state.
   */
  async function signUp(data) {
    const token = await JoblyApi.signUp(data);
    setToken(token);
    // const response = await JoblyApi.signUp(data);
    // handleToken(response.token);
  }

  if (user.isLoading) return <Loading />;
  else if (user.errors) return <div>{user.errors.message}</div>;

  return (
    <div className="App">
      <userContext.Provider value={{ user: user.data }}>
        <BrowserRouter>
          <NavBar logout={logout} />
          <div className="container mt-5">
            <RouteList login={login} signUp={signUp} />
          </div>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;

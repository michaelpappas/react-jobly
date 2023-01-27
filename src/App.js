import { BrowserRouter } from "react-router-dom";
import RouteList from "./Nav/RouteList";
import NavBar from "./Nav/NavBar";
import { useState, useEffect } from "react";
import userContext from "./User/userContext";
import JoblyApi from "./api";
import Loading from "./Utilities/Loading";
import jwt_decode from "jwt-decode";
import Errors from "./Utilities/Errors";
import "./App.css";

const LOCAL_STORAGE_TOKEN = "token";
/**
 * App: Renders Navbar and Routelist
 *
 * state:
 * - user - contains data like  {username, firstName, lastName, isAdmin, jobs}
 *          isLoading boolean
 *          errors
 * - token - contains JWT used for authentication in the form of a string
 * - errors - array of errors from API to display
 *
 * App -> {NavBar, RouteList}
 */
function App() {
  const [user, setUser] = useState({
    data: null,
    isLoading: true,
  });

  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(fetchUserData, [token]);

  /** triggers from token useEffect
   * fetches user data from the API with username in token
   * sets user state to api user data response.
   * like: {username, firstName, lastName, isAdmin, jobs}
   */
  function fetchUserData() {
    async function fetchUser() {
      if (token) {
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
          setErrors(err);
          setUser({
            data: null,
            isLoading: false,
          });
        }
      } else {
        setUser({
          data: null,
          isLoading: false,
        });
      }
    }
    fetchUser();
  }

  /** Stores token in local storage sets token state  */
  function handleToken(token) {
    setToken(token);
    localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
  }

  /** function for logging in
   * must pass an object like {username, password}
   * sets token api response
   */
  async function login(data) {
    const token = await JoblyApi.login(data);
    handleToken(token);
  }

  /** logs out user, setToken to null and remove token from local storage */
  function logout() {
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  }

  /** function for signing up user
   * must pass an object like {username, firstName, lastName, password, email}
   * sets token and user state.
   */
  async function signUp(data) {
    const token = await JoblyApi.signUp(data);
    handleToken(token);
  }

  return (
    <div className="App">
      {user.isLoading ? (
        <Loading />
      ) : (
        <userContext.Provider value={{ user: user.data, setUser }}>
          <BrowserRouter>
            <NavBar logout={logout} />
            <div className="container mt-5">
              {errors.length !== 0 && <Errors errors={errors} />}
              <RouteList login={login} signUp={signUp} />
            </div>
          </BrowserRouter>
        </userContext.Provider>
      )}
    </div>
  );
}

export default App;

useEffect on token state of the token
-decode the token for the username using JWTDecode
-go to backend to fetch user data from token username
-Update currentUser state with information from the api response
-set the token in api.js uses the correct token from our login


1. User register form is submitted with signUp() in app.js
2. Makes and API post request with the new user information
3. a token is returned from the API with username and isAdmin
4. setToken with that token
5. useEffect triggers on token change which calls fetchUserData (app.js)
6. if token is truthy set isLoading to true
7. Decode the token with jwt_decode to extract the username
8. set the token in JoblyApi to our returned token
9. request user informatin from the API using the username and token
10. Set current user data to the api response with {username, firstName, lastName, isAdmin, jobs}
11. Set user.isLoading to false.
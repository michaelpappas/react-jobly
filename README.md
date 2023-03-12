## Jobly

A job search React app that communicates to the Flask Jobly backend. Onced logged in users can view and search for companies or jobs.

## Project Status
In progress:
- tests
- refine error handling

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Start Server:

`npm start`

To Visit App:

`localhost:3000`

## Reflection

This was a three days sprint focusing on making a React front end using the Flask backend we made a few weeks prior.

The most challenging and rewarding part of the project was getting authenticaling working smoothly for the user. Our backend will return a JWT once the user is authenticated. Once logged in we store this JWT in local storage to reference next time the user visits the site. We do this with useEffect and Context to store the user information to authentical while navigating through the site. Additionally we had to handle an isLoading state to display a loading spinner when fetching user or job/company data from the API. If you'd like to read more about the authentication workflow take a look at auth.md for a quick breakdown.

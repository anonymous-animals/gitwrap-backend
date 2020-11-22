# gitwrap

Gitwrap is a gift guide application for choosing your next great gift. Looking for a way to show somone special that you care, but you're not sure where to start? The Gitwrap app begins with a number of category and price range options to browse. You can choose from ctegories such as 'tech', 'music', 'movies', etc... Choose a gift from the list to read more details and find a purchase link. Did you find an idea that you like, but not quite ready to buy? You can add your gift to a personal favorites list. This will allow you to save your gift ideas for another time. This application will make sure you never get stuck without the perfect gift idea again.

## Technologies Used

Frontend React Application:
(http://git-wrap.herokuapp.com/)

Backend:
( https://gitwrap-backend.herokuapp.com/gifts )

- Express
- MongoDB
- Mongoose
- Passport.js
- bcrypt

## Getting Started/Installation Instructions

Link to deployed app on Heroku: https://gitwrap-backend.herokuapp.com/gifts

OR

Clone this project from the GitHub repo
Run 'npm install' to install dependencies
Run 'node db/seeds.js' to seed the database
Open in your preferred text editor
Run 'node index.js' to run on your local server

## Contribution Guidelines

We, the Anonymous Animals team, welcome any feedback on this application. If you would like to contribute, please fork/clone this repo, make you changes, and submit a pull request.

https://github.com/anonymous-animals/gitwrap-backend

Features to be added:

Secret Santa/White Elephant feature for the holidays

- As a user, I want to be able to log in and create a list of participants in secret santa.
- Each user could possible be assigned login credentials to see their recipient. With one admin who can see the entire list
- As a user, I want the application to swap the names and create a list of users and their secret santa/white elephant recipients. The user and their recipient cannot be the same name
- As a user, I want to be able to input a price limit on gift options (ie: $10, $20, $50, etc...)
- Once a price limit is set the application should respond with a list of potential gift ideas of the user to give to their recipient

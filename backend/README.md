# _Cinestream_

## _Overview_

Cinestream is a simple and user-friendly movie streaming platform that allows users to stream a variety of films on-demand.

## _Table of Contents_

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Steps to Run the Application Locally](#steps-to-run-the-application-locally)

---

## _Features_

- **_Selection of Films:_** Access a diverse collection of movies across different genres.
- **_On-Demand Streaming:_** Watch your favorite films instantly.
- **_User-Friendly Interface:_** Enjoy an intuitive experience with simple navigation.
- **_Anytime, Anywhere:_** Stream movies wherever you are.
- **_Updates:_** New films and content are added to keep the library exciting.

---

## _Technologies Used_

- **_Frontend:_**
  - **_HTML5:_** Structure of the web pages.
  - **_CSS3:_** Styling of the pages.
  - **_JavaScript:_** For interactivity.
  - **_Tailwind CSS:_** For fast and responsive styling.
  - **_React:_** Frontend framework for dynamic UI components.

- **_Backend:_**
  - **_Node.js/Express:_** Server-side logic.
  - **_JWT:_** For user authentication.

- **_Database:_**
  - **_Mongodb:_** Database for storing user data and movie information.

---

## _API Endpoints_

All available API endpoints are listed in the `requests.rest` file.

---

## _Prerequisites_

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.20.5)

---

## _Getting Started_

1. **_Visit the Website:_** Go to the Cinestream website in your browser.
2. **_Sign In or Sign Up:_** Create an account or sign in if you already have one.
3. **_Browse the Library:_** Explore a variety of films available for streaming.
4. **_Start Watching:_** Select a movie and press play to begin streaming instantly.

---

## _Steps to Run the Application Locally_

To get this project up and running locally, follow the steps below to set up both the backend and frontend.

### _1. Clone the Repository_

Clone the repository to your local machine by running the following command:

```bash
git clone https://github.com/Aiimeey/Cinestream.git
```

Navigate to the Backend Directory

```bash
cd Cinestream/backend/
```

Install Backend Dependencies:

```bash
npm install
```

Run the Backend Server
```bash
npm run dev ./app.js
```

Open a New Terminal and Navigate to the Frontend Directory
```bash
cd Cinestream/frontend/
```

Install Frontend Dependencies:
```bash
npm install
```

Start the Frontend Development Server
```bash
npm start
```



![image](https://user-images.githubusercontent.com/43405677/117660805-86846880-b195-11eb-970b-6c48a00949e4.png)

# RE-Agent-Dashboard
A Real Estate Agent Dashboard that helps employee's in real estate keep track of their information such as listings,open houses and notes(Calander,Todo's).

| Details  |   |
| --- | --- |
| **Project Title** | Re-Agent Dashboard
| **Module**  | Applied Project & Minor Dissertation
| **Course** | BSc (Hons) in Software Development
| **Video** | [Demo Video](https://youtu.be/OyztJUNIovU)
| **Deployed Application** | [Re-Agent Dashboard](https://re-agent-dashboard-22410.web.app/)
| **Authors** | [James Porter G00327095](https://github.com/JamesP1996)|
| **Supervisors** | Dr. Gerard Harrison |

## Contents
* [About](#about)
* [Running Locally and Requirements](#running-locally-and-requirements)
* [Goals and Features](#goals-and-features)
* [Relevant Links](#relevant-links)

### About	
This project is proposed as a potential solution to the data management issues for Real Estate Agents
and will allow agents to store their real estate related data upon a single web based application uniformally thus avoiding
unecessary segrementation of their data online.


### Major Requirements
* [NodeJS](https://nodejs.org/en/) v14.15.0 (<i>Or Higher)</i>
* [React - Create-React-App](https://reactjs.org/docs/create-a-new-react-app.html) v17.0.1 (<i>Or Higher)</i>
* [Firebase Package for NPM/Yarn](https://www.npmjs.com/package/firebase) v8.0.1 (<i>Or Higher)</i>

### Back-End Package.JSON Requirements (In the use-case that npm install does not work when within the back-end directory)
```json
"dependencies": {
    "busboy": "^0.3.1",
    "cors": "^2.8.5",
    "firebase": "^8.0.1",
    "firebase-admin": "^9.2.0",
    "firebase-functions": "^3.11.0",
    "uuid": "^8.3.1",
    "uuid-v4": "^0.1.0"
  },
```
### Front-End Package.JSON Requirements (In the use-case that npm install does not work when within the back-end directory)
```json
"dependencies": {
    "@date-io/moment": "^1.3.13",
    "@fullcalendar/daygrid": "^5.6.0",
    "@fullcalendar/list": "^5.6.0",
    "@fullcalendar/react": "^5.6.0",
    "@fullcalendar/timegrid": "^5.6.0",
    "@material-ui/core": "^4.11.3",
    "@material-ui/icons": "^4.11.2",
    "@material-ui/pickers": "^3.3.10",
    "@testing-library/jest-dom": "^5.11.6",
    "@testing-library/react": "^11.2.2",
    "@testing-library/user-event": "^12.5.0",
    "axios": "^0.21.1",
    "jwt-decode": "^3.1.2",
    "moment": "^2.29.1",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.1",
    "web-vitals": "^0.2.4"
  }
```

### Running the Back-End
1. Ensure you have all the dependencies listed above installed for the back-end <i>(You may use the npm install command for this)</i>.
2. If you are running Firebase, change the config.js file to match your own Firebase enviroment and storage bucket and run ```firebase deploy ``` or ```firebase serve``` for a non deployment based enviroment.
   <br/> <b>OR</b> <br/> If you are not running the application on your Firebase Configuration, run ```npm start``` to start the index.js file within the back-end.
3. Once your Firebase or Local Enviroment is running, you may proceed to the "Running the Front-End" section of this README.

#### Note: 
If you do not wish to create a Firebase configuration, it is possible to the use API link provided within the App.js inside the front-end "re-agent-dashboard" folder within this repo.
```js
// The API URL (Allows use of shorthand axios method calls)
axios.defaults.baseURL = "https://europe-west2-re-agent-dashboard-22410.cloudfunctions.net/api"
``` 
This line will allow you to run my back-end configuration on firebase through the front-end.

### Running the Front-End
1. Ensure you have all the dependencies listed above installed for the front-end <i>(You may use the npm install command for this)</i>.
2. CD into the directory named <b>"re-agent-dashboard"</b> (Front-End/re-agent-dashboard).
3. Run the command ```npm start``` to locally host the front-end server.
4. (Optional) You may run ```npm run build``` to create a build folder for the application and host it upon your own firebase platform,
using ```firebase deploy``` within the re-agent-dashboard folder.


### Goals and Features
The goal of the appliation is to accomodate the data management needs of agents within the Real Estate Industry by giving them a jack of all trades platform,
which hosts services such as To-do's,Notes,Calendar Events and Real Estate related data such as Listings or Open Houses.

#### Initial Goals 
At a minimum, the application should have:

1. User Login and Signup Functionality
2. The ability to create various real estate related data fields with full CRUD(Create Read Update Delete) method support.
3. A Responsive and Intuitive UI.
4. Secure Routes and Privacy concerns handled to a decent degree.

#### Main Implemented Features
* Security Through Firebase
* JWT Authenticated Tokenization and Secure Routes
* Creation of <b>Notes, To-do's, Calendar Events, Open Houses, Open House Attendees and Listings</b> with full CRUD support <i>(POST,GET,PUT,DELETE html methods)</i>.
* Responsive and Intuitive UI
* Cloud hosted through Firebase Hosting

<h3 align="center">Project Architecture</h3>
<p align="center">
    <img src = "https://i.imgur.com/r2PMH4l.png">
</p>

### Relevant Links
* [Deployed Application](https://re-agent-dashboard-22410.web.app/)
* [Dissertation]()
* [Screencast](https://youtu.be/OyztJUNIovU)
* [Base API Link](https://europe-west2-re-agent-dashboard-22410.cloudfunctions.net/api)


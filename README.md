# Senior Enrichment Project

## Getting started

1. Fork and clone this repo
2. `npm install`
3. Read the rest of this `README.md` carefully - it contains the requirements for the project and the grading rubric that will be used to assess it
4. Check out the mock-view in the `wireframes` folder to get an idea of what the project _could_ look like
5. Start the build process and your application with: `npm run start-dev`. If you're using Windows, you may need to execute `npm run start-server` and `npm run build-watch` separately (in their own terminal tabs).
6. If you navigate to the URL you should see some UI already :) [We already have some connection code to get you started]
7. Check out the starting seed file in `seed.js` - you can run it by executing `npm run seed`

## Details

### The Premise

You run StackBot Inc., a business staffed entirely by robots. Each robot may be assigned to several projects at a time. Create a RESTful web platform that allows you to manage your robots and projects. Before getting started, please carefully review the expectations as outlined below.

### The tools

For this project, you must use Express to handle HTTP requests and Sequelize to interface with your database. Likewise, you must use React, Redux and React-Redux on the front-end. This means that all important state (i.e. robots and projects) must be managed by the Redux store (unimportant state, like form data, may be managed by stateful React components). Components that display robot/project data should therefore be connected to the Redux store. If you perform side-effects (like AJAX requests), you should encapsulate them in thunks.

### Requirements + Rubric

For the requirements and rubric, refer to the following two files:

* `REQUIREMENTS.md` - contains the functional requirements of the project
* `RUBRIC.md` - contains the grading rubric for additional factors, as well as the formula for calculating the total score

Make sure to read them carefully!

### Views and Functionality

Take a look in the wireframes folder as a reference for how your front-end _could_ look. Of course, you are encouraged to be creative and flex your own design muscles, but the wireframes should function as a good baseline/inspirational resource. Either way, the most important part of the project is that it works - **design/appearance is extra-credit**. If there ever appears to be a conflict between the wireframes and the rubric/requirements below, **go with the letter of the rubric/requirements.**

## Other Important Info

### How to test functionality without a frontend
- GET: use your browser
- POST / PUT / DELETE :
 - CLI (command line interface) with `curl`
   - e.g. `curl -H "Content-Type: application/json" -X POST -d '{"username":"kate","password":"1234"}' http://localhost:3000/api/login`
   - `-H`: headers. `-X`: verb. `-d`: data (must be of the type specified in headers). http://[address]:[port]/[route_path]
 - [Postman](https://www.getpostman.com/)
   ![](https://www.dropbox.com/s/4fk3b90cd0i1a5y/postman_post.png?raw=true)
- Databases: use Sequelize in your routes and see if you are receiving what you expect

### Video Walkthrough
Please submit a short, 5 minute screencast of a walk-through of the functionality for each user story in your app. E.g. for "As a user, I can create a project", you can fill out the form for creating a project and then see the new project appear in the projects list. *There is no need to show us the code you wrote.* We recommend using Quicktime to record the screencast (instructions on how to do that [here](https://support.apple.com/kb/PH5882?locale=en_US&viewlocale=en_US)).

Once you've recorded your screencast, please *upload it to YouTube as an unlisted video*. Email `academics@fullstackacademy.com` with the title `Senior Enrichment Submission: [Your Name]` and include your repo link and YouTube recording link. This will aid us in evaluating your submission.

Well before the deadline, we recommend practicing this by recording a very short screencast and uploading it as an unlisted video. If you encounter any technical issues, reach out to us so that we can help you resolve them.

## Evaluation

- Requirements score (60%)
- Rubric score (40%)
- Extra credit (15% max)

# pretoria
Pretoria creation of a full stack app 

# SET UP INSTRUCTION


# POSTGRES SET UP

To set up latest postgres using docker, run the following commands

1 : *docker pull postgres*  - this pulls the docker image of postgres

2 : *docker run --name local-postgres -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres*

The docker run commands sets up the username, password  and port to use to connect to our database.


# REPOSITORY SET UP

1 : Clone the main branch to local environment, it contains both the backend and front end in different folders.

   #BACKEND SET UP
   
   1 : cd to the backend folder root directory.

   2 : Run *npm install* to have the dependencies installed

   3 : To set up migrations , run the following command *npx sequelize-cli db:migrate*
   
      The command creates two tables ,*Users* and Apps* , one for tracking registered users , the other for the posted apps.

   4: To run seeds for sample data , run the following command  *npx sequelize-cli db:seed:all*

       The command commands seeds the two tables with sample data to enable us run some tests.

    5 : To run tests for the API, run the command from the root directory *npm test*
       The commands runs a couple of tests for the backend API and should pass if all conditions are met, and fails if not.

    6 : After running tests, we can now fire up our API to serve the front end, run the command below to run the api *nodemon start*

        The API runs on port 8080.

    # FRONT END SET UP

    1 : cd to the frontend root directory

    2 : Run *npm install* to have the dependencies installed

    3 : To run the tests run the command in the root directory  *npm test*

      The command should run the front end tests written.

    4 : You can now fire up the front end by running the command *npm start*

        This runs the react js front end on port 3001.

    # NB: Incase the front end runs on a different port, ensure you change the port in file backend/index.js in the *corsOptions* to prevent cors errors.


   If all is successful ,you can be able to interact with the application as per the instructions provided. 

#Thanks





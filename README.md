# TodoAppUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server


To start a local development server, run:
- clone Repository
- install dependencies
  ```bash 
  npm install
  ```
- run the application
```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Deploying the Application on GCP

### steps
1. Build the Angular application for production:
  ```bash
  ng build --prod
  ```
This will generate the production-ready files in the dist/ directory.

2. Install the Firebase CLI:
  ```bash
  npm install -g firebase-tools
  ```

3. Initialize Firebase Hosting and select GCP project:
  ```bash
  firebase init hosting
  ```
4. Deploy the application:
  ```bash
  firebase deploy
  ```
## Using the To-Do List Application

Navigate to the application in your browser.
- Sign-in Page:

Sign-in by filling out the form.
If you do not have an account, click the "Sign up" link to navigate to the sign-up page.
- Dashboard:

View your list of tasks.

Use the "Create Task" button to add a new task.

Edit or delete tasks directly from the list.

- 404 Page:

If you navigate to an invalid route, you'll see a "404 Page Not Found" message with a link to return to the home page.


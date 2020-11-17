module.exports = [
  {
    title: 'Welcome to the Product Team!',
    description: `
    The Curology application lives in this repo: PocketDerm.
    
    It contains the front and back end code for Curology's products, including the customer and admin/provider applications.

    Curology's back end is built in PHP with Laravel.
    
    Laravel provides a suite of tools and patterns for managing a web service, including a router and an ORM (Eloquent)
    for interacting with our MySQL database.

    The Curology landing page and other static sites (built with Gatsby) are managed in a separate repo.

    Let's look at the lifecycle of a request to understand how things work.
    `,
  },
  {
    title: 'Routes',
    description: `
    The 'web' folder in 'routes' is where you'll find our API endpoints.

    Requests arrive at the API layer, pass through "middleware", and are then handled by the routes in this directory.

    This route handles a GET request to the /admin/patients endpoint. Middleware authorizes that the requester can
    see the patient_search view.
    
    If the requester is authorized, the application delegates to the ViewController's static 'index' method.

    Let's look at ViewController next.
    `,
    filePath: '../routes/web/admin/patients/view.php',
    startLine: 5,
    endLine: 9,
  },
  {
    title: 'Controllers',
    description: `
    Controllers are where we put business logic, reference database models, and compose a view for the requester.

    In this case, ViewController is simple and returns a view referenced by 'admin.patients.index' (which mirrors the
      view's file path of 'admin/patients/index.blade.php')

    Let's look at that view next.
    `,
    filePath: '../app/Http/Controllers/Admin/Patients/ViewController.php',
    startLine: 6,
    endLine: 12,
  },
  {
    title: 'Views & ReactJS',
    description: `
    A traditional Laravel app composes views using a templating language called Blade.

    However, Curology uses ReactJS for an interactive front-end.
    
    We deliver our React apps via simple Blade views like the one below.

    In this view, Laravel will look for the app referenced by patients.js

    React will bootstrap itself by attaching to the 'patients-body-content' id included in the template.    
    `,
    filePath: '../resources/views/admin/patients/index.blade.php',
    startLine: 1,
    endLine: 18,
  },
  {
    title: '/Config',
    description: `
    Environment variables and other important configurations are inside the /config directory.

    In particular 'config/app.php' contains important information about the Services available within the app.
    
    Unlike many other languages, PHP often uses PHP files rather than yml, json, or other configs.

    Below is an example of a small config.
    `,
    filePath: '../config/datadog.php',
  },
];

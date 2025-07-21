# Cero Gluten

Find gluten-free places in Formosa.

---

**Disclaimer:**  
Information about each location was collected from their own posts on websites and social media.  
We recommend verifying personally and consulting directly with the establishments to ensure your peace of mind and safety.

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.0.

## Features

- Search and filter gluten-free locations.  
- View detailed descriptions and contact information for each place.  
- Responsive design for desktop and mobile devices. 
- The application fetches data from Firebase Firestore using AngularFire. 
- Easy navigation.  

##  Firebase Hosting & Firestore Integration

This project is deployed using [Firebase Hosting](https://firebase.google.com/docs/hosting), with data served from [Cloud Firestore](https://firebase.google.com/products/firestore).

## Configuration

- The Firebase configuration is defined in [`firebase.json`](firebase.json).
- The app is built with Angular and deployed from the `dist/` directory.
- Routing is handled via Firebase rewrites, directing all routes to `index.html`.

## Live Deployment

This project is deployed and publicly accessible at:  
[Cero Gluten web](https://cero-gluten.web.app/)


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

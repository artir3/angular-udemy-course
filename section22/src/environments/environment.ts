// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'https://angular-course-udemy-artir3.firebaseio.com/',
  signUpUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBke5EWa-nALZPIiW4E7waRhwBGZ2rL3d8',
  signInUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBke5EWa-nALZPIiW4E7waRhwBGZ2rL3d8'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

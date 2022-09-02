// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



export const environment = {
  production: false,
  //* own firebase
  firebase1: {
    projectId: 'iotassignment-aeea1',
    appId: '1:909223197674:web:13a0fda0f160559c8f9093',
    databaseURL: 'https://iotassignment-aeea1-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'iotassignment-aeea1.appspot.com',
    locationId: 'asia-east2',
    apiKey: 'AIzaSyAaFokIx-g1cCaCfq02t0IM56Pv4Tv0CWw',
    authDomain: 'iotassignment-aeea1.firebaseapp.com',
    messagingSenderId: '909223197674',
  },
  //* common resources (device number 13)
  firebase2: {
    projectId: 'bait2123iot-202205-13',
    appId: '1:724529058161:web:79ce21a5ef1a80f0a5e6d0',
    databaseURL: 'https://bait2123iot-202205-13-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'bait2123iot-202205-13.appspot.com',
    locationId: 'asia-east1',
    apiKey: 'AIzaSyCeqB8R8w3ZD4YaHAfAEIWJCdEEuAjdbuU',
    authDomain: 'bait2123iot-202205-13.firebaseapp.com',
    messagingSenderId: '724529058161',
    measurementId: 'G-6W4LTQKB5X',
  },
  //* open weather api
  weatherUrl: 'https://api.openweathermap.org/data/2.5/weather',
  forecastUrl: 'https://api.openweathermap.org/data/2.5/forecast',
  citiesUrl: 'https://api.openweathermap.org/data/2.5/find',
  iconUrl: 'https://openweathermap.org/img/w',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

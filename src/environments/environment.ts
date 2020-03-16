// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as firebase from 'firebase/app';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

export const environment = {
  production: false,
    // Your web app's Firebase configuration
    firebaseConfig : {
    apiKey: "AIzaSyCQADBCdbTnVozkPOH8kRFt0ApPfeLRQoo",
    authDomain: "warung-watty.firebaseapp.com",
    databaseURL: "https://warung-watty.firebaseio.com",
    projectId: "warung-watty",
    storageBucket: "warung-watty.appspot.com",
    messagingSenderId: "563514303390",
    appId: "1:563514303390:web:52ecad2eaf06f3f8ca6c8f"
  }
};

// Initialize Firebase
firebase.initializeApp(environment.firebaseConfig);


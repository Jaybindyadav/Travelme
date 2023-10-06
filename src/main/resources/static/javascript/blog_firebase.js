let firebaseConfig = {
    apiKey: "AIzaSyCPnE5f7i_kw4IQixXRM287c1dyDOH_wWo",
    authDomain: "blogging-website-aaaed.firebaseapp.com",
    projectId: "blogging-website-aaaed",
    storageBucket: "blogging-website-aaaed.appspot.com",
    messagingSenderId: "969659100858",
    appId: "1:969659100858:web:0be1c86dcfb76d147e1c83"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

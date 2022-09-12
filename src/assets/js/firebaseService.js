const personalFirebase = firebase.initializeApp({
  projectId: 'iotassignment-aeea1',
  appId: '1:909223197674:web:13a0fda0f160559c8f9093',
  databaseURL: 'https://iotassignment-aeea1-default-rtdb.asia-southeast1.firebasedatabase.app',
  storageBucket: 'iotassignment-aeea1.appspot.com',
  locationId: 'asia-east2',
  apiKey: 'AIzaSyAaFokIx-g1cCaCfq02t0IM56Pv4Tv0CWw',
  authDomain: 'iotassignment-aeea1.firebaseapp.com',
  messagingSenderId: '909223197674',
});

const commonResourcesFirebase = {
  projectId: 'bait2123iot-202205-13',
  appId: '1:724529058161:web:79ce21a5ef1a80f0a5e6d0',
  databaseURL: 'https://bait2123iot-202205-13-default-rtdb.asia-southeast1.firebasedatabase.app',
  storageBucket: 'bait2123iot-202205-13.appspot.com',
  locationId: 'asia-east1',
  apiKey: 'AIzaSyCeqB8R8w3ZD4YaHAfAEIWJCdEEuAjdbuU',
  authDomain: 'bait2123iot-202205-13.firebaseapp.com',
  messagingSenderId: '724529058161',
  measurementId: 'G-6W4LTQKB5X',
};

const secondaryApp = firebase.initializeApp(commonResourcesFirebase, "secondary");
const dbRef2 = secondaryApp.database().ref();
const dbRef1 = personalFirebase.database().ref();

//* get today's date for updating CR13
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}
today = yyyy + mm + dd;
console.log(today);

//* onchange events (this one check for value added, removed and updated)
const dbRef_Ctrl = secondaryApp.database().ref('CR13_CONTROL')
const dbRef_Current = secondaryApp.database().ref('CR13_CURRENT')
const dbRef_History = secondaryApp.database().ref('CR13/' + today)

// dbRef_Ctrl.on('child_added', (snapshot) => {
//     console.log(snapshot.val())
//     console.log('item was added !!');
// });

// dbRef_Ctrl.on('child_removed', (snapshot) => {
//     console.log('item was removed !!');
// });

dbRef_Ctrl.on('child_changed', (snapshot) => {
  // console.log(snapshot.val())
});

dbRef_Current.on('child_changed', (snapshot) => {
  // console.log(snapshot.key + " " + snapshot.val())
  var key = snapshot.key;
  var data = snapshot.val();
  personalFirebase.database().ref('CR13_CURRENT/' + key).set(data);
});

dbRef_History.on('child_changed', (snapshot) => {
  // console.log(snapshot.val())
  snapshot.forEach((childSnapshot) => {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    personalFirebase.database().ref('CR13/' + today + childKey).set(childData);
  });
});

//* read from common resources
// reading controls from CR
const readControlsFromCR = () => {
  dbRef2.child("CR13_CONTROL").get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      let readObj = snapshot.val();
      updatePersonal(readObj);
      snapshot.forEach(element => {
        console.log(element.key + element.val());
      });
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

// reading current from CR
const readCurrentFromCR = () => {
  dbRef2.child("CR13_CURRENT").get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      let readObj = snapshot.val();
      updatePersonal1(readObj);
      snapshot.forEach(element => {
        console.log(element.key + element.val());
      });
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

// reading history from CR for September (cuz file too large)
//! manually add in data everyday due to data size is too large
const readHistoryFromCR = () => {
  dbRef2.child("CR13/20220912").get().then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {

        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        // var childData = Object.entries(childSnapshot.val());
        console.log(childKey + " " + childData);
        // let readObj = childSnapshot.val();
        updatePersonal2(childKey, childData);
      });
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

// test update CR
function updateCR() {
  // // A post entry.
  // var postData = {
  //   author: username,
  //   uid: uid,
  //   body: body,
  //   title: title,
  //   starCount: 0,
  //   authorPic: picture
  // };

  // // Get a key for a new Post.
  // var newPostKey = firebase.database().ref().child('posts').push().key;

  // // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  // updates['/posts/' + newPostKsey] = postData;
  // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  updates['/CR13_CONTROL/buzzer'] = '0';
  return dbRef2.update(updates);
}

//* updating from common resources to personal firebase
// update to personal firebase (CR13_CONTROL)
function updatePersonal(obj) {
  personalFirebase.database().ref('CR13_CONTROL').set(obj);
}

// update to personal firebase (CR13_CURRENT)
function updatePersonal1(obj) {
  personalFirebase.database().ref('CR13_CURRENT').set(obj);
}

// update to personal firebase (CR13)
function updatePersonal2(childKey, childData) {
  personalFirebase.database().ref('CR13/20220912/' + childKey).set(childData);
  console.log("updated to personal database successfully!")
}

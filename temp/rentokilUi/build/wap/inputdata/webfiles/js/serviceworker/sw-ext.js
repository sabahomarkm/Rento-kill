var cacheid = '@cacheid@', fcmsenderid = '@fcmsenderid@', fcmapikey = '@fcmapikey@', fcmprojectid = '@fcmprojectid@', fcmappid = '@fcmappid@';
try{
  if(fcmsenderid && fcmapikey && fcmprojectid && fcmappid) {
    importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
    importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

    const firebaseConfig = {
      apiKey: fcmapikey,
      projectId: fcmprojectid,
      messagingSenderId: fcmsenderid,
      appId: fcmappid
    };

    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
          body: payload.notification.body
      };
  
      return self.registration.showNotification(notificationTitle, notificationOptions);
  });
  }
} catch(exception) {
  console.log("Push Notification is not supported for this browser");
}
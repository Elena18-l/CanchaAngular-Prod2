// Importa el SDK de Firebase (solo lo necesario para messaging)
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

// Tu configuración de Firebase (misma que en tu proyecto)
firebase.initializeApp({
    apiKey: "AIzaSyBbK1Us_lbJytCFTrLzFjy2CN1gYA3sla0",
    authDomain: "cancha-angular.firebaseapp.com",
    databaseURL: "https://cancha-angular-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cancha-angular",
    storageBucket: "cancha-angular.appspot.com",
    messagingSenderId: "731488175013",
    appId: "1:731488175013:web:6c62e9f77407a855119e4c",
    measurementId: "G-2SC9QSB2WG",
    vapidKey: 'BDf5KVbYsEpOMN_FfEkQr3SO5JaNuWWVcd51YTkewjU4OZnODGareo9HaVkV9LKpYrY4uoNuAr_RJpluAd1Gp5E'
});

// Inicializa Firebase Messaging
const messaging = firebase.messaging();

// Maneja notificaciones en segundo plano
messaging.onBackgroundMessage(function(payload) {
  console.log('📦 Notificación recibida en background:', payload);
  
  const notificationTitle = payload.notification?.title || 'Título por defecto';
  const notificationOptions = {
    body: payload.notification?.body || 'Cuerpo del mensaje',
    icon: '/assets/icons/icon-192x192.png' // opcional: tu ícono personalizado
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

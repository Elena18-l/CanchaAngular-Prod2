/// <reference types="@angular/localize" />
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './app/config/firebase-setup';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';
import { provideMessaging, getMessaging, connectMessagingEmulator } from '@angular/fire/messaging';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideFirebaseApp(() => {
      const app = initializeApp(firebaseConfig);
      console.log("✅ Firebase app initialized:", app);
      if (firebaseConfig.production === false) {
        console.log("🔧 Conectando con los emuladores de Firebase...");

        // Conexión a Firestore Emulator (por defecto en puerto 8080)
        const firestore = getFirestore(app);
        connectFirestoreEmulator(firestore, 'localhost', 8080);  // Cambia el puerto si es necesario

        // Conexión a Auth Emulator (por defecto en puerto 9099)
        const auth = getAuth(app);
        connectAuthEmulator(auth, 'http://localhost:9099');

        // Conexión a Firebase Messaging Emulator (por defecto en puerto 4000)
        const messaging = getMessaging(app);
        connectMessagingEmulator(messaging, 'http://localhost:4000');
      }
      return app;
    }),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    provideHttpClient(),
    provideMessaging(() => getMessaging()),
  ],
}).catch(err => console.error(err));

// 🔔 Cloud Messaging manual
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('✅ Service Worker registrado:', registration);
    })
    .catch((err) => {
      console.error('❌ Error al registrar el Service Worker:', err);
    });
}
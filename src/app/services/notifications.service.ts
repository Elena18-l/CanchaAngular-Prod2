import { Injectable, NgZone, inject } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import type { MessagePayload } from 'firebase/messaging';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messaging = inject(Messaging);
  private ngZone = inject(NgZone);

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private newMessageSubject = new BehaviorSubject<MessagePayload | null>(null);

  // Observables públicos
  public token$ = this.tokenSubject.asObservable();
  public error$ = this.errorSubject.asObservable();
  public newMessage$ = this.newMessageSubject.asObservable();

  constructor() {
    this.listenForMessages(); // Activar escucha desde el constructor
  }

  requestPermissionAndGetToken() {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === 'granted') {
          console.log('📬 Permiso de notificaciones concedido.');
          this.getToken();
        } else {
          const msg = '❌ Permiso de notificación denegado.';
          console.warn(msg);
          this.errorSubject.next(msg);
        }
      })
      .catch((err) => {
        const msg = `❌ Error al solicitar permiso de notificación: ${err}`;
        console.error(msg);
        this.errorSubject.next(msg);
      });
  }

  private getToken() {
    this.ngZone.run(() => {
        
      getToken(this.messaging, {
        vapidKey: 'BDf5KVbYsEpOMN_FfEkQr3SO5JaNuWWVcd51YTkewjU4OZnODGareo9HaVkV9LKpYrY4uoNuAr_RJpluAd1Gp5E',
      })
        .then((token) => {
          if (token) {
            console.log('🔑 Token FCM:', token);
            this.tokenSubject.next(token);
          } else {
            const msg = '❌ No se pudo obtener el token.';
            console.warn(msg);
            this.errorSubject.next(msg);
          }
        })
        .catch((err) => {
          const msg = `❌ Error al obtener el token: ${err.message}`;
          console.error(msg);
          this.errorSubject.next(msg);
        });
    });
  }

  private listenForMessages() {
    onMessage(this.messaging, (payload: MessagePayload) => {
      console.log('📩 Mensaje recibido en primer plano:', payload);
      this.newMessageSubject.next(payload);

      if (Notification.permission === 'granted') {
        new Notification(payload.notification?.title ?? 'Sin título', {
          body: payload.notification?.body ?? 'Sin contenido',
          icon: payload.notification?.icon ?? 'assets/icons/icon-72x72.png',
        });
      }
    });
  }

  // Este método es útil para lanzar notificaciones manuales en el cliente
  sendCustomNotification(payload: MessagePayload) {
    if (Notification.permission === 'granted') {
      new Notification(payload.notification?.title ?? 'Sin título', {
        body: payload.notification?.body ?? 'Sin contenido',
        icon: payload.notification?.icon ?? 'assets/icons/icon-72x72.png',
      });
    }
  }
}

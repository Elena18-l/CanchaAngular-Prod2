import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { onDocumentUpdated, onDocumentWritten } from 'firebase-functions/v2/firestore';

admin.initializeApp();




// Suscribir a un token a un tema (topic)
export const subscribeToTopic = functions.https.onCall(
  async (data: functions.https.CallableRequest) => {
  
    // Asegurarse de que los datos estén bien definidos
    const { token, topic } = data as unknown as { token: string; topic: string };

    try {
      // Suscribir el token al tema
      await admin.messaging().subscribeToTopic(token, topic);
      console.log(`✅ Token suscrito a topic '${topic}'`);
      return { success: true };
    } catch (err) {
      // Verificar que 'err' sea un objeto de tipo 'Error'
      if (err instanceof Error) {
        console.error('❌ Error al suscribir token:', err.message);
        return { success: false, error: err.message };
      } else {
        console.error('❌ Error desconocido al suscribir token');
        return { success: false, error: 'Error desconocido' };
      }
    }
  }
);

// Función para notificar cuando se actualiza un jugador
export const notifyPlayerChange = onDocumentUpdated('players/{playerId}', async (event) => {
  const beforeData = event.data?.before.data();
  const afterData = event.data?.after.data();

  if (!beforeData || !afterData) {
    console.log('❌ Datos incompletos en el cambio de documento.');
    return;
  }

  const payload: admin.messaging.Message = {
    notification: {
      title: '👟 Jugador actualizado',
      body: `Se modificó a ${afterData.name || 'Jugador desconocido'}`,
    },
    topic: 'players', // Enviar notificación al topic 'players'
  };

  try {
    await admin.messaging().send(payload);
    console.log('✅ Notificación enviada tras actualización de jugador');
  } catch (error) {
    console.error('❌ Error al enviar notificación:', error);
  }
});

// Función para notificar cuando un jugador es añadido o eliminado
export const notifyPlayerWrite = onDocumentWritten('players/{playerId}', async (event) => {
  const newData = event.data?.after.exists ? event.data.after.data() : null;
  const oldData = event.data?.before.exists ? event.data.before.data() : null;

  let title = '👟 Jugador actualizado';
  let body = '';

  if (!oldData && newData) {
    title = '🆕 Nuevo jugador añadido';
    body = `Nombre: ${newData.name}`;
  } else if (!newData && oldData) {
    title = '❌ Jugador eliminado';
    body = `Nombre: ${oldData.name}`;
  } else if (oldData && newData) {
    body = `Nombre: ${newData.name}`;
  } else {
    console.log('⚠️ Cambio sin datos válidos.');
    return;
  }

  const payload: admin.messaging.Message = {
    notification: { title, body },
    topic: 'players', // Enviar notificación al topic 'players'
  };

  try {
    await admin.messaging().send(payload);
    console.log('✅ Notificación enviada tras escritura en jugador');
  } catch (error) {
    console.error('❌ Error al enviar notificación:', error);
  }
});

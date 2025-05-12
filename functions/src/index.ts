import * as admin from 'firebase-admin';
import { onDocumentUpdated, onDocumentWritten } from 'firebase-functions/v2/firestore';


admin.initializeApp();

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
    topic: 'players',
  };

  try {
    await admin.messaging().send(payload);
    console.log('✅ Notificación enviada tras actualización de jugador');
  } catch (error) {
    console.error('❌ Error al enviar notificación:', error);
  }
});

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
    topic: 'players',
  };

  try {
    await admin.messaging().send(payload);
    console.log('✅ Notificación enviada tras escritura en jugador');
  } catch (error) {
    console.error('❌ Error al enviar notificación:', error);
  }
});

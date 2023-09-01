import mongoose from 'mongoose';

/*
0 = disconnected
1 = connected
2 = connecting
3 = diconnecting
*/

const mongoConnection = {
  isConnected: 0,
};

// Establecer la conexión a la base

export const connect = async () => {
  mongoose.set('strictQuery', true);

  if (mongoConnection.isConnected === 1) {
    return console.log('----->', 'Ya estabamos conectados');
  }

  // Realizamos la conexión
  try {
    await mongoose.connect(`${process.env.MONGO_URL}` || '');
    mongoConnection.isConnected = 1;
    console.log(
      '----->',
      'Conectado a MongoDB',
      `${process.env.MONGO_URL}` || ''
    );
  } catch (error) {
    console.log('Error al conectarse a MongoDB', error);
  }
};

export const disconnect = async () => {
  // No nos desconectaremos si estamos en desarrollo
  if (process.env.NODE_ENV === 'development') return;

  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected === 0;

  console.log(
    '----->',
    'Desconectando de la DB',
    `${process.env.MONGO_URL}` || ''
  );
};

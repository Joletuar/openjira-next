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
    if (mongoConnection.isConnected) {
        console.log('----->', 'Ya estabamos conectados');
        return;
    }

    if (mongoose.connections.length > 0) {
        // Si existen más conexiones vamos a tomar la primera y su estado
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        // Si ya tenemos una conexión y es === 1, usamos dicha conexión
        if (mongoConnection.isConnected === 1) {
            console.log('----->', 'Usando conexión anterior');
            return;
        }

        // Si ya tenemos conexión, pero no estamos conectados, la cerramos para no tener conexiones simultaneas

        await mongoose.disconnect();
    }

    // Realizamos la conexión

    await mongoose.connect(`${process.env.MONGO_URL}` || '');
    mongoConnection.isConnected = 1;

    console.log(
        '----->',
        'Conectado a MongoDB',
        `${process.env.MONGO_URL}` || ''
    );
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

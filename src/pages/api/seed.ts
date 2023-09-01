import { db, seedData } from '@/database';
import { Entry } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

// Con este endpoint podemos purgar la base de datos

// ES IMPORTANTE tener en cuenta que este archivo no se debería de subir a producción, unicamente se deberá de usar en desarrollo

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    res.status(401).json({ message: 'No tiene acceso a este servicio' });
  }

  // Nos conectamos a la base de datos

  await db.connect();

  // Elimina todos los documentos disponibles en la bd si es que no se especifican argumentos

  await Entry.deleteMany();

  // Realizamos un insert de varios registros/entries

  await Entry.insertMany(seedData.entries);

  // Nos desconectamos a la base de datos

  await db.disconnect();

  res.status(200).json({ message: 'Proceso realizado correctamente' });
}

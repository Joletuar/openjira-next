import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Realizamos una acción en base al método de la petición realizada
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return postEntries(req, res);

    default:
      return res.status(400).json({
        message: 'Endpoint doesnt exist!',
      });
  }
}

// Función que permite obtener todos los entries almacenados en la bd

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();

  // Leemos la base de datos
  const entries = await Entry.find().sort({ createdAt: 'ascending' });

  await db.disconnect();

  res.status(200).json(entries);
};

// Función que permite agregar una nueva entry a la bd

const postEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // Solamente obtenemos los campos que nos interesan
  const { description = '' } = req.body;

  try {
    await db.connect();

    // Creamos una nueva entrada a partir del modelo que ya definimos
    const newEntry = new Entry({ description, createdAt: Date.now() });

    await newEntry.save();

    res.status(201).json(newEntry);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Algo salio mal, revisar los logs del servidor',
    });
  } finally {
    await db.disconnect();
  }
};

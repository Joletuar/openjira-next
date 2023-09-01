import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { Entry, IEntry } from '@/models';

import mongoose from 'mongoose';

type Data =
  | {
      message: String;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(req.query); // Obtenemos los parámetros pasados por la ruta/url: SIEMPRE SON STRINGS

  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `El id ${id} no es válido` });
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);
    case 'GET':
      return getEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(400).json({
        message: 'Endpoint doesnt exist!',
      });
  }
}

// Actualizar datos de una entry

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // Obtenemos el id del la url
  const { id } = req.query;

  try {
    // Conectamos con la bd
    await db.connect();

    // Verificamos si existe la entry en la bd
    const entryToUpdate = await Entry.findById(id);

    if (!entryToUpdate) {
      return res.status(404).json({
        message: 'The entry doesnt exists!',
      });
    }

    // Obtenemos los datos a actualizar a traves de la req
    // Si vienen los parametros en el body los usamos, si no, usamos los que tiene en la bd
    const {
      description = entryToUpdate.description,
      status = entryToUpdate.status,
    } = req.body;

    try {
      // Actualizamos la entry y retornamos su info actualizada
      const updatedEntry = await Entry.findByIdAndUpdate(
        entryToUpdate._id,
        {
          description,
          status,
        },
        {
          // Verifica si el estado que estamos actualizando es válido
          runValidators: true,
          // Retornamos la entrada actualizada
          new: true,
        }
      );

      res.status(200).json(updatedEntry!);
    } catch (error: any) {
      console.log(error);

      // Retornamos el error del validator que definimos en el esquema
      res.status(400).json({
        message: `Algo salio mal al realizar la actualizacion --> ${error.errors.status.message}`,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Algo salio mal, revisar los logs del servidor',
    });
  } finally {
    await db.disconnect();
  }
};

// Función para obtener una entry por su id

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // Obtenemos el id del la url
  const { id } = req.query;

  try {
    // Conectamos con la bd
    await db.connect();

    // Verificamos si existe la entry en la bd
    const entryFound = await Entry.findById(id);

    if (!entryFound) {
      return res.status(404).json({
        message: 'The entry doesnt exists!',
      });
    }

    res.status(200).json(entryFound!);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Algo salio mal, revisar los logs del servidor',
    });
  } finally {
    await db.disconnect();
  }
};

// Función para eliminar un entrada de la bd

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();

    const entryFound = await Entry.findById(id);

    if (!entryFound) {
      return res.status(404).json({
        message: 'The entry doesnt exists!',
      });
    }

    try {
      const entryDeleted = await Entry.findByIdAndRemove(entryFound._id);

      await db.disconnect();

      res.status(200).json(entryDeleted!);
    } catch (error: any) {
      console.log(error);

      // Retornamos el error del validator que definimos en el esquema
      res.status(400).json({
        message: `Algo salio mal al realizar la eliminación --> ${error.errors.status.message}`,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Algo salio mal, revisar los logs del servidor',
    });
  } finally {
    await db.disconnect();
  }
};

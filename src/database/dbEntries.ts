import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { Entry, IEntry } from '@/models';

export const getEntryById = async (id: string): Promise<IEntry | null> => {
    if (!isValidObjectId(id)) return null;

    await db.connect();

    const entry = await Entry.findById(id).lean();

    // Con el lean traemos solo la información necesaria

    await db.disconnect();

    // Realizamos esto debido a que hay un error de serialización con el ._id

    return JSON.parse(JSON.stringify(entry));
};

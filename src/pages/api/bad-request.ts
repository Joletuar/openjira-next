import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    ok: boolean;
    message: String | String[];
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { message = 'Bad request' } = req.query;

    res.status(400).json({
        ok: false,
        message,
    });
}

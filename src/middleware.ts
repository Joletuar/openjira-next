// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Los middleware no es más que ejecutar cierto código antes de entrar a ua página(URL)

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api/entries/')) {
        // Obtenemos el id de la ruta
        const id = request.nextUrl.pathname.replace('/api/entries/', '');

        // Expresión regular para saber si un id es válido
        const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');

        if (!checkMongoIDRegExp.test(id)) {
            const url = request.nextUrl.clone();

            url.pathname = '/api/bad-request';
            url.search = `?message=${id} is not a valid MongoID`;

            return NextResponse.rewrite(url);
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more

// Aqui podemos especificar las rutas donde solo se ejecutará este middleware
export const config = {
    // matcher: '/about/:path*',

    // matcher: ['/api/:path*', '/api/entries/:path*'],
    matcher: '/api/entries/:path*',
};

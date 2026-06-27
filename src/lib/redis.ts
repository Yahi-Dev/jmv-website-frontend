import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default redis;

export async function getOrSetCache<T>(
        key: string,
        fetcher: () => Promise<T>,
        ttlSeconds = 240
    ): Promise<T> {
        try {
            const cached = await redis.get(key);
            if (cached) return cached as T;
        } catch (err) {
            console.warn("Redis read error", err);
        }

        const data = await fetcher();

        try {
            await redis.set(key, data, { ex: ttlSeconds });
        } catch (err) {
            console.warn("Redis write error", err);
        }

    return data;
}

/**
 * Sirve una lectura pública desde caché SOLO a visitantes anónimos.
 *
 * Los administradores (con cookie de sesión) siempre obtienen datos frescos
 * directamente de la BD, para no ver contenido obsoleto justo después de
 * crear o editar. El público general recibe la versión cacheada (TTL corto),
 * que es lo que descarga el tráfico masivo de las páginas públicas.
 *
 * La comprobación de la cookie es de borde (solo parsea la cabecera Cookie,
 * sin tocar la BD), así que no añade coste relevante.
 */
export async function getPublicCached<T>(
    req: NextRequest,
    key: string,
    fetcher: () => Promise<T>,
    ttlSeconds = 60
): Promise<T> {
    if (getSessionCookie(req)) return fetcher();
    return getOrSetCache(key, fetcher, ttlSeconds);
}

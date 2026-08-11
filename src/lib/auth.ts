import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-jwt-key-for-pofo-admin-2026'
);

export const COOKIE_NAME = 'auth_token';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function signJWT(payload: { userId: string; username: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string; username: string };
  } catch (error) {
    return null;
  }
}

function parseCookieHeader(cookieHeader: string): Record<string, string> {
  const list: Record<string, string> = {};
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      const name = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      list[name] = val;
    }
  });
  return list;
}

export async function getAdminSession(req?: Request | NextRequest) {
  let token: string | undefined;

  if (req) {
    if ('cookies' in req && req.cookies && typeof (req as any).cookies.get === 'function') {
      token = (req as any).cookies.get('auth_token')?.value || (req as any).cookies.get('admin_session_token')?.value;
    }

    if (!token && req.headers) {
      const cookieHeader = req.headers.get('cookie') || req.headers.get('Cookie');
      if (cookieHeader) {
        const parsedCookies = parseCookieHeader(cookieHeader);
        token = parsedCookies['auth_token'] || parsedCookies['admin_session_token'];
      }
    }

    if (!token && req.headers) {
      const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
      if (authHeader) {
        if (authHeader.startsWith('Bearer ')) {
          token = authHeader.substring(7).trim();
        } else {
          token = authHeader.trim();
        }
      }
    }
  }

  if (!token) {
    try {
      const cookieStore = cookies();
      token = cookieStore.get('auth_token')?.value || cookieStore.get('admin_session_token')?.value;
    } catch (e) {
      // ignore
    }
  }

  if (!token) return null;
  return await verifyJWT(token);
}


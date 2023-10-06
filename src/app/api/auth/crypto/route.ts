import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const nonce = crypto.randomBytes(32).toString('hex');
    const expires = new Date().toISOString();
    return NextResponse.json({
      nonce,
      expires,
    });
  } catch (error) {
    console.error(error);
  }
}

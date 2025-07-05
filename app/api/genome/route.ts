import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://torre.ai/api/genome/bios/${username}`);
    
    if (!response.ok) {
      throw new Error(`Torre API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching genome:', error);
    return NextResponse.json(
      { error: 'Failed to fetch genome data' },
      { status: 500 }
    );
  }
}
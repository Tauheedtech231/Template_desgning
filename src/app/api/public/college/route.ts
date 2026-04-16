// src/app/api/public/college/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    const slug = request.nextUrl.searchParams.get('slug');
    
    let query = "SELECT id, name, template_id, email FROM colleges WHERE 1=1";
    let params: any[] = [];
    
    if (id) {
      query += " AND id = ?";
      params.push(parseInt(id));
    } else if (slug) {
      query += " AND slug = ?";
      params.push(slug);
    } else {
      return NextResponse.json({ error: 'id or slug required' }, { status: 400 });
    }
    
    const [rows] = await pool.execute(query, params);
    const college = (rows as any[])[0];
    
    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, college });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch college' }, { status: 500 });
  }
}
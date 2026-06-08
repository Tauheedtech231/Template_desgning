/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/public/college/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    const slug = request.nextUrl.searchParams.get('slug');
    
    // Only select columns that actually exist in the table
    let query = "SELECT id, name, email, website, city, country, phone, template_id, is_active, created_at, updated_at FROM colleges WHERE 1=1";
    const params: any[] = [];
    
    if (id) {
      query += " AND id = ?";
      params.push(parseInt(id));
    } else if (slug) {
      query += " AND slug = ?";
      params.push(slug);
    } else {
      return NextResponse.json({ error: 'id or slug required' }, { status: 400, headers: corsHeaders });
    }
    
    const [rows] = await pool.execute(query, params);
    const college = (rows as any[])[0];
    
    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404, headers: corsHeaders });
    }
    
    return NextResponse.json({ success: true, college }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch college' }, { status: 500, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
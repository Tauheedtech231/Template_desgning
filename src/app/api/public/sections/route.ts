/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/public/sections/route.ts
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

export async function GET(request: NextRequest) {
  try {
    const college_id = request.nextUrl.searchParams.get('college_id');
    const section_name = request.nextUrl.searchParams.get('section_name');
    
    console.log('📥 [API] Request received:', { college_id, section_name });
    
    if (!college_id || !section_name) {
      console.log('❌ [API] Missing parameters');
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }
    
    const [rows] = await pool.execute(
      `SELECT content, updated_at FROM college_template_sections 
       WHERE college_id = ? AND LOWER(section_name) = LOWER(?)`,
      [college_id, section_name]
    );
    
    const section = (rows as any[])[0];
    console.log('📦 [API] Found section:', section ? 'Yes' : 'No');
    
    let content = section?.content;
    
    if (typeof content === 'string') {
      try { 
        content = JSON.parse(content); 
        console.log('✅ [API] Content parsed successfully');
      } catch(e) {
        console.log('⚠️ [API] Failed to parse content');
      }
    }
    
    console.log('📤 [API] Sending response');
    
    return NextResponse.json({ 
      success: true, 
      content: content,
      updated_at: section?.updated_at 
    });
  } catch (error) {
    console.error('❌ [API] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
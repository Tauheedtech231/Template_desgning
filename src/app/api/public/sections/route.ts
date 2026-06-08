/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/public/sections/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Debug environment variables
console.log('🔍 [ENV DEBUG] Checking environment variables:');
console.log('DB_HOST:', process.env.DB_HOST ? '✅ EXISTS' : '❌ MISSING');
console.log('DB_USER:', process.env.DB_USER ? '✅ EXISTS' : '❌ MISSING');
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '✅ EXISTS (hidden)' : '❌ MISSING');
console.log('DB_NAME:', process.env.DB_NAME ? '✅ EXISTS' : '❌ MISSING');

// Also log actual values (careful with passwords)
console.log('DB_HOST value:', process.env.DB_HOST || 'not set');
console.log('DB_USER value:', process.env.DB_USER || 'not set');
console.log('DB_NAME value:', process.env.DB_NAME || 'not set');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 60000, // Add timeout
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(request: NextRequest) {
  try {
    const college_id = request.nextUrl.searchParams.get('college_id');
    const section_name = request.nextUrl.searchParams.get('section_name');
    
    console.log('📥 [API] Request received:', { college_id, section_name });
    
    if (!college_id || !section_name) {
      console.log('❌ [API] Missing parameters');
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400, headers: corsHeaders });
    }
    
    // Test database connection first
    try {
      const connection = await pool.getConnection();
      console.log('✅ Database connected successfully');
      connection.release();
    } catch (connError) {
      console.error('❌ Database connection failed:', connError);
      return NextResponse.json({ 
        error: 'Database connection failed', 
        details: connError instanceof Error ? connError.message : 'Unknown error' 
      }, { status: 500, headers: corsHeaders });
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
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('❌ [API] Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500, headers: corsHeaders });
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
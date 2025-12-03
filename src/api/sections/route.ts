import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

// MySQL connection pool
const pool = mysql.createPool({
  host: "72.61.117.188",
  user: "portfolio_user",
  password: "StrongPass123!",
  database: "portfolio_handler_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(request: NextRequest) {
  try {
    const { template_id, section_name, content } = await request.json();

    if (!template_id || !section_name || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const connection = await pool.getConnection();

    try {
      // Check if section exists
      const [existing] = await connection.execute<RowDataPacket[]>(
        'SELECT id FROM portfolio_sections WHERE template_id = ? AND section_name = ?',
        [template_id, section_name]
      );

      if (existing.length > 0) {
        // Update
        const sectionId = existing[0].id;
        await connection.execute(
          'UPDATE portfolio_sections SET content = ? WHERE id = ?',
          [JSON.stringify(content), sectionId]
        );
        return NextResponse.json({ message: 'Section updated', id: sectionId, action: 'updated' });
      } else {
        // Insert new
        const [result] = await connection.execute(
          'INSERT INTO portfolio_sections (template_id, section_name, content) VALUES (?, ?, ?)',
          [template_id, section_name, JSON.stringify(content)]
        );
        return NextResponse.json({ message: 'Section created', id: (result as any).insertId, action: 'created' });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Failed to save section' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const template_id = searchParams.get('template_id');
    const section_name = searchParams.get('section_name');

    const connection = await pool.getConnection();
    try {
      let query = 'SELECT * FROM portfolio_sections WHERE 1=1';
      const params: any[] = [];
      if (template_id) {
        query += ' AND template_id = ?';
        params.push(parseInt(template_id));
      }
      if (section_name) {
        query += ' AND section_name = ?';
        params.push(section_name);
      }

      const [rows] = await connection.execute<RowDataPacket[]>(query, params);
      const sections = rows.map(row => ({
        id: row.id,
        template_id: row.template_id,
        section_name: row.section_name,
        content: typeof row.content === 'string' ? JSON.parse(row.content) : row.content,
        created_at: row.created_at
      }));

      return NextResponse.json({ sections });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}

'use server';

import { getDb } from '@/lib/db';

export type Comment = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export async function getComments(): Promise<Comment[]> {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT id, name, message, created_at
      FROM comments
      ORDER BY created_at ASC
    `;
    return rows as Comment[];
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return [];
  }
}

export async function addComment(
  name: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const sql = getDb();
    await sql`
      INSERT INTO comments (name, message)
      VALUES (${name}, ${message})
    `;
    return { success: true };
  } catch (error) {
    console.error('Failed to add comment:', error);
    return { success: false, error: 'Failed to post comment. Try again!' };
  }
}

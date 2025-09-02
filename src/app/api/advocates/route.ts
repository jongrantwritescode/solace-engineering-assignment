import { advocates } from "../../../db/schema";
import { sql, ilike, or, count } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    let page = Number(searchParams.get('page'));
    let limit = Number(searchParams.get('limit'));

    if (Number.isNaN(page) || page < 1) page = 1;
    if (Number.isNaN(limit) || limit < 1) limit = 20;
    limit = Math.min(limit, 100);

    const offset = (page - 1) * limit;
    
    // Check if database is properly connected
    if (!process.env.DATABASE_URL) {
      return Response.json({ data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0, hasNext: false, hasPrev: false } });
    }
    
    const db = (await import("../../../db")).default;
    
    let data;
    let total;
    
    if (search.trim()) {
      const searchTerm = `%${search.trim()}%`;
      const whereCondition = or(
        ilike(advocates.firstName, searchTerm),
        ilike(advocates.lastName, searchTerm),
        ilike(advocates.city, searchTerm),
        ilike(advocates.degree, searchTerm),
        sql`${advocates.specialties}::text ILIKE ${searchTerm}`,
        sql`${advocates.yearsOfExperience}::text ILIKE ${search}`,
        ilike(advocates.phoneNumber, searchTerm)
      );
      
      data = await db.select().from(advocates).where(whereCondition).limit(limit).offset(offset);
      const countResult = await db.select({ count: count() }).from(advocates).where(whereCondition);
      total = countResult[0].count;
    } else {
      data = await db.select().from(advocates).limit(limit).offset(offset);
      const countResult = await db.select({ count: count() }).from(advocates);
      total = countResult[0].count;
    }
    
    return Response.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching advocates:', error);
    return Response.json(
      { error: 'Failed to fetch advocates' },
      { status: 500 }
    );
  }
}

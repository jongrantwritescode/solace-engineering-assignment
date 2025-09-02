import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

/**
 * Seed the database with advocate data.
 *
 * This route is only available in development and requires the caller to
 * provide a secret token via the `x-seed-token` header that matches the
 * `SEED_TOKEN` environment variable. In all other environments the handler
 * responds with a 404 to avoid exposing the seeding endpoint.
 */
export async function POST(request: Request) {
  // Ensure this route is not accessible in production builds.
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not Found", { status: 404 });
  }

  const expectedToken = process.env.SEED_TOKEN;
  const providedToken = request.headers.get("x-seed-token");

  if (!expectedToken || providedToken !== expectedToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const db = (await import("../../../db")).default;
    const records = await db.insert(advocates).values(advocateData).returning();

    return Response.json({ advocates: records });
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}

require('dotenv').config();
const { drizzle } = require("drizzle-orm/postgres-js");
const postgres = require("postgres");
const { sql } = require("drizzle-orm");
const {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  index,
} = require("drizzle-orm/pg-core");

// Define schema locally to avoid module issues
const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  specialties: jsonb("specialties").default([]).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  nameIdx: index("name_idx").on(table.firstName, table.lastName),
  cityIdx: index("city_idx").on(table.city),
  degreeIdx: index("degree_idx").on(table.degree),
  experienceIdx: index("experience_idx").on(table.yearsOfExperience),
  specialtiesIdx: index("specialties_idx").on(table.specialties),
}));

const { advocateData } = require("./advocates");

const setup = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return { db, queryClient };
};

const seed = async () => {
  const { db, queryClient } = setup();
  
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log("Starting database seeding...");
    }
    
    // Clear existing data
    await db.delete(advocates);
    if (process.env.NODE_ENV === 'development') {
      console.log("Cleared existing advocates data");
    }
    
    // Insert new data
    const result = await db.insert(advocates).values(advocateData);
    if (process.env.NODE_ENV === 'development') {
      console.log(`Successfully seeded ${advocateData.length} advocates`);
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log("Database seeding completed successfully!");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await queryClient.end();
  }
};

seed()
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Seeding completed successfully");
    }
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });

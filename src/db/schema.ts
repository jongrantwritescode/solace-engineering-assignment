import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  specialties: jsonb("specialties").default([]).notNull(), // Fixed naming from "payload"
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: text("phone_number").notNull(), // Changed from bigint to text for better phone number handling
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  // Add indexes for search performance
  nameIdx: index("name_idx").on(table.firstName, table.lastName),
  cityIdx: index("city_idx").on(table.city),
  degreeIdx: index("degree_idx").on(table.degree),
  experienceIdx: index("experience_idx").on(table.yearsOfExperience),
  // GIN index for JSONB specialties field to enable efficient text search
  specialtiesIdx: index("specialties_idx").on(table.specialties),
}));

// Type definition for better type safety
export type Advocate = typeof advocates.$inferSelect;
export type NewAdvocate = typeof advocates.$inferInsert;

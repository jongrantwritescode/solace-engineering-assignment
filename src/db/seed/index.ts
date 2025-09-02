import db from "..";
import { advocates } from "../schema";
import { advocateData } from "./advocates";

const seed = async () => {
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

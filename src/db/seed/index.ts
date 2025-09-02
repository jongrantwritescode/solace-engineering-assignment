const db = require("..");
const { advocates } = require("../schema");
const { advocateData } = require("./advocates");

const seed = async () => {
  try {
    console.log("Starting database seeding...");
    
    // Clear existing data
    await db.delete(advocates);
    console.log("Cleared existing advocates data");
    
    // Insert new data
    const result = await db.insert(advocates).values(advocateData);
    console.log(`Successfully seeded ${advocateData.length} advocates`);
    
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

seed()
  .then(() => {
    console.log("Seeding completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });

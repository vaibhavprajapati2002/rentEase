// migrateOwnerToOwnerId.js
require("dotenv").config();               // if you keep MONGO_URI in .env
const mongoose = require("mongoose");

// ---- 1. connect -----------------------------------------------------------
const MONGO_URI =
  process.env.MONGO_URI || "your-atlas-connection-string";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", async () => {
  console.log("✅ Connected to MongoDB Atlas");

  // ---- 2. load the Property model ----------------------------------------
  const Property = require("./models/PropertyModel"); // adjust path if needed

  try {
    // ---- 3. run the migration -------------------------------------------
    const result = await Property.updateMany(
      { owner: { $exists: true } },     // only docs that still have `owner`
      [
        { $set: { ownerId: "$owner" } }, // copy owner  -> ownerId
        { $unset: "owner" }              // remove old field
      ]
    );

    console.log(`🚚  Updated ${result.modifiedCount} properties`);

  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    // ---- 4. disconnect ---------------------------------------------------
    await mongoose.disconnect();
    console.log("🔌 Disconnected — migration finished");
    process.exit(0);
  }
});

// This script is used to promote a user to an admin role.
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import userModel from "../src/models/user.model.js";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const email = process.argv[2];

if (!email) {
  console.log("Usage: node scripts/makeAdmin.js someone@example.com");
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");

    const user = await userModel.findOneAndUpdate(
      { email: email.toLowerCase() },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.log(`No user found with email: ${email}`);
    } else {
      console.log(`Success! ${user.email} is now an admin.`);
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

run();
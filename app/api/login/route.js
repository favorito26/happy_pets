import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

const registrationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Registrations = mongoose.models.Registrations || mongoose.model("Registrations", registrationSchema);

export async function POST(req) {
  await connectToDatabase();

  const { email, password } = await req.json();

  try {
    const user = await Registrations.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Login failed", error: error.message }, { status: 500 });
  }
}

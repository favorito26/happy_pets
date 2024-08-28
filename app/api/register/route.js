import { NextResponse } from "next/server";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
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

async function sendConfirmationEmail(to, name) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Happy pets"`,
    to: to,
    subject: "Registeration successfull",
    text: `Hello ${name}, welcome to happy pets you have successfully registered as a customer continue to your login by clicking on the link below: https://happy-pets-seven.vercel.app/login_page`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send confirmation email");
  }
}

export async function POST(req) {
  await connectToDatabase();

  const { email, password } = await req.json();

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  const registration = new Registrations({
    email,
    password: hashedPassword,
  });

  try {
    await registration.save();
    await sendConfirmationEmail(email, email); // Assuming email as the name, adjust if needed
    return NextResponse.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ message: "Registration failed", error: error.message }, { status: 500 });
  }
}

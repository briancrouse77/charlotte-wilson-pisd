import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const volunteerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Please provide a valid email address"),
  phone: z.string().trim().optional(),
  zipCode: z.string().trim().regex(/^\d{5}$/, "ZIP code must be a 5-digit number"),
  activities: z.array(z.string()),
  message: z.string().trim().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Consent to communications is required to register as a volunteer",
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const parsedData = volunteerSchema.safeParse(body);
    if (!parsedData.success) {
      const errorMsg = parsedData.error.issues.map(err => err.message).join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { firstName, lastName, email, phone, zipCode, activities, message, consent } = parsedData.data;

    // Save to database
    const submission = await prisma.volunteerSubmission.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        zipCode,
        activities: JSON.stringify(activities),
        message: message || null,
        consent: consent || false,
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("Volunteer form API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

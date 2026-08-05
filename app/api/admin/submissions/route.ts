import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "volunteer"; // volunteer or contact
    const exportCsv = searchParams.get("export") === "csv";

    if (type === "volunteer") {
      const submissions = await prisma.volunteerSubmission.findMany({
        orderBy: { createdAt: "desc" },
      });

      if (exportCsv) {
        // Construct CSV
        const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "ZIP Code", "Activities", "Message", "Consent", "Submitted At"];
        const rows = submissions.map((sub) => [
          sub.id,
          sub.firstName,
          sub.lastName,
          sub.email,
          sub.phone || "",
          sub.zipCode,
          Array.isArray(sub.activities) ? sub.activities.join(" | ") : String(sub.activities),
          sub.message ? sub.message.replace(/"/g, '""') : "",
          sub.consent ? "Yes" : "No",
          sub.createdAt.toISOString(),
        ]);

        const csvContent = [
          headers.join(","),
          ...rows.map((row) => row.map((val) => `"${val}"`).join(",")),
        ].join("\n");

        return new Response(csvContent, {
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": "attachment; filename=volunteer_submissions.csv",
          },
        });
      }

      return NextResponse.json({ submissions });
    } else if (type === "contact") {
      const submissions = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
      });

      if (exportCsv) {
        // Construct CSV
        const headers = ["ID", "Name", "Email", "Phone", "Subject", "Message", "Consent", "Submitted At"];
        const rows = submissions.map((sub) => [
          sub.id,
          sub.name,
          sub.email,
          sub.phone || "",
          sub.subject,
          sub.message ? sub.message.replace(/"/g, '""') : "",
          sub.consent ? "Yes" : "No",
          sub.createdAt.toISOString(),
        ]);

        const csvContent = [
          headers.join(","),
          ...rows.map((row) => row.map((val) => `"${val}"`).join(",")),
        ].join("\n");

        return new Response(csvContent, {
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": "attachment; filename=contact_submissions.csv",
          },
        });
      }

      return NextResponse.json({ submissions });
    }

    return NextResponse.json({ error: "Invalid type requested" }, { status: 400 });
  } catch (error) {
    console.error("Admin submissions fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error fetching submissions." },
      { status: 500 }
    );
  }
}

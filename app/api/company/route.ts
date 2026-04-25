import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    // Membaca data dari file JSON lokal
    const filePath = path.join(process.cwd(), "data", "company.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);

    // Mengirimkan data sebagai API Response
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

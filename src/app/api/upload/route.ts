"use server";

import { getImportLink } from "@/actions/import";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file");
  const access = formData.get("access");
  if (!file) {
    return Response.json({
      status: 400,
      ok: false,
      Message: "No files received"
    });
  }
  const data = await getImportLink(access as string, file as File);

  return Response.json(data);
};
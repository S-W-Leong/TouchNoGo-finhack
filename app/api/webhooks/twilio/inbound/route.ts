import { NextResponse } from "next/server";

import { getDemoData } from "@/lib/demo-state/store";
import { resolveCaseFromReply } from "@/lib/services/resolution-service";

export async function POST(request: Request) {
  const formData = await request.formData();
  const messageSid = String(formData.get("MessageSid") ?? `SIM-IN-${Date.now()}`);
  const body = String(formData.get("Body") ?? "").trim();
  const caseId = String(formData.get("CaseId") ?? "").trim();

  if (body.toLowerCase() !== "/tng-login") {
    return new NextResponse("<Response></Response>", {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  }

  const resolvedCaseId =
    caseId ||
    getDemoData().cases
      .filter((record) => record.resolutionState === "PENDING_USER")
      .sort((left, right) => right.score - left.score)[0]?.caseId;

  if (!resolvedCaseId) {
    return NextResponse.json({ message: "No pending case available for reply." }, { status: 404 });
  }

  const record = resolveCaseFromReply(resolvedCaseId, messageSid);

  if (!record) {
    return NextResponse.json({ message: "Case not found." }, { status: 404 });
  }

  return new NextResponse("<Response><Message>Verification recorded.</Message></Response>", {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

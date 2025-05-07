import { httpServer } from "@/server/httpServer";
import { cookies } from "next/headers";

export async function POST() {
  const cookie = await cookies();

  return httpServer('/logout', {
    method: 'POST',
  }).then(() => {
    cookie.delete('user');

    return Response.json({
      status: true,
      message: "Logged out",
    });
  }).catch((err) => {
    return Response.json({
      status: false,
      message: err?.message || err?.data?.message || "Unexpected error.",
    }, { status: 400 });
  });
};

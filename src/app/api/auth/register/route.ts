import { httpServer } from "@/server/httpServer";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookie = await cookies();
  const data = await request.formData().catch(() => new FormData());

  return httpServer('/register', {
    method: 'POST',
    data: {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('password_confirm'),
    },
  }).then((data) => {
    if (data?.data) {
      const user = data.data.user;
      const token = data.data.token;

      token && cookie.set('user', JSON.stringify({ token }));

      return Response.json({
        status: true,
        message: "Logged in",
        data: {
          ...user,
          token,
        },
      });
    }

    throw data;
  }).catch((err) => {
    return Response.json({
      status: false,
      message: err?.message || err?.data?.message || "Unexpected error.",
    }, { status: 400 });
  });
};

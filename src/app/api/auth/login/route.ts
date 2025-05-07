import { httpServer } from "@/server/httpServer";
import dayjs from "dayjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookie = await cookies();
  const formData = await request.formData().catch(() => new FormData());
  const remember = !!Number(formData.get('remember'));

  return httpServer('/login', {
    method: 'POST',
    data: {
      email: formData.get('email'),
      password: formData.get('password'),
    },
  }).then((data) => {
    if (data?.data) {
      const user = data.data.user;
      const token = data.data.token;

      token && cookie.set('user', JSON.stringify({ token }), {
        expires: remember ? dayjs().add(1, 'year').toDate() : undefined,
      });

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

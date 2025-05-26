import { cookies } from "next/headers";
import dayjs from "dayjs";

export async function POST(request: Request) {
  const cookie = await cookies();
  const data = await request.formData().catch(() => new FormData());
  const theme = data.get('theme');

  if ('string' === typeof theme && ['dark', 'light'].includes(theme)) {
    cookie.set('theme', theme, {
      expires: dayjs().add(1, 'year').toDate(),
    });
  }

  return Response.json({
    status: true,
    message: "Setting saved",
  });
};

import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookie = await cookies();
  const data = await request.formData().catch(() => new FormData());
  const theme = data.get('theme');

  if ('string' === typeof theme && ['dark', 'light'].includes(theme)) {
    cookie.set('theme', theme);
  }

  return Response.json({
    status: true,
    message: "Setting saved",
  });
};

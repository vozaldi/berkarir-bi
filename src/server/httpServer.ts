import { httpService } from "@/lib/utilities";
import { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export const httpServer = async (url: string, args?: AxiosRequestConfig) => {
  const cookie = await cookies();
  const user = cookie.get('user');
  const token = await new Promise<string | null>((resolve) => {
    const token = JSON.parse(user?.value || '{}')?.token;

    resolve(token);
  }).catch(() => null);

  return httpService(url, {
    ...args,
    withCredentials: true,
    headers: {
      "Authorization": `Bearer ${token}`,
      ...args?.headers,
    },
  }, false).then((data) => data.data);
};

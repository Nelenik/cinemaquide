import { z } from "zod";
import { fetchJson } from "@/utils";
import { URL } from "@/constants";

//login schema
const AuthInfoSchema = z.object({
  email: z.string(),
  password: z.string(),
});
//reg data schema
const RegDataSchema = AuthInfoSchema.extend({
  name: z.string().optional(),
  surname: z.string().optional(),
});

//User data
const UserProfileSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  favorites: z.array(z.string()),
});

export type AuthInfo = z.infer<typeof AuthInfoSchema>;
export type RegData = z.infer<typeof RegDataSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;

export const login = (loginData: AuthInfo): Promise<void> => {
  return fetchJson<void>(false, `${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(loginData),
    credentials: "include",
  });
};

export const logout = (): Promise<void> => {
  return fetchJson<void>(false, `${URL}/auth/logout`, {
    method: "GET",
    credentials: "include",
  });
};

export const register = (regData: RegData): Promise<void> => {
  return fetchJson<void>(false, `${URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(regData).toString(),
  });
};

export const getProfile = (): Promise<UserProfile> => {
  return fetchJson<UserProfile>(true, `${URL}/profile`, {
    method: "GET",
    credentials: "include",
  }).then((profile) => UserProfileSchema.parse(profile));
};

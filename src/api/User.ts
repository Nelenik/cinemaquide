import { z } from "zod";
import { validateResponse } from "@/utils";
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

type AuthInfo = z.infer<typeof AuthInfoSchema>;
type RegData = z.infer<typeof RegDataSchema>;
type UserProfile = z.infer<typeof UserProfileSchema>;

export const login = (loginData: AuthInfo): Promise<void> => {
  return fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(loginData),
    credentials: "include",
  })
    .then(validateResponse)
    .then(() => undefined);
};

export const logout = (): Promise<void> => {
  return fetch(`${URL}/auth/logout`, {
    method: "GET",
    credentials: "include",
  }).then(() => undefined);
};

export const register = (regData: RegData): Promise<void> => {
  return fetch(`${URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(regData).toString(),
  })
    .then(validateResponse)
    .then(() => undefined);
};

export const getProfile = (): Promise<UserProfile> => {
  return fetch(`${URL}/profile`, {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((profile) => profile.json())
    .then((profile) => UserProfileSchema.parse(profile));
};

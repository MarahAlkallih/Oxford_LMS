const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const ROLE_KEY = "role";

type AuthPayload = {
  accessToken?: string;
  refreshToken?: string;
  role?: string;
  token?: string;
};

const setItemIfPresent = (key: string, value?: string) => {
  if (typeof value === "string" && value.length > 0) {
    localStorage.setItem(key, value);
  }
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const getRole = () => localStorage.getItem(ROLE_KEY);

export const persistAuthSession = (payload: AuthPayload) => {
  setItemIfPresent(ACCESS_TOKEN_KEY, payload.accessToken ?? payload.token);
  setItemIfPresent(REFRESH_TOKEN_KEY, payload.refreshToken);
  setItemIfPresent(ROLE_KEY, payload.role);
};

export const clearAuthSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
};

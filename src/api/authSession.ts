const ACCESS_TOKEN_STORAGE_KEY = "online-courses.access-token";

function readStoredAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

let accessToken: string | null = readStoredAccessToken();

export function clearAccessToken() {
  accessToken = null;

  if (typeof window !== "undefined") {
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }
}

export function getAccessToken() {
  if (accessToken) {
    return accessToken;
  }

  accessToken = readStoredAccessToken();
  return accessToken;
}

export function setAccessToken(token: string) {
  accessToken = token;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  }
}

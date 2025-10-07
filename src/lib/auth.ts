const TOKEN_KEY = 'visionyze_auth_token';

export function isAuthed(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return sessionStorage.getItem(TOKEN_KEY) !== null;
}

export function setToken(email: string) {
  sessionStorage.setItem(TOKEN_KEY, email);
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}
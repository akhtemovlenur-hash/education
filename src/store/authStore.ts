import { create } from "zustand";

interface IUser {
  id: number;
  username: string;
  email: string;
}

interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuth: boolean;
  setAuth: (user: IUser, accessToken: string, refreshToken: string) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");
const userData = localStorage.getItem("user");

export const useAuthStore = create<IAuthState>((set) => ({
  user: userData ? JSON.parse(userData) : null,
  accessToken: accessToken ?? null,
  refreshToken: refreshToken ?? null,
  isAuth: !!accessToken,
  setAuth: (user, accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, accessToken, refreshToken, isAuth: true });
  },
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    set({ user: null, accessToken: null, refreshToken: null, isAuth: false });
  },
}));

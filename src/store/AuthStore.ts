import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserData = {
    id: number,
    email: string,
    username: string
};

interface AuthState {
    userData: UserData | null;
    isLogged: boolean;
    setLogin: () => void;
    setLogout: () => void;
    token: string;
    refreshToken: string;
    setToken: (bearer: string, refresh: string) => void;
    setLoginInfo: (bearer: string, refresh: string, userData: UserData) => void;
}

const useAuthStore = create(persist((set) => ({
    userData: null,
    isLogged: false,
    token: "",
    refreshToken: "",
    setLogin: () => set({ isLogged: true }),
    setLogout: () => set({ token: "", refreshToken: "" }),
    setToken: (bearer: string, refresh: string) => set({ token: bearer, refreshToken: refresh }),
    setLoginInfo: (bearer, refresh, userData) => set({
        token: bearer,
        refreshToken: refresh,
        userData: userData,
        isLogged: true
    }),
}), {
    name: '@tkn-auth',
    partialize: (state: AuthState) => ({ token: state.token, refreshToken: state.refreshToken }),
    storage: createJSONStorage(() => localStorage)
}));

const { getState, setState } = useAuthStore;

export { getState, setState }
export default useAuthStore;
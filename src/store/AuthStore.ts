import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
    isLogged: boolean;
    setLogin: () => void;
    setLogout: () => void;
    token: string;
    refreshToken: string;
    setToken: (bearer: string, refresh: string) => void;
}

const useAuthStore = create(persist((set) => ({
    isLogged: false,
    token: "",
    refreshToken: "",
    setLogin: () => set({ isLogged: true }),
    setLogout: () => set({ token: "", refreshToken: "" }),
    setToken: (bearer: string, refresh: string) => set({ token: bearer, refreshToken: refresh })
}), {
    name: '@tkn-auth',
    partialize: (state: AuthState) => ({ token: state.token, refreshToken: state.refreshToken }),
    storage: createJSONStorage(() => localStorage)
}));

const { getState, setState } = useAuthStore;

export { getState, setState }
export default useAuthStore;
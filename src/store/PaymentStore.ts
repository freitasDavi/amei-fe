import { create } from "zustand";

interface PaymentState {
    clientSecret: string;
    setClientSecret: (clientSecret: string) => void;
};

const usePaymentStore = create<PaymentState>()((set) => ({
    clientSecret: "",
    setClientSecret(clientSecret) {
        set({ clientSecret });
    },
}))


export { usePaymentStore };
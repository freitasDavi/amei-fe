import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import useAuthStore from "@/store/AuthStore";
import { Navigate, Outlet, useLocation } from "react-router-dom"

export function DefaultLayout() {
    const token = useAuthStore((state) => state.token);
    const location = useLocation();

    console.log(token)
    // if (token && token.trim().length === 0) {
    //     return <Navigate to="/login" replace />
    // }

    return (
        token.trim().length === 0
            ? (
                <Navigate to="/login" state={{ from: location }} replace />
            ) : (
                <div className="flex flex-col">
                    <Navbar />
                    <main className="w-full min-h-[75vh] mt-16">
                        <Outlet />
                        <Toaster />
                    </main>
                    <Footer />
                </div>

            )
    )
}
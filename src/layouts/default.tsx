import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import useAuthStore from "@/store/AuthStore";
import { Navigate, Outlet, useLocation } from "react-router-dom"

export function DefaultLayout() {
    const token = useAuthStore((state) => state.token);
    const location = useLocation();

    return (
        token.trim().length === 0
            ? (
                <Navigate to="/login" state={{ from: location }} replace />
            ) : (
                <div className="flex ">
                    <Navbar />
                    <main className="w-full bg-[#E9E9FA]">
                        <Outlet />
                        <Toaster />
                    </main>
                    {/* <Footer /> */}
                </div>

            )
    )
}
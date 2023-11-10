import { Navbar } from "@/components/Navbar";
import { Notification } from "@/components/Notification";
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
                    <main className="w-screen bg-[#E9E9FA] relative">
                        <Notification />
                        <div className="mt-10 ">
                            <Outlet />
                        </div>
                        <Toaster />
                    </main>
                    {/* <Footer /> */}
                </div>

            )
    )
}
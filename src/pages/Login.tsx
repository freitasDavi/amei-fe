import { LoginForm } from "@/components/Forms/LoginForm";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";

export function Login() {
    return (
        <div>
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <aside
                        className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
                    >
                        <img
                            alt="Pattern"
                            src="https://images.unsplash.com/photo-1601342630314-8427c38bf5e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=691&q=80"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </aside>

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl md:min-w-[600px] lg:min-w-[500px]">
                            <Link className="block text-blue-600" to="/">
                                <span className="sr-only">Home</span>
                                <span className="text-primary-logo font-logo text-5xl font-semibold">a-mei</span>
                            </Link>

                            <h1
                                className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl"
                            >
                                Bem vindo de volta 👋🏼
                            </h1>

                            {/* <p className="mt-4 leading-relaxed text-gray-500">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
                                dolorum aliquam, quibusdam aperiam voluptatum.
                            </p> */}
                            <LoginForm />
                            <Toaster />
                        </div>
                    </main>
                </div>
            </section>
        </div>
    )
}
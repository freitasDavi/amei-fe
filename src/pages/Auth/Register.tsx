import { RegisterForm } from "@/components/Forms/Auth/RegisterForm";
import { Footer } from "@/components/Home/Footer";
import { Loading } from "@/components/Loading";
import { Stepper } from "@/components/Stepper";
import { UnAuthNavbar } from "@/components/UnAuthNavbar";
import { useState } from "react";


export function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const changeCurrentStep = (newStep: number) => {
        setCurrentStep(newStep);
    }

    const updateLoading = (value: boolean) => {
        setIsLoading(value);
    }

    return (
        <>
            <UnAuthNavbar />
            <main className="w-full flex flex-col justify-center items-center relative">
                <section className="py-10 w-2/5 mt-10 flex flex-col items-center">
                    <div className="w-full my-10 "><h1 className="text-3xl font-bold text-blue-500">Cadastre-se</h1></div>
                    <Stepper currentStep={currentStep} />
                </section>
                <section className="w-2/5 my-4">
                    <RegisterForm changeStep={changeCurrentStep} currentStep={currentStep} setIsLoading={updateLoading} />
                </section>
                {isLoading && (
                    <div className="absolute w-full h-full flex items-center justify-center bg-slate-200 opacity-50">
                        <Loading size="lg" />
                    </div>
                )}
            </main>
            <section className="mt-40">
                <Footer />
            </section>
        </>
    )
}
import { RegisterForm } from "@/components/Forms/Auth/RegisterForm";
import { Footer } from "@/components/Home/Footer";
import { Stepper } from "@/components/Stepper";
import { UnAuthNavbar } from "@/components/UnAuthNavbar";
import { useState } from "react";


export function Register() {
    const [currentStep, setCurrentStep] = useState(1);

    const changeCurrentStep = (newStep: number) => {
        setCurrentStep(newStep);
    }

    return (
        <>
            <UnAuthNavbar />
            <main className="w-full flex flex-col justify-center items-center">
                <section className="py-10 w-2/5 mt-10 flex flex-col items-center">
                    <div className="w-full my-10 "><h1 className="text-3xl font-bold text-blue-500">Cadastre-se</h1></div>
                    <Stepper currentStep={currentStep} />
                </section>
                <section className="w-2/5 my-4">
                    <RegisterForm changeStep={changeCurrentStep} currentStep={currentStep} />
                </section>
            </main>
            <section className="mt-40">
                <Footer />
            </section>
        </>
    )
}
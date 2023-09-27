import { RegisterForm } from "@/components/Forms/Auth/RegisterForm";
import { Stepper } from "@/components/Stepper";
import { useState } from "react";


export function Register() {
    const [currentStep, setCurrentStep] = useState(1);

    const changeCurrentStep = (newStep: number) => {
        setCurrentStep(newStep);
    }

    return (
        <main className="w-full flex flex-col justify-center items-center">
            <section className="py-10 w-2/5 mt-10 flex items-center">
                <Stepper currentStep={currentStep} />
            </section>
            <section className="w-2/5 my-10">
                <RegisterForm changeStep={changeCurrentStep} />
            </section>
        </main>
    )
}
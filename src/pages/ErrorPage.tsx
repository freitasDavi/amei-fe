import Lottie from "lottie-react";
import notFound from "../assets/lottie/not-found.json"
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";


export function ErrorPage() {
    const navigate = useNavigate();
    let error = useRouteError();

    console.error(error);

    return (
        <main className="flex flex-col items-center justify-center w-screen h-screen bg-white">
            <Lottie animationData={notFound} loop />
            <h3 className="text-lg text-primary font-semibold -mt-24 z-10 dark:text-black">
                Ops, a página que você estava procurando ainda não existe. Mas estamos trabalhando para que esteja tudo certo.
            </h3>
            <Button className="z-10" variant='default' type="button" onClick={() => navigate(-1)}>Voltar</Button>
        </main>
    )
}
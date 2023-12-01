import { ArrowRight, VideoCamera } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function HeroContainer() {
    return (
        <section id="home" className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <a href="#" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                    <span className="text-xs bg-primary-logo rounded-full text-white px-4 py-1.5 mr-3">Novo</span> <span className="text-sm font-medium">a-mei acabou de sair! Veja o que temos de novo</span>
                    <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </a>
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Nós investimos em você!</h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Potencialize o sucesso do seu MEI com nosso software de gestão personalizado, simplificando tarefas e impulsionando a eficiência empresarial.</p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <Link to="/register" className="gap-2 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-logo hover:bg-primary-logo-dark focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Vamos lá
                        <ArrowRight size={20} weight="bold" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
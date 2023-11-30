import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";


export function PageTitle({ titulo, link }: { titulo: string, link?: string }) {
    let linkTo = link ? link : "/home";

    return (
        <div className="flex gap-2 items-baseline">
            <Link to={linkTo}><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
            <h1 className="font-medium text-3xl text-primary-logo">{titulo}</h1>
        </div>
    )
}
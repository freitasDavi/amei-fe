import { Link } from "react-router-dom";
import { Money, Calendar, Users, FlagBanner, Package } from "@phosphor-icons/react"
import { createElement } from "react";

type CardSliderProps = {
    title: string;
    icon: string;
    path: string;
}

export function CardSlider({ title, icon, path }: CardSliderProps) {

    const renderIcon = () => {
        var renderIcon = Money;

        if (icon == "Money") renderIcon = Money;
        if (icon == "Calendar") renderIcon = Calendar;
        if (icon == "Users") renderIcon = Users;
        if (icon == "FlagBanner") renderIcon = FlagBanner;
        if (icon == "Package") renderIcon = Package;

        return createElement(renderIcon!, { size: 32, weight: "fill" });
    }

    return (
        <Link to={path}>
            <div className="w-28 bg-white rounded-xl flex flex-col justify-between min-w-[180px] min-h-[200px] p-4 
            text-primary-logo border-[3px] border-white hover:border-primary-logo">
                {renderIcon()}

                <h6 className="text-sm">{title}</h6>
            </div>
        </Link>
    )
}
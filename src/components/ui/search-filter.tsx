import { MagnifyingGlass } from "@phosphor-icons/react";
import { Button } from "./button";
import { Input } from "./input";

type SearchFilterProps = {
    value: string;
    setValue: (newValue: string) => void;
    pesquisar: () => void;
    placeholder: string;
}

export function SearchFilter({ value, setValue, pesquisar, placeholder }: SearchFilterProps) {
    return (
        <div className="w-[500px] flex">
            <Input placeholder={placeholder} name="FiltroPorNome" value={value}
                onChange={(e) => setValue(e.target.value)} />
            <Button variant="default" type="button" onClick={() => pesquisar()}>
                <MagnifyingGlass size={20} />
            </Button>
        </div>
    )
}
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";


export function CadastroCronometro() {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const userData = useAuthStore(state => state.userData);
    const { toast } = useToast();
    const [nome, setNome] = useState("");

    async function handleSubmitCronometro() {
        try {

            if (!userData) throw new Error("!!!!!!!!!!!!!!!!");

            await baseApi.post("/cronometro", {
                nome: nome,
                inicio: new Date(),
                fim: new Date(),
                completo: false,
                usuario: userData.id
            });

            queryClient.invalidateQueries({ queryKey: ['CronometrosAtivos'] });
            setNome("");
            setOpen(false);

        } catch (err) {
            if (err instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    title: "Erro",
                    description: err.message,
                    duration: 10000
                })
                return;
            }

            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao cadastrar novo serviço",
                duration: 10000
            })
        }
    }

    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button type="button" variant="default">Novo</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Novo cronômetro</DialogTitle>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" placeholder="Serviço" value={nome} onChange={(e) => setNome(e.target.value)} />
                <Button onClick={handleSubmitCronometro} type="submit" variant="default">Salvar</Button>
            </DialogContent>
        </Dialog>
    )
}
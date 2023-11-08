import { DefaultLayout } from "@/layouts/default";
import { Perfil } from "@/layouts/perfil";
import { AgendamentosPage } from "@/pages/Agendamentos";
import { Register } from "@/pages/Auth/Register";
import { Client } from "@/pages/Clients/Client";
import { CronometroPage } from "@/pages/Cronometro";
import { CursosPage } from "@/pages/Cursos";
import Home from "@/pages/Home";
import { IndexPage } from "@/pages/Index";
import { Login } from "@/pages/Login";
import { Orcamento } from "@/pages/Orcamentos";
import { NovoOrcamento } from "@/pages/Orcamentos/Novo";
import { OrdemServicoLista } from "@/pages/Ordens";
import { PerfilPage } from "@/pages/Perfil";
import { PagamentoAssinatura } from "@/pages/Perfil/PagamentoAssinatura";
import { PagamentoSucesso } from "@/pages/Perfil/PagamentoSucesso";
import { Protected } from "@/pages/Protected";
import { ListarServicos } from "@/pages/Servicos";
import { Route, createBrowserRouter, createHashRouter, createRoutesFromElements } from "react-router-dom";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<DefaultLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/clientes" element={<Client />} />
                <Route path="/protected" element={<Protected />} />
                <Route path="/servicos" element={<ListarServicos />} />
                <Route path="/orcamentos" element={<Orcamento />} />
                <Route path="/orcamentos/novo" element={<NovoOrcamento />} />
                <Route path="/cursos" element={<CursosPage />} />
                <Route path="/agendamentos" element={<AgendamentosPage />} />
                <Route path="/ordens" element={<OrdemServicoLista />} />
                <Route path="/timer" element={<CronometroPage />} />
                <Route path="/meuPerfil" element={<Perfil />} >
                    <Route path="/meuPerfil" element={<PerfilPage />} />
                    <Route path="/meuPerfil/assinatura" element={<PagamentoAssinatura />} />
                </Route>
                <Route path="/pagamento/sucesso" element={<PagamentoSucesso />} />
            </Route>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>
    )
);
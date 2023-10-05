import { DefaultLayout } from "@/layouts/default";
import { Register } from "@/pages/Auth/Register";
import { Client } from "@/pages/Clients/Client";
import Home from "@/pages/Home";
import { IndexPage } from "@/pages/Index";
import { Login } from "@/pages/Login";
import { Protected } from "@/pages/Protected";
import { ListarServicos } from "@/pages/Servicos";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<DefaultLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/clients" element={<Client />} />
                <Route path="/protected" element={<Protected />} />
                <Route path="/servicos" element={<ListarServicos />} />
            </Route>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>
    )
);
import { create } from "zustand";


type itensOrc = {
    id: number;
    valorUnitario: number;
    valorTotal: number;
    descricao: string;
    quantidade: number;
}

type Orcamento = {
    id: number;
    items: itensOrc[];
}

interface ItensOrcamentoState {
    orcamento: Orcamento[],
    addOrcamento: (orc: Orcamento) => void;
    removeItemFromOrcamento: (codigoOrc: number, codigoItem: number) => void;
    addItemOrcamento: (codigoOrc: number, item: itensOrc) => void;
}

const useItensStore = create<ItensOrcamentoState>((set) => ({
    orcamento: [],
    addOrcamento(orc) {
        set(state => ({ orcamento: [...state.orcamento, orc] }))
    },
    removeItemFromOrcamento(codigoOrc, codigoItem) {
        set(state => ({
            orcamento: state.orcamento.map((orc) => {
                if (orc.id === codigoOrc) {
                    orc.items = orc.items.filter((item) => item.id !== codigoItem);
                }
                return orc;
            })
        }))
    },
    addItemOrcamento(codigoOrc, item) {
        set(state => ({
            orcamento: state.orcamento.map((orc) => {
                if (orc.id === codigoOrc) {
                    orc.items = [...orc.items, item];
                }
                return orc;
            })
        }))
    }
}));

export default useItensStore;
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Projeto, Despesa, Fornecedor, EtapaCronograma, Orcamento } from './types';

interface Store {
  // Projeto ativo
  projetoAtivo: Projeto | null;
  setProjetoAtivo: (projeto: Projeto | null) => void;

  // Projetos
  projetos: Projeto[];
  addProjeto: (projeto: Projeto) => void;
  updateProjeto: (id: string, projeto: Partial<Projeto>) => void;
  deleteProjeto: (id: string) => void;

  // Despesas
  despesas: Despesa[];
  addDespesa: (despesa: Despesa) => void;
  updateDespesa: (id: string, despesa: Partial<Despesa>) => void;
  deleteDespesa: (id: string) => void;

  // Fornecedores
  fornecedores: Fornecedor[];
  addFornecedor: (fornecedor: Fornecedor) => void;
  updateFornecedor: (id: string, fornecedor: Partial<Fornecedor>) => void;
  deleteFornecedor: (id: string) => void;

  // Cronograma
  etapas: EtapaCronograma[];
  addEtapa: (etapa: EtapaCronograma) => void;
  updateEtapa: (id: string, etapa: Partial<EtapaCronograma>) => void;
  deleteEtapa: (id: string) => void;

  // Orçamentos
  orcamentos: Orcamento[];
  addOrcamento: (orcamento: Orcamento) => void;
  updateOrcamento: (id: string, orcamento: Partial<Orcamento>) => void;
  deleteOrcamento: (id: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      // Estado inicial
      projetoAtivo: null,
      projetos: [],
      despesas: [],
      fornecedores: [],
      etapas: [],
      orcamentos: [],

      // Ações - Projeto ativo
      setProjetoAtivo: (projeto) => set({ projetoAtivo: projeto }),

      // Ações - Projetos
      addProjeto: (projeto) =>
        set((state) => ({ projetos: [...state.projetos, projeto] })),
      updateProjeto: (id, updatedProjeto) =>
        set((state) => ({
          projetos: state.projetos.map((p) =>
            p.id === id ? { ...p, ...updatedProjeto } : p
          ),
          projetoAtivo:
            state.projetoAtivo?.id === id
              ? { ...state.projetoAtivo, ...updatedProjeto }
              : state.projetoAtivo,
        })),
      deleteProjeto: (id) =>
        set((state) => ({
          projetos: state.projetos.filter((p) => p.id !== id),
          projetoAtivo: state.projetoAtivo?.id === id ? null : state.projetoAtivo,
        })),

      // Ações - Despesas
      addDespesa: (despesa) =>
        set((state) => ({ despesas: [...state.despesas, despesa] })),
      updateDespesa: (id, updatedDespesa) =>
        set((state) => ({
          despesas: state.despesas.map((d) =>
            d.id === id ? { ...d, ...updatedDespesa } : d
          ),
        })),
      deleteDespesa: (id) =>
        set((state) => ({
          despesas: state.despesas.filter((d) => d.id !== id),
        })),

      // Ações - Fornecedores
      addFornecedor: (fornecedor) =>
        set((state) => ({ fornecedores: [...state.fornecedores, fornecedor] })),
      updateFornecedor: (id, updatedFornecedor) =>
        set((state) => ({
          fornecedores: state.fornecedores.map((f) =>
            f.id === id ? { ...f, ...updatedFornecedor } : f
          ),
        })),
      deleteFornecedor: (id) =>
        set((state) => ({
          fornecedores: state.fornecedores.filter((f) => f.id !== id),
        })),

      // Ações - Etapas
      addEtapa: (etapa) =>
        set((state) => ({ etapas: [...state.etapas, etapa] })),
      updateEtapa: (id, updatedEtapa) =>
        set((state) => ({
          etapas: state.etapas.map((e) =>
            e.id === id ? { ...e, ...updatedEtapa } : e
          ),
        })),
      deleteEtapa: (id) =>
        set((state) => ({
          etapas: state.etapas.filter((e) => e.id !== id),
        })),

      // Ações - Orçamentos
      addOrcamento: (orcamento) =>
        set((state) => ({ orcamentos: [...state.orcamentos, orcamento] })),
      updateOrcamento: (id, updatedOrcamento) =>
        set((state) => ({
          orcamentos: state.orcamentos.map((o) =>
            o.id === id ? { ...o, ...updatedOrcamento } : o
          ),
        })),
      deleteOrcamento: (id) =>
        set((state) => ({
          orcamentos: state.orcamentos.filter((o) => o.id !== id),
        })),
    }),
    {
      name: 'minha-obra-store',
    }
  )
);
'use client';

import { useStore } from '@/lib/store';
import { Header } from '@/components/layout/header';
import { ProjetoSetup } from '@/components/dashboard/projeto-setup';
import { CardFinanceiro } from '@/components/dashboard/card-financeiro';
import { CardCronograma } from '@/components/dashboard/card-cronograma';
import { CardAcoesRapidas } from '@/components/dashboard/card-acoes-rapidas';
import { ComparadorOrcamentos } from '@/components/dashboard/comparador-orcamentos';
import { useEffect } from 'react';

// Dados de exemplo para demonstração
const dadosExemplo = {
  projeto: {
    id: 'demo-1',
    nome: 'Reforma da Cozinha',
    orcamentoTotal: 45000,
    dataInicio: new Date('2024-01-15'),
    dataFimPrevista: new Date('2024-04-15'),
    status: 'em_andamento' as const,
    descricao: 'Reforma completa da cozinha incluindo piso, bancada e armários',
  },
  fornecedores: [
    {
      id: 'forn-1',
      projetoId: 'demo-1',
      nome: 'João Marceneiro',
      contato: '(11) 99999-1111',
      especialidade: 'Marcenaria',
      email: 'joao@email.com',
      avaliacao: 4.8,
    },
    {
      id: 'forn-2',
      projetoId: 'demo-1',
      nome: 'Construtora ABC',
      contato: '(11) 99999-2222',
      especialidade: 'Construção Civil',
      email: 'contato@abc.com',
      avaliacao: 4.5,
    },
    {
      id: 'forn-3',
      projetoId: 'demo-1',
      nome: 'Elétrica Express',
      contato: '(11) 99999-3333',
      especialidade: 'Elétrica',
      email: 'contato@eletrica.com',
      avaliacao: 4.7,
    },
  ],
  despesas: [
    {
      id: 'desp-1',
      projetoId: 'demo-1',
      nome: 'Porcelanato 60x60',
      valor: 2500,
      categoria: 'material' as const,
      data: new Date('2024-01-20'),
      status: 'paga' as const,
    },
    {
      id: 'desp-2',
      projetoId: 'demo-1',
      nome: 'Mão de obra - Pedreiro',
      valor: 3200,
      categoria: 'mao_de_obra' as const,
      data: new Date('2024-01-25'),
      status: 'paga' as const,
    },
    {
      id: 'desp-3',
      projetoId: 'demo-1',
      nome: 'Armários planejados',
      valor: 15000,
      categoria: 'material' as const,
      data: new Date('2024-02-01'),
      status: 'aprovada' as const,
    },
    {
      id: 'desp-4',
      projetoId: 'demo-1',
      nome: 'Instalação elétrica',
      valor: 1800,
      categoria: 'servicos' as const,
      data: new Date('2024-02-10'),
      status: 'planejada' as const,
    },
  ],
  etapas: [
    {
      id: 'etapa-1',
      projetoId: 'demo-1',
      nome: 'Demolição',
      dataInicio: new Date('2024-01-15'),
      dataFim: new Date('2024-01-20'),
      status: 'concluida' as const,
    },
    {
      id: 'etapa-2',
      projetoId: 'demo-1',
      nome: 'Instalações hidráulicas',
      dataInicio: new Date('2024-01-22'),
      dataFim: new Date('2024-02-05'),
      status: 'em_andamento' as const,
    },
    {
      id: 'etapa-3',
      projetoId: 'demo-1',
      nome: 'Instalações elétricas',
      dataInicio: new Date('2024-02-06'),
      dataFim: new Date('2024-02-15'),
      status: 'nao_iniciada' as const,
    },
    {
      id: 'etapa-4',
      projetoId: 'demo-1',
      nome: 'Revestimento de piso',
      dataInicio: new Date('2024-02-16'),
      dataFim: new Date('2024-02-25'),
      status: 'nao_iniciada' as const,
    },
    {
      id: 'etapa-5',
      projetoId: 'demo-1',
      nome: 'Instalação de armários',
      dataInicio: new Date('2024-03-01'),
      dataFim: new Date('2024-03-15'),
      status: 'nao_iniciada' as const,
    },
  ],
  orcamentos: [
    {
      id: 'orc-1',
      projetoId: 'demo-1',
      fornecedorId: 'forn-1',
      servico: 'Armários Planejados',
      valor: 15000,
      prazo: 30,
      condicoesPagamento: '50% entrada + 50% entrega',
      data: new Date('2024-01-10'),
      status: 'pendente' as const,
    },
    {
      id: 'orc-2',
      projetoId: 'demo-1',
      fornecedorId: 'forn-2',
      servico: 'Armários Planejados',
      valor: 18500,
      prazo: 25,
      condicoesPagamento: '3x sem juros',
      data: new Date('2024-01-12'),
      status: 'pendente' as const,
    },
    {
      id: 'orc-3',
      projetoId: 'demo-1',
      fornecedorId: 'forn-3',
      servico: 'Instalação Elétrica Completa',
      valor: 2800,
      prazo: 5,
      condicoesPagamento: 'À vista',
      data: new Date('2024-01-15'),
      status: 'pendente' as const,
    },
  ],
};

export default function Home() {
  const { 
    projetos, 
    projetoAtivo, 
    addProjeto, 
    setProjetoAtivo,
    addFornecedor,
    addDespesa,
    addEtapa,
    addOrcamento,
  } = useStore();

  // Carregar dados de exemplo na primeira visita
  useEffect(() => {
    if (projetos.length === 0) {
      // Adicionar projeto de exemplo
      addProjeto(dadosExemplo.projeto);
      setProjetoAtivo(dadosExemplo.projeto);

      // Adicionar dados de exemplo
      dadosExemplo.fornecedores.forEach(addFornecedor);
      dadosExemplo.despesas.forEach(addDespesa);
      dadosExemplo.etapas.forEach(addEtapa);
      dadosExemplo.orcamentos.forEach(addOrcamento);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {!projetoAtivo ? (
        <ProjetoSetup />
      ) : (
        <main className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {projetoAtivo.nome}
            </h2>
            <p className="text-gray-600">
              Painel de controle da sua reforma
            </p>
          </div>

          {/* Grid principal do dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <CardFinanceiro />
            <CardCronograma />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <ComparadorOrcamentos />
            </div>
            <div className="lg:col-span-1">
              <CardAcoesRapidas />
            </div>
          </div>

          {/* Seção de insights e alertas */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Insights e Recomendações
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Progresso Financeiro</h4>
                <p className="text-sm text-blue-700">
                  Você está dentro do orçamento planejado. Continue monitorando os gastos.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">Cronograma</h4>
                <p className="text-sm text-yellow-700">
                  Próxima etapa: Instalações elétricas. Confirme a disponibilidade do fornecedor.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Oportunidade</h4>
                <p className="text-sm text-green-700">
                  Compare os orçamentos de armários para economizar até R$ 3.500.
                </p>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
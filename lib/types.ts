export interface Projeto {
  id: string;
  nome: string;
  orcamentoTotal: number;
  dataInicio: Date;
  dataFimPrevista: Date;
  status: 'planejamento' | 'em_andamento' | 'concluido' | 'pausado';
  descricao?: string;
}

export interface Despesa {
  id: string;
  projetoId: string;
  nome: string;
  valor: number;
  categoria: 'material' | 'mao_de_obra' | 'equipamento' | 'servicos' | 'outros';
  data: Date;
  fornecedorId?: string;
  comprovante?: string;
  observacoes?: string;
  status: 'planejada' | 'paga' | 'aprovada';
}

export interface Fornecedor {
  id: string;
  projetoId: string;
  nome: string;
  contato: string;
  especialidade: string;
  email?: string;
  endereco?: string;
  avaliacao?: number;
  observacoes?: string;
}

export interface EtapaCronograma {
  id: string;
  projetoId: string;
  nome: string;
  dataInicio: Date;
  dataFim: Date;
  status: 'nao_iniciada' | 'em_andamento' | 'concluida' | 'atrasada';
  dependencias?: string[];
  observacoes?: string;
}

export interface Orcamento {
  id: string;
  projetoId: string;
  fornecedorId: string;
  servico: string;
  valor: number;
  prazo: number;
  condicoesPagamento: string;
  data: Date;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  observacoes?: string;
}
import { Despesa } from './types';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const calcularTotalGasto = (despesas: Despesa[]): number => {
  return despesas
    .filter(d => d.status === 'paga')
    .reduce((total, despesa) => total + despesa.valor, 0);
};

export const calcularTotalPlanejado = (despesas: Despesa[]): number => {
  return despesas.reduce((total, despesa) => total + despesa.valor, 0);
};

export const calcularGastosPorCategoria = (despesas: Despesa[]) => {
  const gastosPorCategoria = despesas
    .filter(d => d.status === 'paga')
    .reduce((acc, despesa) => {
      acc[despesa.categoria] = (acc[despesa.categoria] || 0) + despesa.valor;
      return acc;
    }, {} as Record<string, number>);

  return Object.entries(gastosPorCategoria).map(([categoria, valor]) => ({
    categoria: categoria.replace('_', ' ').toUpperCase(),
    valor,
    fill: getCategoriaColor(categoria),
  }));
};

export const getCategoriaColor = (categoria: string): string => {
  const colors = {
    material: '#3B82F6',
    mao_de_obra: '#10B981',
    equipamento: '#F59E0B',
    servicos: '#8B5CF6',
    outros: '#6B7280',
  };
  return colors[categoria as keyof typeof colors] || colors.outros;
};

export const calcularProgresso = (gasto: number, orcamento: number): number => {
  if (orcamento === 0) return 0;
  return Math.min((gasto / orcamento) * 100, 100);
};
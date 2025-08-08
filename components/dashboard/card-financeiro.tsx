'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useStore } from '@/lib/store';
import { 
  formatCurrency, 
  calcularTotalGasto, 
  calcularGastosPorCategoria,
  calcularProgresso 
} from '@/lib/utils-financeiro';
import { DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

export function CardFinanceiro() {
  const { projetoAtivo, despesas } = useStore();

  if (!projetoAtivo) return null;

  const despesasDoProjeto = despesas.filter(d => d.projetoId === projetoAtivo.id);
  const totalGasto = calcularTotalGasto(despesasDoProjeto);
  const orcamentoTotal = projetoAtivo.orcamentoTotal;
  const saldoRestante = orcamentoTotal - totalGasto;
  const progresso = calcularProgresso(totalGasto, orcamentoTotal);
  const gastosPorCategoria = calcularGastosPorCategoria(despesasDoProjeto);

  const isOverBudget = totalGasto > orcamentoTotal;
  const isNearLimit = progresso > 80 && !isOverBudget;

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <span>Controle Financeiro</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Orçamento Total</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(orcamentoTotal)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Gasto</p>
            <p className={`text-2xl font-bold ${isOverBudget ? 'text-red-600' : 'text-blue-600'}`}>
              {formatCurrency(totalGasto)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Saldo Restante</p>
            <p className={`text-2xl font-bold ${saldoRestante < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {formatCurrency(saldoRestante)}
            </p>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Progresso do Orçamento</span>
            <div className="flex items-center space-x-1">
              {isOverBudget && <AlertTriangle className="w-4 h-4 text-red-500" />}
              {isNearLimit && <TrendingUp className="w-4 h-4 text-yellow-500" />}
              <span className={`text-sm font-medium ${
                isOverBudget ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {progresso.toFixed(1)}%
              </span>
            </div>
          </div>
          <Progress 
            value={progresso} 
            className={`h-3 ${isOverBudget ? 'bg-red-100' : isNearLimit ? 'bg-yellow-100' : 'bg-green-100'}`}
          />
          {isOverBudget && (
            <p className="text-sm text-red-600 font-medium">
              ⚠️ Orçamento excedido em {formatCurrency(totalGasto - orcamentoTotal)}
            </p>
          )}
          {isNearLimit && (
            <p className="text-sm text-yellow-600 font-medium">
              ⚡ Atenção: Próximo do limite do orçamento
            </p>
          )}
        </div>

        {/* Gráfico de Gastos por Categoria */}
        {gastosPorCategoria.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Gastos por Categoria
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={gastosPorCategoria}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="valor"
                  >
                    {gastosPorCategoria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Categoria: ${label}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900">Detalhamento</h4>
              {gastosPorCategoria.map((categoria, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: categoria.fill }}
                    />
                    <span className="text-sm text-gray-600">
                      {categoria.categoria}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {formatCurrency(categoria.valor)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
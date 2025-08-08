'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils-financeiro';
import { Calculator, CheckCircle, X, Star } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function ComparadorOrcamentos() {
  const { projetoAtivo, orcamentos, fornecedores, updateOrcamento } = useStore();

  if (!projetoAtivo) return null;

  const orcamentosDoProjeto = orcamentos.filter(o => o.projetoId === projetoAtivo.id);
  const orcamentosPendentes = orcamentosDoProjeto.filter(o => o.status === 'pendente');

  // Agrupar orçamentos por serviço
  const orcamentosPorServico = orcamentosPendentes.reduce((acc, orcamento) => {
    if (!acc[orcamento.servico]) {
      acc[orcamento.servico] = [];
    }
    acc[orcamento.servico].push(orcamento);
    return acc;
  }, {} as Record<string, typeof orcamentosPendentes>);

  const aprovarOrcamento = (orcamentoId: string) => {
    updateOrcamento(orcamentoId, { status: 'aprovado' });
    // Aqui você poderia também rejeitar os outros orçamentos do mesmo serviço
    const orcamento = orcamentos.find(o => o.id === orcamentoId);
    if (orcamento) {
      orcamentosDoProjeto
        .filter(o => o.servico === orcamento.servico && o.id !== orcamentoId)
        .forEach(o => updateOrcamento(o.id, { status: 'rejeitado' }));
    }
  };

  const rejeitarOrcamento = (orcamentoId: string) => {
    updateOrcamento(orcamentoId, { status: 'rejeitado' });
  };

  if (Object.keys(orcamentosPorServico).length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            <span>Comparador de Orçamentos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Calculator className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-2">Nenhum orçamento pendente</p>
          <p className="text-sm text-gray-400">
            Adicione orçamentos de fornecedores para compará-los
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(orcamentosPorServico).map(([servico, orcamentosDoServico]) => (
        <Card key={servico}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span>Orçamentos: {servico}</span>
              </div>
              <Badge variant="outline">
                {orcamentosDoServico.length} propostas
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orcamentosDoServico
                    .sort((a, b) => a.valor - b.valor) // Ordenar por valor crescente
                    .map((orcamento, index) => {
                      const fornecedor = fornecedores.find(f => f.id === orcamento.fornecedorId);
                      const isMelhorPreco = index === 0;
                      
                      return (
                        <TableRow key={orcamento.id} className={isMelhorPreco ? 'bg-green-50' : ''}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {isMelhorPreco && (
                                <Star className="w-4 h-4 text-green-600" />
                              )}
                              <div>
                                <p className="font-medium">{fornecedor?.nome}</p>
                                <p className="text-sm text-gray-500">
                                  {fornecedor?.especialidade}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-right">
                              <p className={`font-bold ${isMelhorPreco ? 'text-green-600' : ''}`}>
                                {formatCurrency(orcamento.valor)}
                              </p>
                              {isMelhorPreco && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  Melhor Preço
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {orcamento.prazo} dias
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {orcamento.condicoesPagamento}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm">
                                {fornecedor?.avaliacao || 'N/A'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-500">
                              {format(orcamento.data, 'dd/MM/yy', { locale: ptBR })}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                onClick={() => aprovarOrcamento(orcamento.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => rejeitarOrcamento(orcamento.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
            
            {orcamentosDoServico.length > 1 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Calculator className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Análise Comparativa</h4>
                    <div className="text-sm text-blue-700 mt-1 space-y-1">
                      <p>• Diferença de preço: {formatCurrency(
                        Math.max(...orcamentosDoServico.map(o => o.valor)) - 
                        Math.min(...orcamentosDoServico.map(o => o.valor))
                      )}</p>
                      <p>• Prazo médio: {Math.round(
                        orcamentosDoServico.reduce((acc, o) => acc + o.prazo, 0) / orcamentosDoServico.length
                      )} dias</p>
                      {orcamentosDoServico[0] && (
                        <p>• Economia escolhendo o melhor preço: {formatCurrency(
                          orcamentosDoServico[orcamentosDoServico.length - 1].valor - orcamentosDoServico[0].valor
                        )}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
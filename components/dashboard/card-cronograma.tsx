'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { format, isAfter, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function CardCronograma() {
  const { projetoAtivo, etapas } = useStore();

  if (!projetoAtivo) return null;

  const etapasDoProjeto = etapas.filter(e => e.projetoId === projetoAtivo.id);
  const hoje = new Date();

  // Classificar etapas
  const etapasEmAndamento = etapasDoProjeto.filter(e => e.status === 'em_andamento');
  const proximasEtapas = etapasDoProjeto
    .filter(e => e.status === 'nao_iniciada')
    .sort((a, b) => a.dataInicio.getTime() - b.dataInicio.getTime())
    .slice(0, 3);
  const etapasAtrasadas = etapasDoProjeto.filter(e => 
    e.status !== 'concluida' && isAfter(hoje, e.dataFim)
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'em_andamento':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'atrasada':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (etapa: any) => {
    if (etapa.status === 'concluida') return 'green';
    if (etapa.status === 'em_andamento') return 'blue';
    if (isAfter(hoje, etapa.dataFim) && etapa.status !== 'concluida') return 'red';
    return 'gray';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span>Cronograma</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Resumo */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {etapasEmAndamento.length}
            </p>
            <p className="text-xs text-gray-500">Em Andamento</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {etapasDoProjeto.filter(e => e.status === 'concluida').length}
            </p>
            <p className="text-xs text-gray-500">Concluídas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">
              {etapasAtrasadas.length}
            </p>
            <p className="text-xs text-gray-500">Atrasadas</p>
          </div>
        </div>

        {/* Etapas Atrasadas */}
        {etapasAtrasadas.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-red-600 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>Etapas Atrasadas</span>
            </h4>
            {etapasAtrasadas.map((etapa) => (
              <div key={etapa.id} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {getStatusIcon('atrasada')}
                  <span className="text-sm font-medium text-red-800">
                    {etapa.nome}
                  </span>
                </div>
                <Badge variant="destructive" className="text-xs">
                  Atrasada
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Etapas em Andamento */}
        {etapasEmAndamento.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-blue-600 flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Em Andamento</span>
            </h4>
            {etapasEmAndamento.map((etapa) => (
              <div key={etapa.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(etapa.status)}
                  <div>
                    <span className="text-sm font-medium text-blue-800">
                      {etapa.nome}
                    </span>
                    <p className="text-xs text-blue-600">
                      Prazo: {format(etapa.dataFim, 'dd/MM/yyyy', { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <Badge className="text-xs bg-blue-100 text-blue-800">
                  Em Andamento
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Próximas Etapas */}
        {proximasEtapas.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-600 flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Próximas Etapas</span>
            </h4>
            {proximasEtapas.map((etapa) => (
              <div key={etapa.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(etapa.status)}
                  <div>
                    <span className="text-sm font-medium text-gray-800">
                      {etapa.nome}
                    </span>
                    <p className="text-xs text-gray-600">
                      Início: {format(etapa.dataInicio, 'dd/MM/yyyy', { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Planejada
                </Badge>
              </div>
            ))}
          </div>
        )}

        {etapasDoProjeto.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p className="text-sm">Nenhuma etapa cadastrada</p>
            <p className="text-xs">Adicione etapas para acompanhar o cronograma</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
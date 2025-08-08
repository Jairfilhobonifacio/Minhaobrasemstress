'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Receipt, 
  Users, 
  Calendar, 
  FileText,
  Calculator 
} from 'lucide-react';

export function CardAcoesRapidas() {
  const acoes = [
    {
      icon: Receipt,
      label: 'Adicionar Despesa',
      description: 'Registrar novo gasto',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => console.log('Adicionar despesa'),
    },
    {
      icon: Users,
      label: 'Novo Fornecedor',
      description: 'Cadastrar contato',
      color: 'bg-green-500 hover:bg-green-600',
      action: () => console.log('Adicionar fornecedor'),
    },
    {
      icon: Calendar,
      label: 'Nova Etapa',
      description: 'Planejar cronograma',
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => console.log('Adicionar etapa'),
    },
    {
      icon: Calculator,
      label: 'Comparar Orçamentos',
      description: 'Analisar propostas',
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => console.log('Comparar orçamentos'),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="w-5 h-5 text-blue-600" />
          <span>Ações Rápidas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {acoes.map((acao, index) => (
          <Button
            key={index}
            onClick={acao.action}
            className={`w-full justify-start space-x-3 h-auto p-4 ${acao.color} text-white`}
          >
            <acao.icon className="w-5 h-5" />
            <div className="text-left">
              <p className="font-medium">{acao.label}</p>
              <p className="text-xs opacity-90">{acao.description}</p>
            </div>
          </Button>
        ))}

        <div className="pt-2 border-t">
          <Button
            variant="outline"
            className="w-full justify-start space-x-3"
          >
            <FileText className="w-4 h-4" />
            <span>Ver Relatórios</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
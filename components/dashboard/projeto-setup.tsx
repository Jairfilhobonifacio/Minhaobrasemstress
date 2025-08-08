'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useStore } from '@/lib/store';
import { Projeto } from '@/lib/types';
import { Building2, Plus } from 'lucide-react';

export function ProjetoSetup() {
  const { addProjeto, setProjetoAtivo } = useStore();
  const [formData, setFormData] = useState({
    nome: '',
    orcamentoTotal: '',
    dataInicio: '',
    dataFimPrevista: '',
    descricao: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const novoProjeto: Projeto = {
      id: Date.now().toString(),
      nome: formData.nome,
      orcamentoTotal: parseFloat(formData.orcamentoTotal),
      dataInicio: new Date(formData.dataInicio),
      dataFimPrevista: new Date(formData.dataFimPrevista),
      status: 'planejamento',
      descricao: formData.descricao,
    };

    addProjeto(novoProjeto);
    setProjetoAtivo(novoProjeto);
    
    // Resetar formulário
    setFormData({
      nome: '',
      orcamentoTotal: '',
      dataInicio: '',
      dataFimPrevista: '',
      descricao: '',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bem-vindo ao Minha Obra Sem Stress
        </h1>
        <p className="text-lg text-gray-600">
          Vamos começar criando seu primeiro projeto de reforma
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-blue-600" />
            <span>Criar Novo Projeto</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Projeto *</Label>
              <Input
                id="nome"
                placeholder="Ex: Reforma da Cozinha"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orcamento">Orçamento Total (R$) *</Label>
              <Input
                id="orcamento"
                type="number"
                step="0.01"
                placeholder="Ex: 50000.00"
                value={formData.orcamentoTotal}
                onChange={(e) => setFormData(prev => ({ ...prev, orcamentoTotal: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataInicio">Data de Início *</Label>
                <Input
                  id="dataInicio"
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) => setFormData(prev => ({ ...prev, dataInicio: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataFim">Data Prevista de Conclusão *</Label>
                <Input
                  id="dataFim"
                  type="date"
                  value={formData.dataFimPrevista}
                  onChange={(e) => setFormData(prev => ({ ...prev, dataFimPrevista: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição do Projeto</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva brevemente o escopo da reforma..."
                value={formData.descricao}
                onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Criar Projeto
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Após criar o projeto, você poderá adicionar despesas, fornecedores e cronograma
        </p>
      </div>
    </div>
  );
}
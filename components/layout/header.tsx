'use client';

import { Building2, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStore } from '@/lib/store';

export function Header() {
  const { projetos, projetoAtivo, setProjetoAtivo } = useStore();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Minha Obra Sem Stress
            </h1>
          </div>
          
          {projetos.length > 0 && (
            <Select
              value={projetoAtivo?.id || ''}
              onValueChange={(value) => {
                const projeto = projetos.find(p => p.id === value);
                setProjetoAtivo(projeto || null);
              }}
            >
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Selecione um projeto" />
              </SelectTrigger>
              <SelectContent>
                {projetos.map((projeto) => (
                  <SelectItem key={projeto.id} value={projeto.id}>
                    {projeto.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
export interface Local {
  name: string;
  description: string;
  type: 'solo sin gluten' | 'mixto';
  category: 'comida' | 'insumos';
  address?: string;
  city: string;
  phone?: string;
  whatsapp?: string;
  socialNetworks?: string[];
}

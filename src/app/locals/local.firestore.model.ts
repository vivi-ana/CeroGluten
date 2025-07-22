import { DocumentData } from '@angular/fire/firestore';

export interface FirestoreLocal extends DocumentData {
  id: string;
  name: string;
  description: string;
  type: 'solo sin gluten' | 'mixto';
  category: 'comida' | 'insumos';
  city: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  socialNetworks?: string[];
}
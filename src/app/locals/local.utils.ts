import { Local } from './local.model';

export function isValidLocal(data: Local): data is Local {
  return data &&
    typeof data.name === 'string' && data.name.trim() !== '' &&
    typeof data.description === 'string' && data.description.trim() !== '' &&
    (data.type === 'solo sin gluten' || data.type === 'mixto') &&
    (data.category === 'comida' || data.category === 'insumos') &&
    typeof data.city === 'string' && data.city.trim() !== '' &&
    isValidOptionalField(data.address) &&
    isValidOptionalField(data.phone) &&
    isValidOptionalField(data.whatsapp) &&
    isValidSocialNetworks(data.socialNetworks);
}

function isValidOptionalField(value?: string): boolean {
  return value === undefined || (typeof value === 'string' && value.trim() !== '');
}

function isValidSocialNetworks(socialNetworks?: string[]): boolean {
  return socialNetworks === undefined || 
         (Array.isArray(socialNetworks) && socialNetworks.every(sn => typeof sn === 'string' && sn.trim() !== ''));
}

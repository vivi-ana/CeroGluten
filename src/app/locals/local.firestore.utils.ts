import { FirestoreLocal } from './local.firestore.model';

export function isFirestoreLocal(data: any): data is FirestoreLocal {
  if (!data || typeof data !== 'object') return false;

  const requiredStrings = ['id', 'name', 'description', 'city'];
  for (const key of requiredStrings) {
    if (typeof data[key] !== 'string' || data[key].trim() === '') return false;
  }

  const validTypes = ['solo sin gluten', 'mixto'];
  if (!validTypes.includes(data.type)) return false;

  const validCategories = ['comida', 'insumos'];
  if (!validCategories.includes(data.category)) return false;

  if (!isValidOptionalField(data.address)) return false;
  if (!isValidOptionalField(data.phone)) return false;
  if (!isValidOptionalField(data.whatsapp)) return false;
  if (!isValidSocialNetworks(data.socialNetworks)) return false;

  return true;
}

function isValidOptionalField(value?: unknown): boolean {
  return (
    value === undefined ||
    (typeof value === 'string' && value.trim() !== '')
  );
}

function isValidSocialNetworks(value?: unknown): boolean {
  return (
    value === undefined ||
    (Array.isArray(value) && value.every(v => typeof v === 'string' && v.trim() !== ''))
  );
}
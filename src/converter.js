import { waterNeeded, lightNeeded, plantingPlace, months } from './constants';

export const plantingPlaceConvertor = place => {
  return plantingPlace[plantingPlace.findIndex(p => p.value === place)].label;
};

export const monthConvertor = month => {
  return months[months.findIndex(m => m.value === month)].label;
};

export const lightConvertor = light => {
  return lightNeeded[lightNeeded.findIndex(l => l.value === light)].label;
};

export const waterConvertor = water => {
  return waterNeeded[waterNeeded.findIndex(w => w.value === water)].label;
};

import type { Breed, BreedApi, RankedBreeds } from '@model/Breed.model';

export async function fetchDogBreeds(): Promise<Breed[]> {
  try {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const response = await fetch('breedsList.json', {
      headers: myHeaders,
    });

    const data = (await response.json()) as BreedApi[];

    if (data) {
      return data.map(computeBreed);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching dog breeds:', error);
    return [];
  }
}

const computeBreed: (breed: BreedApi) => Breed = (breed: BreedApi) => ({
  ...breed,
  id: breed.breed.replace(/\s+/g, '-').toLowerCase(),
  infoURI: breed.breed.replace(/\s+/g, '').toLowerCase(),
});

export function loadTierListStorage(): RankedBreeds {
  const savedList = localStorage.getItem('dogTierList');
  if (!savedList) return {};
  return JSON.parse(savedList);
}

export function saveTierListStorage(rankedBreeds: RankedBreeds) {
  localStorage.setItem('dogTierList', JSON.stringify(rankedBreeds));
}

export function resetTierListStorage() {
  if (confirm('Are you sure you want to reset your tier list? All rankings will be lost.')) {
    localStorage.removeItem('dogTierList');
  }
}

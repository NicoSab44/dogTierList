import { useEffect, useState } from 'react';
import type { Breed } from '@model/Breed.model';

export function useDogBreedImage(breed: Breed) {
  const [breedImage, setBreedImage] = useState('');

  useEffect(() => {
    if (breed.image) {
      setBreedImage(breed.image);
    } else {
      loadBreedImage(breed.id).then(image => {
        breed.image = image;
        setBreedImage(image);
      });
    }
  }, [breed]);

  return breedImage;
}

async function loadBreedImage(breedId: string) {
  const breedName = breedId.replace(/-/g, ' ');

  try {
    const apiBreedName = breedName.includes(' ') ? breedName.split(' ').reverse().join('/') : breedName;
    const response = await fetch(`https://dog.ceo/api/breed/${apiBreedName}/images/random`);
    const data = await response.json();

    if (data.status === 'success') {
      return data.message;
    }
  } catch (error) {
    console.error(`Error loading image for ${breedName}:`, error);
  }
}

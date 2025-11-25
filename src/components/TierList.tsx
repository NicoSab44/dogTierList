import { useContext, useMemo } from 'react';
import { DogBreedContext } from '@context/DogBreedContext';
import { TL_LEVELS, type RankedBreeds } from '@model/Breed.model';
import { TierListLevel } from './TierListLevel';

export function TierList() {
  const rankedBreeds: RankedBreeds = useContext<RankedBreeds>(DogBreedContext);

  const TierlistLevels = useMemo(
    () => TL_LEVELS.map((level, id) => <TierListLevel key={id} level={level} rankedBreeds={rankedBreeds[level]} />),
    [rankedBreeds],
  );

  return (
    <div className="bg-gray-600 rounded-2xl shadow-xl overflow-hidden mb-12">
      <div className="grid gap-4 p-4">{TierlistLevels}</div>
    </div>
  );
}

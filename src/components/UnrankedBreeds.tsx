import { DragEvent, useContext, useState } from 'react';
import { DogBreedContext } from '@context/DogBreedContext';
import { type RankedBreeds } from '@model/Breed.model';
import BreedCard from './BreedCard';

export function UnrankedBreeds() {
  const rankedBreeds = useContext<RankedBreeds>(DogBreedContext);
  const [isOnDrop, setOnDrop] = useState(false);

  const handleDrag = (event: DragEvent<HTMLDivElement>, start = true) => {
    setOnDrop(start);
    event.preventDefault();
  };

  const BreedCards = rankedBreeds?.unranked?.map(breed => <BreedCard key={breed.id} breed={breed} />);

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl overflow-hidden ${isOnDrop && 'drag-over'} `}
      onDragEnter={handleDrag}
      onDragLeave={event => handleDrag(event, false)}
      onDrop={event => {
        handleDrag(event, false);
      }}
      onDragOver={event => event.preventDefault()}>
      <div className="bg-gray-800 text-white font-bold p-4">
        <h2 className="text-xl holographic-bg">
          <i className="fas fa-paw mr-2"></i>Races non classées
        </h2>
        <p className="text-sm font-normal opacity-80 mt- holographic-bg1">
          Glissez les races d'ici vers le classement ci-dessus
        </p>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-3" id="unranked-breeds">
          {BreedCards}
        </div>
      </div>
    </div>
  );
}

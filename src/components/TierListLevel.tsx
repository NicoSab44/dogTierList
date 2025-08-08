import { DragEvent, useContext, useMemo, useState } from 'react';
import { DragDropContext } from '@context/DogBreedContext';
import { type Breed, type Level } from '@model/Breed.model';
import BreedCard from './BreedCard';

export function TierListLevel({ level, rankedBreeds }: { level: Level; rankedBreeds?: Breed[] }) {
  const draggedLevel = useContext(DragDropContext);
  const [isOnDrop, setOnDrop] = useState(false);

  const handleDrag = (event: DragEvent<HTMLDivElement>, start = true) => {
    setOnDrop(start);
    event.preventDefault();
  };

  const BreedCards = useMemo(
    () => rankedBreeds?.map((breed: Breed) => <BreedCard key={breed.id} breed={breed} level={level} />),
    [rankedBreeds, level],
  );

  return (
    <div className="flex items-center gap-4">
      <div
        className={`tier-labeltext-tier${level} bg-tier${level} py-3 rounded-lg text-center w-24 text-white font-bold`}>
        Niveau {level}
      </div>
      <div
        className={`tier-row bg-tier${level}/20 rounded-xl p-3 flex-1 flex flex-wrap gap-3 min-h-[100px] 
        ${isOnDrop && 'drag-over'} `}
        id={`tier-${level}`}
        onDragEnter={handleDrag}
        onDragLeave={event => handleDrag(event, false)}
        onDrop={event => {
          draggedLevel.current = level;
          handleDrag(event, false);
        }}
        onDragOver={event => event.preventDefault()}>
        {BreedCards}
      </div>
    </div>
  );
}

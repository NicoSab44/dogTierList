import { DragEvent, memo, useContext, useState } from 'react';
import { DispatchContext, DragDropContext } from '@context/DogBreedContext';
import { useDogBreedImage } from '@hooks/useDogBreedImage';
import { type Breed, type Level } from '@model/Breed.model';

function BreedCard({ breed, level }: { breed: Breed; level?: Level }) {
  console.log('--- CARD : ', breed.fr, level);

  const draggedLevel = useContext(DragDropContext);
  const [isOnDrop, setOnDrop] = useState(false);
  const moveBreed = useContext(DispatchContext);
  const breedImage = useDogBreedImage(breed);

  function handleDragStart(_event: DragEvent<HTMLDivElement>) {
    setOnDrop(true);
  }

  function handleDragEnd(_event: DragEvent<HTMLDivElement>) {
    moveBreed({ breed, levelFrom: level });
    draggedLevel.current = undefined;
    setOnDrop(false);
  }

  return (
    <div
      id={`breed-${breed.id}`}
      className={`${level === 'S' && 'holographic-bg card-shine-effect'} ${isOnDrop && 'opacity-50'}
      breed-card bg-white rounded-lg shadow-md cursor-move w-32 flex flex-col overflow-hidden`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <div
        id={`img-${breed.id}`}
        className="breed-image w-full h-24 bg-gray-200"
        style={{ backgroundImage: `url("${breedImage}")` }}></div>
      <div className="p-2 text-center font-medium text-gray-800 truncate">{breed.fr}</div>
      <a
        title={`Voir ${breed.fr}`}
        href={`https://www.dogbreedinfo.com/${breed.infoURI}.htm`}
        target="_blank"
        className="tier-label bg-unranked py-3 rounded-lg p-2 text-center font-medium text-gray-800 opacity-25 truncate hover:bg-gray-600 hover:opacity-75">
        Voir {breed.fr}
      </a>
    </div>
  );
}

export default memo(BreedCard);

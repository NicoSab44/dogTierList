import { type ActionDispatch, type RefObject } from 'react';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { TierList } from '@components/TierList';
import { UnrankedBreeds } from '@components/UnrankedBreeds';
import { DispatchContext, DogBreedContext, DragDropContext } from '@context/DogBreedContext';
import { useDogBreeds } from '@hooks/useDogBreeds';
import type { Level, MoveAction, RankedBreeds } from '@model/Breed.model';

function App() {
  const {
    rankedBreeds,
    moveBreed,
    resetBreeds,
    draggedLevel,
  }: {
    rankedBreeds: RankedBreeds;
    moveBreed: ActionDispatch<[action: MoveAction]>;
    resetBreeds: () => void;
    draggedLevel: RefObject<Level | undefined>;
  } = useDogBreeds();

  return (
    <>
      <DogBreedContext.Provider value={rankedBreeds}>
        {/* Header */}
        <Header resetBreeds={resetBreeds} />
        <DispatchContext.Provider value={moveBreed}>
          <DragDropContext.Provider value={draggedLevel}>
            {/* Tier List Container */}
            <TierList />
            {/* Unranked Breeds */}
            <UnrankedBreeds />
          </DragDropContext.Provider>
        </DispatchContext.Provider>
      </DogBreedContext.Provider>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;

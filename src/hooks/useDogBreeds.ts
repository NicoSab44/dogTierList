import { useCallback, useEffect, useReducer, useRef, type ActionDispatch, type RefObject } from 'react';
import type { Breed, BreedAction, Level, MoveAction, RankedBreeds } from '@model/Breed.model';
import { fetchDogBreeds, loadTierListStorage } from '@utils/dogs.util';

const reducer: (state: RankedBreeds, action: BreedAction) => RankedBreeds = (
  state: RankedBreeds,
  action: BreedAction,
) => {
  if (action.type === 'SET') {
    return action.breeds;
  } else if (action.type === 'MOVE') {
    const { levelFrom = 'unranked', levelTo = 'unranked', breed } = action;

    if (levelFrom === levelTo) return state;
    if (state[levelFrom]) {
      const removedBreedIndex = state[levelFrom]?.findIndex(({ id }: Breed) => id === breed.id);
      if (removedBreedIndex >= 0) state[levelFrom].splice(removedBreedIndex, 1);
    }
    return {
      ...state,
      [levelTo]: (state[levelTo] || []).concat(breed),
      [levelFrom]: (state[levelFrom] || []).slice(),
    };
  }
  return {};
};

export function useDogBreeds(): {
  rankedBreeds: RankedBreeds;
  moveBreed: ActionDispatch<[action: MoveAction]>;
  resetBreeds: () => void;
  draggedLevel: RefObject<Level | undefined>;
} {
  const draggedLevel = useRef<Level | undefined>(undefined);
  const [rankedBreeds, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    const ranked: RankedBreeds = loadTierListStorage();

    if (Object.values(ranked).length) {
      dispatch({ breeds: ranked, type: 'SET' });
    } else {
      fetchDogBreeds().then((breeds: Breed[]) => dispatch({ breeds: { unranked: breeds }, type: 'SET' }));
    }
  }, []);

  const resetBreeds = () => {
    const unrankedBreeds = Object.values(rankedBreeds).flat();

    dispatch({ breeds: { unranked: unrankedBreeds }, type: 'SET' });
  };

  const moveBreed = useCallback(({ breed, levelFrom }: MoveAction) => {
    dispatch({ breed, levelFrom, levelTo: draggedLevel.current, type: 'MOVE' });
  }, []);

  return { rankedBreeds, moveBreed, resetBreeds, draggedLevel };
}

import { createContext, type ActionDispatch, type RefObject } from 'react';
import type { Level, MoveAction, RankedBreeds } from '@model/Breed.model';

export const DogBreedContext = createContext<RankedBreeds>({});

export const DispatchContext = createContext<ActionDispatch<[action: MoveAction]>>(() => {});

export const DragDropContext = createContext<RefObject<Level | undefined>>({ current: undefined });

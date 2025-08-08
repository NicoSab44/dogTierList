export interface BreedApi {
  breed: string;
  fr: string;
}

export interface Breed extends BreedApi {
  id: string;
  image?: string;
  infoURI: string;
}

export const TL_LEVELS = ['S', 'A', 'B', 'C', 'D', 'F'] as const;

export type Level = (typeof TL_LEVELS)[number];

export type RankedBreeds = { [tierListLevel in Level | 'unranked']?: Breed[] };

export type BreedAction = BreedAction1 | BreedAction2;
export type MoveAction = {
  breed: Breed;
  levelFrom?: Level;
};
type BreedAction1 = {
  breed: Breed;
  levelFrom?: Level;
  levelTo?: Level;
  type: 'MOVE';
};
type BreedAction2 = {
  breeds: RankedBreeds;
  type: 'SET';
};

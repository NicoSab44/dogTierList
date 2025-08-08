import { useContext } from 'react';
import { DogBreedContext } from '@context/DogBreedContext';
import type { RankedBreeds } from '@model/Breed.model';
import { resetTierListStorage, saveTierListStorage } from '@utils/dogs.util';

export function Header({ resetBreeds }: { resetBreeds: () => void }) {
  const rankedBreeds: RankedBreeds = useContext<RankedBreeds>(DogBreedContext);

  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">Classement des Races de Chiens</h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Glissez-déposez les races de chiens pour les classer dans différents niveaux. Créez votre classement ultime !
      </p>
      <div className="mt-6">
        <button
          id="save-btn"
          onClick={() => {
            saveTierListStorage(rankedBreeds);
            alert('Classement sauvegardé avec succès !');
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md font-medium mr-3 transition">
          <i className="fas fa-save mr-2"></i>Sauvegarder
        </button>
        <button
          id="reset-btn"
          onClick={() => {
            resetTierListStorage();
            resetBreeds();
          }}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md font-medium transition">
          <i className="fas fa-redo mr-2"></i>Tout réinitialiser
        </button>
      </div>
    </header>
  );
}

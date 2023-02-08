import { createContext, useContext } from "react";
import { IPokemon } from "../Components/PokemonList/PokemonList";

export type GlobalContent = {
  searchValue: string,
  setSearchValue: (c: string) => void,
  searchResult: any,
  setSearchResult: (c: any) => void,
  selectedPokemon: IPokemon,
  setSelectedPokemon: (c: any) => void,
  actionType: 'edit' | 'add',
  setActionType: (c: any) => void,
  actionVisible: boolean,
  setActionVisible: (c: any) => void,
  alertMsg: [string, 'warning' | 'ok' | 'danger'],
  setAlertMsg: (c: any) => void,
  isAlertVisible: boolean,
  setAlertVisible: (c: any) => void,
}

export const GlobalContext = createContext<GlobalContent>({
  searchValue: 'test',
  setSearchValue: () => { },
  searchResult: [],
  setSearchResult: () => { },
  selectedPokemon: { id: 0, name: '' },
  setSelectedPokemon: () => { },
  actionType: 'add',
  setActionType: () => { },
  actionVisible: false,
  setActionVisible: () => { },
  alertMsg: ['', 'ok'],
  setAlertMsg: () => { },
  isAlertVisible: false,
  setAlertVisible: () => { },
})

export const useGlobalContext = () => useContext(GlobalContext)
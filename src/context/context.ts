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
})


// const PokemonProvider = (props:any) =>{
//     const [user, setUser] = useState({});
//     const {children} = props;

//     useEffect(() => {
//       GetUserInfo()
//       }, []);

//       async function  GetUserInfo(){ 
//         const Url =
//           "https://private-anon-44244cc0a3-aerolabchallenge.apiary-proxy.com/user/me";
//         const headers = {
//           method: "GET",
//           headers: new Headers({
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFhYzljZGI5NTIzZTAwMjA3ZTFmYzIiLCJpYXQiOjE2MDUwMjgzMDF9.AmLe0RxgByiXoIvSND0TFzRmZoN1DZQXFh2XAWt21bE",
//           }),
//         };
//         const response = await asyncFetch(Url, headers);
//         setUser(response)
//         return user;
//       }

//     return(
//         <GlobalContext.Provider value={[user,setUser,GetUserInfo]}>
//             {children}
//         </GlobalContext.Provider>
//     )
// }

export const useGlobalContext = () => useContext(GlobalContext)
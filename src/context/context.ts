import React, {createContext,useContext,useEffect,useState} from "react";
// import { asyncFetch } from "../utils/helpers";

export type GlobalContent = {
    searchValue: string,
    setSearchValue:(c: string) => void,
    searchResult: any,
    setsearchResult:(c: string) => void,
  }

export const GlobalContext = createContext<GlobalContent>({
    searchValue: 'test', 
    setSearchValue: () => {},
    searchResult: [],
    setsearchResult: () => {},
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
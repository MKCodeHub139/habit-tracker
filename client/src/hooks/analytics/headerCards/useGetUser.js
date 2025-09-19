import { useQuery } from "@apollo/client/react";
import {GetUser } from '../../../graphql/queries';
function useGetUser(){
    const {data:user,isLoading,isError} =useQuery(GetUser) 
    return {user,isLoading,isError}
}
export default useGetUser
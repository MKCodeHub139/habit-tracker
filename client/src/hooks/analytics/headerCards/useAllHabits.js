import {useQuery} from '@apollo/client/react'
import {GetHabits} from '../../../graphql/queries'

const useAllHabits = () => {
    const {data:habits, isLoading, isError} = useQuery(GetHabits,{
       variables: { userId: "68bacc259f8fdce8e0a209b2" },
      });
    return {habits, isLoading, isError}
}

export default useAllHabits
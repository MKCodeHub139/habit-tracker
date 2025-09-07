import { gql } from "@apollo/client";

const GetHabits =gql`
query GetHabits($userId: ID!) {
  getHabits(userId: $userId) {
    category
    completedDates
    frequency
    id
    selectedDays
    streak
    title
    user {
      email
      id
      name
    }
    userId
  }
}
`

export {GetHabits}
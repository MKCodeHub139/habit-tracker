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
    longestStreak
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
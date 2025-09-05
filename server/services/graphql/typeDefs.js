const typeDefs =`
scalar Date
type User{
    id:ID!
    name:String!
    email:String!
}
type Habit{
    id:ID!
    userId:ID!
    user:User
    title:String
    category:String
    frequency:String
    streak:Int
    selectedDays:[String]
    completedDates:[Date]
    }

type Query{
    getUser:[User]
    getHabits(userId:ID!):[Habit]
}
input CreateUserInput {
    name: String!
    email: String!
    password: String!
}

input CreateHabitInput {
    userId: ID!
    title: String!
    category: String
    frequency: String
    selectedDays: [String]
    completedDates: [Date]
}
input LoginUserInput{
    email:String!
    password:String!
}
type AuthPayload{
    token:String
}
type Mutation {
        createUser(input: CreateUserInput!): User
    createHabit(input: CreateHabitInput!): Habit
    loginUser(input:LoginUserInput!):AuthPayload
}

`

export default typeDefs
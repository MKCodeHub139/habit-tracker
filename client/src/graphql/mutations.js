import { gql } from "@apollo/client";

const CreateUser =gql`
mutation createUser($input:CreateUserInput!) {
  createUser(input:$input){
    id
    name
    email
  }
}
`
const LoginUser= gql`
mutation loginUser($input:LoginUserInput!){
loginUser(input:$input){
token
}
}
`

export {CreateUser,LoginUser}
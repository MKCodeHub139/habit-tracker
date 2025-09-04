import express from 'express';
import cors from 'cors'
import { ApolloServer } from '@apollo/server';
import  {expressMiddleware} from '@apollo/server/express4'
import typeDefs from './services/graphql/typeDefs.js';
import resolvers from './services/graphql/resolvers.js';
import cookieParser from 'cookie-parser';
import mongoDbConnect from './conf/conn.js';

const app =express()
const port =8000
mongoDbConnect('mongodb://127.0.0.1:27017/habit-tracker')
app.use(cookieParser())
const server = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers,
    introspection: true,
})
await server.start()
app.use('/graphql',cors(),express.json(),expressMiddleware(server,{
   context: async ({req,res})=> {
      const isIntrospection = req.body?.operationName === 'IntrospectionQuery';
    if (isIntrospection) return { req, res };
    let token =null
    token =req.cookies.token
    if(!token) throw new Error('envalid credencial')
        const user =await validateUser(token)
    if(!user) throw new Error('user not exists')

   return {req,res,user}
}
    
}   ))

app.listen(port,()=>console.log(`server starte at http://localhost:${8000}`))
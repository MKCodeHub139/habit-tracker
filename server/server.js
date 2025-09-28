import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import { ApolloServer } from '@apollo/server';
import  {expressMiddleware} from '@apollo/server/express4'
import typeDefs from './services/graphql/typeDefs.js';
import resolvers from './services/graphql/resolvers.js';
import cookieParser from 'cookie-parser';
import { validateUser } from './services/jwt/auth.js';
import mongoose from 'mongoose';

const app =express()
const port =process.env.PORT || 8000
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
app.use(cors({
  origin: "http://localhost:5173", // frontend ka origin
  credentials: true
}))
app.use(cookieParser())
const server = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers,
    introspection: true,
})
await server.start()
app.use('/graphql',express.json(),expressMiddleware(server,{
   context: async({req,res})=> {
       let token =null
      const isIntrospection = req.body?.operationName === 'IntrospectionQuery';
    if (isIntrospection) return { req, res };
    token =req?.cookies?.token
    if(token){
        const user = await validateUser(token)
        if(!user) throw new Error('user not exists')
            return {req,res,user}
    }
    return {req,res}
}
    
}   ))

app.listen(port,()=>console.log(`server starte at http://localhost:${8000}/graphql`))
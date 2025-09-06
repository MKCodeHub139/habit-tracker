import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import CreateHabit from './components/CreateHabit.jsx';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/create' element={<CreateHabit/>}/>
    </Route>
  )
)
const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8000/graphql" ,
       credentials: 'include'
  }),
  cache: new InMemoryCache(),
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router}>
    <App/>
      </RouterProvider>
    </ApolloProvider>
  </StrictMode>,
)

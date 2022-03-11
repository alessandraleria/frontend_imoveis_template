import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from 'hooks/UserContext';

export default function PrivateRoute(props) {
   const { user, isLoading } = useContext(UserContext);
   const { component: Component, ...rest } = props;
   if(isLoading) {
      console.log("Carregando")
   }
   if(user){
      return ( <Route {...rest} render={(props) => 
                (<Component {...props}/>)
            }
         />
       )}
   //redirect if there is no user 
   return <Navigate to='/login' />
}
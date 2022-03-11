import { useState, useEffect } from 'react';
import api from "../services/api";

export default function useFindUser() {
   const [user, setUser] = useState(null);
   const [isLoading, setLoading] = useState(true);
   useEffect(() => {
         async function findUser() {
         await api.get('/user')
            .then(res => {
            setUser(res.data.user);
            setLoading(false);
         }). catch(err => {
            setLoading(false);
         });
   }
      findUser();
   }, []);
   return {
      user,
      setUser,
      isLoading
      }
   }
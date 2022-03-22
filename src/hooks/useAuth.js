import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

import api from "../services/api";

export default function useAuth() {
    const navigate = useNavigate();
    const {user, setUser}  = useContext(UserContext);
    //set user in context and push them home
    const setUserContext = async () => {
        return await api.get('/auth/user').then(res => {
            setUser(res.data.user);
            console.log(res.data.user);
            navigate('/dashboard');
            }).catch((err) => {
                console.log(err);
        })
    }
    //register user
    const registerUser = async (data) => {
        const { username, email, password, passwordConfirm } = data;

        return api.post(`auth/register`, {
            username, email, password, passwordConfirm
        }).then(async () => {
            await setUserContext();
        }).catch((err) => {
            console.log(err);
        })
        };

    const loginUser = async (data) => {
            const {tokenId} = data;

            try {
                const response = await api.post("auth/google", {
                    token: tokenId
                });

                console.log(response.data.token);

                if(response.data.token){
                    api.defaults.headers.common['Authorization'] = response.data.token
                }
                await setUserContext();
                
            } catch (err) {
                console.log(err);
            }
    }

    const loginDefault = async (data) => {
        const {email, password} = data;

        try {
            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            console.log(response.data.token);

            if(response.data.token){
                api.defaults.headers.common['Authorization'] = response.data.token
            }
            await setUserContext();
            
        } catch (err) {
            console.log(err);
        }
}

    return {
        registerUser,
        loginUser,
        loginDefault
    }
}
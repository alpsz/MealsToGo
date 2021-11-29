import React, { useState, createContext } from 'react';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { onAuthStateChanged } from '@firebase/auth';
import { signOut } from '@firebase/auth'; 

import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // onAuthStateChanged((usr) => {
    //     if(usr) {
    //         setUser(usr);
    //         setIsLoading(false);
    //     }else{
    //         setIsLoading(false);
    //     }
    // })

    const onLogin = (email, password) => {
        setIsLoading(true);
        loginRequest(email, password).then((u) => {
            setUser(u);
            setIsLoading(true);
        }).catch((e) => {
            setIsLoading(false);
            setError(e.toString());
        });
    };

    const onRegister = (email, password, repeatedPassword) => {
        setIsLoading(true);
        if(password !== repeatedPassword) {
            setError("Error: Passwords do not match");
            return;
        }

        createUserWithEmailAndPassword(email, password)
        .then((u) => {
            setUser(u);
            setIsLoading(false);
        })
        .catch((e) => {
            setIsLoading(false);
            setError(e.toString());
        });
    }

    const onLogout = () => {
        setUser(null);
        signOut();
    }

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                isLoading,
                error,
                onLogin,
                onRegister,
                onLogout 
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}
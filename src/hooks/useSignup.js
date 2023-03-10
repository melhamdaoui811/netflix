import {useState} from "react";
import { auth ,db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useUserContext } from "../context/userContext";
import { addDoc, collection } from "firebase/firestore";

export const useSignup=()=>{
    const {dispatch} = useUserContext();

    const [error,setError]=useState(null);

    const signup = (email, password ) => {
         dispatch({type:"LOADING"})
        const ref=collection(db,"Users");
        setError(null);
        createUserWithEmailAndPassword(auth,email,password)
        .then(resp=>{
            addDoc(ref, { uid: resp.user.uid, mod: "light", likes: [] })
                .then(
              (res) => {
                dispatch({ type: "LOGIN", payload: resp.user });
                 
                
            }
            ).catch(err=>setError(err.message));
            
        })
        .catch(err=>{
            setError(err.message)
        })

         dispatch({type:"LOADMOD"})
    };
    return {error,signup}
}
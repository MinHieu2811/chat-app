import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Login from './login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase'
import Loading from '../components/Loading';
import { useEffect } from 'react';
import {doc, serverTimestamp, setDoc } from 'firebase/firestore';

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedInUser, loading, error] = useAuthState(auth)

  useEffect(() => {
    const setUserInDb = async () => {
      try{
        await setDoc(
          doc(db, 'users', loggedInUser?.email as string), {
            email: loggedInUser?.email,
            lastSeen: serverTimestamp(),
            photoURL: loggedInUser?.photoURL
          },
          {merge: true} // just update what is changed
        )
      }catch(err){
        console.log(err)
      }
    }

    if(loggedInUser) {
      setUserInDb()
    }
  }, [loggedInUser])

  if(loading) return <Loading />

  if(!loggedInUser) return <Login />

  return <Component {...pageProps} />
}

export default MyApp

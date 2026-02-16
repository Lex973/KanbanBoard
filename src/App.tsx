import './App.css'
import './fonts/fonts.css'
import AuthModal from "./Components/Modals/authModal/AuthModal.tsx";
import {isAuthenticated} from "./api/auth.ts";
import {useEffect, useState} from "react";
import Test from "./Components/test.tsx";

function App() {
    const [auth, setAuth] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth: boolean = await isAuthenticated()

            setAuth(isAuth)
        }

        checkAuth()
    }, [])
    console.log(auth);

    return (
    <>
        {auth ? <Test/> : <AuthModal/>}
    </>
  )
}

export default App

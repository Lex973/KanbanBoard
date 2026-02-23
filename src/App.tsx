import './App.css'
import './fonts/fonts.css'
import AuthModal from "./Components/Modals/AuthModal/AuthModal.tsx";
import {isAuthenticated} from "./api/auth.ts";
import {useEffect, useState} from "react";
import Loading from "./Components/Modals/Loading/Loading.tsx";
import Sidebar from "./Components/Layout/Sidebar/Sidebar.tsx";

function App() {
    const [auth, setAuth] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth: boolean = await isAuthenticated()
            console.log("Аутентифицирован: ", isAuth);
            setAuth(isAuth)
        }

        checkAuth()
    }, [])

    return (
    <>
        {auth === null && <Loading />}
        {auth === true && <Sidebar setAuth={setAuth}/>}
        {auth === false && <AuthModal setAuth={setAuth} />}
    </>
  )
}

export default App

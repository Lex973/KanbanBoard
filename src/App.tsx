import './App.css'
import './fonts/fonts.css'
import AuthModal from "./Components/Modals/AuthModal/AuthModal.tsx";
import {isAuthenticated} from "./api/auth.ts";
import {useEffect, useState} from "react";
import Loading from "./Components/Modals/Loading/Loading.tsx";
import Sidebar from "./Components/Layout/Sidebar/Sidebar.tsx";
import MainContent from "./Components/Layout/MainContent/MainContent.tsx";
import {Snowfall} from "react-snowfall";
import {createPortal} from "react-dom";
import {getUserData} from "./api/data.ts";
import {useFormState} from "./hooks/useFormState.ts";
import GlassNotify from "./Components/Modals/Notify/GlassNotify.tsx";
import type {CustomAuthResponseUserInfo} from "./types";
import BgCircle from "./Components/UI/BgCircle/BgCircle.tsx";
import {MantineProvider} from "@mantine/core";

function App() {
    const [auth, setAuth] = useState<boolean | null>(null);
    const [appReady, setAppReady] = useState<boolean>(false);
    const { handleError, notifyOpen, notifyMessage, notifyType } = useFormState();
    const [userData, setUserData] = useState<CustomAuthResponseUserInfo | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth: boolean = await isAuthenticated()
            setAuth(isAuth)
        }

        checkAuth()
    }, [])
    useEffect(() => {
        if (auth !== true) {
            setAppReady(true);
            return
        }

        const fetchUserData = async () => {
            try {
                const data = await getUserData();

                if (data.error) {
                    handleError(data.error);
                }

                setUserData(data);
            } catch (err) {
                handleError(err);
            } finally {
                setAppReady(true);
            }
        }

        fetchUserData()
    }, [auth]);


    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    return (
        <MantineProvider defaultColorScheme="dark">
            <div className="mainCont" onPointerMove={e => {
                setPosition({
                    x: e.clientX,
                    y: e.clientY,
                })
            }}>
                {createPortal(<BgCircle/>, document.body)}

                {createPortal(<Snowfall
                        style={{zIndex: -1, position: "fixed"}}
                        snowflakeCount={130}
                        speed={[1, 1.5]}
                        wind={[0.1, 0.1]}
                        radius={[0.5, 3]}
                    />,
                    document.body
                )}

                {(!appReady || auth === null) && createPortal(<Loading/>, document.body)}

                {appReady && auth === true &&
                    <>
                        <Sidebar setAuth={setAuth} userData={userData}/>
                        <MainContent />
                    </>
                }

                {auth === false && <AuthModal setAuth={setAuth} />}

                {notifyOpen && createPortal(
                    <GlassNotify open={notifyOpen} message={notifyMessage} type={notifyType}/>,
                    document.body
                )}

                <div className='blob-orange-main' style={{ transform: `translate(${position.x}px, ${position.y}px)`}}>
                </div>
            </div>
        </MantineProvider>
  )
}

export default App
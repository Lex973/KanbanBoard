import classes from './Sidebar.module.css';
import UserProfile from "./SideBarComponents/UserProfile.tsx";
import {motion} from "framer-motion";
import {getUserData} from "../../../api/data.ts";
import type {CustomAuthResponseUserInfo} from "../../../types";
import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import {logOut} from "../../../api/auth.ts";
import Loading from "../../Modals/Loading/Loading.tsx";
import {useFormState} from "../../../hooks/useFormState.ts";
import GlassNotify from "../../Modals/Notify/GlassNotify.tsx";
import Time from "./SideBarComponents/Time.tsx";
import Navigation from "./SideBarComponents/Navigation.tsx";

interface SidebarProps {
    setAuth: Dispatch<SetStateAction<boolean | null>>;
}

const Sidebar = ({setAuth}: SidebarProps) => {
    const { handleError, handleSuccess, notifyOpen, notifyMessage, notifyType } = useFormState()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {opacity: 1, x: 0, transition: { duration: 0.5, type: "spring" as const,}
        }
    }


    const [userData, setUserData] = useState<CustomAuthResponseUserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserData();

                if (data.error) {
                    handleError(data.error);
                } else {
                    handleSuccess("Вы успешно вошли в систему")
                }

                setUserData(data);
            } catch (err) {
                handleError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUserData()
    }, []);

    async function test() {
        setLoading(true);
        await logOut()
        setAuth(false);
    }

    return (
        <div>
            {loading ? <Loading/> : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <aside className={classes.sidebar}>
                        <motion.div variants={itemVariants}>
                            <div className={classes.logo}>QuickFlow</div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            {userData === null ? null : (<UserProfile userData={userData}/>)}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Time/>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Navigation/>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <button onClick={test}>Выйти</button>
                        </motion.div>
                    </aside>
                    {notifyOpen && <GlassNotify open={notifyOpen} message={notifyMessage} type={notifyType}/>}
                </motion.div>
            )}
        </div>
    );
};

export default Sidebar;
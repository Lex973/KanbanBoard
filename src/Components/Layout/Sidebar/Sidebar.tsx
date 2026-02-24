import classes from './Sidebar.module.css';
import UserProfile from "./SideBarComponents/UserProfile.tsx";
import {motion} from "framer-motion";
import {type Dispatch, type SetStateAction} from "react";
import {logOut} from "../../../api/auth.ts";
import Time from "./SideBarComponents/Time.tsx";
import Navigation from "./SideBarComponents/Navigation.tsx";
import type {CustomAuthResponseUserInfo} from "../../../types";

interface SidebarProps {
    setAuth: Dispatch<SetStateAction<boolean | null>>;
    userData: CustomAuthResponseUserInfo | null;
}

const Sidebar = ({setAuth, userData}: SidebarProps) => {

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



    async function test() {
        await logOut()
        setAuth(false);
    }

    return (
        <section className={classes.sidebarContainer}>
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

                </motion.div>
        </section>
    );
};

export default Sidebar;
import classes from './SidebarComponents.module.css';
import type {CustomAuthResponseUserInfo} from "../../../../types";

interface UserProfile {
    userData: CustomAuthResponseUserInfo | null;
}

const UserProfile = ({userData}: UserProfile) => {
    const userName = userData?.name ?? '';
    const userEmail = userData?.email ?? "example@mail.com";

    const parts = userName.trim().split(/\s+/);

    const logoName =
        parts.length >= 2
            ? `${parts[0][0]}${parts[1][0] ?? ''}`.toUpperCase()
            : `${parts[0]?.[0] ?? ''}${parts[0]?.[1] ?? ''}`.toUpperCase();

    return (
        <div className={classes.userProfileCont}>
            <div className={classes.userLogo}>{logoName}</div>

            <div className={classes.infoCont}>
                <p className={classes.userName}>{userName}</p>
                <p className={classes.userEmail}>{userEmail}</p>
            </div>
        </div>
    );
};

export default UserProfile;
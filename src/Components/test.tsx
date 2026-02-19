import {supabase} from "../supabase-client.ts";

const Test = () => {
    async function handleClick() {
        await supabase.auth.signOut()
        window.location.reload()
    }

    return (
        <div>
            вы зареганы епт

            <button style={{color: "white"}} onClick={handleClick}>Выйти</button>
        </div>
    );
};

export default Test;
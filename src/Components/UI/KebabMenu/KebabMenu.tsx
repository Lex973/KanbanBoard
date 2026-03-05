import './KebabMenu.css';
import {useEffect, useRef, useState} from "react";

const KebabMenu = () => {
    const [openMenu, setOpenMenu] = useState({
        openMainMenu: false,
        openSubMenu: false,
    });

    const element = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!openMenu.openMainMenu) return

        const onclick = function (event: MouseEvent) {
            const el = element.current;

            if (!el?.contains(event.target as Node)) {
                setOpenMenu({openMainMenu: false, openSubMenu: false})
            }
        }

        const onkeydown = function (event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setOpenMenu({openMainMenu: false, openSubMenu: false})
            }
        }

        document.addEventListener('click', onclick)
        document.addEventListener('keydown', onkeydown)

        return () => {
            document.removeEventListener('click', onclick)
            document.removeEventListener('keydown', onkeydown)
        }
    }, [openMenu.openMainMenu]);

    return (
        <div className="kebab-wrapper" ref={element}>
            <button
                className="kebab-btn"
                onClick={() => setOpenMenu(prevState => ({
                    ...prevState,
                    openMainMenu: !openMenu.openMainMenu,
                }))}
            >
                <span className="kebab-dot"/>
                <span className="kebab-dot"/>
                <span className="kebab-dot"/>
            </button>

            {openMenu.openMainMenu && (
                <div className="dropdown-menu">
                    <button className="danger">Очистить</button>
                    <button onClick={() => setOpenMenu(prevState => ({
                        ...prevState,
                        openSubMenu: !openMenu.openSubMenu,
                    }))}>Переместить в... →</button>

                    {openMenu.openSubMenu && (
                        <ul className='double-dropdown'>
                            <button>К выполнению</button>
                            <button>В процессе</button>
                            <button>Завершено</button>
                            <button>Архив</button>
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default KebabMenu;
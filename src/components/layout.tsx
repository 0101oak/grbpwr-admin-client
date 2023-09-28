import React, { FC, ReactNode } from "react";
import styles from 'styles/layout.scss'
import { useNavigate } from "@tanstack/react-location";
import { ROUTES } from "constants/routes";
import logo from 'img/tex-text.png'


interface LayoutProps {
    children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate({to: ROUTES.login, replace: true})
    }

    const handleMain = () => {
        navigate({to: ROUTES.main, replace: true})
    }

    return (
        <div className={styles.layout}>

            <div className={styles.layout_logo}>
                <img onClick={handleMain} src={logo} alt="LOGO" style={{width: "40px", height: "40px"}} />
            </div>

            <div className={styles.layout_content}>{children}</div>
            
            <div className={styles.layout_logout}>
                <button onClick={handleLogout} className={styles.logout_btn}>LOG OUT</button>
            </div>
            
        </div>
    )
}
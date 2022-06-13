import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import {useAuthContext} from "../../providers/auth.provider";
import api from "../../utils/api";
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader} from "react-pro-sidebar";
import {FaList} from "react-icons/fa"
import {
    FiArrowLeftCircle,
    FiArrowRightCircle,
    FiHome,
    FiLogOut,
} from "react-icons/fi"

import "react-pro-sidebar/dist/css/styles.css";
import './menu.css'
import MenuItemWrapper from "./menu-item";
import {BiHappyAlt} from "react-icons/bi";
import {BsUpload} from "react-icons/bs";

const StyledSideMenu = styled.div`
.small-logo {
}
.big-logo {
    p {
        img {
            width: 150px;
            height: 150px;
            border-radius: 75px;
            overflow: hidden;
            border-width: 3px;
        }
    }
}
.profile-collapsed {
    padding: 0 !important;
    .pro-icon-wrapper {
        margin-left: -17px !important;
    }
}
`;

const SideMenu = () => {
    const {logout} = useAuthContext();
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const [userAvatar, setUserAvatar] = useState('avatar');
    const [isAlbumActive, setIsAlbumActive] = useState(false);
    const [isProfileActive, setIsProfileActive] = useState(false);
    const [isUploaderActive, setIsUploaderActive] = useState(false);

    const handleActiveMenuItem = () => {

    }

    function logoutHandler() {
        logout();
        console.log('BEFORE LOGOUT');
        navigate("/");
    }

    useEffect(() => {
        const fetchData = async () => {
            const {data: res} = await api.get('dashboard/avatar/');
            setUserAvatar('http://localhost:8000' + res.images[0]);
        }
        fetchData().catch(console.error);
    }, [])

    const [menuCollapse, setMenuCollapse] = useState(false)

    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        setMenuCollapse(prevState => !prevState);
    };

    const handleProfile = () => {
        setIsAlbumActive(false);
        setIsUploaderActive(false);
        return true;
    }

    const handleAlbum = () => {
        setIsProfileActive(false);
        setIsUploaderActive(false);
        return true;
    }

    const handleUploader = () => {
        setIsProfileActive(false);
        setIsAlbumActive(false);
        return true;
    }

    return (
        <>
            <StyledSideMenu id="header">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <MenuItemWrapper title="Profile" to="profile">
                            <div onClick={() => {
                                setIsProfileActive(isProfileActive ? true : handleProfile)
                            }}
                                 className={`logotext ${isProfileActive ? 'active' : ''} ${menuCollapse ? 'small-logo' : "big-logo"}`}>
                                {/* small and big change using menucollapse state */}
                                <p>{menuCollapse ? (
                                    <Menu iconShape="square" className="profile-collapsed">
                                        <MenuItem icon={<BiHappyAlt/>}>
                                            Profile
                                        </MenuItem>
                                    </Menu>
                                ) : (<img src={`${userAvatar}`}/>)}</p>
                            </div>
                        </MenuItemWrapper>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <FiArrowRightCircle/>
                            ) : (
                                <FiArrowLeftCircle/>
                            )}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItemWrapper title="Album" to="album">
                                <MenuItem onClick={() => {
                                    setIsAlbumActive(isAlbumActive ? true : handleAlbum)
                                }} active={isAlbumActive} icon={<FaList/>}>
                                    Album
                                </MenuItem>
                            </MenuItemWrapper>
                            {user.is_photographer && (
                                <MenuItemWrapper title="Uploader" to="uploader">
                                    <MenuItem onClick={() => {
                                        setIsUploaderActive(isUploaderActive ? true : handleUploader)
                                    }} active={isUploaderActive} icon={<BsUpload/>}>
                                        Uploader
                                    </MenuItem>
                                </MenuItemWrapper>
                            )}
                            <MenuItemWrapper title="Home" to='main'>
                                <MenuItem icon={<FiHome/>}>
                                    Home
                                </MenuItem>
                            </MenuItemWrapper>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItemWrapper onClick={logoutHandler} title="Logout">
                                <MenuItem icon={<FiLogOut/>}>Logout</MenuItem>
                            </MenuItemWrapper>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </StyledSideMenu>
        </>
    );
};

export default SideMenu;
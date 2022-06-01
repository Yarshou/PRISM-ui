import React, {useState, useEffect} from "react";
import styled from "styled-components";
import api from "../../utils/api";
import ProfileHeader from "./profile-header";
// import {useAuthContext} from "../../providers/auth.provider";

const StyledUserProfilePage = styled.div`
    & > h1 {
        margin-left: auto;
        margin-right: auto;
        display: block;
        text-align: center;
    }
    .icon-profile {
        img {
            margin-left: auto;
            margin-right: auto;
            width: 150px;
            height: 200px;
            border-radius: 200px;
            overflow: hidden;
            border-width: 3px;
            display: block;
        }
    }
`;

const UserProfilePage = () => {


    return (
        <div className="h-screen">
            <div className="mt-14 shadow bg-white h-screen">
                <ProfileHeader/>
            </div>
        </div>
    )
};
export default UserProfilePage;
import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {useAuthContext} from "../../providers/auth.provider";
import Box from "@mui/material/Box";
import {Avatar, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FaInfo} from "react-icons/fa";
import {GrTextAlignFull} from "react-icons/gr";
import {CgProfile} from "react-icons/cg";
import Button from "@mui/material/Button";

const StyledHomePage = styled.div`
& > .header {
    height: 256px;
    padding: 24px;
    background: rgb(209,209,209);
    background: linear-gradient(180deg, rgba(241,241,241,1) 0%, rgba(255,255,255,1) 100%);
    & > .logo {
        img {
            margin-left: auto;
            margin-right: auto;
            display: block;
        }
    }
    h2 {
        text-transform: uppercase;
    }
    h2, p, .auth-section {
        text-align: center;
    }
    p {
        font-size: 30px;
        font-weight: 200;
        margin-top: 80px;
    }
}
.upload-body {
    height: 620px;
    border: solid;
    border-width: 1px;
    border-color: #ebebeb;
    box-shadow: 0 0 16px gainsboro;
}
`;

const MainPage = () => {
    const {user} = useAuthContext();
    console.log('USER IS ', user)

    return (
        <StyledHomePage>
            <div className="header">
                <div className="logo">
                    <img src="http://localhost:8000/media/ui_media/PRISM.png" alt="PRISM"/>
                </div>
                <br/>
                <br/>
                <p>This platform allows you to view your photos from events and automatically adds photos of where you
                    are in the album.</p>
            </div>
            <div className="upload-body">

            </div>

        </StyledHomePage>
    );
};

export default MainPage;
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../providers/auth.provider";

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
    .auth-section {
        padding-top: 15px;
        a {
            padding: 10px;
            background-color: #000;
            font-size: 1.2rem;
            border-radius: 3px;
            color: #dedede;
            text-decoration: none;
            text-transform: uppercase;
            &:hover {
                background-color: #333;
            }
            &:not(:first-child) {
                margin-left: 30px;
            }
        }
    }
}
`;

const HomePage = () => {
    const {user} = useAuthContext();
    console.log('USER IS ', user)

    return (
        <StyledHomePage>
            <div className="header">
                <div className="logo">
                    <img src="http://localhost:8000/media/ui_media/PRISM.png" alt="PRISM"/>
                </div><br/>
                <br/>
                <p>This platform allows you to view your photos from events and automatically adds photos of where you are in the album.</p>
                <div className="auth-section">
                    {user && user.token ? (
                        <Link to="/me">Dashboard</Link>
                    ) : (
                        <Link to="/auth">Authentication</Link>
                    )}
                </div>
            </div>
        </StyledHomePage>
    );
};

export default HomePage;
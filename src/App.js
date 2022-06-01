import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import SideMenu from "./components/menu/side-menu";
import HomePage from "./components/home.page";

const StyledApp = styled.div`
width: 100%;
& > .outlet {
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 1300px;
    border: solid;
    border-width: 1px;
    border-color: #ebebeb;
    box-shadow: 0 0 16px gainsboro;
}
`;

function App() {
    return (
        <StyledApp>
            <SideMenu />
            <div className="outlet">
                <Outlet />
            </div>
        </StyledApp>
    );
}

export default App;
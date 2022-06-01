import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";

import { matchPaths } from "./side-menu.service";

const StyledMenuItem = styled.div`
`;

const MenuItemWrapper = ({children, to, title, onClick, paths}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(matchPaths(location.pathname, to, paths))

    useEffect(() => {
        setIsActive(matchPaths(location.pathname, to, paths));
    }, [location, to])

    function open() {
        if (onClick) {
            onClick()
        } else {
            navigate(to);
        }
    }

    return (
        <StyledMenuItem
            active={isActive}
            tooltip={title}
            onClick={open}>
            {children}
        </StyledMenuItem>
    );
};

MenuItemWrapper.propTypes = {
    to: PropTypes.string,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default MenuItemWrapper;
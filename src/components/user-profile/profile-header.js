import React from 'react'
import {useEffect, useState} from "react";
import api from "../../utils/api";
import styled from "styled-components";
import {useAuthContext} from "../../providers/auth.provider";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Typography from "@mui/material/Typography";
import {MdExpandMore} from "react-icons/md";


const StyledProfileHeader = styled.div`
    & > h1 {
        margin-left: auto;
        margin-right: auto;
        display: block;
        text-align: center;
    }
    .icon-profile {
        background-color: #efefef;
        img {
            position: fixed;
            margin-left: 490px;
            margin-top: 30px;
            width: 350px;
            height: 350px;
            border-radius: 200px;
            overflow: hidden;
            border-width: 3px;
            display: block;
        }
    }
    .info {
        .username {
            width: 150px;
            margin-top: 200px;
            margin-left: 580px;
            display: inline-block;
        }
        .accordion {
            width: 500px;
            margin-top: 50px;
            margin-left: auto;
            margin-right: auto;
        }
        hr {
            width: 1300px;
        }
        height: 680px;
        border: solid;
        border-width: 1px;
        border-color: #ebebeb;
        box-shadow: 0 0 16px gainsboro;
    }
`;


function ProfileHeader() {

    const {user} = useAuthContext();

    const [userAvatar, setUserAvatar] = useState('avatar');

    useEffect(() => {
        const fetchData = async () => {
            const {data: res} = await api.get('dashboard/avatar/');
            setUserAvatar('http://localhost:8000' + res.images[0]);
        }
        fetchData().catch(console.error);
    }, [])
    const [expanded, setExpanded] = React.useState(false);

    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <StyledProfileHeader>
            <div className="icon-profile" style={{height: '200px'}}>
                <img src={`${userAvatar}`}/>
            </div>
            <div className="info">
                {/*<hr/>*/}
                <h1 className="username">
                    {user.username}
                </h1>
                <div className="accordion">
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                My email
                            </Typography>
                            <Typography sx={{color: 'text.secondary'}}>{user.email}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Change email
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore/>}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                Username
                            </Typography>
                            <Typography sx={{color: 'text.secondary'}}>
                                {user.username}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Change username
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore/>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>Created at</Typography>
                            <Typography sx={{color: 'text.secondary'}}>
                                {user.created_at}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                                varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                                laoreet.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore/>}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>Personal data</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                                amet egestas eros, vitae egestas augue. Duis vel est augue.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </StyledProfileHeader>
    );
};

export default ProfileHeader;
import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {useLocation, useNavigate} from "react-router-dom";
import api from "../../utils/api";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {Avatar} from "@mui/material";


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const StyledAlbumDetailPage = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 1300px;
    // background-color: #ebebeb;
    border: solid;
    border-width: 1px;
    border-color: #ebebeb;
    box-shadow: 0 0 16px gainsboro;
    .MuiBox-root {
        background-color: #efefef;  
    }
    .MuiCardContent-root {
        display: grid !important;
    }
    .MuiAvatar-root {
        margin-left: auto;
        margin-right: auto;
        display: inline;
    }
    .card-hover:hover {
        border: solid;
        border-width: 0px;
        border-color: #ebebeb;
        box-shadow: 2px 2px 16px #2e2c2c;
        overflow: visible;
    }
    h1.card-header {
        margin-left: auto;
        margin-right: auto;
        font-weight: 100;
        font-size: 15px;
    }
    .glow {
        transition: 0s box-shadow;
    }
    .glow:hover {
        box-shadow:
        0 0 2px 1px #fff,  /* inner white */
        0 0 3px 2px #fece00,  /* inner white */
        0 0 9px 3px #ffe172; /* outer cyan */
        transition: box-shadow 0.3s ease-in-out 0s;
    }
`


export default function AlbumDetailPage() {

    const location = useLocation();
    const event = location.pathname.split('/').pop();

    const navigate = useNavigate();

    const [eventPhotos, setEventPhotos] = useState([]);
    const [userAvatar, setUserAvatar] = useState({});

    useEffect(() => {
        getEventPhotos().catch(console.error);
    }, []);

    useEffect(() => {
        const promiseArr = eventPhotos.map((photo) => {
            return photo.users.map(user => getUserAvatar(user).then(avatar => ({ avatar, user })));
        });
        Promise.all(promiseArr.flat()).then(result => {
           const avatars = result.reduce((acc, avatar) => {
               if (avatar && avatar.avatar) {
                    acc[avatar.user] = avatar.avatar;
               }
               return acc;
           }, {});
            setUserAvatar(avatars);
        });
    }, [eventPhotos]);


    const getUserAvatar = async (user_id) => {
        const {data: res} = await api.get("dashboard/avatar/" + user_id);
        return "http://localhost:8000" + res.images[0];
    }

    const getEventPhotos = async () => {
        let ph_list = [];
        const {data: res} = await api.get(`dashboard/event/${event}`);
        res.map((ph) => {
            ph_list.push({'id': ph.id, 'img': `http://localhost:8000${ph.img}`, 'users': ph.users})
        })
        setEventPhotos(ph_list);
    }

    const getUserPhotos = async () => {
        let ph_list = [];
        const {data: res} = await api.get("dashboard/user-photos/" + event);
        res.images.map((image_obj) => {
            delete image_obj.event;
            image_obj.img = 'http://localhost:8000' + image_obj.img;
            ph_list.push(image_obj);
        })
        setEventPhotos(ph_list);
    }


    return (
        <StyledAlbumDetailPage>
            <CssBaseline/>
            <AppBar position="relative">

            </AppBar>
            <div className="main">
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            My gallery
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            <b>Photo - emotion.</b><br/>
                            Even the most polished, correctly built frame is something more than just a beautiful
                            picture.
                            Behind each picture is a spectrum of feelings and emotions - hidden and explicit.
                        </Typography>
                        <Stack
                            sx={{pt: 1}}
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                        >
                            <Button variant="outlined" onClick={getUserPhotos}>Show only my photos</Button>
                            <Button variant="outlined" onClick={getEventPhotos}>Show all event photos</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{py: 8}} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {eventPhotos.map((photo, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
                                >
                                    <CardMedia
                                        component="img"
                                        image={photo.img}
                                        alt="random"
                                        className="card-hover"
                                        onClick={() => {navigate('/me/album/photo/' + photo.id)}}
                                    />
                                    <CardContent sx={{flexGrow: 1}}>
                                        <h1 className="card-header">Recognized users</h1>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            <Stack direction="row" spacing={2} >
                                                {photo.users.map((id) => {
                                                    return (
                                                        <Avatar className="glow" key={id} alt="avatar" src={userAvatar[id]} onClick={() => {navigate('/me/profile/'+id)}}/>
                                                    )
                                                })}
                                            </Stack>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
            {/* Footer */}
            <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    PRISM
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright/>
            </Box>
            {/* End footer */}
        </StyledAlbumDetailPage>
    );
}
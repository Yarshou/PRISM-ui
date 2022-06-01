import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styled from 'styled-components'
import api from "../../utils/api";
import {useNavigate} from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const StyledAlbumPage = styled.div`
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
        // border: solid; 
        // border-width: 1px;
        // border-color: #ebebeb;    
    }
`


export default function AlbumPage() {

    const [eventList, setEventList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const {data: res} = await api.get('dashboard/event/');
            setEventList(res.events);
        }
        fetchData().catch(console.error);
    }, []);

    console.log('EVENTS', eventList)

    return (
        <StyledAlbumPage>
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
                            <Button variant="outlined">List all albums</Button>
                            {/*<Button variant="outlined">Secondary action</Button>*/}
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{py: 8}} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {eventList.map((event) => (
                            <Grid item key={event} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    />
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {event}
                                        </Typography>
                                        <Typography>
                                          You can view all the photos from this event by clicking the view button!
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => {navigate(event)}}>View</Button>
                                    </CardActions>
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
        </StyledAlbumPage>
    );
}
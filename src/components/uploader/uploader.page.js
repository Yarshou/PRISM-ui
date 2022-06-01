import React, {useState} from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components'
import {Avatar, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField} from "@mui/material";
// import withStyles from "@mui/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UploadService from "./uploader-service"
import {GrTextAlignFull} from "react-icons/gr";
import {FaInfo} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";


const StyledUploaderPage = styled.div`
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
    .upload-header {
        text-align: center;
        height: 200px;
        background-color: #efefef;
        h1 {
            margin-top: 70px;
            display: inline-flex;
        }
    }
    .upload-body {
        height: 680px;
        border: solid;
        border-width: 1px;
        border-color: #ebebeb;
        box-shadow: 0 0 16px gainsboro;
        .mg20 {
            margin: auto;
            width: 400px;
            margin-top: 50px;
            text-align: center;
            border: solid;
            border-color: #ebebeb;
            border-width: 1px;
            height: 400px;
            box-shadow: 0 0 16px;
            .btn-choose {
                border: 1px solid #cfcfcf;
                color: black;   
            }
            .uploader-description {
                margin: auto;
                width: 150px;
            }
        }
    }
`

export default function UploaderPage() {

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const upload = () => {
        setProgress(0);
        UploadService.upload(selectedFiles, selectedEvent, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        }).catch(() => {
            setProgress(0);
            setMessage("Could not upload file");
            setCurrentFile(undefined);
            setIsError(true);
        });
        setSelectedFiles(undefined);
    }

    return (
        <StyledUploaderPage>
            <div className="upload-header">
                <h1>
                    Upload Photos Page
                </h1>
            </div>
            <div className="upload-body">
                <div className="mg20">
                    {currentFile && (
                        <Box className="mb25" display="flex" alignItems="center">
                            <Box width="100%" mr={1}>
                                <LinearProgress variant="determinate" value={progress}/>
                            </Box>
                            <Box minWidth={35}>
                                <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
                            </Box>
                        </Box>)
                    }
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                          }}
                    >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FaInfo/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Info"
                                secondary="You could upload up to 10 photos, each photo handling would take some time"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <GrTextAlignFull/>
                                </Avatar>
                            </ListItemAvatar>
                            <TextField
                                size="small"
                                id="outlined-basic"
                                label="Event"
                                variant="outlined"
                                required
                                onChange={(event) => {setSelectedEvent(event.target.value)}}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <CgProfile/>
                                </Avatar>
                            </ListItemAvatar>
                            <label htmlFor="btn-upload">
                                <input
                                    multiple={true}
                                    id="btn-upload"
                                    name="btn-upload"
                                    style={{display: 'none'}}
                                    type="file"
                                    onChange={(event) => {setSelectedFiles(event.target.files)}}/>
                                <Button className="btn-choose" variant="outlined" component="span">
                                    Choose Files
                                </Button>
                            </label>
                        </ListItem>
                    </List>
                    <div className="file-name">
                        {
                            selectedFiles && Array.from(selectedFiles).map((file) => { return <b>{file.name}<br/></b>})
                        }
                    </div>
                    <Button
                        className="btn-upload"
                        color="success"
                        variant="contained"
                        component="span"
                        disabled={!selectedFiles}
                        onClick={upload}>
                        Upload
                    </Button>
                    <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                        {message}
                    </Typography>
                </div>
            </div>
        </StyledUploaderPage>
    );
}
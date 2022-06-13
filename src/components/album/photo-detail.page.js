import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {useLocation} from "react-router-dom";
import api from "../../utils/api";


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
    .rected-div:hover {
        border: 1px #ffff solid;
    }
    .rected-img {
    }
`

export default function PhotoPage() {

    const location = useLocation();
    const [photoPath, setPhotoPath] = useState('');
    const [details, setDetails] = useState({});
    const [coords, setCoords] = useState([]);
    const photo_id = location.pathname.split('/').pop();

    useEffect(() => {
        processPhoto();
        const img = document.getElementById('baboon').getBoundingClientRect();
        setCoords([img.top, img.left]);
    }, []);


    const processPhoto = async () => {
        const {data: result} = await api.get('photo/' + photo_id + '/detail/')
        setDetails(result);
        const {data: res} = await api.get('photo/' + photo_id);
        setPhotoPath(res.img)
    }

    const makeRequest = async (enc_id, locations, photo) => {
        const {data: res} = await api.post('dashboard/request/', {
            'enc_id': enc_id,
            'locations': locations,
            'photo_id': photo_id
        })
    }


    return (
        <StyledUploaderPage>
            <img className="rected-img" id='baboon' src={`http://localhost:8000${photoPath}`}/>
            {Object.keys(details).map((elem) => {
                    return <div onClick={() => {makeRequest(elem, details[elem], )}} className="rected-div" style={{
                        position: "absolute",
                        left: details[elem][3] + coords[1],
                        top: details[elem][0] + coords[0],
                        width: details[elem][1] - details[elem][3],
                        height: details[elem][2] - details[elem][0],
                    }}></div>
                }
            )}
        </StyledUploaderPage>
    );
}
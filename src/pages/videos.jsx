import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import {Button} from '@mui/material'

const Videos = () => {
    const API_Key = 'AIzaSyCJzhguqO7Pqcw_2qN-UkdSQUity3zxaGo'
    const PlaylistID = 'PLrV16pC7dwvzQn5z-aIbZj9Gtj3njScyq'
    const YT_PL_items = 'https://www.googleapis.com/youtube/v3/playlistItems'
    const videoResults =  axios.get(`${YT_PL_items}?part=snippet&playlistId=${PlaylistID}&key=${API_Key}`)

    const [videoArr, setVideoArr] = useState([])
    const Check =async()=> {
        await videoResults.then(videoResults => console.log(videoResults.data))
       setVideoArr(await videoResults.then(videoResults => videoResults.data).then(data => data.items))
       console.log(videoArr)
    }
    const handleVideoClick = (ID) => {
        window.open(`https://www.youtube.com/watch?v=${ID}`)
    }
    useEffect(() => {
    Check() 
    }, [])
    return (
        <div className='video-content-box' style={{
            'min-height' : '100vh'

            
        }}>
        <div className='video-container'>       {videoArr.map((item) => {
           const tom = item.snippet.title
           console.log(item.snippet.thumbnails.medium.url)
           return (
               <div className='video-item' onClick={ () => handleVideoClick(item.snippet.resourceId.videoId)}>
                  <img src={item.snippet.thumbnails.medium.url} style={{ 'margin' : '10px', 'width' : '60%' }} /> 
                   <h2>{tom}</h2>
               </div>
           )
       })}</div>
       
       </div>
    );
};

export default Videos;
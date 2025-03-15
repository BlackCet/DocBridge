import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './videoCall.css';

// import VideoRoom from "./VideoRoom.jsx";

const VideoCall = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = () => {
        // alert(input);
        navigate(`/VideoRoom/${input}`);
    };

    return (
        <div id="main-container">
            <div id="form-container">
                <p id="header-text">Join Video Call</p> {/* Added id for p tag */}
                <input 
                    id="name-input" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    type="text" 
                    placeholder='Enter your name' 
                />
                <button id="join-button" onClick={submitHandler}>Join</button>
            </div>
        </div>
    );
}

export default VideoCall;
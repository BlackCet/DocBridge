import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import './videoRoom.css'

const VideoRoom = () => {
    const { id } = useParams();
    const roomId = id;

    // Function to generate random ID (if needed)
    const randomID = (length) => {
        return Math.random().toString(36).substring(2, 2 + length);
    }

    useEffect(() => {
        const myMeeting = async (element) => {
            // generate Kit Token
            const appID = 1533970607;
            const serverSecret = "3354911b9fd2cc46c869a69f1dcd6038";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, randomID(5), randomID(5));

            // Create instance object from Kit Token.
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            // Start the call
            zp.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: 'Personal link',
                        url:
                            window.location.protocol + '//' +
                            window.location.host + window.location.pathname +
                            '?roomID=' + roomId,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall, // Group call mode
                },
            });
        };

        // Select the element by id and initialize the meeting
        const videoElement = document.getElementById('video-container');
        if (videoElement) {
            myMeeting(videoElement);
        }
    }, [roomId]);  // The effect depends on roomId

    return (
        <div id="video-container">
            {/* The video call interface will render here */}
        </div>
    );
}

export default VideoRoom;

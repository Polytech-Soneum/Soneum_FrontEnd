// test.js

import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import cv from 'opencv.js';

const Test = () => {
    const webcamRef = useRef(null);
    const [distance, setDistance] = useState(null);
    const [faceCascade, setFaceCascade] = useState(null);

    useEffect(() => {
        const loadFaceCascade = async () => {
            const classifier = new cv.CascadeClassifier();
            await classifier.load('haarcascade_frontalface_default.xml');
            setFaceCascade(classifier);
        };

        loadFaceCascade();

        return () => {
            if (faceCascade) {
                faceCascade.delete();
            }
        };
    }, []);

    useEffect(() => {
        const measureDistance = () => {
            const videoElement = webcamRef.current.video;
            if (!videoElement) return; // Ensure video element is available

            const frame = new cv.Mat(videoElement.height, videoElement.width, cv.CV_8UC4);
            const gray = new cv.Mat();
            frame.data.set(videoElement);

            cv.cvtColor(frame, gray, cv.COLOR_RGBA2GRAY);
            const faces = new cv.RectVector();
            faceCascade.detectMultiScale(gray, faces);

            if (faces.size() > 0) {
                const face = faces.get(0);
                const faceWidth = face.width;
                const focalLength = 706; // Adjust this value based on your camera setup and calibration
                const averageEyeWidth = 6.3; // Average eye width in centimeters
                const measuredDistance = (averageEyeWidth * focalLength) / faceWidth;
                setDistance(measuredDistance.toFixed(2));
            } else {
                setDistance(null);
            }

            frame.delete();
            gray.delete();
            faces.delete();
        };

        const intervalId = setInterval(measureDistance, 1000); // Measure distance every 1 second

        return () => {
            clearInterval(intervalId);
        };
    }, [faceCascade]);

    return (
        <div>
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <p>Distance from Camera: {distance ? `${distance} cm` : 'N/A'}</p>
        </div>
    );
};

export default Test;

//
//
// /*
// import Webcam from "react-webcam";
// import {useEffect, useState} from "react";
//
// function Test() {
//     const [deviceId, setDeviceId] = useState();
//     const deviceArray = [];
//
//     const deviceSelector = () => {
//         alert('select');
//     }
//
//     useEffect(() => {
//         const selector = document.getElementById('deviceSelector');
//
//         console.log(selector.firstChild);
//
//         while (selector.hasChildNodes())
//         {
//             selector.removeChild(selector.firstChild);
//         }
//
//         navigator.mediaDevices.enumerateDevices()
//             .then((devices) => {
//                 devices.forEach((device) => {
//                     if(device.kind==='videoinput') {
//                         const option = document.createElement('option');
//                         option.innerText = device.label;
//                         option.id = device.deviceId;
//                         option.setAttribute('class', 'camera_selector_option');
//
//                         deviceArray.push([device.deviceId, device.label]);
//                         document.getElementById('deviceSelector').appendChild(option);
//                     }
//                 });
//             })
//             .catch((error) => console.log(error));
//
//         console.log(deviceArray);
//     }, []);
//
//     return (
//         <div>
//             <Webcam videoConstraints={{deviceId: deviceId}}/>
//             <select className='camera_selector' id='deviceSelector' onChange={
//                 () => {
//                     const selector = document.getElementById('deviceSelector');
//                     setDeviceId(selector.options[selector.selectedIndex].value);
//                 }
//             }/>
//         </div>
//     );
// }
//
// export default Test;*/

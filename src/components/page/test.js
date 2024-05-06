// import React, { useRef, useEffect, useState } from 'react';
// import * as faceapi from 'face-api.js';
// import Webcam from 'react-webcam';
//
// function Test() {
//     const webcamRef = useRef(null);
//     const [distance, setDistance] = useState(null);
//
//     useEffect(() => {
//         async function loadModels() {
//             await Promise.all([
//                 faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//                 faceapi.nets.faceLandmark68Net.loadFromUri('/models')
//             ]);
//         }
//
//         loadModels();
//     }, []);
//
//     const calculateDistance = (face) => {
//         const pointLeft = face.landmarks.getLeftEye()[0];
//         const pointRight = face.landmarks.getRightEye()[0];
//         const w = Math.abs(pointLeft.x - pointRight.x);
//         const W = 6.3; // 평균 눈의 너비
//         const f = 706; // 픽셀 값을 실제 거리로 변환하기 위한 상수
//         const d = (W * f) / w;
//         return Math.round(d); // 소숫점 이하 자리 버림
//     };
//
//     const detectFace = async () => {
//         if (!webcamRef.current || !webcamRef.current.video) return;
//
//         const video = webcamRef.current.video;
//         const options = new faceapi.TinyFaceDetectorOptions();
//         const result = await faceapi.detectSingleFace(video, options).withFaceLandmarks();
//
//         if (result) {
//             const d = calculateDistance(result);
//             setDistance(d);
//         } else {
//             setDistance(null);
//         }
//     };
//
//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             detectFace();
//         }, 500);
//
//         return () => clearInterval(intervalId);
//     }, []);
//
//     return (
//         <div>
//             <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 width={640}
//                 height={480}
//                 screenshotFormat="image/jpeg"
//                 videoConstraints={{ facingMode: 'user' }}
//             />
//             {distance !== null && <p>Depth: {distance} cm</p>}
//         </div>
//     );
// }
//
// export default Test;

import Webcam from "react-webcam";
import {useEffect, useState} from "react";

function Test() {
    const [deviceId, setDeviceId] = useState();
    const deviceArray = [];

    const deviceSelector = () => {
        
    }

    useEffect(() => {
        const selector = document.getElementById('deviceSelector');

        while (selector.hasChildNodes())
        {
            selector.removeChild(selector.firstChild);
        }

        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                devices.forEach((device) => {
                    if(device.kind==='videoinput') {
                        const option = document.createElement('div');
                        option.innerText = device.label;
                        option.setAttribute('class', 'camera_selector_option');
                        option.setAttribute('onclick', deviceSelector);

                        deviceArray.push([device.deviceId, device.label]);
                        document.getElementById('deviceSelector').appendChild(option);
                    }
                });
            })
            .catch((error) => console.log(error));

        console.log(deviceArray);
    }, []);

    return (
        <div>
            <Webcam />
            <div className='camera_selector' id='deviceSelector' onClick={() => console.log('onclick')}>
            </div>
        </div>
    );
}

export default Test;
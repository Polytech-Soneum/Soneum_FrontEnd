

import Webcam from "react-webcam";
import {useEffect, useState} from "react";

function Test() {
    const [deviceId, setDeviceId] = useState();
    const deviceArray = [];

    const deviceSelector = () => {
        alert('select');
    }

    useEffect(() => {
        const selector = document.getElementById('deviceSelector');

        console.log(selector.firstChild);

        while (selector.hasChildNodes())
        {
            selector.removeChild(selector.firstChild);
        }

        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                devices.forEach((device) => {
                    if(device.kind==='videoinput') {
                        const option = document.createElement('option');
                        option.innerText = device.label;
                        option.id = device.deviceId;
                        option.setAttribute('class', 'camera_selector_option');

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
            <Webcam videoConstraints={{deviceId: deviceId}} mirrored={true}/>
            <select className='camera_selector' id='deviceSelector' onChange={
                () => {
                    const selector = document.getElementById('deviceSelector');
                    setDeviceId(selector.options[selector.selectedIndex].value);
                }
            }/>
        </div>
    );
}

export default Test;

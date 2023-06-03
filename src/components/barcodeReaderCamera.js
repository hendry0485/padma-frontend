import { useState, useEffect} from 'react';
import { BrowserMultiFormatReader, MultiFormatReader, BarcodeFormat } from '@zxing/library';
import { styled } from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import { IoCameraReverseOutline } from 'react-icons/io5';

const CameraContainer = styled.div`
    width:340px;
    padding:20px;
    margin:auto;
`;

const CameraBox = styled.div`
    width:300px;
    height:300px;
    border:1px solid gray;
    position:relative;
`

const CameraReverse = styled.div`
    height:30px;
    width:30px;
    text-align:center;
    background:gray;
    position:absolute;
    bottom:0;
    right:0;
    cursor:pointer;
`

const BarcodeReaderCamera = (props) => {

    const [result, setResult] = useState("");
    const [codeReader, setCodeReader] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState("")
    const [deviceId, setDeviceId] = useState("")
    const [devices, setDevices] = useState([]);  
    // alert(codeReader);

    const initZxing = () =>{
        const reader = new BrowserMultiFormatReader();
        // console.log(reader.listVideoInputDevices);
        reader.listVideoInputDevices()
        .then((videoInputDevices) => {
            setCodeReader(reader);
            setDevices(videoInputDevices);
            const idx = (videoInputDevices.length > 1 ? 1 : 0)
            setDeviceId(videoInputDevices[idx].deviceId);
            setSelectedDevice(idx);
            startDevice();
        }).then(()=>{
            startDevice();
        })
        .catch((err) => {
            console.error(err)
        });
    }

    const startDevice = () => {
        codeReader.decodeFromVideoDevice(deviceId, 'video', (resultV, err)=>{
            if (resultV) {
                setResult(resultV.toString());
            }
        });
    }

    const stopDevice = () => {
        codeReader.reset();
        props.handleClose();
    }

    const changeCamera = (newIndex) => {
        codeReader.reset();
        setSelectedDevice(newIndex);
        setDeviceId(devices[newIndex].deviceId);
    }

    const switchCamera = () => {
        codeReader.reset();
        let newIndex = parseInt(selectedDevice)+1;
        if(newIndex == (devices.length)){
            newIndex = 0;
        }
        setDeviceId(devices[newIndex].deviceId);
        setSelectedDevice(newIndex);

    }


    useEffect(() => {
        if (codeReader !== null) {
            startDevice(); 
        }else{
            initZxing();
        }
    }, [codeReader])

    useEffect(() => {
        if (codeReader !== null) {
            startDevice(); 
        }
    }, [deviceId])

    useEffect(() => {
        if (result.length > 0) {
            props.setCode(result);    
        }
    }, [result])
    

    
    return (
        <>
            <Modal show="true" 
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <CameraContainer >
                        <CameraBox>
                            <div>
                                <video id="video" style={{height:"300px",width:"300px", objectFit: "cover", objectPosition: "50% 50%"}} ></video>
                            </div>
                            { devices.length > 1 &&  <CameraReverse onClick={switchCamera}>
                                <IoCameraReverseOutline/>
                            </CameraReverse>}
                            {/* {codeReader !== null && <Camera setHasil={setHasil} device={selectedDevice} codeReader={codeReader} />} */}
                        </CameraBox>

                        <div className='my-3 d-grid'>
                            <Button variant='secondary' onClick={stopDevice}>Close</Button>
                        </div>

                        {/* <div id="sourceSelectPanel">
                            <label>Camera:</label>
                            <select defaultValue={deviceId} style={{maxWidth:'400px'}} onChange={(e)=>changeCamera(e.target.value)}>
                                {devices.map((device,index)=>{
                                return(<option key={index}
                                    value={index}>
                                    {device.label}
                                    </option>
                                )
                                })}
                            </select>
                        </div> */}

                        
                        {/* <div id="result"><label>Result:</label>{result}</div> */}
                    </CameraContainer>
                </Modal.Body>
            </Modal>
        </>
    )
}


export default BarcodeReaderCamera;
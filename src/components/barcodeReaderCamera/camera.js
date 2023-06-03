import { BrowserMultiFormatReader, MultiFormatReader, BarcodeFormat } from '@zxing/library';
import { styled } from 'styled-components';

const CameraBox = styled.video`
    width:100vw;
    height:100vw;
    border:"1px solid gray"`;

export default function Camera(props) {

    const codeReader = props.codeReader;

    const startDevice = () => {
        codeReader.decodeFromVideoDevice(props.device, 'video', (resultV, err)=>{
            if (resultV) {
                props.setHasil(resultV.toString());
            }
        });
    }

    useEffect(() => {
        startDevice();
    }, [])

    const changeCamera = (deviceId) => {
        SELECTED_DEVICE = deviceId;
        codeReader.reset();
        setTimeout(() => {
          startDevice();
        }, 500);
    }

    return (
        <>
            <CameraBox>
                {codeReader !== null && <Camera setHasil={setHasil} codeReader={codeReader} />}
            </CameraBox>
            <div>
                <button className="button" id="startButton" onClick={initZxing} style={{height:'40px', width:'100%', margin:"10px 0"}}>Init</button><br/>
                <button className="button" id="startButton" onClick={startDevice} style={{height:'40px', width:'100%', margin:"10px 0 "}}>Start</button><br/>
                <button className="button" id="resetButton" onClick={stopDevice} style={{height:'40px', width:'100%', margin:"10px 0"}}>Reset</button>
            </div>

            <div id="sourceSelectPanel">
                <label>Camera:</label>
                <select id="sourceSelect" defaultValue={selectedDevice} style={{maxWidth:'400px'}} onChange={(e)=>setSelectedDevice(e.target.value)}>
                    {devices.map((device,index)=>{
                    return(<option key={index}
                        value={device.deviceId}>
                        {device.label}
                        </option>
                    )
                    })}
                </select>
            </div> 
        </>
    )
}

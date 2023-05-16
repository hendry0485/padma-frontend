import { useState } from 'react';
import { FormControl, FloatingLabel } from 'react-bootstrap';
import Calendar from './calendar';

const DatepickerFloating = (props) => {

    const [toggle, setToggle] = useState(false);
    
    function toggleCalendar(toggle){
        setToggle(toggle);
    }
    
    return (

        <>
            <FloatingLabel controlId="floatingTanggal" label="tanggal" >
                <FormControl 
                        type="input"
                        readOnly
                        lang="id-ID"
                        id="tanggalInput"
                        name="tanggal"
                        onClick={()=>setToggle(true)}
                        value={props.tanggal}
                    />

            </FloatingLabel>
            {toggle && <Calendar setDateValue={props.setDateValue} toggleCalendar={toggleCalendar} dateSelected={props.tanggal} />}
        </>
    )
}

export default DatepickerFloating;

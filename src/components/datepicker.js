import { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { BsCalendarMonth,BsBuilding, BsSearch } from 'react-icons/bs';
import Calendar from './calendar';

const Datepicker = (props) => {

    const [toggle, setToggle] = useState(false);
    
    function toggleCalendar(toggle){
        setToggle(toggle);
    }
    
    return (

        <>
            <InputGroup >
                <InputGroup.Text><BsCalendarMonth/></InputGroup.Text>
                <FormControl 
                        type="input"
                        readOnly
                        lang="id-ID"
                        id="tanggalInput"
                        name="tanggal"
                        onClick={()=>setToggle(true)}
                        value={props.tanggal}
                    />

            </InputGroup>
            {toggle && <Calendar setDateValue={props.setDateValue} toggleCalendar={toggleCalendar} dateSelected={props.tanggal} />}
        </>
    )
}

export default Datepicker;

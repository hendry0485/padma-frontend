import { useState } from 'react';
import { styled } from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';


const Wrapper = styled.div`
    background:rgba(0,0,0,0.2);
    height:100vh;
    width:100vw;
    position:fixed;
    top:0;
    left:0;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    z-index:999;
`;
const Container = styled.div`
    height:300px;
    width:250px;
    padding:10px;
    background-color:brown;
    border-radius:5px;
    position:relative;
`;

const Closebutton = styled.div`
    position:absolute;
    top:5px;
    right:10px;
    cursor:pointer;
`;

const Arrow = styled.th`
    cursor:pointer;
`;

const Table = styled.table`
    
    margin:auto;
    margin-top:10px;
    text-align:center;
    font-size:14px;

    td{
        padding:3px;
        cursor:pointer;
    }
    
    .inactive{
        color:#ccc;
    }

    .selected{
        background:white;
        color:black;
        font-weight:bold;
    }

    th:hover{
        font-weight:bold;
    }
    th:active{
        background:orangered;
    }
    td:hover{
        background:orangered;
    }
    
`

const TableHeader = styled.th`
    padding:10px 0px;
`

const monthName = ["Januari","Februari","Maret","April","Mei","Juni","Juli", "Agustus","September", "Oktober", "November", "Desember"];

const createDateList = (tanggal) => {
    const sel = tanggal.split("/");
    const tglAwal = new Date(sel[2],sel[1]-1,1);	
    const tglAkhir = new Date(sel[2],sel[1],0);
    
    let tglAkhirBefore = new Date(sel[2],sel[1]-1,0).getDate();
    let mDay = tglAwal.getDay();;
    let week = [];
    let countWeek = 0;
    week[countWeek] = [];
    if(mDay > 0){
      for(let lo = mDay-1; lo >= 0; lo-- ){
        week[countWeek][lo] = tglAkhirBefore;
        tglAkhirBefore--;
      }
    }
      for (let lo = tglAwal.getDate(); lo <= tglAkhir.getDate(); lo++) {
      if(mDay > 6){
        mDay=0;
        countWeek++;
        week[countWeek] = [];
      }
      week[countWeek][mDay] = lo;
      mDay++;
      }
    
    if(mDay < 6){
      let s = 1;
      for(let lo = mDay; lo <= 6; lo++ ){
        week[countWeek][lo] = s;
        s++;
      }
    }
    
    return (week);
}

const Calendar = (props) => {

    let inactive = true;
    const getDate = new Date();
    const today = (getDate.getDate() < 10 ? '0'+getDate.getDate() : getDate.getDate() )+'/'+((getDate.getMonth()+1) < 10 ? '0' : "" )+(getDate.getMonth() + 1) + '/' + getDate.getFullYear();
    const dataTanggal = today.split("/");
    const initialValues = createDateList(today);

    const [monthIndex, setMonthIndex] = useState(parseInt(dataTanggal[1]-1));
    const [yearIndex, setYearIndex] = useState(dataTanggal[2]);
    const [dateList, setDateList] = useState(initialValues)

    const sel = today.split("/");

    // handle next month
    const nextMonth = (bulan) => {
        if (bulan == 11) {
            setYearIndex(parseInt(yearIndex)+1);
            setMonthIndex(0)
        }else{
            setMonthIndex(parseInt(bulan)+1);
        }
        const res = createDateList('01/'+(parseInt(bulan)+2)+'/'+yearIndex);
        setDateList(res);
    }
    
    // handle previous month
    const previousMonth = (bulan) => {
        if (bulan == 0) {
            setYearIndex(parseInt(yearIndex)-1);
            setMonthIndex(11)
        }else{
            setMonthIndex(parseInt(bulan)-1);
        }
        const res = createDateList('01/'+(parseInt(bulan))+'/'+yearIndex);
        setDateList(res);
    }

    // handle close calendar
    function handleToggle(){
        props.toggleCalendar(false);
    }

    function wrapperClick(e){
        if(e.target === e.currentTarget){
            handleToggle();
        }
    }

    function handleSelected(value){
        // const cell = event.target;
        // console.log(cell);
        // cell.classList.add("selected");
        props.setDateValue(value);
        setTimeout(() => {
            handleToggle();
        }, 100);
    }
    
    let bulan = monthIndex-1;

    
  return (
    <>
        <Wrapper onClick={(e)=>wrapperClick(e)} >
            <Container>
                <Closebutton onClick={()=>handleToggle()}><AiOutlineClose/></Closebutton>
                <Table>
                    <thead>
                        <tr>
                            <Arrow  style={{padding:'5px',paddingBottom:'15px'}} onClick={()=>previousMonth(monthIndex)}>&lt;&lt;</Arrow>
                            <th style={{padding:'5px',paddingBottom:'15px', width:'150px'}} colSpan='5'>{monthName[monthIndex]} {yearIndex}</th>
                            <Arrow style={{padding:'5px',paddingBottom:'15px'}}  onClick={()=>nextMonth(monthIndex)}>&gt;&gt;</Arrow>
                        </tr>
                        <tr>
                            <TableHeader>M</TableHeader>
                            <TableHeader>S</TableHeader>
                            <TableHeader>S</TableHeader>
                            <TableHeader>R</TableHeader>
                            <TableHeader>K</TableHeader>
                            <TableHeader>J</TableHeader>
                            <TableHeader>S</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        dateList.map((week, weekIndex)=>{
                            return(
                                <tr key={weekIndex}>
                                    {week.map((date,index)=>{
                                        if (date === 1) {
                                            inactive = !inactive;
                                            bulan++;
                                        }

                                        const tDate = `${(date<10?'0':'')+date}/${((bulan)<10?'0':'')+(bulan+1)}/${yearIndex}`;
                                        const selected = (props.dateSelected == tDate ? 'selected' : '');
                                        return(
                                            <td onClick={()=>handleSelected(tDate)} key={index} className={(inactive ? "inactive" : "")+' '+selected}>{date}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </Container>
        </Wrapper>
    </>
  )
}

export default Calendar;

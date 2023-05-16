import Breadcrumb from "react-bootstrap/Breadcrumb";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const BreadcrumbBar = (props) => {
    const p = props.breadcrumb.length;
    return (
        <>
            {p > 2 && props.breadcrumb[p] != '' ? (
                <Breadcrumb>
                    {
                        props.breadcrumb.map((breadcrumb,index)=>{
                            return(
                                ((index != 0 && index < (p-1)) ?
                                    <NavLink className="fs-5" to={'/'+breadcrumb}><BiArrowBack/> </NavLink>
                                : <></>
                            ))
                        })
                    }
                </Breadcrumb>
            ) : <></> }

        </>
    )
}
    
export default BreadcrumbBar;
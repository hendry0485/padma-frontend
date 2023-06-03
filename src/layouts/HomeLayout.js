import { Navigate, Outlet } from "react-router";
import { useAuthUser } from "../customHooks/useAuthUser";


const HomeLayout = () => {
  const {user} = useAuthUser();

  if (user) {
    return <Navigate to="/dashboard" />
  }
  
  return (
    <>
      <div id="pageContainer" >
        <Outlet/>
      </div>
    </>
  )
}

export default HomeLayout;
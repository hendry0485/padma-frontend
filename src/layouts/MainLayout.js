import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import "./mainLayout.css"
import { useAuthUser } from '../customHooks/useAuthUser';


const MainLayout = () => {
  const {user} = useAuthUser();

  if (!user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div id="pageContainer" >
        <Navbar/>
        <div id="pageContent" >
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default MainLayout;
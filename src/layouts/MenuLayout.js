import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import "./mainLayout.css"
import { useAuthUser } from '../customHooks/useAuthUser';

const MenuLayout = () => {
  const {user} = useAuthUser();

  if (!user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div id="pageContainer" >
        <Navbar/>
        <Outlet/>
      </div>
    </>
  )
}

export default MenuLayout;
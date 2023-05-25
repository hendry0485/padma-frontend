import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <>
      <div id="pageContainer" >
        <Outlet/>
      </div>
    </>
  )
}

export default HomeLayout;
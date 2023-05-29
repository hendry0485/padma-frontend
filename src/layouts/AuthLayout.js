import { Outlet } from "react-router";
import { AuthProvider } from "../customHooks/useAuthUser";

const AuthLayout = () => {
  
  return (
    <>
      <AuthProvider>
        <Outlet/>
      </AuthProvider>
    </>
  )
}

export default AuthLayout;
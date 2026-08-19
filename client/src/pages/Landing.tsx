import { useState } from "react"
import Navbar from "../components/ui/Navbar"
import LoginForm from "../features/auth/components/LoginForm"
import LandingContent from "../features/public/LandingContent"
import RegisterForm from "../features/auth/components/RegisterForm"

const Landing = () => {
  const [ isLogin, setIsLogin ] = useState(true);

  return (
    <main className="min-h-screen ">
      <div className="flex justify-center">

      <Navbar/>
      </div>
      <div className="flex justify-evenly items-center min-h-screen">
        <div className="flex justify-center items-center">
          <LandingContent/>
        </div>
        <div className="flex min-w-[550px] max-w-[600px] p-6 flex-col justify-center items-center rounded-3xl bg-white/15 backdrop-blur shadow-sm border border-black/10 ">
          <div className="flex gap-4 p-6 font-medium">
            <span className={`${isLogin && " border-b-4 border-orange-500 font-bold"}`} onClick={()=>setIsLogin(true)}>Login</span>
            <span className={`${!isLogin && "border-b-4 border-orange-500 font-bold"}`} onClick={()=>setIsLogin(false)}>Register</span>
          </div>
          {
            isLogin ? (<LoginForm />) : (<RegisterForm/>)
            
          }
        </div>
      </div>
    </main>
  )
}

export default Landing

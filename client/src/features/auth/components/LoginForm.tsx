
const LoginForm = () => {
  return (
    <div className="flex min-w-[550px] max-w-[600px] px-6 flex flex-col justify-center items-center">
      <form action="" className="w-[70%] flex flex-col justify-center gap-3">
        <label htmlFor="" className="px-2 text-gray-500 text-xs tracking-widest font-semibold">USERNAME/EMAIL</label>
        <input type="text" placeholder="email or username" className="w-full p-2 px-4 [box-shadow:inset_0_2px_8px_rgba(0,0,0,0.15)] rounded-3xl" />
        <label htmlFor="" className="px-2 text-gray-500 text-xs tracking-widest font-semibold">PASSWORD</label>
        <input type="password" placeholder="password" className="w-full p-2 px-4 [box-shadow:inset_0_2px_8px_rgba(0,0,0,0.15)] rounded-3xl" />
        <div className="p-1 px-4 ">
          <input type='checkbox' className=" outline-none focus:ring-0 ring-0 border-none [box-shadow:inset_0_2px_8px_rgba(0,0,0,0.18)]" />
          <span className="text-gray-500"> Rememeber me</span>
        </div>
        <button className="w-full bg-orange-500 shadow-md p-2 rounded-3xl font-semibold text-white hover:[box-shadow:inset_0_2px_8px_rgba(0,0,0,0.18)] ">Connect</button>
        <div className="flex items-center gap-2">
          <div className="w-full border-b border-gray-500"></div>
          <span className="text-orange-700 font-semibold">OR</span>
          <div className="w-full  border-b border-gray-500"></div>
        </div> 
        <button className="w-full bg-orange-500 shadow-md p-2 rounded-3xl font-semibold text-white hover:[box-shadow:inset_0_2px_8px_rgba(0,0,0,0.18)]">SignIn with Google</button>
      </form>
    </div>
  )
}

export default LoginForm

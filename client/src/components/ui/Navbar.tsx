const Navbar = () => {
  return (
    <div className=" relative top-4 w-[70%] flex px-20 py-4 justify-between h-12 [box-shadow:_0_2px_8px_rgba(0,0,0,0.12)] rounded-4xl">
      {/* logo */}
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold tracking-widest">
          SYNC<span className="text-orange-500">SPACE</span>
        </h1>
      </div>
      <div className="flex relative items-center ">
        <ul className="flex relative mr-0 ml-auto font-semibold gap-4 items-center">
          <li className="px-3 py-2 hover:[box-shadow:inset_0_2px_8px_rgba(0,0,0,0.08)] hover:bg-orange-400 hover:text-white rounded-3xl">Home</li>
          <li className="px-3 py-2 hover:[box-shadow:inset_0_2px_8px_rgba(0,0,0,0.08)] hover:bg-orange-400 hover:text-white rounded-3xl">How it works</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

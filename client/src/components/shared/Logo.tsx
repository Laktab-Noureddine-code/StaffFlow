import logo from "../../assets/logo.svg";

function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-8">
        <img src={logo} alt="Logo" className="w-full" />
      </div>
      <h1 className="text-2xl font-bold">
        Ness<span className="text-[#4ea376]">HR</span>
      </h1>
    </div>
  );
}

export default Logo;

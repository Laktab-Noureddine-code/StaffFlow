import ChangeLanguage from "./ChangeLanguage"
import Logo from "./Logo"

function Navbar() {
  return (
    <nav className="flex justify-between border border-gray-300 px-3 py-4">
        <Logo/>
        <ChangeLanguage/>
    </nav>
  )
}

export default Navbar
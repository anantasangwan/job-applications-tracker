import { Link, useNavigate } from "react-router"
import hamburger from "../assets/hamburger.svg";

const Navbar = ({ header, setShowSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className='flex items-center gap-3 max-xs:gap-1.5 px-5 py-2 max-xs:px-2 max-xs:py-1.5 font-montserrat shadow-md bg-white border-b border-b-charcoalTxt/15'>
      <img onClick={() => setShowSidebar(true)} src={hamburger} alt="" className="xl:hidden px-1 cursor-pointer" />

      <div className="page-heading text-charcoalTxt font-bold max-xs:text-[15.5px]">
        {header}
      </div>

      {header === "Add Application" ? (
        <button onClick={() => navigate(-1)} className='navBtn backBtn'>
          ⮜ &nbsp; Go Back
        </button>
      ) : (
        <Link to="/add-application" className='navBtn addBtn'>
          + Add Application
        </Link>
      )}
    </header>
  )
}

export default Navbar

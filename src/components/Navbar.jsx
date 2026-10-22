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
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11.5 18C11.5 18 5.50001 13.5811 5.5 12C5.49999 10.4188 11.5 6 11.5 6"></path>
            <path d="M18.5 18C18.5 18 12.5 13.5811 12.5 12C12.5 10.4188 18.5 6 18.5 6"></path>
          </svg>
          <span>Go Back</span>
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

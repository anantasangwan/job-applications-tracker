import logo from "../assets/logo.svg";
import circle from "../assets/circle.svg";
import applicationlist from "../assets/applicationlist.svg";
import calender from "../assets/calender.svg";
import cancel from "../assets/cancel.svg";
import { NavLink } from "react-router";

const Left = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className={showSidebar ? 'showSidebar sideBar' : 'sideBar'}>
      <div className="flex border-b border-b-charcoalTxt/15 px-4 py-6 max-sm:py-5">

        <div className="logo flex items-center gap-1 cursor-pointer self-center">
          <img width={45} height={45} src={logo} alt="" className="shrink-0" />
          <div className="flex flex-col justify-center">
            <p className="font-montserrat font-extrabold text-[24px] leading-3.5">JobTracker</p>
            <p className="font-bold text-[13px] text-charcoalTxt/65">CAREER DASHBOARD</p>
          </div>
        </div>

        <img onClick={()=>setShowSidebar(false)} src={cancel} alt="" className="xl:hidden h-6.75 w-6.75 ml-auto -m-2 -mt-3 self-start cursor-pointer" />
      </div>


      <div className="flex flex-col space-y-2.5 mb-6 max-sm:mb-3.5 w-full px-2 mt-7 max-sm:mt-5">
        <h3 className="text-[13px] font-bold text-charcoalTxt/80">OVERVIEW</h3>
        <NavLink to="/" onClick={()=>setShowSidebar(false)} className="navlink">
          <img src={circle} alt="" className="shrink-0" />
          Dashboard
        </NavLink>
      </div>

      <div className="flex flex-col space-y-2.5 w-full pl-2">
        <h3 className="text-[13px] font-bold text-charcoalTxt/80">MANAGE</h3>

        <NavLink to="/applications" onClick={()=>setShowSidebar(false)} className="navlink">
          <img src={applicationlist} alt="" className="shrink-0" />
          Applications
        </NavLink>

        <NavLink to="/follow-ups" onClick={()=>setShowSidebar(false)} className="navlink">
          <img src={calender} alt="" className="shrink-0" />
          Follow-ups
        </NavLink>
      </div>

      <div className="text-charcoalTxt text-sm text-center font-semibold p-3 pt-6 max-sm:pt-3.5 mt-auto mb-2 border-t border-t-charcoalTxt/15">
        • HTML • Tailwind CSS • React JS
      </div>
    </div>
  )
}

export default Left

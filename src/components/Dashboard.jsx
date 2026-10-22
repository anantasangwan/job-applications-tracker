import Navbar from './Navbar'
import Quote from './Quote'
import OverviewCards from './OverviewCards'
import ApplicationPipeline from './ApplicationPipeline'
import Activities from './Activities'

const Dashboard = ({ recents, statusCount, setShowSidebar }) => {
    return (
        <>
            <Navbar header="Dashboard" setShowSidebar={setShowSidebar} />

            <div className='w-full h-full px-5 max-sm:px-2.5 max-xs:px-0 mt-5 mb-8 space-y-3.5 max-sm:space-y-2.5'>
                <Quote />

                <div className="space-y-0 py-1.5 mx-7 max-sm:mx-2.5">
                    <p className="text-xl max-xs:text-[18px] font-montserrat font-bold">Your job search, all in one place.</p>
                    <p className="text-sm text-charcoalTxt/80 font-semibold ml-2 italic">Track applications, stay on top of follow-ups, and move closer to your next opportunity.</p>
                </div>

                <OverviewCards statusCount={statusCount} />

                <div className='w-[97%] max-sm:w-full flex gap-4 max-2md:flex-col max-2md:gap-0 pb-5'>
                    <ApplicationPipeline statusCount={statusCount} />
                    <Activities recents={recents} />
                </div>
            </div>
        </>
    )
}

export default Dashboard

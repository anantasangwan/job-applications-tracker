import Navbar from './Navbar'
import Quote from './Quote'
import OverviewCards from './OverviewCards'
import ApplicationPipeline from './ApplicationPipeline'
import Activities from './Activities'

const Dashboard = ({recents, statusCount, setShowSidebar}) => {
    return (
        <>
            <Navbar header="Dashboard" setShowSidebar={setShowSidebar} />

            <div className='w-full h-full px-5 max-sm:px-2.5 max-xs:px-0 mt-5 mb-8 space-y-3.5 max-xs:space-y-2.5'>
                <Quote />

                <div className='font-mono text-center text-shadow-2xs p-2'>
                    Welcome to your Job Tracker Dashboard. Let's make your job search more organized and effective.
                </div>

                <OverviewCards statusCount={statusCount}/>

                <div className='w-[97%] max-sm:w-full flex gap-4 max-2md:flex-col max-2md:gap-0'>
                    <ApplicationPipeline statusCount={statusCount}/>
                    <Activities recents={recents}/>
                </div>
            </div>
        </>
    )
}

export default Dashboard

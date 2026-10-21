import Navbar from './Navbar'
import AppliTable from './AppliTable'
import StatusUpdateModal from './StatusUpdateModal'
import { useState } from 'react'

const Applications = ({ applications, setApplications, setStatusCount, setShowSidebar }) => {
    const [status, setStatus] = useState("all");
    const [modal, setModal] = useState({ show: false, appli: null });

    const handleStatusUpdate = (id) => {
        setModal({ show: true, appli: applications.find(appli => appli.id === id) });
    }

    return (
        <>
            <Navbar header="Applications" setShowSidebar={setShowSidebar} />

            <div className="space-y-0.5 mt-7 max-xs:mt-4 mx-7 max-xs:mx-3.5">
                <h2 className="text-xl font-montserrat font-bold">Job Application Hub</h2>
                <p className="text-sm text-charcoalTxt/80 font-semibold ml-2 italic">Your applications, organized in one place.</p>
            </div>

            <div className="filters px-7 mt-5.5 max-xs:px-3.5 space-y-1.5">
                <h2 className='text-[18px] font-semibold'>Application status</h2>
                <div className="flex gap-2 items-center ml-1.5 overflow-x-scroll scrollbar-none">
                    <button onClick={() => setStatus("all")}
                        className={status === "all" ? 'filterBtn' : ''}>
                        All
                    </button>
                    <button onClick={() => setStatus("applied")}
                        className={status === "applied" ? 'filterBtn' : ''}>
                        Applied
                    </button>
                    <button onClick={() => setStatus("shortlisted")}
                        className={status === "shortlisted" ? 'filterBtn' : ''}>
                        Shortlisted
                    </button>
                    <button onClick={() => setStatus("interview")}
                        className={status === "interview" ? 'filterBtn' : ''}>
                        Interview
                    </button>
                    <button onClick={() => setStatus("selected")}
                        className={status === "selected" ? 'filterBtn' : ''}>
                        Selected
                    </button>
                    <button onClick={() => setStatus("rejected")}
                        className={status === "rejected" ? 'filterBtn' : ''}>
                        Rejected
                    </button>
                </div>
                <div className="text-[15px] mt-4 font-semibold text-charcoalTxt">
                    Selected filter: {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
            </div>

            <div className="w-full overflow-x-scroll scrollbar-none px-5 my-1 self-center">
                <table>
                    <thead className='border-b border-b-charcoalTxt/10'>
                        <tr>
                            <th className="rounded-tl-lg">Company</th>
                            <th>Location</th>
                            <th>Position</th>
                            <th>Status</th>
                            <th>Applied Date</th>
                            <th>Follow Up Date</th>
                            <th className="rounded-tr-lg">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AppliTable applications={applications} status={status} handleStatusUpdate={handleStatusUpdate} />
                    </tbody>
                </table>
            </div>

            <StatusUpdateModal modal={modal} setModal={setModal} setApplications={setApplications} setStatusCount={setStatusCount} />
        </>
    )
}

export default Applications

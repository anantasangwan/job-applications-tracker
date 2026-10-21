import { useState } from "react";
import Navbar from "./Navbar"
import FollowupTable from "./FollowupTable";
import SummaryCard from "./SummaryCard";
import RescheduleModal from "./RescheduleModal";
import duetodayImg from "../assets/duetoday.svg";
import pendingImg from "../assets/pending.svg";
import overdueImg from "../assets/overdue.svg";
import completedImg from "../assets/completed.svg";

const FollowUps = ({ applications, setApplications, setShowSidebar }) => {
    const [status, setStatus] = useState("all");
    const [modal, setModal] = useState({ show: false, appli: null });

    // === triggered on 'Mark Completed' btn click ===
    const handleCompletion = (id) => {
        // --- updates the matching application ---
        setApplications((applications) => {
            return applications.map(appli =>
                appli.id === id ? { ...appli, followUpCompleted: true } : appli
            );
        })
    }

    // === triggered on 'Reschedule' btn click ===
    const handleReschedule = (id) => {
        setModal({ show: true, appli: applications.find(appli => appli.id === id) });
    }

    // -- format yyyy-mm-dd --
    const now = new Date();
    const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0")
    ].join("-");

    // Pending follow-ups whose date is comming
    const upcoming = applications.filter(app =>
        app.followUpDate && !app.followUpCompleted &&
        app.followUpDate > today
    );

    // Follow-ups that have been completed.
    const completed = applications.filter(app =>
        app.followUpDate && app.followUpCompleted
    );

    // Pending follow-ups whose date matches today's date
    const duetoday = applications.filter(app =>
        app.followUpDate && !app.followUpCompleted &&
        app.followUpDate === today
    );

    // Pending follow-ups whose date has gone
    const overdue = applications.filter(app =>
        app.followUpDate && !app.followUpCompleted &&
        app.followUpDate < today
    );

    const choices = {
        upcoming: { bg: "#D9E2FC", bt: "#3160ed", border: "#82a0fb", textColor: "#3160ed", text: "Upcoming" },
        overdue: { bg: "#FADFDB", bt: "#fb3618", border: "#fb7863", textColor: "#B42318", text: "Overdue" },
        duetoday: { bg: "#fcd9ef", bt: "#ea159c", border: "#fd58c0", textColor: "#cd0885", text: "Due Today" },
        completed: { bg: "#DCF4DA", bt: "#0e9a02", border: "#68d85e", textColor: "#267A30", text: "Completed" }
    };

    return (
        <>
            <Navbar header="Follow-ups" setShowSidebar={setShowSidebar} />

            <div className="space-y-0.5 mt-7 mx-7 max-xs:mx-3.5 max-sm:mt-6 max-xs:mt-3.5">
                <h2 className="text-xl font-montserrat font-bold">Keep the Conversation Going</h2>
                <p className="text-sm text-charcoalTxt/80 font-semibold ml-2 italic">Track upcoming follow-ups and stay connected with recruiters throughout your job search.</p>
            </div>

            <div className="w-[97%] grid grid-cols-4 max-2md:grid-cols-2 max-2md:w-[99%] max-xs:grid-cols-1 gap-3.5 p-5 max-xs:px-3">
                <SummaryCard bg={choices.upcoming.bg} bt={choices.upcoming.bt} src={pendingImg} value={upcoming.length + overdue.length + duetoday.length} text="Pending" />
                <SummaryCard bg={choices.overdue.bg} bt={choices.overdue.bt} src={overdueImg} value={overdue.length} text="Overdue" />
                <SummaryCard bg={choices.duetoday.bg} bt={choices.duetoday.bt} src={duetodayImg} value={duetoday.length} text="Due Today" />
                <SummaryCard bg={choices.completed.bg} bt={choices.completed.bt} src={completedImg} value={completed.length} text="Completed" />
            </div>

            <div className="filters px-7 max-xs:px-4 mt-2.5 space-y-1.5">
                <h2 className='text-[18px] font-semibold'>Your Follow-ups</h2>

                <div className="flex gap-2 items-center ml-1.5 overflow-x-scroll scrollbar-none">
                    <button onClick={() => setStatus("all")}
                        className={status === "all" ? 'filterBtn' : ''}>
                        All
                    </button>
                    <button onClick={() => setStatus("upcoming")}
                        className={status === "upcoming" ? 'filterBtn' : ''}>
                        Upcoming
                    </button>
                    <button onClick={() => setStatus("overdue")}
                        className={status === "overdue" ? 'filterBtn' : ''}>
                        Overdue
                    </button>
                    <button onClick={() => setStatus("duetoday")}
                        className={status === "duetoday" ? 'filterBtn' : ''}>
                        Due Today
                    </button>
                    <button onClick={() => setStatus("completed")}
                        className={status === "completed" ? 'filterBtn' : ''}>
                        Completed
                    </button>
                </div>

                <div className="text-[15px] mt-4 font-semibold text-charcoalTxt">
                    Showing:
                    {status === "all" && ` ${upcoming.length + overdue.length + duetoday.length + completed.length} Follow-ups`}
                    {status === "upcoming" && ` ${upcoming.length} Upcoming`}
                    {status === "overdue" && ` ${overdue.length} Overdue`}
                    {status === "duetoday" && ` ${duetoday.length} Due Today`}
                    {status === "completed" && ` ${completed.length} Completed`}
                </div>
            </div>

            <div className="w-full overflow-x-scroll scrollbar-none px-5 max-xs:px-3 my-1 self-center">
                <table style={{minWidth: "800px"}}>
                    <thead className='border-b border-b-charcoalTxt/10'>
                        <tr>
                            <th className="rounded-tl-lg">Company</th>
                            <th>Position</th>
                            <th>Follow Up Date</th>
                            <th>Status</th>
                            <th className="rounded-tr-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length === 0 ?
                            (<tr>
                                <td colSpan={5} style={{ textAlign: "center", padding: "40px" }}>
                                    <p style={{ fontSize: "19px" }}>No applications yet.</p>
                                    <p style={{ fontSize: "15px" }}>Add your first application to get started!</p>
                                </td>
                            </tr>) :
                            <FollowupTable followups={{ upcoming, overdue, duetoday, completed }} status={status} choices={choices} handleCompletion={handleCompletion} handleReschedule={handleReschedule} />
                        }
                    </tbody>
                </table>
            </div>

            <RescheduleModal modal={modal} setModal={setModal} setApplications={setApplications} />
        </>
    )
}

export default FollowUps

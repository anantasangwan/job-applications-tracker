import cancel from "../assets/cancel.svg";
import { useRef } from "react";

const StatusUpdateModal = ({ modal, setModal, setApplications }) => {
    const inputRef = useRef();

    const handleSave = () => {
        const oldStatus = modal.appli.status;
        const newStatus = inputRef.current.value;

        if (!newStatus || !modal.appli) return;
        if (newStatus === oldStatus) {
            setModal({ show: false, appli: null });
            return;
        }

        setApplications((applications) => {
            // --- update the status + addedOn date (recents display) of the matching application ---
            const updated = applications.map(appli =>
                appli.id === modal.appli.id
                    ? {
                        ...appli,
                        status: newStatus,
                        addedOn: new Date().toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "2-digit"
                        })
                    }
                    : appli
            );

            // --- move it to index 0 ---
            const matched = updated.find(appli => appli.id === modal.appli.id);

            return [
                matched,
                ...updated.filter(appli => appli.id !== modal.appli.id)
            ];
        })

        setModal({ show: false, appli: null });
    }

    return modal.show && (
        // --- container - covers the whole page ---
        <div className='fixed inset-0 bg-black/25 z-40 backdrop-blur-sm flex items-center justify-center'>
            {/* --- card - display the content --- */}
            <div className="inputDiv font-montserrat z-50 w-[50%] max-md:w-[90%] h-fit bg-white rounded-lg flex flex-col gap-3 py-6 px-9">

                <img src={cancel} alt="" onClick={() => setModal({ show: false, appli: null })} className="h-6 w-6 ml-auto mt-2 cursor-pointer hover:scale-95 transition-all duration-150 ease-in-out" />
                <h2 className="text-[20px] font-bold">Update Status</h2>
                <h5 className="text-[17px] font-semibold italic text-charcoalTxt mb-4">
                    {modal.appli.company} • {modal.appli.position}
                </h5>
                <h4 className="text-charcoalTxt font-semibold ml-2">New application status</h4>

                <select ref={inputRef} defaultValue={modal.appli.status} style={{ padding: "9px", fontSize: "18px", fontWeight: "600" }} >
                    <option value="" disabled>--- Select Status ---</option>
                    <option value="applied">Applied</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="interview">Interview</option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                </select>

                <div className="ml-auto flex items-center gap-1.5">
                    <button onClick={() => setModal({ show: false, appli: null })} className="backBtn" style={{ marginTop: "24px", marginBottom: "19px" }}>
                        Cancel
                    </button>
                    <button onClick={handleSave} className="addBtn" style={{ marginTop: "24px", marginBottom: "19px" }}>
                        Save Changes
                    </button>
                </div>
            </div>

        </div>
    )
}

export default StatusUpdateModal

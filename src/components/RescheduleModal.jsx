import cancel from "../assets/cancel.svg";
import { useRef } from "react";

const RescheduleModal = ({ modal, setModal, setApplications }) => {
    const inputRef = useRef();

    // -- format yyyy-mm-dd --
    const now = new Date();
    const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0")
    ].join("-");

    const handleSave = () => {
        const newDate = inputRef.current.value;
        if (!newDate || newDate < today) return;

        // --- updates the matching application ---
        setApplications((applications) => {
            return applications.map(appli =>
                appli.id === modal.appli.id ?
                    { ...appli, followUpDate: newDate, followUpCompleted: false } :
                    appli
            );
        })

        setModal({ show: false, appli: null });
    }

    return modal.show && (
        // --- container - covers the whole page ---
        <div className='fixed inset-0 bg-black/25 z-40 backdrop-blur-sm flex items-center justify-center'>
            {/* --- card - display the content --- */}
            <div className="rounded-2xl font-montserrat z-50 w-[50%] max-md:w-[90%] h-fit bg-white flex flex-col gap-1 py-3 px-9 max-sm:px-3.5">

                <img src={cancel} alt="" onClick={() => setModal({ show: false, appli: null })} className="h-6 w-6 ml-auto mt-2 -mb-3.5 shrink-0 cursor-pointer hover:scale-95 transition-all duration-150 ease-in-out" />
                <h2 className="text-[20px] max-xs:text-[18px] font-bold">Reschedule Follow-up</h2>
                <h5 className="text-[17px] max-xs:text-base font-semibold italic text-charcoalTxt mb-4">
                    {modal.appli.company} • {modal.appli.position}
                </h5>
                <h4 className="text-charcoalTxt font-semibold max-xs:text-sm ml-2">New follow-up date</h4>

                <input ref={inputRef}
                    type="date"
                    min={today}
                    defaultValue={modal.appli.followUpDate}
                    required
                    style={{ padding: "9px", fontSize: "18px", fontWeight: "600" }}
                    className="input"
                />

                <div className="ml-auto flex items-center gap-1.5">
                    <button onClick={() => setModal({ show: false, appli: null })} className="backBtn" style={{ marginTop: "24px", marginBottom: "19px" }}>
                        Cancel
                    </button>
                    <button onClick={handleSave} className="addBtn" style={{ marginTop: "24px", marginBottom: "19px" }}>
                        Save Date
                    </button>
                </div>
            </div>

        </div>
    )
}

export default RescheduleModal

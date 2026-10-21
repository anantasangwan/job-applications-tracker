import threedots from "../assets/threedots.svg";
import { useState } from "react";

const AppliTable = ({ applications, status, handleStatusUpdate, handleDelete }) => {
    const [openMenuId, setOpenMenuId] = useState(null);

    // --- filter Applications based on status ----
    if (status !== "all")
        applications = applications.filter((application) => application.status === status);

    // --- handle empty situation ---
    if (applications.length === 0) {
        if (status === "all")
            return (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>
                    <p style={{ fontSize: "19px" }}>No applications yet.</p>
                    <p style={{ fontSize: "15px" }}>Add your first application to get started!</p>
                </td></tr>
            )
        else
            return (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>
                    <p style={{ fontSize: "19px" }}>No applications found.</p>
                    <p style={{ fontSize: "15px" }}>Try selecting a different status.</p>
                </td></tr>
            )
    }

    const choices = {
        applied: { text: "Applied", bg: "#F5E8FF", color: "#C084FC", textColor: "#7E22CE" },
        shortlisted: { text: "Shortlisted", bg: "#E5F5E7", color: "#86C992", textColor: "#267A30" },
        interview: { text: "Interview", bg: "#FFF7D6", color: "#D6BC55", textColor: "#806400" },
        selected: { text: "Selected", bg: "#E6EDFF", color: "#91AAEF", textColor: "#2F50A4" },
        rejected: { text: "Rejected", bg: "#FFE8E6", color: "#F0A29B", textColor: "#B42318" }
    };

    return (
        <>
            {
                applications.map((application) => {
                    const status = choices[application.status];

                    return (
                        <tr key={application.id}>
                            <td>{application.company}</td>
                            <td>{application.location}</td>
                            <td>{application.position}</td>

                            <td style={{ textAlign: "center" }}>
                                <p className="inline-flex items-center justify-center w-fit border rounded-[19px] py-0.5 px-2.25"
                                    style={{
                                        color: status.textColor, backgroundColor: status.bg,
                                        borderColor: status.color
                                    }}>
                                    <span>{status.text}</span>
                                    {/* --- dynamic color -> render the SVG inline + make it use currentColor --- */}
                                    <svg onClick={() => handleStatusUpdate(application.id)} className="h-7 w-7 p-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"></path>
                                    </svg>
                                </p>
                            </td>

                            <td>
                                { // Convert to a Date object before calling toLocaleDateString() 
                                    new Date(application.appliedDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "2-digit"
                                    })
                                }
                            </td>
                            <td>
                                { // cuz i may make followup date optional later 
                                    application.followUpDate ? new Date(application.followUpDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "2-digit",
                                    })
                                        : "-"
                                }
                            </td>
                            <td style={{ textAlign: "center" }} >
                                <div className="flex items-center justify-center relative pr-4">
                                    <p className="max-w-25 max-md:max-w-23.75 whitespace-normal break-words max-sm:text-[13.5px] text-sm">
                                        {application.notes || "-"}
                                    </p>

                                    {/* --- delete option menu button --- */}
                                    <button onClick={() => setOpenMenuId(prev => {
                                        return prev === application.id ? null : application.id;
                                    })}
                                        className="absolute -right-1 p-1 shrink-0 rounded-full hover:bg-charcoalTxt/15 cursor-pointer">
                                        <img src={threedots} alt="Actions" height="19px" width="19px" />
                                    </button>

                                    {/* --- delete option menu --- */}
                                    {openMenuId === application.id &&
                                        (<button onClick={() => {
                                            handleDelete(application.id);
                                            setOpenMenuId(null);
                                        }}
                                            className="text-red-700 font-semibold bg-white shadow-md border border-gray-200 px-3 py-2 rounded-md z-5 absolute right-0 bottom-full whitespace-nowrap cursor-pointer flex items-center gap-1 hover:scale-95 transition-all duration-150 ease-in-out">
                                            <svg className="shrink-0 h-4 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                                <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"></path>
                                                <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"></path>
                                                <path d="M9.5 16.5L9.5 10.5"></path>
                                                <path d="M14.5 16.5L14.5 10.5"></path>
                                            </svg>
                                            Delete Application
                                        </button>)
                                    }
                                </div>
                            </td>
                        </tr>
                    )
                })
            }

        </>
    )
}

export default AppliTable;

const AppliTable = ({ applications, status, handleStatusUpdate }) => {
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
                                <p style={{
                                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                                    color: status.textColor, backgroundColor: status.bg,
                                    border: "1px solid", borderColor: status.color,
                                    borderRadius: "19px", width: "fit-content", padding: "2px 9px"
                                }}>
                                    <span>{status.text}</span>
                                    {/* --- dynamic color -> render the SVG inline + make it use currentColor --- */}
                                    <svg onClick={()=>handleStatusUpdate(application.id)} className="h-7 w-7 p-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                            <td style={{ overflow: "auto", scrollbarWidth: "none", textWrap: "nowrap" }}>{application.notes || "-"}</td>
                        </tr>
                    )
                })
            }

        </>
    )
}

export default AppliTable

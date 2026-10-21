import { Link } from "react-router";

// --- extracts and displays the recent five applications ---
const Activities = ({recents}) => {
    const choices = {
        applied: { text: "Applied", bg: "#F5E8FF", color: "#C084FC", textColor: "#7E22CE" },
        shortlisted: { text: "Shortlisted", bg: "#E5F5E7", color: "#86C992", textColor: "#267A30" },
        interview: { text: "Interview", bg: "#FFF7D6", color: "#D6BC55", textColor: "#806400" },
        selected: { text: "Selected", bg: "#E6EDFF", color: "#91AAEF", textColor: "#2F50A4" },
        rejected: { text: "Rejected", bg: "#FFE8E6", color: "#F0A29B", textColor: "#B42318" }
    };

    return (
        <div className="shrink-0 mt-7 max-xs:mt-4 *:px-5 py-4 max-xs:py-2.5 rounded-lg shadow-md bg-white flex-1 border border-charcoalTxt/25 overflow-x-scroll scrollbar-none">
            <div className="pb-5 max-sm:pb-2.5 max-xs:px-3 border-b border-b-charcoalTxt/25 flex items-center gap-3 justify-between">
                <h2 className="text-[18px] font-bold font-montserrat">
                    Recent Activity
                </h2>

                {recents.length > 0 && (
                    <Link to="/applications" className="viewAll">
                        View All
                    </Link>
                )}
            </div>

            {recents.length === 0 && (
                <p className="py-6 px-1.5 text-center font-semibold text-gray-500">
                    No recent activity yet.
                </p>
            )}

            {
                recents.map((application) => {
                    const status = choices[application.status];

                    return (
                        <div key={application.id} className="activity">
                            <div>
                                <h3>{application.position}</h3>
                                <h4>{application.company}</h4>
                            </div>
                            <p className="p1" style={{
                                backgroundColor: status.bg,
                                borderColor: status.color,
                                color: status.textColor
                            }}>
                                {status.text}
                            </p>
                            <p className="p2">{application.addedOn}</p>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Activities

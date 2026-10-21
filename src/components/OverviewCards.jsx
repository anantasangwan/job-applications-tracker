import application from "../assets/application.svg";
import interview from "../assets/interview.svg";
import offer from "../assets/offer.svg";
import shortlisted from "../assets/shortlisted.svg";
import applied from "../assets/applied.svg";
import success from "../assets/success.svg";

import SummaryCard from "./SummaryCard";

const OverviewCards = ({ statusCount }) => {
    const totalApplications = Object.values(statusCount).reduce((total, count) => total + count, 0);
    const rate = `${totalApplications > 0
        ? ((statusCount.selected / totalApplications) * 100).toFixed(1)
        : "0.0"}%`;

    return (
        <div className="overviewCards flex items-center gap-3.5 max-xs:gap-2.5 overflow-x-scroll scrollbar-none w-[97%] max-sm:w-full">
            <SummaryCard bg="#FADFDB" bt="#fb3618" src={application} value={totalApplications} text="Total Applications" />

            <SummaryCard bg="#f2d5ff" bt="#931dc9" src={applied} value={statusCount.applied} text="Applied" />

            <SummaryCard bg="#DCF4DA" bt="#0e9a02" src={shortlisted} value={statusCount.shortlisted} text="Shortlisted" />

            <SummaryCard bg="#f7f6d2" bt="#eae204" src={interview} value={statusCount.interview} text="Interviewing" />

            <SummaryCard bg="#D9E2FC" bt="#3160ed" src={offer} value={statusCount.selected} text="Selected" />

            <SummaryCard bg="#fcd9ef" bt="#ea159c" src={success} value={rate} text="Success Rate" />
        </div>
    )
}

export default OverviewCards

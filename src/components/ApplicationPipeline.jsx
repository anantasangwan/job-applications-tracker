
const ApplicationPipeline = ({ statusCount }) => {
  const totalApplications = Object.values(statusCount).reduce(
    (total, count) => total + count, 0
  );

  const stages = [
    { label: "Applied", key: "applied", color: "#B965D9" },
    { label: "Screening", key: "shortlisted", color: "#16A34A" },
    { label: "Interviews", key: "interview", color: "#cac304" },
    { label: "Offers", key: "selected", color: "#3B65F5" },
    { label: "Rejected", key: "rejected", color: "#F97366" },
  ];

  return (
    <div className="shrink-0 space-y-4 max-xs:space-y-3 mt-6 max-2md:mt-5 max-xs:mt-2.5 py-4 max-xs:py-2.5 rounded-lg shadow-md bg-white w-[46%] max-2md:flex-1 max-2md:w-auto border border-charcoalTxt/25">
      <h2 className="text-[18px] font-bold font-montserrat px-5 mb-5 pb-4 max-xs:pb-2.5 border-b border-b-charcoalTxt/25">
        Application Pipeline
      </h2>

      {
        stages.map(({ label, key, color }) => {
          const count = statusCount[key];
          const progress = totalApplications > 0 ? (count / totalApplications) * 100 : 0;

          return (
            <div key={key} className="pipeline" >
              <p>{label}</p>

              <input readOnly type="range" name={key}
                min="0"
                max={totalApplications}
                value={count}
                style={{
                  background: `linear-gradient(to right, ${color} ${progress}%, #e1e4e9 ${progress}%)`,
                }}
              />

              <p className="text-right">{count}</p>
            </div>
          );
        })
      }
    </div>
  );
};

export default ApplicationPipeline;
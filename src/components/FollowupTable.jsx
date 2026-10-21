// --- renders individual table rows ---
const Fill = ({ applications, choice, handleCompletion, handleReschedule }) => {
  return (
    <>
      {applications.map((application) => {
        return (
          <tr key={application.id}>
            <td>{application.company}</td>
            <td>{application.position}</td>

            <td>{new Date(application.followUpDate).toLocaleDateString("en-US",
              { month: "short", day: "numeric", year: "2-digit" })}
            </td>

            <td style={{ textAlign: "center" }}>
              <p style={{ display: "inline-block", color: choice.textColor, backgroundColor: choice.bg, border: "1px", borderStyle: "solid", borderColor: choice.border, borderRadius: "19px", width: "fit-content", padding: "2px 11px" }}>
                {choice.text}
              </p>
            </td>

            <td>{choice.text === "Completed" ?
              <button onClick={() => handleReschedule(application.id)} className="actionBtn">
                Reschedule
              </button> :
              <button onClick={() => handleCompletion(application.id)} className="actionBtn">
                Mark Completed
              </button>}
            </td>
          </tr>
        )
      })
      }
    </>
  );
}

// ---- handles filtering and empty states ----
const FollowupTable = ({ followups, status, choices, handleCompletion, handleReschedule }) => {
  const emptyMessages = {
    upcoming: "No upcoming follow-ups found.",
    overdue: "No overdue follow-ups found.",
    duetoday: "No follow-ups scheduled for today.",
    completed: "No completed follow-ups found."
  };

  // -- No application with follow-up --
  if (status === "all" && followups.overdue.length === 0 && followups.duetoday.length === 0 &&
    followups.upcoming.length === 0 && followups.completed.length === 0) {
    return (
      <tr>
        <td colSpan={5} style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ fontSize: "19px" }}>No follow-ups scheduled yet.</p>
          <p style={{ fontSize: "15px" }}>Add a follow-up date to your applications to keep track of your recruiter conversations.</p>
        </td>
      </tr>
    );
  }
  // -- No follow-up for selected status --
  else if (status !== "all" && followups[status].length === 0)
    return (
      <tr>
        <td colSpan={5} style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ fontSize: "19px" }}>{emptyMessages[status]}</p>
          <p style={{ fontSize: "15px" }}>Try selecting a different status.</p>
        </td>
      </tr>
    );

  // -- build table of follow-ups for choosen status --
  return (
    <>
      {
        (status === "all" || status === "overdue") &&
        <Fill applications={followups.overdue} choice={choices.overdue} handleCompletion={handleCompletion} handleReschedule={handleReschedule} />
      }
      {
        (status === "all" || status === "duetoday") &&
        <Fill applications={followups.duetoday} choice={choices.duetoday} handleCompletion={handleCompletion} handleReschedule={handleReschedule} />
      }
      {
        (status === "all" || status === "upcoming") &&
        <Fill applications={followups.upcoming} choice={choices.upcoming} handleCompletion={handleCompletion} handleReschedule={handleReschedule} />
      }
      {
        (status === "all" || status === "completed") &&
        <Fill applications={followups.completed} choice={choices.completed} handleCompletion={handleCompletion} handleReschedule={handleReschedule} />
      }
    </>
  )
}

export default FollowupTable

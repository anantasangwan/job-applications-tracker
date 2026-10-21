import { useForm } from "react-hook-form"
import Navbar from './Navbar'

const AddApplication = ({ setApplications, setStatusCount, setShowSidebar }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // ===== handle submitted 'data' provided by handleSubmit() =============
  const onSubmit = async (data) => {
    // - network delay -
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    })

    data = {
      id: crypto.randomUUID(),
      ...data,
      addedOn: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit"
      }),
      followUpCompleted: false
    };

    console.log(data);

    // ==== update parent's state ====
    setApplications(applications => [data, ...applications]);

    setStatusCount((statusCount) => {
      return {
        ...statusCount,  // preserves all other counts 
        [data.status]: statusCount[data.status] + 1  // store & update the count for _ status 
      }
    });

    reset();  // -- Resets all input fields to their default values --
  }

  return (
    <>
      <Navbar header="Add Application" setShowSidebar={setShowSidebar} />

      <div className="space-y-0.5 mt-7 max-sm:mt-6 max-xs:mt-3.5 mx-7 max-xs:mx-3 max-xs:mb-2">
        <h2 className="text-xl font-montserrat font-bold">Track a New Opportunity</h2>
        <p className="text-sm text-charcoalTxt/80 font-semibold ml-2 italic">Add a job to your application pipeline.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="inputDiv">
          <label htmlFor="company">Company</label>
          <input {...register("company",
            {
              required: {
                value: true,
                message: "*this field is required"
              },
              setValueAs: (value) => value.trim()
              // -- setValueAs transforms the input value before React Hook Form validates it, so an input containing only spaces becomes an empty string and fails the required validation --
            }
          )}
            type="text" id="company" />
          {errors.company && <p>{errors.company.message}</p>}
        </div>

        <div className="inputDiv">
          <label htmlFor="location">Location</label>
          <input {...register("location",
            {
              required: {
                value: true,
                message: "*this field is required"
              },
              setValueAs: (value) => value.trim()
            }
          )}
            type="text" id="location" />
          {errors.location && <p>{errors.location.message}</p>}
        </div>

        <div className="inputDiv">
          <label htmlFor="position">Job Position</label>
          <input {...register("position",
            {
              required: {
                value: true,
                message: "*this field is required"
              },
              setValueAs: (value) => value.trim()
            }
          )}
            type="text" id="position" />
          {errors.position && <p>{errors.position.message}</p>}
        </div>

        <div className="inputDiv">
          <label htmlFor="status">Status</label>

          <select {...register("status",
            {
              required: {
                value: true,
                message: "*this field is required"
              }
            }
          )}
            defaultValue="" id="status">
            <option value="" disabled>Select Status</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>

          {errors.status && <p>{errors.status.message}</p>}
        </div>


        <div className="inputDiv">
          <label htmlFor="applied">Applied Date</label>
          <input {...register("appliedDate",
            {
              required: {
                value: true,
                message: "*this field is required"
              }
            }
          )}
            type="date" id="applied" />
          {errors.appliedDate && <p>{errors.appliedDate.message}</p>}
        </div>

        <div className="inputDiv">
          <label htmlFor="followUp">Follow-Up Date</label>
          <input {...register("followUpDate",
            {
              required: {
                value: true,
                message: "*this field is required"
              },
              // -- custom validation rule in React Hook Form --
              validate: (value, formValues) =>
                value >= formValues.appliedDate ||
                "*Follow-up date cannot be before the applied date"
            }
          )}
            type="date" id="followUp" />
          {errors.followUpDate && <p>{errors.followUpDate.message}</p>}
        </div>

        <div className="inputDiv">
          <label htmlFor="notes">Notes</label>
          <input {...register("notes",
            {
              setValueAs: (value) => value.trim()
            }
          )}
            type="text" id="notes" />
          {errors.notes && <p>{errors.notes.message}</p>}
        </div>


        <input disabled={isSubmitting} type="submit" value={isSubmitting ? "Submitting..." : "Submit"} />
        {/* --- prevent multiple submissions --- */}
      </form>
    </>
  )
}

export default AddApplication

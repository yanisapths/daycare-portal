import React from "react";
import RequestTableRow from "../../../components/OLCard/RequestTableRow";

function TableView({ data }) {
<<<<<<< HEAD
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [p, setPatient] = useState({});
  const [course, setCourse] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
    setOpen(false);
  };

  const closeModal = () => {
    setSelectedId(null);
  };

  async function acceptRequest(appointmentId) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Approved" }),
    };
    const res = await fetch(
      `${process.env.url}/appointment/accept/${appointmentId}`,
      option
    )
      .then(async (res) => {
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  }

  async function deleteRequest(appointmentId) {
    const res = await fetch(
      `${process.env.url}/appointment/delete/${appointmentId}`,
      { method: "DELETE" }
    )
      .then(async (res) => {
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ลบรายการไม่สำเร็จ");
      });
  }

  useEffect(() => {
    {
      data &&
        data.map((r) => {
          const patienturl = `${process.env.url}/patient/${r.patient_id}`;
          if (r.patient_id) {
            fetch(patienturl, {
              method: "GET",
            })
              .then(async (res) => {
                const p = await res.json();
                setPatient(p);
              })
              .catch((err) => console.log(err));
          }
        });
    }
  }, []);

  useEffect(() => {
    const courseurl = `${process.env.url}/course/${data.course_id}`;
    fetch(courseurl, {
      method: "GET",
    })
      .then(async (res) => {
        const course = await res.json();
        setCourse(course);
      })
      .catch((err) => console.log(err));
  }, []);

=======
>>>>>>> 5c8571f0ab78f70754e077353cbc0ed59270124f
  return (
    <div className="mx-6 pb-24">
      <p className="h6 font-semibold">คำขอทั้งหมด</p>
      <div className="mt-4 shadow-xl rounded-2xl">
        <div className="overflow-x-auto rounded-2xl">
          <table className="min-w-full text-sm divide-y divide-gray-200 bg-white">
            <thead>
              <tr className="bg-[#AD8259] text-white">
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">ลำดับ</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">วันที่</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">เวลา</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">ลูกค้า</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">สถานที่</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">สถานะ</div>
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center"></div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data?.map((d, index) => (
                <RequestTableRow d={d} index={index} key={d._id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableView;

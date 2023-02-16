import React, { useState, useEffect } from "react";

function PatientItemList({ input }) {
  const [patient, setPatientData] = useState([]);

  const fetchData = async () => {
    let isSubscribed = true;
    const patienturl = `${process.env.dev}/patient/${input.patient_id}`;
    const patients = await fetch(patienturl);
    const patient = await patients.json();
    if (isSubscribed) {
      setPatientData(patient);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
        {input.patient_id ? (
          <p>{patient.nickName}</p>
        ) : (
          <p>{input.nickName} </p>
        )}
    </div>
  );
}

export default PatientItemList;

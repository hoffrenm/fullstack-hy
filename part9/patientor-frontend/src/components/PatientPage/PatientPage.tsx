import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../../constants";
import { Entry, Patient } from "../../types";
import { useStateValue } from "../../state";
import { Grid, Typography } from "@material-ui/core";
import { Male, Female, QuestionMark } from '@mui/icons-material';
import Hospital from "./Hospital";
import Occuppational from "./Occupational";
import Healthcheck from "./Healthcheck";
import { assertNever } from "./utils";

const PatientPage = () => {
  const { id } = useParams<{ id: string; }>();
  const [{ patient }, dispatch] = useStateValue();

  React.useEffect(() => {
    if (id && id != patient.id) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          dispatch({ type: "SET_PATIENT", payload: patientFromApi });
        } catch (e) {
          console.error(e);
        }
      };

      void fetchPatient();
    }
  }, [id]);

  if (!patient) return null;

  const genderIcon = () => {
    switch (patient.gender) {
      case "male":
        return <Male />;
      case "female":
        return <Female />;
      default:
        return <QuestionMark />;
    }
  };

  const entryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital entry={entry} />;
      case "OccupationalHealthcare":
        return <Occuppational entry={entry} />;
      case "HealthCheck":
        return <Healthcheck entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <Typography variant="h4">{patient.name} {genderIcon()}</Typography>
      <p><b>SSN: </b>{patient.ssn}</p>
      <p><b>Occupation: </b>{patient.occupation}</p>
      <p><b>Entries</b></p>
      <Grid container spacing={2}>
        {patient?.entries && patient.entries.map((entry) => entryDetails(entry))}
      </Grid>
    </div>
  );
};

export default PatientPage;
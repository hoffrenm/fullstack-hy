import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { useStateValue } from "../state";
import { Button, Grid, Typography } from "@material-ui/core";
import { Male, Female, QuestionMark } from '@mui/icons-material';
import Hospital from "./Hospital";
import Occuppational from "./Occupational";
import Healthcheck from "./Healthcheck";
import { assertNever } from "./utils";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { addEntry } from "../state";

const PatientPage = () => {
  const { id } = useParams<{ id: string; }>();
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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
  }, [id, dispatch]);

  if (!patient) return null;

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );

      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <br />

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />

      <Button variant="contained" onClick={() => openModal()}>
        Add new entry to patient
      </Button>

    </div>
  );
};

export default PatientPage;
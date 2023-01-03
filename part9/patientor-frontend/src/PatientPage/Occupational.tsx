import { OccupationalHealthcareEntry } from "../types";
import { Grid, Box } from "@material-ui/core";
import WorkIcon from '@mui/icons-material/Work';
import { diagnosisCodes } from "./utils";


const Occuppational = ({ entry }: { entry: OccupationalHealthcareEntry; }) => {
  return (
    <Grid item xs={12} >
      <Box border={2}
        borderRadius={12}
        padding={2}
        paddingBottom={1}
      >
        <span>{entry.date} <WorkIcon fontSize="large" /></span>
        <p>Works at {entry.employerName}</p>
        <p>{entry.description}</p>

        {entry?.diagnosisCodes && diagnosisCodes(entry.diagnosisCodes)}
        {entry.sickLeave && <p>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>}

        <span>Specialist: <i>{entry.specialist}</i></span>
      </Box>
    </Grid>
  );
};

export default Occuppational;
import { HospitalEntry } from "../../types";
import { Grid, Box } from "@material-ui/core";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { diagnosisCodes } from "./utils";

const Hospital = ({ entry }: { entry: HospitalEntry; }) => {
  return (
    <Grid item xs={12} >
      <Box border={2}
        borderColor="primary.main"
        borderRadius={12}
        padding={2}
        paddingBottom={1}
      >
        <span>{entry.date} <LocalHospitalIcon fontSize="large" /></span>
        <p>{entry.description}</p>

        {entry?.diagnosisCodes && diagnosisCodes(entry.diagnosisCodes)}

        <p>Discharged on {entry.discharge.date}. Reason: {entry.discharge.criteria}</p>
        <span>Specialist: <i>{entry.specialist}</i></span>
      </Box>
    </Grid>
  );
};

export default Hospital;
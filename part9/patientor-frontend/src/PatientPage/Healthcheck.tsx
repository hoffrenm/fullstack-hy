import { Grid, Box } from "@material-ui/core";
import { HealthCheckEntry } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { diagnosisCodes } from "./utils";

const Healthcheck = ({ entry }: { entry: HealthCheckEntry; }) => {
  const healthRatingIcon = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return <FavoriteIcon htmlColor="green" />;
      case 1:
        return <FavoriteIcon htmlColor="yellow" />;
      case 2:
        return <FavoriteIcon htmlColor="orange" />;
      case 3:
        return <FavoriteIcon htmlColor="darkred" />;
    }
  };

  return (
    <Grid item xs={12} >
      <Box border={2}
        borderRadius={12}
        padding={2}
        paddingBottom={1}
      >
        <span>{entry.date} <MedicalServicesIcon fontSize="large" /></span>
        <p>{entry.description}</p>

        {entry?.diagnosisCodes && diagnosisCodes(entry.diagnosisCodes)}

        <p>{healthRatingIcon()}</p>

        <span>Specialist: <i>{entry.specialist}</i></span>
      </Box>
    </Grid>
  );
};

export default Healthcheck;
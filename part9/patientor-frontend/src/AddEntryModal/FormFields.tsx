import { EntryType, HealthCheckRating } from "../types";
import { Field } from "formik";
import { SelectField, TextField } from "../AddPatientModal/FormField";

export type HealthCheckRatingOption = {
  value: HealthCheckRating;
  label: string;
};

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical" },
];

const validateString = (value: string) => {
  let errorMessage;

  if (!value) {
    errorMessage = 'Field is required';
  }
  return errorMessage;
};

const validateDate = (value: string) => {
  if (!value) return false;

  let errorMessage;

  if (!(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(value))) {
    errorMessage = 'Date incorrect, please use YYYY-MM-DD';
  }
  return errorMessage;
};


const FormFields = ({ type }: { type: EntryType; }) => {
  switch (type) {
    case EntryType.Hospital:
      return (
        <div>
          <Field
            validate={validateDate}
            label="Date of discharge"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            validate={validateString}
            label="Criteria of discharge"
            placeholder="Criteria of discharge"
            name="discharge.criteria"
            component={TextField}
          />
        </div>
      );
    case EntryType.HealthCheck:
      return (
        <div>
          <SelectField
            label="Healthcheck rating"
            name="healthCheckRating"
            options={healthCheckRatingOptions} />
        </div>);
    case EntryType.OccupationalHealthcare:
      return (
        <div>
          <Field
            validate={validateString}
            label="Employer name"
            placeholder="Employer name"
            name="employerName"
            component={TextField}
          />
          <Field
            validate={validateDate}
            label="Start of sick leave (optional)"
            placeholder="YYYY-MM-DD"
            name="sickleave.startDate"
            component={TextField}
          />
          <Field
            validate={validateDate}
            label="End of sick leave (optional)"
            placeholder="YYYY-MM-DD"
            name="sickleave.endDate"
            component={TextField}
          />
        </div>);
    default:
      return <p>Select type to see more fields</p>;
  }
};

export default FormFields;

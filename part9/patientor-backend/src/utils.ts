import { Gender, NewPatientEntry, EntryType, NewEntry, HealthCheckRating } from './types';

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseField(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseField(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseField(object.occupation, "occupation"),
    entries: []
  };

  return newEntry;
};

export const toNewEntry = (object: any): NewEntry => {
  const newEntry: NewEntry = {
    description: parseField(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseField(object.specialist, "specialist"),
    type: parseType(object.type)
  };

  if (object.diagnosisCodes) {
    newEntry.diagnosisCodes = parseDiagnoses(object.diagnosisCodes);
  }

  switch (newEntry.type) {
    case EntryType.Hospital:
      const hospitalEntry = {
        ...newEntry,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseField(object.discharge.criteria, "criteria")
        }
      };
      return hospitalEntry;
    case EntryType.OccupationalHealthcare:
      const OccupationalEntry = {
        ...newEntry,
        employerName: parseField(object.employerName, "employerName")
      };

      if (object.sickleave?.startDate && object.sickleave?.endDate) {
        const withSickLeave = {
          ...OccupationalEntry,
          sickLeave: {
            startDate: parseDate(object.sickleave.startDate),
            endDate: parseDate(object.sickleave.endDate)
          }
        };
        return withSickLeave;
      }
      return OccupationalEntry;
    case EntryType.HealthCheck:
      const HealthCheckEntry = {
        ...newEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };

      return HealthCheckEntry;
    default:
      return newEntry;
  }
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !isHealthRating(rating)) {
    throw new Error('Incorrect or missing healthcheck rating: ' + rating);
  }

  return rating;
};

const isHealthRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }

  return type;
};

const parseDiagnoses = (diagnoses: any): string[] => {
  if (!diagnoses || !Array.isArray(diagnoses) || diagnoses.some((d) => !isString(d))) {
    throw new Error('Incorrect or missing diagnoses: ' + diagnoses);
  }

  return diagnoses as string[];
};

const isEntryType = (type: any): type is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(type);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseField = (value: unknown, field: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${field}: ` + value);
  }

  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

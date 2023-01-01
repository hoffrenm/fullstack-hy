import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v4 } from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id: string = v4();
  const newPatient = {
    id,
    ...entry
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};

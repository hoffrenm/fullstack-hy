import patients from '../../data/patients';
import { NewEntry, Patient, NewPatientEntry, PublicPatient, Entry, BaseEntry } from '../types';
import { v4 } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(patient => patient.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id: string = v4();
  const newPatient = {
    id,
    ...entry
  };

  patients.push(newPatient);

  return newPatient;
};

const addEntryToPatient = (id: string, entry: NewEntry): BaseEntry | undefined => {
  const patient = findById(id);
  const eId: string = v4();

  const newEntry = {
    id: eId,
    ...entry
  };

  patient?.entries.push(newEntry as Entry);

  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addEntryToPatient,
  addPatient
};

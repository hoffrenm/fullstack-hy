import diagnoses from '../../data/diagnoses.json';
import { Diagnose } from '../types';


const getEntries = (): Diagnose[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};

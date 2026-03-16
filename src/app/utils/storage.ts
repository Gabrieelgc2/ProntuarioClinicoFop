import { Patient } from "../types";

const STORAGE_KEY = "prontuario_pacientes";
const AUTH_KEY = "prontuario_auth";

const generateProntuario = (patients: Patient[]): string => {
  const nextNumber = patients.length + 1;
  return `${nextNumber}`;
};

export const storage = {
  getPatients: (): Patient[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  savePatient: (patient: Omit<Patient, 'prontuario'>): void => {
    const patients = storage.getPatients();
    const prontuario = generateProntuario(patients);
    const newPatient = { ...patient, prontuario };
    patients.push(newPatient);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  },

  updatePatient: (id: string, updates: Partial<Patient>): void => {
    const patients = storage.getPatients();
    const index = patients.findIndex((p) => p.id === id);
    if (index !== -1) {
      patients[index] = { ...patients[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    }
  },

  getPatientById: (id: string): Patient | undefined => {
    const patients = storage.getPatients();
    return patients.find((p) => p.id === id);
  },

  setAuth: (isAuthenticated: boolean): void => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(isAuthenticated));
  },

  isAuthenticated: (): boolean => {
    const auth = localStorage.getItem(AUTH_KEY);
    return auth ? JSON.parse(auth) : false;
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_KEY);
  },
};
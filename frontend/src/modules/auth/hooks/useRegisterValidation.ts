import { toast } from 'react-toastify';
import type { RegisterData } from '../types';

interface ValidationResult {
  isValid: boolean;
  data: RegisterData | null;
}

interface UseRegisterValidationReturn {
  validateAndPrepareData: (
    name: string,
    email: string,
    password: string,
    gender: 'MALE' | 'FEMALE' | null,
    role: 'CANDIDATE' | 'RECRUITER' | null
  ) => ValidationResult;
}

/**
 * Hook personnalisé pour valider les données du formulaire d'inscription
 * Gère la validation des champs et affiche les erreurs via toast
 */
export const useRegisterValidation = (): UseRegisterValidationReturn => {
  const validateAndPrepareData = (
    name: string,
    email: string,
    password: string,
    gender: 'MALE' | 'FEMALE' | null,
    role: 'CANDIDATE' | 'RECRUITER' | null
  ): ValidationResult => {
    // Validate required fields
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Name, Email and Password are required');
      return { isValid: false, data: null };
    }

    // Validate gender
    if (!gender) {
      toast.error('Please select a gender');
      return { isValid: false, data: null };
    }

    // Validate role
    if (!role) {
      toast.error('Please select a role');
      return { isValid: false, data: null };
    }

    // All validations passed
    return {
      isValid: true,
      data: { name, email, password, gender, role },
    };
  };

  return { validateAndPrepareData };
};

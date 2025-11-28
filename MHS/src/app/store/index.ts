/*
Store quản lý global state (Zustand hoặc Redux).
Ví dụ state: user, token, loading, theme.
Các action: login, logout, setUser.
*/
// app/store/index.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ==================== AUTH STORE ====================
interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'admin';
  avatar?: string;
  vneidVerified?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      
      login: (user, token) => {
        localStorage.setItem('auth_token', token);
        set({ user, token, isAuthenticated: true });
      },
      
      logout: () => {
        localStorage.removeItem('auth_token');
        set({ user: null, token: null, isAuthenticated: false });
      },
      
      setUser: (user) => set({ user }),
      
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ==================== PATIENT STORE ====================
interface Patient {
  id: string;
  bhytId: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  province: string;
  condition: string;
  status: 'active' | 'follow-up' | 'discharged';
  heartRiskScore?: number;
  lastVisit: string;
  createdAt: string;
}

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  setPatients: (patients: Patient[]) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, data: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  selectPatient: (patient: Patient | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null,
  
  setPatients: (patients) => set({ patients }),
  
  addPatient: (patient) => set((state) => ({
    patients: [...state.patients, patient],
  })),
  
  updatePatient: (id, data) => set((state) => ({
    patients: state.patients.map(p => 
      p.id === id ? { ...p, ...data } : p
    ),
  })),
  
  deletePatient: (id) => set((state) => ({
    patients: state.patients.filter(p => p.id !== id),
  })),
  
  selectPatient: (patient) => set({ selectedPatient: patient }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
}));

// ==================== UI STORE ====================
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'light',
      notifications: [],
      
      toggleSidebar: () => set((state) => ({
        sidebarOpen: !state.sidebarOpen,
      })),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      setTheme: (theme) => set({ theme }),
      
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, notification],
      })),
      
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id),
      })),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Export combined store type
export type RootState = {
  auth: AuthState;
  patients: PatientState;
  ui: UIState;
};
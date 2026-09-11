import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { StudioProject, SiteSettings, ProjectInquiry } from '../types';
import { STUDIO_PROJECTS } from '../data/websiteData';
import {
  subscribeProjects,
  subscribeSiteSettings,
  subscribeInquiries,
  subscribeAuth,
  DEFAULT_SITE_SETTINGS,
  createProject as apiCreateProject,
  updateProject as apiUpdateProject,
  deleteProject as apiDeleteProject,
  saveSiteSettings as apiSaveSiteSettings,
  seedDefaultProjects as apiSeedDefaultProjects,
  submitProjectInquiry as apiSubmitProjectInquiry,
  updateInquiryStatus as apiUpdateInquiryStatus,
  deleteInquiry as apiDeleteInquiry,
} from '../services/firebaseService';

interface StudioDataContextType {
  projects: StudioProject[];
  siteSettings: SiteSettings;
  inquiries: ProjectInquiry[];
  currentUser: User | null;
  isAdmin: boolean;
  loading: boolean;
  createProject: (project: Omit<StudioProject, 'id'>) => Promise<string>;
  updateProject: (id: string, updates: Partial<StudioProject>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  seedDefaultProjects: () => Promise<void>;
  submitInquiry: (inquiry: Omit<ProjectInquiry, 'id' | 'createdAt' | 'status'>) => Promise<string>;
  updateInquiryStatus: (id: string, status: 'new' | 'contacted' | 'archived') => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
}

const StudioDataContext = createContext<StudioDataContextType | null>(null);

export const StudioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<StudioProject[]>(STUDIO_PROJECTS);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Subscribe to Auth
  useEffect(() => {
    const unsub = subscribeAuth((user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Subscribe to Projects
  useEffect(() => {
    const unsub = subscribeProjects((data) => {
      setProjects(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Subscribe to Site Settings
  useEffect(() => {
    const unsub = subscribeSiteSettings((settings) => {
      setSiteSettings(settings);
    });
    return () => unsub();
  }, []);

  // Subscribe to Inquiries only if admin user is signed in
  useEffect(() => {
    if (!currentUser) {
      setInquiries([]);
      return;
    }
    const unsub = subscribeInquiries((data) => {
      setInquiries(data);
    });
    return () => unsub();
  }, [currentUser]);

  // Is Admin: any authenticated user or verified email
  const isAdmin = Boolean(currentUser);

  return (
    <StudioDataContext.Provider
      value={{
        projects,
        siteSettings,
        inquiries,
        currentUser,
        isAdmin,
        loading,
        createProject: apiCreateProject,
        updateProject: apiUpdateProject,
        deleteProject: apiDeleteProject,
        saveSiteSettings: apiSaveSiteSettings,
        seedDefaultProjects: apiSeedDefaultProjects,
        submitInquiry: apiSubmitProjectInquiry,
        updateInquiryStatus: apiUpdateInquiryStatus,
        deleteInquiry: apiDeleteInquiry,
      }}
    >
      {children}
    </StudioDataContext.Provider>
  );
};

export function useStudioData() {
  const context = useContext(StudioDataContext);
  if (!context) {
    throw new Error('useStudioData must be used within a StudioDataProvider');
  }
  return context;
}

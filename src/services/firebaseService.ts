import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  getDoc,
} from 'firebase/firestore';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { db, auth, googleProvider } from '../lib/firebase';
import { StudioProject, ProjectInquiry, SiteSettings } from '../types';
import { STUDIO_PROJECTS } from '../data/websiteData';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  heroTag: 'EST. 2026 / DIGITAL PRODUCT STUDIO',
  heroHeadline: 'MAKEWEBB',
  heroSubtitle: 'We build intelligent digital experiences.',
  disciplinesText: 'AI • WEB • DATA • DESIGN',
  telemetryStatus: 'NEURAL ENGINES ACTIVE',
  latencyStat: '14ms',
  fpsStat: '60 FPS',
  vitalsStat: '99.8%',
  topologyStat: 'V3 / TS',
  manifestoPrefix: "WE DON'T JUST",
  manifestoMiddle: 'BUILD WEBSITES.',
  manifestoHighlight: 'WE BUILD EXPERIENCES.',
  manifestoDescription:
    'MakeWebb combines artificial intelligence, engineering, data and design to create digital products that feel as intelligent as they function.',
  contactEmail: 'owaies786@gmail.com',
  githubUrl: 'https://github.com/owaies',
  linkedinUrl: 'https://www.linkedin.com/in/mohammed-owaies-507b4a398',
  owaiesPhone: '7619329863',
  afafPhone: '8073818817',
};

// ==========================================
// PROJECTS SERVICE
// ==========================================

export async function seedDefaultProjects(): Promise<void> {
  try {
    for (let i = 0; i < STUDIO_PROJECTS.length; i++) {
      const p = STUDIO_PROJECTS[i];
      const projectRef = doc(db, 'projects', p.id);
      await setDoc(projectRef, {
        ...p,
        orderIndex: i,
        createdAt: Date.now() - (STUDIO_PROJECTS.length - i) * 86400000,
      });
    }
  } catch (error) {
    console.warn('Error seeding default projects:', error);
  }
}

export function subscribeProjects(callback: (projects: StudioProject[]) => void) {
  const projectsCol = collection(db, 'projects');
  
  return onSnapshot(
    projectsCol,
    async (snapshot) => {
      if (snapshot.empty) {
        // If empty, auto-seed defaults in background
        callback(STUDIO_PROJECTS);
        // Only seed if user is authenticated (rules allow write only if auth != null)
        if (auth.currentUser) {
          await seedDefaultProjects();
        }
      } else {
        const list: StudioProject[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            code: data.code || 'MW / 000',
            title: data.title || '',
            type: data.type || 'DIGITAL PRODUCT',
            technology: data.technology || '',
            url: data.url || '',
            description: data.description || '',
            status: data.status || 'ACTIVE',
            stats: data.stats || '',
            accent: data.accent || '#38bdf8',
            previewType: data.previewType || 'ai-tracker',
            orderIndex: data.orderIndex ?? 0,
            createdAt: data.createdAt,
          });
        });
        list.sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
        callback(list);
      }
    },
    (error) => {
      console.warn('Firestore projects listener error, using fallback:', error);
      callback(STUDIO_PROJECTS);
    }
  );
}

export async function createProject(project: Omit<StudioProject, 'id'>): Promise<string> {
  const colRef = collection(db, 'projects');
  const docRef = await addDoc(colRef, {
    ...project,
    createdAt: Date.now(),
  });
  return docRef.id;
}

export async function updateProject(id: string, updates: Partial<StudioProject>): Promise<void> {
  const docRef = doc(db, 'projects', id);
  await updateDoc(docRef, updates);
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, 'projects', id);
  await deleteDoc(docRef);
}

// ==========================================
// SITE SETTINGS SERVICE
// ==========================================

export function subscribeSiteSettings(callback: (settings: SiteSettings) => void) {
  const settingsDocRef = doc(db, 'site_settings', 'global');

  return onSnapshot(
    settingsDocRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback({
          ...DEFAULT_SITE_SETTINGS,
          ...snapshot.data(),
        });
      } else {
        callback(DEFAULT_SITE_SETTINGS);
      }
    },
    (error) => {
      console.warn('Firestore settings listener error:', error);
      callback(DEFAULT_SITE_SETTINGS);
    }
  );
}

export async function saveSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
  const settingsDocRef = doc(db, 'site_settings', 'global');
  await setDoc(
    settingsDocRef,
    {
      ...settings,
      updatedAt: Date.now(),
    },
    { merge: true }
  );
}

// ==========================================
// INQUIRIES / LEADS SERVICE
// ==========================================

export async function submitProjectInquiry(
  inquiry: Omit<ProjectInquiry, 'id' | 'createdAt' | 'status'>
): Promise<string> {
  const colRef = collection(db, 'inquiries');
  const docRef = await addDoc(colRef, {
    ...inquiry,
    createdAt: Date.now(),
    status: 'new',
  });
  return docRef.id;
}

export function subscribeInquiries(callback: (inquiries: ProjectInquiry[]) => void) {
  const colRef = collection(db, 'inquiries');
  const q = query(colRef, orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: ProjectInquiry[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        list.push({
          id: docSnap.id,
          name: d.name || '',
          email: d.email || '',
          phone: d.phone || '',
          disciplines: d.disciplines || [],
          budget: d.budget || '',
          timeline: d.timeline || '',
          message: d.message || '',
          createdAt: d.createdAt || Date.now(),
          status: d.status || 'new',
        });
      });
      callback(list);
    },
    (error) => {
      console.warn('Inquiries listener error (admin required):', error);
      callback([]);
    }
  );
}

export async function updateInquiryStatus(
  id: string,
  status: 'new' | 'contacted' | 'archived'
): Promise<void> {
  const docRef = doc(db, 'inquiries', id);
  await updateDoc(docRef, { status });
}

export async function deleteInquiry(id: string): Promise<void> {
  const docRef = doc(db, 'inquiries', id);
  await deleteDoc(docRef);
}

// ==========================================
// AUTHENTICATION SERVICE
// ==========================================

export async function loginWithGoogle(): Promise<User> {
  const cred = await signInWithPopup(auth, googleProvider);
  return cred.user;
}

export async function loginWithEmail(email: string, pass: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  return cred.user;
}

export async function registerWithEmail(email: string, pass: string): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  return cred.user;
}

export async function loginDemoAdmin(): Promise<User> {
  const cred = await signInAnonymously(auth);
  return cred.user;
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

export function subscribeAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

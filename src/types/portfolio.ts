export type ProjectCategory = 'Residential' | 'Commercial' | 'Indoor' | 'Maintenance';

export type WorkScope = 'Design' | 'Construction' | 'Maintenance';

export type PermissionStatus = 'cleared' | 'pending' | 'restricted';

export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  captionEn: string;
  captionKr: string;
  credit: string;
  aspectRatio?: '16/9' | '4/3' | '3/4';
}

export interface MaintenanceEntry {
  season: string;
  year: string;
  focusEn: string;
  focusKr: string;
  notesEn: string;
}

export interface Project {
  id: string;
  slug: string;
  indexNumber: string;
  titleEn: string;
  titleKr: string;
  category: ProjectCategory;
  locationEn: string;
  locationKr: string;
  period: string;
  year: string;
  areaSqm?: string;
  company: string;
  companyNoteEn?: string;
  projectScope: WorkScope[];
  myRole: WorkScope[];
  myResponsibilitiesEn: string[];
  myResponsibilitiesKr: string[];
  summaryEn: string;
  summaryKr: string;
  descriptionEn: string[];
  descriptionKr: string[];
  featured: boolean;
  permissionStatus: PermissionStatus;
  heroImage: MediaAsset;
  designDrawings?: MediaAsset[];
  renderings?: MediaAsset[];
  constructionImages?: MediaAsset[];
  completedGallery?: MediaAsset[];
  maintenanceLogs?: MaintenanceEntry[];
  credits: {
    photography: string;
    projectBy: string;
    roleSummary: string;
  };
}

export type OtherWorkCategory = 'Indoor Styling' | 'Spatial Curation' | 'Publications';

export interface OtherWork {
  id: string;
  indexNumber: string;
  titleEn: string;
  titleKr: string;
  category: OtherWorkCategory;
  year: string;
  clientOrVenue: string;
  summaryEn: string;
  summaryKr: string;
  detailsEn: string[];
  detailsKr: string[];
  image: MediaAsset;
  credits: string;
}

export interface CareerEntry {
  period: string;
  roleEn: string;
  roleKr: string;
  organization: string;
  focusEn: string;
  focusKr: string;
}

export type RoutePath =
  | '/'
  | '/about'
  | '/projects'
  | `/projects/${string}`
  | '/other-works'
  | '/contact';

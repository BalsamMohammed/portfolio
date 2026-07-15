export type Language = "en" | "ar";

export interface ProjectStat {
  value: string;
  valueAr: string;
  label: string;
  labelAr: string;
}

export interface Project {
  id: string;
  title: string;
  titleAr: string;
  client: string;
  clientAr: string;
  year: string;
  role: string;
  roleAr: string;
  duration: string;
  durationAr: string;
  brief: string;
  briefAr: string;
  approach: string;
  approachAr: string;
  outcome: string;
  outcomeAr: string;
  tools: string[];
  deliverables: string[];
  deliverablesAr: string[];
  stats: ProjectStat[];
  coverImage: string;
  images: {
    src: string;
    alt: string;
    altAr: string;
  }[];
  nextProjectId: string;
  prevProjectId: string;
}

export interface GalleryItem {
  id: string;
  filename: string;
  group: "aou" | "clubs";
  category: "all" | "awareness" | "events" | "clubs";
  label: string;
  labelAr: string;
  badge?: string;
  badgeAr?: string;
}

export type EducationLevel = "TK" | "MI" | "MTs" | "MA";

export interface EducationAccreditation {
  status: string;
  grade: string;
  year: string;
  certificateNumber: string;
}

export interface EducationOrganizationMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  notes?: string;
}

export interface EducationOrganizationTier {
  id: string;
  title: string;
  description?: string;
  members: EducationOrganizationMember[];
}

export interface EducationOrganizationSection {
  title: string;
  description?: string;
  sourceNote?: string;
  tiers: EducationOrganizationTier[];
}

export interface EducationUnit {
  slug: string;
  name: string;
  shortName: string;
  level: EducationLevel;
  category: string;
  description: string;
  image: string;
  address?: string;
  headmaster?: string;
  history?: string[];
  vision?: string;
  mission?: string[];
  goals?: string[];
  programs?: string[];
  activities?: string[];
  facilities?: string[];
  accreditation?: EducationAccreditation;
  contactPerson?: string;
  whatsapp?: string;
  organization?: EducationOrganizationSection;
}

export const EDUCATION_LEVEL_ORDER: EducationLevel[] = ["TK", "MI", "MTs", "MA"];

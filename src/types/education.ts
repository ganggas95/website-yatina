export type EducationLevel = "TK" | "MI" | "MTs" | "MA";

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
  vision?: string;
  mission?: string[];
  programs?: string[];
  activities?: string[];
  facilities?: string[];
  contactPerson?: string;
  whatsapp?: string;
}

export const EDUCATION_LEVEL_ORDER: EducationLevel[] = ["TK", "MI", "MTs", "MA"];

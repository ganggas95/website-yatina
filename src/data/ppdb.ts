import type { EducationLevel } from "@/types/education";
import { TODO_CONTENT } from "@/lib/utils";

export interface PPDBInfo {
  level: EducationLevel;
  unitName: string;
  slug: string;
  registrationInfo: string;
  requirements: string[];
  schedule: string;
  fees: string;
  contactPerson: string;
  whatsapp: string;
}

export const ppdbInfo: PPDBInfo[] = [
  {
    level: "TK",
    unitName: "TK Yatina",
    slug: "tk-yatina",
    registrationInfo: TODO_CONTENT,
    requirements: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    schedule: TODO_CONTENT,
    fees: TODO_CONTENT,
    contactPerson: TODO_CONTENT,
    whatsapp: TODO_CONTENT,
  },
  {
    level: "MI",
    unitName: "MI Riadlul Jannah NW Penjor",
    slug: "mi-riadlul-jannah",
    registrationInfo: TODO_CONTENT,
    requirements: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    schedule: TODO_CONTENT,
    fees: TODO_CONTENT,
    contactPerson: TODO_CONTENT,
    whatsapp: TODO_CONTENT,
  },
  {
    level: "MTs",
    unitName: "MTs Riadlul Jannah NW Penjor",
    slug: "mts-riadlul-jannah",
    registrationInfo: TODO_CONTENT,
    requirements: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    schedule: TODO_CONTENT,
    fees: TODO_CONTENT,
    contactPerson: TODO_CONTENT,
    whatsapp: TODO_CONTENT,
  },
  {
    level: "MA",
    unitName: "MA Riadlul Jannah NW Penjor",
    slug: "ma-riadlul-jannah",
    registrationInfo: TODO_CONTENT,
    requirements: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    schedule: TODO_CONTENT,
    fees: TODO_CONTENT,
    contactPerson: TODO_CONTENT,
    whatsapp: TODO_CONTENT,
  },
];

export interface Project {
  name: string;
  description: string;
  html_url: string;
  languages_url?: string;
  updated_at: string;
  languages?: { name: string; percentage: number }[]; 
}
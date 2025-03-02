
export interface Script {
  id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  content: string;
  banner?: string;
  ratings: number;
  scriptUrl?: string;
}

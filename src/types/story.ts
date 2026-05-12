export type StoryCategory =
  | "domestic-violence"
  | "sexual-assault"
  | "both"
  | "other";

export interface Story {
  id: string;
  title?: string;
  body: string;
  category: StoryCategory;
  timestamp: string;
}

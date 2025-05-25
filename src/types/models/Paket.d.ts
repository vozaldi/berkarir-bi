import { QuizModel } from "./Quiz";

export type PaketModel = {
  id?: number;
  name?: string;
  description?: string;
  is_paid?: boolean;
  created_at?: string;
  updated_at?: string;

  quizes?: QuizModel[];
};

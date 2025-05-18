export type QuizModel = {
  id?: number;
  name?: string;
  description?: string;
  is_paid?: boolean;
  time_limit?: number;
  passing_score?: number;
  created_at?: string;
  updated_at?: string;
  
  quiz_type?: QuizType;
  questions?: QuestionModel[];
};

export type QuizType = {
  key?: string;
  label?: string;
};

export type QuestionModel = {
  id?: number;
  quiz_id?: number;
  category?: string;
  component?: string;
  question_text?: string;
  question_body?: string;
  image?: string;
  
  options?: Array<number | null>;
  discussion?: string;
  isLatex?: boolean;

  main_category?: QuestionMainCategory;
  sub_category?: QuestionSubCategory;
  answers?: AnswerModel[];
};

export type QuestionMainCategory = {
  id?: number;
  name?: string;
  code?: string;

  questions?: QuestionModel[];
};

export type QuestionSubCategory = {
  id?: number;
  name?: string;
};

export type AnswerModel = {
  id?: number;
  answer_text?: string;
  image?: string;
};

export type AttemptModel = {
  id?: number;
  user_id?: number;
  quiz_id?: number;
  started_at?: string;
  completed_at?: string;
  total_score?: number;
  total_time?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

export type QuestionDiscussion = {
  id?: number;
  quiz_id?: number;
  category?: string;
  component?: string;
  question_text?: string;
  question_body?: string;
  explanation?: string;
  is_user_answer_correct?: boolean;

  correct_answer?: CorrectAnswerModel;
  user_answer?: UserAnswerModel;
};

export type CorrectAnswerModel = {
  id?: number;
  answer_text?: string;
};

export type UserAnswerModel = {
  id?: number;
  answer_text?: string;
  is_correct?: number;
  fraction?: number;
};

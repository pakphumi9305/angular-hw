export interface SubmitAnswer {
  questionCategoryId: string;
  questions: Question[];
}

export interface Question {
  questionId: string;
  answers: Answer[];
}

export interface Answer {
  questionAnswerId: string;
}
export interface SubmitAnswerResponseModel{
  fullScore: number,
  score: number
}

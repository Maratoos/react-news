export interface INews {
  by: string;
  descendants: number;
  id: number;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface ICardItemProps {
  title: string;
  score: number;
  author: string;
  date: number;
  id: number;
}

export interface ICommentProps {
  text: string;
  author: string;
  date: number;
  kids: number[];
}

export interface IComment {
  id: number;
  by: string;
  text: string;
  time: number;
  kids: number[];
};

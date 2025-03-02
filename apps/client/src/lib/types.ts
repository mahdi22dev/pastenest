export interface ServerError {
  statusCode: number;
  timestamp: string;
  path: string;
  message: Message;
}

export interface Message {
  message: string;
  error: string;
  statusCode: number;
}

export interface PasteBody {
  date: Date | undefined;
  syntax: string;
  mode: string;
  content: string;
  title: string;
}

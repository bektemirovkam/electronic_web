export type MessageType = {
  id: string;
  from: string;
  to: string;
  text: string;
};

export type ChatType = {
  id: string;
  lastMessage: string;
  messages: MessageType[];
  name: string;
};

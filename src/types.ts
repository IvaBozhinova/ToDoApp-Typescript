
export enum Status {
  Active = "active",
  Completed = "completed",
}

export type Task = {
  id: number;
  title: string;
  status: Status;
};

export type Filter = "all" | "active" | "completed";

//Defines a typescript interface for the Task object
export interface Task {
  id: string;
  title: string;
  date: string;
  time: string;
  done: boolean;
  notes?:string;
}
  
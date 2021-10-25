export interface Task {
  id?: number;
  taskName: string;
  Type: string;
  taskDetails: string;
  AssignedTo: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

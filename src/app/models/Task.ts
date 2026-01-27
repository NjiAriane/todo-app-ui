interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  userId: number;
}

export default Task;

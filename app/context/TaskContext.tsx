//persistant storage to save&load tasks between app session
import AsyncStorage from '@react-native-async-storage/async-storage';
//hooks and types for context and state managemnt
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

//Task type definition
export interface Task {
  id: string;
  title: string;
  date: string;
  time: string;
  done: boolean;
  notes?: string;
}
//COntext function types for TypeScript validation
//context conatins a tasks array and 5 function with specific input/output type
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskDone: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTaskNotes: (id: string, notes: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);
//key used to store data in AsyncStorage
const TASKS_STORAGE_KEY = 'tasks';

//loads tasks from AsyncStorage when app starts
export function TaskProvider({ children }: { children: ReactNode }) {
  //this is the local state for task list
  const [tasks, setTasks] = useState<Task[]>([]);

  //Load tasks on startup
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(TASKS_STORAGE_KEY); //loads stringified tasks
        if (stored) {
          setTasks(JSON.parse(stored));//parse and set in state
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };
    loadTasks();
  }, []);

  //To save tasks on any change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  //adds a new tasks to list
  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  //changese tasks completed status
  const toggleTaskDone = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  //Removes a task from list
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  //Updates the note for a task
  const updateTaskNotes = (id: string, notes: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, notes } : task
      )
    );
  };

  //General task updater for title/date/time/notes
  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  //Makes task functions and lists avaliable to all the childrenn of app
  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTaskDone, deleteTask, updateTaskNotes, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

//hook for using task context inside any component
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
}

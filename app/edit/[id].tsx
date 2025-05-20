//This file is a dynamic route screen that loads a specific task based on id& allows editing
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
//For accesing global task list and addTask and deleteTask
import { useTasks } from '../context/TaskContext';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams();//gets dynamic task id from /task/[id]
  const router = useRouter();//for navigating back home
  const { tasks, addTask, deleteTask } = useTasks();//takes all tasks to modify them 

  //finds the ttask that matches the given id
  const task = tasks.find(t => t.id === id);
  //local state for fields that can be edited
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  //On the first load it populates state with task data
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDate(task.date);
      setTime(task.time);
    }
  }, [task]);

  const handleUpdate = () => {
    if (!title || !date) {
      Alert.alert('Missing info', 'Please enter title and date');
      return;
    }

    //Deletes old and add new data
    deleteTask(task!.id);
    addTask({
      id: task!.id,
      title,
      date,
      time: time || 'All Day',
      done: task!.done,
    });

    Alert.alert('Success', 'Task updated!');
    router.push('/'); //goes back home after saving
  };

  if (!task) return <Text style={{ padding: 20 }}>Task not found.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Task</Text>

      {/*title input */}
      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />
      {/*date input*/}
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      {/*optional time input*/}
      <TextInput
        style={styles.input}
        placeholder="Time (optional)"
        value={time}
        onChangeText={setTime}
      />
      {/*save button*/}
      <Button title="Save Changes" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});

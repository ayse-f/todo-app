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
import { useTasks } from './context/TaskContext';

export default function AddTaskScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (params.date && typeof params.date === 'string') {
      setDate(params.date);
    }
  }, [params.date]);

  const handleAdd = () => {
    if (!title || !date) {
      Alert.alert('Missing info', 'Please fill out all fields');
      return;
    }

    addTask({
      id: Date.now().toString(),
      title,
      date,
      time: time || 'All Day',
      done: false,
    });

    Alert.alert('Success', 'Task added!');
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add a New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (e.g. 10:00 AM)"
        value={time}
        onChangeText={setTime}
      />

      <Button title="Add Task" onPress={handleAdd} />
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

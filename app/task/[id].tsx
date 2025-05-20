import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useTasks } from '../context/TaskContext';

export default function TaskEditScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { tasks, updateTask } = useTasks();

  const task = tasks.find(t => t.id === id);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  // Load task into local state
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDate(task.date);
      setTime(task.time || '');
      setNotes(task.notes || '');
    }
  }, [task]);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Task not found.</Text>
      </View>
    );
  }

  const handleSave = () => {
    if (!title || !date) {
      Alert.alert('Missing info', 'Title and date are required.');
      return;
    }

    updateTask(task.id, {
      title,
      date,
      time: time || 'All Day',
      notes,
    });

    Alert.alert('Saved', 'Task updated successfully.');
    router.push('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Task Details</Text>

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
        placeholder="Time (optional)"
        value={time}
        onChangeText={setTime}
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.notesInput}
        placeholder="Write notes for this task..."
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={6}
      />

      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  notesInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    marginBottom: 16,
    minHeight: 100,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

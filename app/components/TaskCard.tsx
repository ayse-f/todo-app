import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router'; //for navigation to task detail/edit screen
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task, useTasks } from '../context/TaskContext'; //task type+global task state functions

type Props = {
  task: Task; //Recieves a single task render
};

export default function TaskCard({ task }: Props) {
  const router = useRouter(); //Used to navigate to task detail page
  const { toggleTaskDone, deleteTask } = useTasks();//Gets task actions from context

  return (
    <View style={styles.card}>
      <Checkbox
        value={task.done}
        onValueChange={() => toggleTaskDone(task.id)}
        style={styles.checkbox}
        color={task.done ? '#4CAF50' : '#ccc'}
      />
      {/* pressable task content area it navigates to /task/[id] */}
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => router.push(`/task/${task.id}` as any)}
      >
        {/* strikethrough style if completed */}
        <Text style={[styles.title, task.done && styles.strikethrough]}>
          {task.title}
        </Text>
        {/* Optional task time */}
        <Text style={styles.time}>{task.time}</Text>
      </TouchableOpacity>
      {/* Right side action Delete */}
      <View style={styles.actions}>
        <Pressable onPress={() => deleteTask(task.id)}>
          <Text style={styles.delete}>🗑</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', //horizantal layout
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 1,//shadow in android
  },
  checkbox: {
    marginRight: 10,
  },
  taskContent: {
    flex: 1,//takes up remaining horizontal space
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  strikethrough: {
    textDecorationLine: 'line-through', //strike for completes task title
    color: '#999',
  },
  time: {
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 10,
  },
  edit: {
    fontSize: 18,
    marginRight: 6,
  },
  delete: {
    fontSize: 18,
    marginLeft: 6,
  },
});

import { useRouter } from 'expo-router'; //Used in navigation between pages
import { useState } from 'react'; //React hook for local state
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarView from './components/CalendarView'; //Calendar component date selector
import TaskCard from './components/TaskCard'; //Taskcard component thats reausable
import TaskProgress from './components/TaskProgress'; //Circular progress bar
import { useTasks } from './context/TaskContext'; //Global task state add/toggleetc.

export default function HomeScreen() {
  //Sets the selected date to today
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });

  const { tasks } = useTasks();//Gets task list from global context
  const router = useRouter();//for navigation to /add screen

  //Filters tasks that match currently selected date
  const filteredTasks = tasks.filter(task => task.date === selectedDate);
  //Gets only the completed tasks for progress bar
  const completedTasks = filteredTasks.filter(task => task.done);

  return (
    <>
    {/*the main scrollable area for daily tasks */}
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id} //unique key for each task
        renderItem={({ item }) => <TaskCard task={item} />} //renders each task with TaskCard
        ListEmptyComponent={
          //Its shown if no tasks exist for that day
          <View style={styles.noTask}>
            <Text>No tasks for this day.</Text>
          </View>
        }
        ListHeaderComponent={
          //THis content appears on the top of the list
          <View>
            <CalendarView
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate} //Updates selected date in state
            />
            <TaskProgress
              completed={completedTasks.length}
              total={filteredTasks.length} //Calcualtes progress percentage for the selected day
            />
          </View>
        }
        contentContainerStyle={styles.listContainer} //Applies padding/margins
      />

      {/*Floating Action Button (FAB) to add a new task */}
      <TouchableOpacity
        onPress={() =>
          //Goes to add task screen then passes the selected date
          router.push({ pathname: '/add', params: { date: selectedDate } })
        }
        style={styles.fab}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  noTask: {
    marginTop: 20,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#3399ff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, //shadow on android
  },
  fabText: {
    color: '#fff', //color for plus sign
    fontSize: 30,
    fontWeight: 'bold',
  },
});


import { Stack } from 'expo-router';
//wraps all app so that all screens share state
import { TaskProvider } from './context/TaskContext';

export default function RootLayout() {
  return (
    //taskprovider share tha task list to all pages
    <TaskProvider>
      {/*stack the navigation container, headershown set to false blocks navigation bar*/}
      <Stack screenOptions={{ headerShown: false }} />
    </TaskProvider>
  );
}

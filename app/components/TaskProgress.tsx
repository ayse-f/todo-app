import { StyleSheet, Text, View } from 'react-native';
//Circular progress ring
import { AnimatedCircularProgress } from 'react-native-circular-progress';

type Props = {
  completed: number; //how many tasks are completed
  total: number; //total tasks for selected day
};

export default function TaskProgress({ completed, total }: Props) {
  //Calculates percentage of completed tasks
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={120} //diameter of circle
        width={12} //thickness of stroke
        fill={percentage} //how much circle is filled
        tintColor="#4CAF50"  //filled stroke green
        backgroundColor="#e0e0e0" //unfilled track color
        duration={500} //animation time in ms
      >
        {/* Content inside circle*/}
        {() => (
          <View style={styles.labelContainer}>
            <Text style={styles.percent}>{percentage}%</Text>{/*shows progress percentage*/}
            <Text style={styles.label}>Done</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', //centers the progress ring horizontally
    marginVertical: 20, //space above& below
  },
  labelContainer: {
    alignItems: 'center', //Centers text inside the ring
  },
  percent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50', //Matches the ring color
  },
  label: {
    fontSize: 14,
    color: '#555', //subtle grey for label done
  },
});

import React, { useState } from 'react';
import { Platform, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
      <View style={styles.container}>

        {/* Les choses a faire aujourd'hui ! */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Liste des tâches</Text>

          <View style={styles.items}>
            {/* c'est là que les tâches iront ! */}
            {
              taskItems.map((item, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                      <Task text={item} />
                    </TouchableOpacity>
                )
              })
            }
            {/*<Task text={"Task 1"} />
              <Task text={"Task 2"} />*/}
          </View>

        </View>

        {/* section d'ecriture d'une tache */}
        <KeyboardAvoidingView
            behavior= {Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
          <TextInput style={styles.input} placeholder={'Ecire votre prochaine tache'} value={task} onChangeText={text => setTask(text)}/>

          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0D5DB',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#000',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    color: '#000',
  },
});

import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, View, TextInput } from 'react-native';
import Tasks from './components/Tasks';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';




export default function App() {

  {/*Date and Time Picker*/}
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState('Empty');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
    let fTime= 'Hours: ' + tempDate.getHours() + '| Minutes ' + tempDate.getMinutes();
    
  }

  const showMode = (currentMode) => {
    setShowDate(true);
    setMode(currentMode);

  }



  {/* Task Handler */}
  const [task, setTask] = useState();

  const [taskItems, setTaskItems] = useState([]);
  
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }


  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  
  return (
    <View style={styles.container}>

    {/* Todays tasks */}
    <View style={styles.tasksWrapper}> 
      <Text style={styles.sectionTitle}>Todays Tasks</Text>

      <View style={styles.items}>
        {/* This is where the items will go*/}
        {
          taskItems.map((item, index)=>{
            return (
              <TouchableOpacity onPress={() => completeTask(index)}>
                <Tasks text={item} />
              </TouchableOpacity>    
            ) 
          })
        }

      </View>
    
    </View>

    {/* Write a task */}
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper} 
    >  
      <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />

      <TouchableOpacity onPress={() => handleAddTask()} >
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
    backgroundColor: '#E8EAED',
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
    marginTop: 20,
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
   padding: 15,
   width: 250,
   borderRadius: 60,
   paddingVertical: 15,
   paddingHorizontal: 15,
   backgroundColor: '#FFF',
   borderColor: '#C0C0C0'

  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,


  },
  addText: {}, 
});


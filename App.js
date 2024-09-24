// import React, { useState } from 'react';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { TextInput, Button, Appbar, List, Text } from 'react-native-paper';

// const App = () => {
//   const [task, setTask] = useState('');
//   const [tasks, setTasks] = useState([]);

//   const addTask = () => {
//     if (task) {
//       setTasks([...tasks, { id: Date.now().toString(), title: task }]);
//       setTask('');
//     }
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   return (
//     <PaperProvider>
//       <View style={styles.container}>
//         <Appbar.Header>
//           <Appbar.Content title="To-Do List" />
//         </Appbar.Header>
//         <TextInput
//           mode="outlined"
//           placeholder="Add a new task"
//           value={task}
//           onChangeText={setTask}
//           style={styles.input}
//         />
//         <Button mode="contained" onPress={addTask} style={styles.addButton}>
//           Add Task
//         </Button>
//         <FlatList
//           data={tasks}
//           renderItem={({ item }) => (
//             <List.Item
//               title={item.title}
//               right={() => (
//                 <TouchableOpacity onPress={() => deleteTask(item.id)}>
//                   <Text style={styles.deleteText}>Delete</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           )}
//           keyExtractor={(item) => item.id}
//         />
//       </View>
//     </PaperProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingLeft: 20,        // 20px padding on the left
//     paddingRight: 20,
//     backgroundColor: '#000',
//   },
//   input: {
//     marginBottom: 10,
//   },
//   addButton: {
//     marginBottom: 20,
//   },
//   deleteText: {
//     color: '#d0bcff',
//     backgroundColor: '#3a3a3a',
//     marginLeft: 15,
//     alignSelf: 'center',
//     borderColor: '#d0bcff',
//     borderWidth: 1,         // Set the width of the border
//     borderStyle: 'solid',   // You can also use 'dashed' or 'dotted'
//     borderRadius: 5,        // Optional: for rounded corners
//     padding: 5,
//   },
  
// });

// export default App;

import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Appbar, List, Text } from 'react-native-paper';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null); // Track the editing task

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { id: Date.now().toString(), title: task }]);
      setTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (id, title) => {
    setEditingTaskId(id); // Set the task ID for editing
    setTask(title); // Set the input value to the task title
  };

  const updateTask = () => {
    if (task && editingTaskId) {
      setTasks(
        tasks.map((t) => (t.id === editingTaskId ? { ...t, title: task } : t))
      );
      setTask('');
      setEditingTaskId(null); // Clear editing task ID
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="To-Do List" />
        </Appbar.Header>
        <TextInput
          mode="outlined"
          placeholder="Add or update a task"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <Button mode="contained" onPress={editingTaskId ? updateTask : addTask} style={styles.addButton}>
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </Button>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <List.Item
              title={item.title}
              right={() => (
                <>
                  <TouchableOpacity onPress={() => startEditing(item.id, item.title)}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#000',
  },
  input: {
    marginBottom: 10,
  },
  addButton: {
    marginBottom: 20,
  },
  deleteText: {
    color: '#d0bcff',
    backgroundColor: '#3a3a3a',
    marginLeft: 15,
    alignSelf: 'center',
    borderColor: '#d0bcff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
  },
  editText: {
    color: '#d0bcff',
    backgroundColor: '#3a3a3a',
    marginLeft: 15,
    alignSelf: 'center',
    borderColor: '#d0bcff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
  },
});

export default App;

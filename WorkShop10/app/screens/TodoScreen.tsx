import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addTodo, toggleTodo, removeTodo } from '../redux/todoSlice';

const TodoScreen = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todo);

  const [text, setText] = useState('');

  const addHandler = () => {
    if (!text) return;

    dispatch(addTodo({
      id: Date.now().toString(),
      text,
      completed: false
    }));

    setText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>index</Text>

      <TextInput
        placeholder="เพิ่มงาน..."
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <TouchableOpacity style={styles.addBtn} onPress={addHandler}>
        <Text style={styles.btnText}>เพิ่มงาน</Text>
      </TouchableOpacity>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <TouchableOpacity
              onPress={() => dispatch(toggleTodo(item.id))}
            >
              <Text
                style={[
                  styles.itemText,
                  item.completed && styles.completed
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => dispatch(removeTodo(item.id))}
            >
              <Text style={styles.btnText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.total}>
        จำนวนงานทั้งหมด: {todos.length}
      </Text>
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#eee'
  },
  header: {
    fontSize: 18,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 8
  },
  addBtn: {
    backgroundColor: '#2196F3',
    padding: 12,
    alignItems: 'center',
    marginBottom: 10
  },
  btnText: {
    color: '#fff'
  },
  itemBox: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemText: {
    color: '#fff'
  },
  completed: {
    textDecorationLine: 'line-through',
    opacity: 0.6
  },
  removeBtn: {
    backgroundColor: '#1976D2',
    padding: 6
  },
  total: {
    marginTop: 10,
    fontSize: 16
  }
});
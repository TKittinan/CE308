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
import { addItem, removeItem, clearCart } from '../redux/cartSlice';

const CartScreen = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const addHandler = () => {
    if (!name || !price || !quantity) return;

    dispatch(addItem({
      id: Date.now().toString(),
      name,
      price: Number(price),
      quantity: Number(quantity),
    }));

    setName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>index</Text>

      <TextInput placeholder="ชื่อสินค้า" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="ราคา" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="จำนวน" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={styles.input} />

      <TouchableOpacity style={styles.addBtn} onPress={addHandler}>
        <Text style={styles.btnText}>เพิ่มลงตะกร้า</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>
              {item.name} x{item.quantity} ราคา {item.price} บาท
            </Text>
            <TouchableOpacity style={styles.removeBtn} onPress={() => dispatch(removeItem(item.id))}>
              <Text style={styles.btnText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.clearBtn} onPress={() => dispatch(clearCart())}>
        <Text style={styles.btnText}>ล้างตะกร้า</Text>
      </TouchableOpacity>

      <Text style={styles.total}>รวมราคา: {totalAmount} บาท</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#eee' },
  header: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, backgroundColor: '#fff', padding: 10, marginBottom: 8 },
  addBtn: { backgroundColor: '#2196F3', padding: 12, alignItems: 'center', marginBottom: 10 },
  clearBtn: { backgroundColor: '#2196F3', padding: 12, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff' },
  itemBox: { backgroundColor: '#2196F3', padding: 10, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemText: { color: '#fff' },
  removeBtn: { backgroundColor: '#1976D2', padding: 6 },
  total: { marginTop: 10, fontSize: 16 }
});
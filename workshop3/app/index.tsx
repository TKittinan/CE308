import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";

const DATA1 = [
  { id: '1', title: 'Iot and Robotic AI' },
  { id: '2', title: 'WEB Development' },
  { id: '3', title: 'Cyber Security' },
  { id: '4', title: 'Data Analytics' },
  { id: '5', title: 'Stock and Investment' },
];
const DATA2 = [
  { id: '1', title: 'Manual Dev' },
  { id: '2', title: 'Coding Alone' },
  { id: '3', title: 'Introvert Humans' },
];

const App = () => {
  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.itemContainer}>
      <View style={styles.dot} />
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* contentContainersStyle คือการกำหนดสไตล์ของ container ภายใน ScrollView */}

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: "#005475" }]}>
          <Text style={styles.boxText}>Student.num</Text>
          <Text style={styles.boxText}>66112522</Text>
        </View>
        <View style={[styles.box, { backgroundColor: "#005475" }]}>
          <Text style={styles.boxText}>Faculty of</Text>
          <Text style={styles.boxText}>Engineering</Text>
        </View>
        <View style={[styles.box, { backgroundColor: "#005475" }]}>
          <Text style={styles.boxText}>Computer</Text>
          <Text style={styles.boxText}>Engineering</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>Personal Information</Text>
        <Text style={styles.listItem}>Name : Kittinan Lertthamphiriya</Text>
        <Text style={styles.listItem}>NickName : Tee</Text>
        <Text style={styles.listItem}>Email : tkittinan.work@gmail.com</Text>
        <Text style={styles.title}>Education</Text>
        <Text style={styles.listItem}>University : Dhurakij Pundit University</Text>
        <Text style={styles.listItem}>Branch : Computer Engineering {"\n"}
          (3rd year Bachelors degree)</Text>
        <Text style={styles.title}>Accommodation</Text>
        <Text style={styles.listItem}>ซอย ประชาชื่นนนทบุรี 8 ท่าทราย อ.เมือง นนทบุรี 11000</Text>
      </View>

      <View style={styles.contentSection}>
        <FlatList
          data={DATA1}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<Text style={styles.headerFlatList}>Like</Text>}
        />
      </View>
      <View style={styles.contentSection}>
        <FlatList
          data={DATA2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<Text style={styles.headerFlatList}>Dont Like</Text>}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  header: {
    height: 100,
    backgroundColor : "#003347",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  box: {
    flex: 1,
    height: 100,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  boxText: {
    color: 'white',
    fontWeight: '600',
  },
  contentSection: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#35679C',
  },
  contentSectionFlatList: {
    marginTop: 20,
  },
  headerFlatList: {
    fontSize: 22,
    fontWeight: "bold",
    padding:20,
    backgroundColor:'#0075A3',
    borderRadius:10,
    color:'#FFFFFF',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#1A1A1A',
    borderBottomWidth: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1A1A1A",
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
  },
});

export default App;
import "./global.css";
// Ex3.2
import { CustomInput } from "../components/CustomInput";
import { View } from "react-native";
import { useState } from "react";
import { CustomButton } from "../components/CustomButton";

export default function Index() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  return (
    <View>
      <CustomInput
        label="Product Name"
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter product name"
      />
      <CustomInput
        label="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        placeholder="Enter price"
      />
      <CustomInput
        label="Quantity"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        placeholder="Enter quantity"
      />
      <View className="mt-4">
        <CustomButton
          title="Submit"
          size="medium"
          variant={"primary"}
          onPress={() => alert(`Subnmitted Details:\n
            Name : ${name}, 
            Price : ${price}, 
            Quantity : ${quantity}`)}
        />
      </View>
    </View>
  );
}

// // Ex3.1
// import { View } from "react-native";
// import { ItemCard } from "../components/ItemCard";

// const item = [
//   { id: '1', productName: 'Banana', price: 2000, pcs: 10,btnSize:"small", btnColor:"primary" },
//   { id: '2', productName: 'Mango', price: 2000, pcs: 10,btnSize:"medium", btnColor:"secondary" },
//   { id: '3', productName: 'Apple', price: 2000, pcs: 10,btnSize:"large", btnColor:"danger" },
// ];

// export default function Index() {
//   return (
//     <View>
//       <ItemCard items={item}/>
//     </View>
//   );
// }


// // import { Text,View } from "react-native";
// import { Text } from "react-native";
// import { CenteredView } from "../components/CenteredView";

// export default function Index() {
//   return (
//     <CenteredView backgroundColor="bg-blue-100">
//       <Text className="text-xl font-bold text-blue-500">Hello, NativeWind!</Text>
//     </CenteredView>
//   );
// }


// import { CenteredView } from "../components/CenteredView";
// import { ItemList } from "../components/ItemList";

// export default function Index() {
//   const data = [
//     { id: '1', title: 'Apples', pcs: 10 },
//     { id: '2', title: 'Bananas', pcs: 5 },
//     { id: '3', title: 'Cherries', pcs: 20 },
//   ];

//   return (
//     <CenteredView>
//       <ItemList items={data} />
//     </CenteredView>
//   );
// }


// import { CenteredView } from "../components/CenteredView";
// import { CustomButton } from "../components/CustomButton";

// export default function Index() {
//   return (
//     <CenteredView>
//       <CustomButton title = "Primary" variant="primary" size="medium" onPress={() => alert("Primary button pressed!")} />
//       <CustomButton title = "Secondary" variant="secondary" size="large" onPress={() => alert("Secondary button pressed!")} />
//       <CustomButton title = "Danger" variant="danger" size="small" onPress={() => alert("Danger button pressed!")} />
//     </CenteredView>
//   );
// }
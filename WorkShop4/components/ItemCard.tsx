import { View, Text, FlatList } from 'react-native';
import { CustomButton } from './CustomButton';

type ItemCardProps = {
    items: { id: string; 
        productName: string; 
        price: number; 
        pcs: number; 
        btnSize: string; 
        btnColor: string }[];
};

export const ItemCard = ({ items }: ItemCardProps) => {
    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View className="w-100 bg-blue-100 p-4 m-2 rounded-lg shadow-md">
                    <Text className="text-4xl font-bold text-gray-800">Product Name : {item.productName}</Text>
                    <Text className="text-base text-gray-800">Price: ${item.price}</Text>
                    <Text className="text-base text-gray-800">Quantity: {item.pcs} pcs</Text>
                    <View className="mt-3 self-start">
                        <CustomButton
                            title="Buy Now"
                            size={item.btnSize as "small" | "medium" | "large"}
                            variant={item.btnColor as "primary" | "secondary" | "danger"}
                            onPress={() => alert(`Purchased ${item.productName}`)}
                        />
                    </View>
                </View>
            )}
        />
    );
};
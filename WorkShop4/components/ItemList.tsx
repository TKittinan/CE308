import { View, Text, FlatList } from 'react-native';

type ItemListProps = {
    items: { id: string; title: string; pcs: number }[];
};

export const ItemList = ({ items }: ItemListProps) => {
    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View className="p-4 border-b border-gray-300">
                    <Text className="text-4xl font-bold text-gray-800">{item.title} - {item.pcs}</Text>
                </View>
            )}
        />
    );
};
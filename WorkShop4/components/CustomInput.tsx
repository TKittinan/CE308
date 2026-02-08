import { View, Text,TextInput, TextInputProps } from "react-native";

type CustomInputProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
} & TextInputProps;

export const CustomInput = ({ 
    label,
    value, 
    onChangeText,
    placeholder,}: CustomInputProps) => {
    return (
        <View className="mt-4">
            <Text className="mb-2 text-base">{label}</Text>
            <TextInput  
                className="w-full border border-gray-800 rounded-lg px-4 py-2 text-base"
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
            />
        </View>
    );
}


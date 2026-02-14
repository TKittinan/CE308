import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
interface CheckboxProps {
    label: string;
    checked: boolean;
    onPress: () => void;
    error?: string;
    touched?: boolean;
}

export default function Checkbox({
    label,
    checked,
    onPress,
    error,
    touched,
}: CheckboxProps) {
    const hasError = touched && error;  
    return (
        <View className="w-full mb-4">
            <TouchableOpacity
                className={`flex-row items-center
                    ${hasError ? "border-red-500" : "border-gray-300"}  
                    border-2 rounded-lg px-4 py-3
                    `}  
                onPress={onPress}
            >
                <View className={`w-5 h-5 mr-3 rounded-sm border-2
                    ${checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"}
                    `}  
                />
                <Text className="text-gray-700 text-base">
                    {label}
                </Text>
            </TouchableOpacity>
            {hasError && (
                <Text className="text-red-500 text-sm mt-1">
                    {error}
                </Text>
            )}
        </View>
    );
}
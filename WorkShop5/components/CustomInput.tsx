import React from "react";
import {View, Text, TextInput, TextInputProps} from "react-native";

interface CustomInputProps extends TextInputProps {
    label: string;
    
    error?:string;
    touched?: boolean;
}

export default function CustomInput({
    label,
    error,
    touched,
    ...props
}: CustomInputProps) {
    const hasError = touched && error;

    return (
        <View className="w-full mb-4">
            <Text className="text-gray-700 font-semibold mb-2 text-base">
                {label}
            </Text>

            <TextInput
                className={` w-full px-4 py-3 rounded-lg border-2
                    ${hasError ? "border-red-500" : "border-gray-300"}
                    ${props.editable === false ? "bg-gray-100" : "bg-white"}
                    text-base text-gray-800
                    `}
                    placeholderTextColor="#9CA3AF"
                    {...props}
            />

            {hasError &&(
                <Text className="text-red-500 text-sm mt-1">
                    {error}
                </Text>
            )}
        </View>
    );
}
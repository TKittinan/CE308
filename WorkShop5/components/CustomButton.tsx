import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean;
    loading?: boolean;
}

export default function CustomButton({
    title,
    onPress,
    variant = "primary",
    disabled = false,
    loading = false,
}: CustomButtonProps) {
    const getVariantStyles = () => {
        if (disabled) {
            return "bg-gray-300"
        }

        switch (variant) {
            case "primary":
                return "bg-blue-600 active:bg-blue-700";
            case "secondary":
                return "bg-gray-600 active:bg-gray-700";
            case "danger":
                return "bg-red-600 active:bg-red-700";
            default:
                return "bg-blue-600 active:bg-blue-700";
        }
    };

    return (
        <TouchableOpacity
        className={` w-full px-6 py-4 rounded-lg
            ${getVariantStyles()}
            flex-row justify-center items-center
            `}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color="white"/>
            ) : (
                <Text className="text-white font-bold text-lg">
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}
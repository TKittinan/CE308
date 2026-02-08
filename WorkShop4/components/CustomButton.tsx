import { Text, TouchableOpacity } from 'react-native';

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
    size?: "small" | "medium" | "large";
};

export const CustomButton = ({
    title,
    onPress,
    variant = "primary",
    size = "medium",
}: CustomButtonProps) => {
    const variantClasses = {
        primary: "bg-blue-500 active:bg-blue-700",
        secondary: "bg-gray-500 active:bg-gray-700",
        danger: "bg-red-500 active:bg-red-700",
    };

    const sizeClasses = {
        small: "px-2 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg",
    };

    return (
        <TouchableOpacity
            className={[
                variantClasses[variant],
                sizeClasses[size],
                "rounded-lg active:bg-opacity-70 self-start",
            ].join(' ')}
            onPress={onPress}
        >
            <Text className="text-white font-semibold">{title}</Text>
        </TouchableOpacity>
    );
};
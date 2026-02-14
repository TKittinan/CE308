import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  show: boolean;
  onShow: () => void;
  onClose: () => void;
}

export default function DatePicker({
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  show,
  onShow,
  onClose,
}: DatePickerProps) {
  const hasError = touched && error;

  const handleChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      onClose();
    }

    if (selectedDate) {
      onChange(selectedDate);
    }

    if (onBlur) {
      onBlur();
    }
  };

  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-semibold mb-2">
        {label}
      </Text>

      <TouchableOpacity
        onPress={onShow}
        className={`border-2 rounded-lg px-4 py-3 ${
          hasError ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
        }`}
      >
        <Text className="text-gray-700">
          {value
            ? value.toLocaleDateString()
            : "เลือกวันเกิด"}
        </Text>
      </TouchableOpacity>

      {hasError && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={handleChange}
        />
      )}
    </View>
  );
}

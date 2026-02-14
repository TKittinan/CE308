import "./global.css";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Checkbox from "../components/Checkbox";
import DatePicker from "../components/DatePicker";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  gender: string;
  checkbox: boolean;
  birthDate: Date | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?:string;
  password?:string;
  confirmPassword?:string;
  address?:string;
  gender?: string;
  checkbox?: string;
  birthDate?: string;
}

export default function Index(){
  const [formData, setFormData] = useState<FormData>({
    fullName:"",
    email:"",
    phone:"",
    password:"",
    confirmPassword:"",
    address:"",
    gender:"",
    checkbox: false,
    birthDate: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{[key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateField = (name: keyof FormData, value: FormData[keyof FormData]): string | undefined => {
    switch (name) {
      case "fullName":
        if (!String(value).trim()) {  
          return "กรอกชื่อ-นามสกุล";
        }
        if (String(value).trim().length < 3) {
          return "ชื่อ-นามสกุลต้องมีอย่างน้อย 3หลัก";
        }
        return undefined;

      case "email":
        if (!String(value).trim()) {
          return "กรอกอีเมล";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(value))){
          return "รูปแบบอีเมลไม่ถูกต้อง";
        }
      return undefined;
      
      case "phone":
        if (!String(value).trim()) {
          return "กรอกเบอร์";
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(String(value))) {
          return "เบอร์มือถือต้องเป็นเลข10หลักเท่านั้น";
        }
      return undefined;

      case "password":
        if (!String(value).trim()) {
          return "กรอกรหัสผ่าน";
        }
        if (String(value).trim().length < 6) {
          return "รหัสผ่านต้องมีอย่างน้อย 6หลัก";
        }
      return undefined;

      case "confirmPassword":
        if (!String(value).trim()) {
          return "ยืนยันรหัสผ่าน";
        }
        if (String(value) !== formData.password) {
          return "รหัสผ่านไม่ตรงกัน";
        }
      return undefined;

      case "address":
        if (!String(value).trim()) {
          return "โปรดกรอกที่อยู่ของท่าน";
        }
        if (String(value).trim().length < 10) {
          return "โปรดกรอกที่อยู่ให้ถูกต้อง";
        }
      return undefined;

      case "gender":
        if (!String(value).trim()) {
          return "กรุณาเลือกเพศ";
        }
      return undefined;

      case "birthDate":
        if (!value) {
          return "กรุณาเลือกวันเกิด";
        }
        if (value instanceof Date) {
          const today = new Date();

          let age = today.getFullYear() - value.getFullYear();

          const monthDiff = today.getMonth() - value.getMonth();
          const dayDiff = today.getDate() - value.getDate();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && dayDiff < 0)
          ) {
            age--;
          }

          if (age < 13) {
            return "คุณต้องมีอายุอย่างน้อย 13 ปี";
          }
        }
      return undefined;

      case "checkbox":
        if (!value) {
          return "คุณต้องยอมรับเงื่อนไข";
        }
      return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (name: keyof FormData, value: string | boolean | Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
    };
    let isValid = true;

    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!validateForm()) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "สำเร็จ!",
        `ลงทะเบียนสำเร็จ\nชื่อ: ${formData.fullName}\nอีเมล: ${formData.email}\nเบอร์: ${formData.phone}\nที่อยู่: ${formData.address}`,
        [
          {
            text: "ตรวจสอบ",
            onPress: () => console.log("Form Data:", formData),
          },
          {
            text: "รีเซ็ตฟอร์ม",
            onPress: handleReset,
            style: "cancel",
          },
        ]
      );
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      fullName:"",
      email:"",
      phone:"",
      password:"",
      confirmPassword:"",
      address:"",
      gender:"",
      checkbox: false,
      birthDate: null,
    });
    setErrors({});
    setTouched({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerClassName = "pb-8"
          keyboardShouldPersistTaps = "handled"
        >
          <View className = "bg-blue-600 pt-16 pb-8 px-6">
            <Text className = "text-white text-3xl font-bold">
              ลงทะเบียนสมาชิก
            </Text>
            <Text className = "text-blue-100 text-base mt-2">
              กรุณากรอกข้อมูลให้ครบ
            </Text>
          </View>
          <View className="px-6 mt-6">
            <CustomInput
              label="ชื่อ-นามสกุล"
              placeholder="ระบุชื่อและนามสกุล"
              value={formData.fullName}
              onChangeText={(value) => handleChange("fullName", value)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
              autoCapitalize="words"
            />

            <CustomInput
              label="อีเมล"
              placeholder="example@email.com"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="0812345678"
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <CustomInput
              label="รหัสผ่าน"
              placeholder="อย่างน้อย 6 ตัวอักษร"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              autoCapitalize="none"
            />

            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            
            <CustomInput
              label="ที่อยู่"
              placeholder="โปรดกรอกที่อยู่อีกครั้ง"
              value={formData.address}
              onChangeText={(value) => handleChange("address", value)}
              onBlur={() => handleBlur("address")}
              error={errors.address}
              touched={touched.address}
              autoCapitalize="words"
            />

            <View className="items-end mt-1">
              <Text>
                {formData.address.length} / 200
              </Text>
            </View>

            <Text className="text-gray-700 font-semibold mb-2 text-base">
              เลือกเพศ
            </Text>
            <View className={`rounded-lg p-3 border-2 mb-2
              ${touched.gender && errors.gender
                ? "border-red-500 bg-red-50"
                : "border-gray-300 bg-white"
              }
            `}>
              <Checkbox
                label="เพศชาย"
                checked={formData.gender === "male"}
                onPress={() => {
                  handleChange("gender",formData.gender === "male" ? "" : "male");
                  setTouched((prev) => ({ ...prev, gender: true }));
                }}
              />
              <Checkbox
                label="เพศหญิง"
                checked={formData.gender === "female"}
                onPress={() => {
                  handleChange("gender",formData.gender === "female" ? "" : "female");
                  setTouched((prev) => ({ ...prev, gender: true }));
                }}
              />
              <Checkbox
                label="ไม่ระบุเพศ"
                checked={formData.gender === "other"}
                onPress={() => {
                  handleChange("gender",formData.gender === "other" ? "" : "other");
                  setTouched((prev) => ({ ...prev, gender: true }));
                }}
              />
              {touched.gender && errors.gender && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.gender}
                </Text>
              )}
            </View>

            <DatePicker
              label="วันเกิด"
              value={formData.birthDate}
              onChange={(date) => handleChange("birthDate", date)}
              onBlur={() => handleBlur("birthDate")}
              error={errors.birthDate}
              touched={touched.birthDate}
              show={showDatePicker}
              onShow={() => setShowDatePicker(true)}
              onClose={() => setShowDatePicker(false)}
            />

            <Checkbox
              label="ลงทะเบียนยอมรับเงื่อนไข"
              checked={formData.checkbox}
              error={errors.checkbox}
              touched={touched.checkbox}
              onPress={() => {
                handleChange("checkbox", !formData.checkbox);
                setTouched((prev) => ({ ...prev, checkbox: true }));
              }}
            />

            <View className="mt4 space-y-3">
              <CustomButton
                title="ลงทะเบียน"
                onPress={handleSubmit}
                variant="primary"
                loading={isLoading}
              />

              <CustomButton
                title="รีเซ็ตฟอร์ม"
                onPress={handleReset}
                variant="secondary"
                disabled={isLoading}
              />
            </View>

            <View className="mt-6 bg-blue-50 border-blue-200 rounded-lg p-4">
              <Text className="text-blue-800 font-semibold text-base mb-2">
                คำแนะนำ
              </Text>
              <Text className="text-blue-700 text-sm leading-5">
                - กรอกข้อมูลให้ครบถ้วย{"\n"}
                - อีเมลต้องมีรูปแบบที่ถูกต้อง{"\n"}
                - เบอร์มือถือต้องเป็นตัวเลข 10หลัก{"\n"}
                - รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร{"\n"}
                - กรอกที่อยู่ให้ถูกต้อง{"\n"}
                - ต้องยอมรับเงื่อนไขเพื่อดำเนินการต่อ{"\n"}
                - วันเกิดต้องเลือกเพื่อยืนยันอายุของคุณ{"\n"}
                - คุณต้องมีอายุอย่างน้อย 13 ปีเพื่อสมัครสมาชิก
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
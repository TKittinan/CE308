import {View} from 'react-native';

type CenteredViewProps = {
    children: React.ReactNode;
    backgroundColor?: string;
};

export const CenteredView = ({ children, backgroundColor = "bg-gray-100" }: CenteredViewProps) => {
    return <View className={`flex-1 items-center justify-center ${backgroundColor}`}>
        {children}
    </View>;
};
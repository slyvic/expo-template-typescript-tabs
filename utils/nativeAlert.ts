import { Alert } from "react-native";

export const nativeAlert = async (title: string, text?: string) => {
     Alert.alert(title, text, [
        {
            text: 'Cancelar',
            style: 'destructive',
            onPress: () => ('Cancelado')
        },
        {
            text: 'Aceptar',
            style: 'destructive',
            onPress: () => ('Accepted')
        },
    ]);

}

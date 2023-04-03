import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList, RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Conversor from '../screens/Conversor';
import Support from '../screens/Support';
import { Alert, Pressable } from 'react-native';
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Conversor"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].white,
        tabBarHideOnKeyboard: true
      }}>
      <BottomTab.Screen
        name="Conversor"
        component={Conversor}
        options={({ navigation }: RootTabScreenProps<'Conversor'>) => ({
          title: 'Conversor',
          tabBarIcon: ({ color }) => <TabBarIcon name="refresh" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => Alert.alert('Cómo funciona?', 'Simplemente ingresá el valor en la moneda que quieras y nosotros automáticamente lo convertiremos en tiempo real, así de fácil! 😄', [
                {
                  text: 'Entendido',
                  style: 'cancel',
                },
              ])}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].white}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Support"
        component={Support}
        options={{
          title: 'Soporte',
          tabBarIcon: ({ color }) => <TabBarIcon name="support" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default BottomTabNavigator
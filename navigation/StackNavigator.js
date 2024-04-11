import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import colors from '../utils/colors';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
            screenOptions={{
              headerTitleStyle: {
                fontFamily: "medium",
                color: "white",
              },
              headerStyle: {
                backgroundColor: colors.primary,
              },
            }}
          >
            <Stack.Group>
              <Stack.Screen
                name="main"
                component={TabNavigator}
                options={{
                  headerTitle: "Translate",
                  headerTitleAlign: "center",
                }}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                presentation: "containedModal",
                animation: "slide_from_bottom",
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleStyle: {
                  color: colors.textColor,
                  fontFamily: "medium",
                },
              }}
            >
              <Stack.Screen
                name="languageSelect"
                component={LanguageSelectScreen}
                options={{
                  headerBackVisible: false,
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
  )
}
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as Updates from 'expo-updates';


//Redux
import { Provider as ReduxProvider } from "react-redux";
import store from './redux/store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { View, Text } from './components/Themed';
import Colors from './constants/Colors';

export default function App() {
  const isLoadingComplete = useCachedResources();
  
  const colorScheme = useColorScheme();

  const [isDownloadingUpdate, setisDownloadingUpdate] = useState(false)


  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        setisDownloadingUpdate(true)
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      } else {
        setisDownloadingUpdate(false)
      }
    } catch (error) {
      Alert.alert('Error de actualización', 'Ocurrió un error mientras intentábamos descargar las últimas actualizaciones. TeCambio intentará instalarlas la próxima vez que abras la app. Por favor, ciérrala y vuelve a abrirla para disfrutar de lo último.')
    }
  }

  useEffect(() => {
   checkForUpdates()
  }, [])
   
  if (isDownloadingUpdate) {
    return <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ActivityIndicator size={'large'} color={Colors.light.primary}/>
      <Text style={{marginTop: 15}}>Actualizando app...</Text>
    </View>
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ReduxProvider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar/>
        </SafeAreaProvider>
      </ReduxProvider>
    );
  }
}

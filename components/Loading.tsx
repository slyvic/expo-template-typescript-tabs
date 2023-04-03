import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Colors.light.primary}/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
})
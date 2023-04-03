import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const Button = ({ style, type, shadow, text, lightColor, darkColor, icon, ...otherProps } : any) => {

    let buttonColor = ''
    let textColor = ''
  
  
    if (type === 'primary') {
      buttonColor = Colors.light.primary
      textColor = Colors.light.white
    } else if (type === 'secondary') {
      buttonColor = Colors.light.secondary
      textColor = Colors.light.white
    } else if (type === 'tertiary') {
      buttonColor = Colors.light.secondary
      textColor =  Colors.light.white
    } 
  
    const themeStyle = {
      padding: 15,
      backgroundColor: buttonColor,
      margin: 5,
      borderRadius: 50,
    }
  
    const shadowStyle = {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    }
  
    return (
      <TouchableOpacity style={[{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%'}, themeStyle, shadow && shadowStyle]} {...otherProps}>
          <Text style={{color: textColor, fontWeight: 'bold', fontSize: 18}}>{text}</Text>
          <View style={{position: 'absolute', backgroundColor: 'transparent', right: 25}}>{icon}</View>
      </TouchableOpacity>
    );
}

export default Button

const styles = StyleSheet.create({})
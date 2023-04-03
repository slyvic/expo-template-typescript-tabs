import React, { useRef, useState } from 'react'
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Colors from '../constants/Colors'
import { sendTicket } from '../redux/actions/supportActions';
import { useHeaderHeight } from '@react-navigation/elements'

const { height, width } = Dimensions.get('window')

const Support = ({ loading, sendTicket, navigation }: any) => {

  const header = useHeaderHeight()

  const [formData, setFormData] = useState({
    message: '',
    email: '',
    userId: '',
    name: ''
  })

  const { message, name, email, userId } = formData
  const inputRef = useRef<any>(null)

  const onChangeInput = (name: string, e: any) => {
    setFormData({ ...formData, [name]: e })
  }

  const handleSendInquiry = () => {
    if (!message) {
      Alert.alert('Ha ocurrido un error 😕', `Tu mensaje no puede estar vacío. Por favor, danos una explicación más detallada sobre tu consulta`, [
        {
          text: 'Entendido',
          style: 'cancel',
        },
      ])
    } else if (message.length < 50) {
      Alert.alert('Es mensaje es muy corto 😕', `Por favor, danos una explicación más detallada sobre tu consulta`, [
        {
          text: 'Entendido',
          style: 'cancel',
        },
      ])
    } else if (!email) {
      Alert.alert('Es mensaje es muy corto 😕', `Tu dirección de email es un campo obligatorio`, [
        {
          text: 'Entendido',
          style: 'cancel',
        },
      ])
    }
    else if (!name) {
      Alert.alert('Es mensaje es muy corto 😕', `Tu dirección de email es un campo obligatorio`, [
        {
          text: 'Entendido',
          style: 'cancel',
        },
      ])
    }
    else {
      sendTicket(name, message, email, userId, navigation)
      setFormData({
        ...formData,
        email: '',
        name: '',
        message: '',
      })
    }
  }

  return loading ? <Loading /> : (

    <View style={styles.container}>


      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={{ width, justifyContent: 'center', alignItems: 'center'}}
      >

        <View style={styles.header}>
          <Text style={styles.title}>Envianos tu consulta!</Text>
          <Text style={styles.subtitle}>Te responderemos via email cuanto antes...</Text>
        </View>
        

        <Pressable onPress={() => inputRef.current.focus()} style={styles.form}>

          <TextInput
            style={styles.formInput}
            placeholder="Tu nombre"
            placeholderTextColor={Colors.light.secondary}
            underlineColorAndroid="transparent"
            value={name}
            returnKeyType='next'
            enablesReturnKeyAutomatically
            blurOnSubmit={true}
            ref={inputRef}
            onChangeText={e => onChangeInput('name', e)}
          />

          <TextInput
            style={styles.formInput}
            placeholder="Tu email"
            placeholderTextColor={Colors.light.secondary}
            underlineColorAndroid="transparent"
            value={email}
            returnKeyType='next'
            enablesReturnKeyAutomatically
            blurOnSubmit={true}
            ref={inputRef}
            onChangeText={e => onChangeInput('email', e)}
          />

          <TextInput
            style={[styles.formInput, { flex: 1, minHeight: 75 }]}
            placeholder="Alguna duda? Estamos encantados en ayudarte. Escribí con detalles tu consulta o inquietud. 😁"
            placeholderTextColor={Colors.light.secondary}
            underlineColorAndroid="transparent"
            value={message}
            multiline
            returnKeyType='done'
            enablesReturnKeyAutomatically
            blurOnSubmit={true}
            ref={inputRef}
            maxLength={2500}
            onChangeText={e => onChangeInput('message', e)}
          />
          <Text style={styles.charactersCount}>{message.length || 0}/2500</Text>
        </Pressable>

        <View style={{ width: '90%', marginBottom: 15 }} >
          <Button style={{ minWidth: Dimensions.get('window').width, backgroundColor: 'red' }} text='Enviar' type='primary' onPress={() => handleSendInquiry()} />
        </View>

      </ScrollView>


    </View>
  )
}

const mapStateToProps = (state: any) => ({
  loading: state.supportReducer.loading
})


export default connect(mapStateToProps, { sendTicket })(Support)

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    maxWidth: '80%',
    paddingTop: 30,
    marginBottom: 20
  },
  logo: {
    height: 56,
    width: 56,
  },
  title: {
    fontWeight: '400',
    fontSize: 30,
  },
  subtitle: {
    color: Colors.light.primary
  },
  button: {
    width: '80%',
    backgroundColor: 'blue',
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  form: {
    width: '90%',
    flex: 1,
    marginBottom: 20,
    padding: 10,
    paddingBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  formInput: {
    width: '100%',
    padding: 12,
    margin: 2,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.light.lightGray,
    minHeight: 40
  },
  inputIcon: {
    width: 40
  },
  inputText: {
    position: 'absolute',
    top: -20,
    width: 200,
    color: Colors.light.primary
  },
  charactersCount: {
    color: Colors.light.primary,
    position: 'absolute',
    bottom: 2,
    right: 6
  }
})
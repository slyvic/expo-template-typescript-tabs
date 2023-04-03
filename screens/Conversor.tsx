import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, RefreshControl, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { API_URL } from '../constants/Strings';
import { RootTabScreenProps } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import { useHeaderHeight } from '@react-navigation/elements'


const { width, height } = Dimensions.get('window')
const Conversor = ({ navigation }: RootTabScreenProps<'Conversor'>) => {

    const header = useHeaderHeight()

    const colorScheme = useColorScheme()

    const [isLoading, setIsLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    // Bank prices
    const [usdARSvalue, setUsdARSvalue] = useState<any>('')
    const [usdMXNvalue, setUsdMXNvalue] = useState<any>('')
    const [pricesLoading, setPricesLoading] = useState(true)

    const inputRef = useRef<any>(null)


    // Input prices
    const [formData, setFormData] = useState({
        MXNinputValue: '',
        USDinputValue: '',
        ARSinputValue: ''
    })

    const { MXNinputValue, USDinputValue, ARSinputValue } = formData

    const calculate = async (currency: string, e: any) => {


        switch (currency) {
            case 'MXNinputValue':
                //Conversion to USD
                const calculatedPriceinUSDfromMXN = await e / usdMXNvalue;
                //console.log('En USD:', calculatedPriceinUSDfromMXN)

                //Conversion to ARS
                const calculatedPriceinARSfromMXN = await calculatedPriceinUSDfromMXN * usdARSvalue;
                //console.log('En ARS:', calculatedPriceinARSfromMXN)

                setFormData({
                    MXNinputValue: e,
                    USDinputValue: calculatedPriceinUSDfromMXN.toFixed(2).replace(/\.00$/, ''),
                    ARSinputValue: calculatedPriceinARSfromMXN.toFixed(2).replace(/\.00$/, '')
                })
                break;

            case 'USDinputValue':

                //Conversion to MX
                const calculatedPriceinMX = await e * usdMXNvalue
                //console.log('En MX: ', calculatedPriceinMX)

                // Conversion to ARS
                const calculatedPriceinARS = await e * usdARSvalue
                //console.log('En ARS: ', calculatedPriceinARS)

                setFormData({
                    MXNinputValue: calculatedPriceinMX.toFixed(2).replace(/\.00$/, ''),
                    USDinputValue: e,
                    ARSinputValue: calculatedPriceinARS.toFixed(2).replace(/\.00$/, '')
                })
                break;

            case 'ARSinputValue':

                //Conversion to USD
                const calculatedPriceinUSDfromARS = await e / usdARSvalue
                //console.log('En USD: ', calculatedPriceinUSDfromARS)

                //Conversion to MXN
                const calculatedPriceinMXNfromARS = calculatedPriceinUSDfromARS * usdMXNvalue
                //console.log('En MXN: ', calculatedPriceinMXNfromARS)

                setFormData({
                    MXNinputValue: calculatedPriceinMXNfromARS.toFixed(2).replace(/\.00$/, ''),
                    USDinputValue: calculatedPriceinUSDfromARS.toFixed(2).replace(/\.00$/, ''),
                    ARSinputValue: e
                })
                break;

            default:
                break;
        }
    }


    const onChangeInput = (name: string, e: any) => {

        const formattedValue = e.replaceAll(/,/g, '.')

        if (isNaN(formattedValue)) {
            return
        }

        calculate(name, formattedValue)
        setFormData({ ...formData, [name]: formattedValue })
    }

    const getUsdPriceInARS = async () => {

        try {
            const res = await axios.get(`${API_URL}/api/prices/usdars`)

            const price = res.data.value_sell

            setUsdARSvalue(price)
        } catch (error) {
            alert('Ups! 😕 Ocurrió un error mientras tratábamos de obtener el precio del dolar en pesos argentinos 😕')
        }

    }


    const getUsdPriceInMXN = async () => {

        const res = await axios.get(`${API_URL}/api/prices/usdmxn`)

        const price = res.data

        setUsdMXNvalue(price)
    }

    useEffect(() => {
        getUsdPriceInARS()
        return () => {
        }
    }, [])


    useEffect(() => {
        getUsdPriceInMXN()
        return () => {
        }
    }, [])

    useEffect(() => {

        if (usdARSvalue && usdMXNvalue) {
            setIsLoading(true)
        }

        return () => {
        }
    }, [usdARSvalue, usdMXNvalue])


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getUsdPriceInARS()
        await getUsdPriceInMXN()
        setRefreshing(false);
    }, []);

    return (

       

        <View style={styles.container}>


            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                overScrollMode="never"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors[colorScheme].primary]} tintColor={Colors[colorScheme].primary} />}

                contentContainerStyle={{ width, justifyContent: 'center', alignItems: 'center' }}
            >

                <View style={styles.card}>

                    <View style={styles.currencyIndicator} >
                        <Text style={styles.currencyIndicatorText}  >
                            MXN 🇲🇽
                        </Text>
                    </View>

                    <View style={styles.currencyInputContainer}>
                        <Text style={styles.moneySign}>
                            $
                        </Text>
                        <TextInput
                            style={styles.currencyInput}
                            keyboardType='numeric'
                            placeholder="0"
                            placeholderTextColor={Colors[colorScheme].secondary}
                            underlineColorAndroid="transparent"
                            value={MXNinputValue}
                            returnKeyType='done'
                            enablesReturnKeyAutomatically
                            blurOnSubmit={true}
                            ref={inputRef}
                            onChangeText={e => onChangeInput('MXNinputValue', e)}
                        />

                    </View>

                    <Text style={styles.currencyValue}>
                        1 USD = {usdMXNvalue} MXN
                    </Text>

                </View>

                <View style={styles.card}>

                    <View style={styles.currencyIndicator} >
                        <Text style={styles.currencyIndicatorText}  >
                            USD 🇺🇸
                        </Text>
                    </View>

                    <View style={styles.currencyInputContainer}>
                        <Text style={styles.moneySign}>
                            $
                        </Text>
                        <TextInput
                            style={styles.currencyInput}
                            keyboardType='numeric'
                            placeholder="0"
                            placeholderTextColor={Colors[colorScheme].secondary}
                            underlineColorAndroid="transparent"
                            value={USDinputValue}
                            returnKeyType='done'
                            enablesReturnKeyAutomatically
                            blurOnSubmit={true}
                            ref={inputRef}
                            onChangeText={e => onChangeInput('USDinputValue', e)}
                        />

                    </View>

                    <Text style={styles.currencyValue}>
                        {/* We leave this empty just for styling purposes */}
                    </Text>

                </View>

                <View style={styles.card}>

                    <View style={styles.currencyIndicator} >
                        <Text style={styles.currencyIndicatorText}  >
                            ARS 🇦🇷
                        </Text>
                    </View>

                    <View style={styles.currencyInputContainer}>
                        <Text style={styles.moneySign}>
                            $
                        </Text>
                        <TextInput
                            style={styles.currencyInput}
                            keyboardType='numeric'
                            placeholder="0"
                            placeholderTextColor={Colors[colorScheme].secondary}
                            underlineColorAndroid="transparent"
                            value={ARSinputValue}
                            returnKeyType='done'
                            enablesReturnKeyAutomatically
                            blurOnSubmit={true}
                            ref={inputRef}
                            onChangeText={e => onChangeInput('ARSinputValue', e)}
                        />

                    </View>

                    <Text style={styles.currencyValue}>
                        1 USD = {usdARSvalue} ARS
                    </Text>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: width,
        zIndex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: width * 0.9,
        backgroundColor: Colors.light.white,
        padding: 10,
        marginTop: 30,
        borderRadius: 15,
        shadowColor: Colors.light.themeColor,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
    },
    currencyIndicator: {
        backgroundColor: Colors.light.primary,
        alignSelf: 'flex-start',
        padding: 5,
        marginTop: -10,
        marginLeft: -10,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 10
    },
    currencyIndicatorText: {
        color: Colors.light.white,
        fontWeight: 'bold',
        fontSize: 15
    },
    currencyInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.light.white,
        padding: 10
    },
    moneySign: {
        alignSelf: 'center',
        padding: 0,
        fontSize: 35,
        fontWeight: 'bold'
    },
    currencyInput: {
        flex: 1,
        fontSize: 40
    },
    currencyValue: {
        fontWeight: 'bold'
    },
});

export default Conversor
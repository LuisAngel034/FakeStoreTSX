import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import React from 'react'

type Props = {
    titulo: string,
    onPress: () => void,
    estilo?: StyleProp<ViewStyle>,
    disable?: boolean,
    icono?: React.ReactNode,
    posicionIcono?: 'izquierda' | 'derecha'
}

const BotonC = (Props: Props) => {
    return (
        <Pressable 
            onPress={Props.onPress} 
            style={[styles.boton, Props.estilo, Props.disable && styles.disable]} 
            disabled={Props.disable}
        >
            {Props.icono && Props.posicionIcono !== 'derecha' && Props.icono}
            <Text style={styles.titulo}>{Props.titulo}</Text>
            {Props.icono && Props.posicionIcono === 'derecha' && Props.icono}
        </Pressable>
    )
}

export default BotonC

const styles = StyleSheet.create({
    boton: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        padding: 20,
        borderWidth: 2,
        borderColor: '#388E3C',
        borderRadius: 0,
        width: 100,
        height: 100,
        justifyContent: 'center', 
        alignItems: 'center',
        marginHorizontal: 7,
    },
    titulo: {
        color: 'white',
        textAlign: 'center',
    },
    disable: {
        opacity: 0.6,
    }
})

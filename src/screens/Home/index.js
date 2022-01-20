import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Share, } from 'react-native';
import * as Speech from 'expo-speech';
import {MaterialIcons} from '@expo/vector-icons';

import Header from '../../components/Header';
import FAB from '../../components/FAB';

import theme from '../../constants/theme';

const Home = () => {
  const [value, setValue] = useState(null);
  const [people, setPeople] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (value && people) {
        const parsedValue = parseFloat(value);
        const parsedPeople = parseInt(people);

        if (parsedPeople > 0 && parsedValue > 0) {
            const division = parsedValue / parsedPeople;
            setTotal(division);
        } else {
            setTotal(0);
        }
    } else {
        setTotal(0);
    }
  }, [value, people]);

  const handleShare = async () => {
    const toSharePeople = people ? people : 0;
    const toShareValue = value ? value : 0;
    const toShareTotal = total ? total : 0;
    const toShare = `Vamos Rachar !\n\nPessoas: ${toSharePeople}\nValor: R$ ${toShareValue}\n\nA divisão é: ${toShareTotal}`;

    try {
        await Share.share({message: toShare});
    } catch (error) {
        console.log(error.message);
    }
  }

  const handleSpeak = () => {
    const toSpeak = total ? `R$ ${parseFloat(total).toFixed(2)}` : 'R$ 0,00';
    Speech.speak(toSpeak, {
        language: 'pt-BR',
    });
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Digite a quantidade de pessoas e o valor!</Text>
      <View 
        style={styles.field}
        accessible
        accessibilityLabel="Campo de edição de valor da conta">
        <Text style={styles.fieldText}>R$</Text>
        <TextInput
          accessible={false}
          style={styles.fieldInput}
          keyboardType="decimal-pad"
          placeholder="0.00"
          value={value}
          onChangeText={text => text ? setValue(text) : setValue(null)}
        />
      </View>
      <View
        style={styles.field} 
        accessible
        accessibilityLabel="Campo de edição de pessoas"
      >
        <MaterialIcons name="group" size={60} color={theme.text} />
        <TextInput
          accessible={false}
          style={styles.fieldInput}
          keyboardType="number-pad"
          placeholder="0"
          value={people}
          onChangeText={text => text ? setPeople(text) : setPeople(null)}
        />
      </View>
      <View accessible>
        <Text style={styles.subtitle}>Valor que cada um vai pagar</Text>
        <Text
          style={styles.title}
        >R$ {total ? parseFloat(total).toFixed(2) : '0,00'}</Text>
      </View>
      <View style={styles.actions}>
        <FAB
          accessible
          accessibilityRole="button"
          accessibilityLabel="Botão de compartilhamento"
          accessibilityHint="Toque para compartilhar o valor que cada um vai pagar"
          iconProps={{
              name: 'share',
              size: 40,
              color: theme.white,
          }}
          onPress={handleShare}
          style={styles.fab}
        />
        <FAB
          accessible
          accessibilityRole="button"
          accessibilityLabel="Botão de fala"
          accessibilityHint="Toque para ouvir o valor que cada um vai pagar"
          iconProps={{
              name: 'volume-up',
              size: 40,
              color: theme.white,
          }}
          onPress={handleSpeak}
          style={styles.fab}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    fab: {
        backgroundColor: theme.primary,
        width: 68,
        height: 68,
        borderRadius: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.text,
        marginBottom: 32,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        color: theme.text,
        marginBottom: 16,
    },
    field: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 32,
        paddingHorizontal: 32,
    },
    fieldText: {
        fontSize: 48,
        fontWeight: '500',
    },
    fieldInput: {
        borderBottomWidth: 2,
        borderBottomColor: theme.text,
        height: '100%',
        width: '70%',
        fontSize: 32,
        color: theme.text,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});

export default Home;
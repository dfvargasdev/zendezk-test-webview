import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from 'expo-router';
import { WebView } from 'react-native-webview';

export default function HelpCenterScreen() {
  const navigation = useNavigation();
  // const webViewRef = useRef(null);
  const webViewRef = useRef<WebView>(null);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Preguntas frecuentes',
      headerTitleStyle: {
        color: '#0F265C',
      },
    });
  }, [navigation]);
  
  useEffect(() => {
    const onBackPress = () => {
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true; // Evita que la app se cierre si hay historial en la WebView
      }
      return false; // Cierra la app si no hay historial en la WebView
    };
  
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);
  

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://pichincha1707161568.zendesk.com/hc/es-419/categories/28118024804507-Tarjetas-de-Crédito' }}
        style={styles.webView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    height: 100,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  webView: {
    flex: 1,
  },
});


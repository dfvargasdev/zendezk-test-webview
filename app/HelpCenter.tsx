import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

export default function HelpCenterScreen() {
  const navigation = useNavigation();
  const webViewRef = useRef<WebView>(null);

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

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
      if (webViewRef.current && canGoBack) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [canGoBack]);

  const goBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };

  const goForward = () => {
    if (webViewRef.current && canGoForward) {
      webViewRef.current.goForward();
    }
  };

  const reloadPage = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const updateNavigationState = (navState) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://pichincha1707161568.zendesk.com/hc/es-419/categories/28118024804507-Tarjetas-de-Crédito' }}
        style={styles.webView}
        onNavigationStateChange={updateNavigationState}
      />
      {Platform.OS === 'ios' && (
        <View style={styles.footer}>
          <TouchableOpacity onPress={goBack} style={styles.iconButton} disabled={!canGoBack}>
            <Ionicons
              name="chevron-back"
              size={24}
              color={canGoBack ? "#0F265C" : "#A9A9A9"}
              style={{ opacity: canGoBack ? 1 : 0.5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={reloadPage} style={styles.iconButton}>
            <Ionicons name="refresh" size={24} color="#0F265C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={goForward} style={styles.iconButton} disabled={!canGoForward}>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={canGoForward ? "#0F265C" : "#A9A9A9"}
              style={{ opacity: canGoForward ? 1 : 0.5 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  footer: {
    height: 60,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  iconButton: {
    padding: 5, // 10
    marginHorizontal: 2, // 5
  },
});
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ImageBackground, Animated, Easing, Dimensions
} from 'react-native';
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';
import { Audio } from 'expo-av';
import Radar from './components/Radar';
import Waves from './components/Waves';

const { width, height } = Dimensions.get('window');

const soundMap = {
  'B': require('./assets/B.mp3'),
  'C': require('./assets/C.mp3'),
  'D': require('./assets/D.mp3'),
  'E': require('./assets/E.mp3'),
  'F': require('./assets/F.mp3'),
};

export default function App() {
  const [fontsLoaded] = useFonts({
    VT323: VT323_400Regular,
  });

  const [entered, setEntered] = useState(false);
  const [pressedKeys, setPressedKeys] = useState('');
  const soundObjects = useRef({});

  useEffect(() => {
    // Preload sounds
    async function loadSounds() {
      for (const [key, asset] of Object.entries(soundMap)) {
        const { sound } = await Audio.Sound.createAsync(asset);
        soundObjects.current[key] = sound;
      }
    }
    loadSounds();

    return () => {
      // Unload
      Object.values(soundObjects.current).forEach(sound => sound.unloadAsync());
    };
  }, []);

  const playSound = async (key) => {
    setPressedKeys((prev) => prev + (prev.length > 0 ? ' ' : '') + key);
    const sound = soundObjects.current[key];
    if (sound) {
      await sound.replayAsync();
    }
  };

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <ImageBackground source={require('./assets/space.jpg')} style={styles.container} blurRadius={3}>
      <View style={styles.crtOverlay}>
        {!entered ? (
          <TouchableOpacity style={styles.enterButton} onPress={() => setEntered(true)}>
            <Text style={styles.enterText}>PRESS ENTER TO CONTINUE</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.mainScreen}>
            {/* Header */}
            <Text style={styles.header}>JADOO v1 BY ARJUN (RN)</Text>

            {/* Radars */}
            <View style={styles.radarContainer}>
              <Radar />
            </View>

            {/* Garbage Text Left */}
            <View style={styles.garbageLeft}>
              <Text style={styles.garbageText}>uplink = yes</Text>
              <Text style={styles.garbageText}> axis. = 40</Text>
              <Text style={styles.garbageText}>  inc. = 48 pos</Text>
              <Text style={styles.garbageText}>   dec = 57 neg</Text>
              <Text style={styles.garbageText}>{"\n"}signal = 80 b</Text>
            </View>

            {/* Garbage Text Right */}
            <View style={styles.garbageRight}>
              <Text style={styles.garbageText}>A:066</Text>
              <Text style={styles.garbageText}>B:067</Text>
              <Text style={styles.garbageText}>C:068</Text>
              <Text style={styles.garbageText}>D:069</Text>
              <Text style={styles.garbageText}>E:070</Text>
            </View>

            {/* Waves */}
            <View style={styles.wavesLeft}>
              <Waves />
            </View>
            <View style={styles.wavesRight}>
              <Waves reverse />
            </View>

            {/* Prompt */}
            <View style={styles.prompt}>
              <Text style={styles.promptText}>
                PRESS KEYS
              </Text>
              <Text style={styles.promptKeyText}>{"B C F E   B C E D   B C F   E D C"}</Text>
            </View>

            {/* On Screen Controls */}
            <View style={styles.controls}>
              {['B', 'C', 'D', 'E', 'F'].map((key) => (
                <TouchableOpacity key={key} style={styles.keyButton} onPress={() => playSound(key)}>
                  <Text style={styles.keyButtonText}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  crtOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,20,0,0.4)', // tint green slightly
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterButton: {
    padding: 20,
    backgroundColor: 'black',
    borderColor: '#95e208',
    borderWidth: 4,
    borderStyle: 'dashed',
    shadowColor: '#95e208',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  enterText: {
    fontFamily: 'VT323',
    color: '#95e208',
    fontSize: 30,
    textTransform: 'uppercase',
  },
  mainScreen: {
    flex: 1,
    width: '100%',
    paddingTop: 40,
  },
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
    fontFamily: 'VT323',
    color: '#95e208',
    fontSize: 24,
  },
  garbageLeft: {
    position: 'absolute',
    left: 20,
    top: height / 2 + 50,
  },
  garbageRight: {
    position: 'absolute',
    right: 20,
    top: height / 2 + 50,
  },
  garbageText: {
    fontFamily: 'VT323',
    color: '#95e208',
    fontSize: 20,
  },
  radarContainer: {
    position: 'absolute',
    top: height / 2 - 100,
    left: width / 2 - 100,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wavesLeft: {
    position: 'absolute',
    left: 20,
    top: 100,
  },
  wavesRight: {
    position: 'absolute',
    right: 20,
    top: 100,
  },
  prompt: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
  },
  promptText: {
    fontFamily: 'VT323',
    color: '#95e208',
    fontSize: 26,
  },
  promptKeyText: {
    color: 'red',
    fontFamily: 'VT323',
    fontSize: 26,
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  keyButton: {
    backgroundColor: '#161913',
    borderColor: '#95e208',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  keyButtonText: {
    fontFamily: 'VT323',
    color: '#95e208',
    fontSize: 28,
  },
});

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');
const vw = width / 100;

export default function Waves({ reverse }) {
  const delays = [];
  for (let i = 1; i <= 121; i++) {
    const delay = (i * 0.014).toFixed(3);
    delays.push(`.wave:nth-child(${i}) { animation-delay: ${delay}s; }`);
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
      <style>
        body { 
          margin: 0; 
          padding: 0; 
          background-color: transparent; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          width: 100vw; 
          height: 100vh; 
          overflow: hidden;
        }
        .sea {
          display: flex;
          flex-wrap: wrap;
          width: ${25 * vw}px;
          height: ${25 * vw}px;
          transform-style: preserve-3d;
          transform: rotateX(70deg) rotateZ(${reverse ? '-57deg' : '35deg'});
        }
        .wave {
          filter: blur(0.1vw);
          width: ${2.5 * vw}px;
          height: ${2.5 * vw}px;
          background: green;
          transform: translateZ(0px) rotateX(90deg);
          transform-origin: top;
          margin: -22px 3px;
          animation: wave 1s ease-in-out infinite alternate;
          opacity: .7;
          border-radius: 0 0 2px 2px;
        }
        ${delays.join('\n')}
        @keyframes wave {
          from { height: 8px; }
          to { height: 40px; }
        }
      </style>
    </head>
    <body>
      <div class="sea">
        ${'<div class="wave"></div>'.repeat(121)}
      </div>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView 
        source={{ html: htmlContent }} 
        style={styles.webview} 
        scrollEnabled={false}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        originWhitelist={['*']}
        containerStyle={{ backgroundColor: 'transparent' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 250,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  }
});

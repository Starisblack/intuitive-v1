import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.notifyMe.app',
  appName: 'intuitive2.0',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: "ionic"
  }
};

export default config;

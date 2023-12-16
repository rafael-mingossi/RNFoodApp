declare module 'react-native-config' {
  export interface NativeConfig {
    REACT_APP_GOOGLE_API_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

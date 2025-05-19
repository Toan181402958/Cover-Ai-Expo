import Reactotron from 'reactotron-react-native'

Reactotron
    // Your real ip address 👇
  .configure({ host: '192.168.1.78' })
  .useReactNative() 
  .connect()
import { View, Text,BackHandler } from 'react-native'
import React,{useEffect} from 'react'
import CustomButton from '../common/customButton/CustomButton'
import { styles } from './styles'
import {useDispatch,useSelector} from "react-redux"
import { handleRole } from '../../redux/reducers/auth'
import { AppDispatch, RootState} from '../../redux/store'
import { useNavigation } from '@react-navigation/native'
const Role = (props:any) => {
    const dispatch:AppDispatch=useDispatch()
    const navigation=useNavigation()
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          if (navigation.isFocused()) {
            BackHandler.exitApp();
            return true;
          }
          return false;
        });
    
        return () => backHandler.remove();
      }, [navigation]);
    return (   
        <View style={styles.mainContainer}>
            <CustomButton title='Admin' handleSubmit={()=>dispatch(handleRole({role:"admin",...props}))}/>
            <CustomButton title='User' handleSubmit={()=>dispatch(handleRole({role:"user",...props}))}/>
        </View>
    )
}
export default Role
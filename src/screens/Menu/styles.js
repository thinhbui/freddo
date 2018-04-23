import {
    StyleSheet, Dimensions
} from 'react-native';
import { COLOR } from '../../ultils/constants/color';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    table: {
        flex: 1,
        backgroundColor: 'red',

    },
    textLayout: {
        width: '80%',
        height: 30,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10%'
    },
    textInput: {
        flex: 1,
        width: '100%',
        color: '#fff',
        height: 30,
        padding: 0,
        paddingLeft: 5,
        borderRadius: 5
    },
    arrowLayout: {
        height: 50,
        width,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.theme
    }
});
export default styles;

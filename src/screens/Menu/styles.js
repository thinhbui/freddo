import {
    StyleSheet, Dimensions, Platform
} from 'react-native';
import { COLOR } from '../../ultils/constants/color';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    table: {
        flex: 1,
        backgroundColor: 'red',
    },
    quantity_layout: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'gray'
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
        height: Platform.OS === 'ios' ? 70 : 50,
        width,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.theme,
        paddingTop: Platform.OS === 'ios' ? 20 : 0
    },
    modal_layout: {
        position: 'absolute',
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    button: {
        width: 100,
        height: 40,
        backgroundColor: 'steelblue',
        justifyContent: 'center',
        alignItems: 'center'

    }
});
export default styles;

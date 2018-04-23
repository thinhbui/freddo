import {
    StyleSheet,
    Dimensions
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
    add_button: {
        height: 30,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 20,
        alignSelf: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    save_button: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.theme
    },
    header_column: {
        width,
        height: 25,
        flexDirection: 'row',
        backgroundColor: COLOR.light_theme
    }
});
export default styles;

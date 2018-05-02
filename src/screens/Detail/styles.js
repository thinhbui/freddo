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
        height: 40,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 20,
        alignSelf: 'center',
    },
    button: {
        paddingLeft: 15,
        width,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: COLOR.theme,
        borderTopWidth: 1,
    },
    save_button: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.theme,
        borderRadius: 20,
        marginRight: 15,
    },
    header_column: {
        width,
        height: 25,
        flexDirection: 'row',
        backgroundColor: COLOR.light_theme
    },
    add_button_layout: {
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        flexDirection: 'row'
    }
});
export default styles;

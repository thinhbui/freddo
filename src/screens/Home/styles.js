import {
    StyleSheet
} from 'react-native';
import { COLOR } from '../../ultils/constants/color';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    table: {
        flex: 1,
        backgroundColor: 'red',

    },
    change_sort_bar: {
        flexDirection: 'row',
        backgroundColor: COLOR.light_theme,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    change_sort_item: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
export default styles;

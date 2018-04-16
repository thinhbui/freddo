import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a35a16',
        justifyContent: 'center',
        alignItems: 'center',
    },
    freddo: {
        color: '#fff',
        fontFamily: 'MarckScript-Regular',
        fontSize: 50,
    },
    background_image: {
        opacity: 0.8,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    content: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    freddo_layout: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    input_layout: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    button: {
        width: '60%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 20
    }
});
export default styles;

import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a35a16',
    justifyContent: 'center',
    alignItems: 'center'
  },
  freddo: {
    color: '#fff',
    fontFamily: 'MarckScript-Regular',
    fontSize: 50
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
    width: '100%',
    alignItems: 'center'
  },
  button: {
    width: '60%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20
  },
  text_button: {
    color: '#000000',
    fontWeight: 'bold'
  },
  text_input: {
    padding: 0,
    paddingLeft: 3,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    color: '#fff',
    height: 50,
    width: width * 0.8,
    fontSize: 18,
    marginBottom: 10
  }
});
export default styles;

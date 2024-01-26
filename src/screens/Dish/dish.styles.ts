import {StyleSheet} from 'react-native';
import {scaleFontSize, verticalScale} from '@utils';
import {Colors} from '@constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: verticalScale(250),
  },
  dishName: {
    fontSize: scaleFontSize(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
  },
  dishInfo: {
    fontSize: scaleFontSize(16),
    color: Colors.mediumDark,
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -10},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scaleFontSize(16),
  },
});

export default styles;

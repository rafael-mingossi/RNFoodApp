import {Dimensions, Platform, StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from '@utils';
import {Colors} from '@constants';
const {width, height} = Dimensions.get('window');
const IMG_HEIGHT = verticalScale(200);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width,
  },
  image: {
    width,
    height: IMG_HEIGHT,
  },
  header: {
    backgroundColor: '#fff',
    // height: verticalScale(90),
    height: Platform.OS === 'ios' ? height / 7.5 : height / 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: verticalScale(20),
  },
  restaurantName: {
    fontSize: scaleFontSize(30),
    marginHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(10),
  },
  restaurantDescription: {
    fontSize: scaleFontSize(16),
    marginHorizontal: horizontalScale(16),
    lineHeight: verticalScale(22),
    paddingVertical: verticalScale(10),
    color: Colors.medium,
  },
  sectionHeader: {
    fontSize: scaleFontSize(22),
    fontWeight: 'bold',
    margin: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.grey,
    marginHorizontal: horizontalScale(16),
  },
  renderItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
  },
  itemImg: {
    width: verticalScale(80),
    height: horizontalScale(80),
    borderRadius: 4,
  },
  dish: {
    fontSize: scaleFontSize(16),
    fontWeight: 'bold',
  },
  dishText: {
    fontSize: scaleFontSize(14),
    color: Colors.mediumDark,
    paddingVertical: verticalScale(4),
  },
  stickySegment: {
    position: 'absolute',
    height: 50,
    left: 0,
    right: 0,
    top: verticalScale(90.05),
    backgroundColor: '#fff',
    overflow: 'hidden',
    paddingBottom: 4,
  },
  segmentsShadow: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  segmentButton: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(4),
    borderRadius: 50,
  },
  segmentButtonActive: {
    backgroundColor: Colors.primary,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(4),
    borderRadius: 50,
  },
  segmentText: {
    color: Colors.primary,
    fontSize: scaleFontSize(16),
  },
  segmentTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scaleFontSize(16),
  },
  segmentScrollView: {
    paddingHorizontal: horizontalScale(16),
    alignItems: 'center',
    gap: 20,
    paddingBottom: 4,
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
    paddingTop: verticalScale(20),
  },
  fullButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    height: verticalScale(50),
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scaleFontSize(16),
  },
  basket: {
    color: '#fff',
    backgroundColor: '#19AA86',
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 2,
  },
  basketTotal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scaleFontSize(16),
  },
});

export default styles;
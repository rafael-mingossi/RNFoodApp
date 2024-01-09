import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {forwardRef, useCallback, useMemo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faLocationDot,
  faChevronRight,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {horizontalScale, scaleFontSize, verticalScale} from '@utils';
import {Colors} from '@constants';
import {BottomSheetPropsNavigation} from '@config';
import {useNavigation} from '@react-navigation/native';

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const deviceHeight = Dimensions.get('window').height;
  const snapPoints = useMemo(
    () => (deviceHeight >= 800 ? ['47%'] : ['55%']),
    [deviceHeight],
  );
  const renderBackdrop = useCallback(
    (newProps: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...newProps}
      />
    ),
    [],
  );
  const {dismiss} = useBottomSheetModal();
  const navigation: BottomSheetPropsNavigation = useNavigation();

  return (
    <BottomSheetModal
      handleIndicatorStyle={{display: 'none'}}
      backgroundStyle={{borderRadius: 0, backgroundColor: Colors.lightGrey}}
      overDragResistanceFactor={0}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}>
      <View style={styles.contentContainer}>
        <View style={styles.toggle}>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.activeText}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleInactive}>
            <Text style={styles.inactiveText}>Pickup</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subheader}>Your Location</Text>
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LocationSearch');
              dismiss();
            }}>
            <View style={styles.item}>
              <FontAwesomeIcon
                icon={faLocationDot}
                size={16}
                color={Colors.medium}
              />
              <Text style={{flex: 1}}>Current location</Text>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={16}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        </>

        <Text style={styles.subheader}>Arrival time</Text>
        <TouchableOpacity>
          <View style={styles.item}>
            <FontAwesomeIcon
              icon={faStopwatch}
              size={16}
              color={Colors.medium}
            />
            <Text style={{flex: 1}}>Now</Text>
            <FontAwesomeIcon
              icon={faChevronRight}
              size={16}
              color={Colors.primary}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: horizontalScale(10),
    marginBottom: verticalScale(6),
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: verticalScale(8),
    borderRadius: 32,
    paddingHorizontal: horizontalScale(25),
  },
  activeText: {
    color: '#fff',
    fontWeight: '700',
  },
  toggleInactive: {
    padding: verticalScale(8),
    borderRadius: 32,
    paddingHorizontal: horizontalScale(25),
  },
  inactiveText: {
    color: Colors.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: verticalScale(16),
    margin: verticalScale(16),
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    margin: verticalScale(12),
  },
  item: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: verticalScale(16),
    borderColor: Colors.grey,
    borderWidth: 1,
  },
});

export default BottomSheet;

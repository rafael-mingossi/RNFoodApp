import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
import {Colors} from '@constants';
import {BottomSheetPropsNavigation} from '@config';
import {useNavigation} from '@react-navigation/native';

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);
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
    gap: 10,
    marginBottom: 32,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  activeText: {
    color: '#fff',
    fontWeight: '700',
  },
  toggleInactive: {
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  inactiveText: {
    color: Colors.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 16,
    fontWeight: '600',
    margin: 16,
  },
  item: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
});

export default BottomSheet;

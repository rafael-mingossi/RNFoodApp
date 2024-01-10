import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {FilterProps} from '@config';
import {FilterJson as categories} from '@assets';
import {horizontalScale, scaleFontSize, verticalScale} from '@utils';
import {Colors} from '@constants';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowDown,
  faChevronRight,
  faUtensils,
  faTag,
  faWheatAwnCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type Category = {
  name: string;
  count: number;
  checked?: boolean;
};

const ItemBox = () => (
  <>
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item}>
        <FontAwesomeIcon
          icon={faArrowDown}
          size={horizontalScale(17)}
          color={Colors.primary}
        />
        <Text style={styles.itemText}>Sort</Text>
        <FontAwesomeIcon
          icon={faChevronRight}
          size={horizontalScale(17)}
          color={Colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <FontAwesomeIcon
          icon={faUtensils}
          size={horizontalScale(17)}
          color={Colors.primary}
        />
        <Text style={styles.itemText}>Hygiene rating</Text>
        <FontAwesomeIcon
          icon={faChevronRight}
          size={horizontalScale(17)}
          color={Colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <FontAwesomeIcon
          icon={faTag}
          size={horizontalScale(17)}
          color={Colors.primary}
        />
        <Text style={styles.itemText}>Offers</Text>
        <FontAwesomeIcon
          icon={faChevronRight}
          size={horizontalScale(17)}
          color={Colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <FontAwesomeIcon
          icon={faWheatAwnCircleExclamation}
          size={horizontalScale(17)}
          color={Colors.primary}
        />
        <Text style={styles.itemText}>Dietary</Text>
        <FontAwesomeIcon
          icon={faChevronRight}
          size={horizontalScale(17)}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </View>
    <Text style={styles.header}>Categories</Text>
  </>
);

const Filter: FC<FilterProps> = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(categories);
  const [selected, setSelected] = useState<Category[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter(item => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? horizontalScale(150) : 0);
      scale.value = withTiming(newSelected ? 1 : 0);
    }

    setSelected(selectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const renderItem: ListRenderItem<Category> = ({item, index}) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
        isChecked={items[index].checked}
        fillColor={Colors.primary}
        unfillColor="#fff"
        disableBuiltInState
        iconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4,
          borderWidth: 2,
        }}
        innerIconStyle={{borderColor: Colors.primary, borderRadius: 4}}
        onPress={() => {
          const isChecked = items[index].checked;

          const updatedItems = items.map(newItem => {
            if (item.name === items[index].name) {
              item.checked = !isChecked;
            }

            return newItem;
          });

          setItems(updatedItems);
        }}
      />
    </View>
  );

  const handleClearAll = () => {
    const updatedItems = items.map(item => {
      item.checked = false;
      return item;
    });
    setItems(updatedItems);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0,
    };
  });

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        ListHeaderComponent={ItemBox}
        showsVerticalScrollIndicator={false}
      />
      <View style={{height: verticalScale(75)}} />
      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          <Animated.View style={[animatedStyles]}>
            <TouchableOpacity
              onPress={handleClearAll}
              style={styles.outlineButton}>
              <Animated.Text style={[animatedText, styles.outlineButtonText]}>
                Clear all
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(12),
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(80),
    backgroundColor: '#fff',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(8),
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  fullButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    flex: 1,
    height: verticalScale(50),
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scaleFontSize(16),
    justifyContent: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: horizontalScale(4),
    paddingVertical: verticalScale(4),
    borderRadius: 8,
    marginBottom: verticalScale(16),
  },
  header: {
    fontSize: scaleFontSize(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(16),
  },
  item: {
    flexDirection: 'row',
    gap: verticalScale(10),
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: verticalScale(10),
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(2.5),
    paddingVertical: verticalScale(2.5),
    backgroundColor: '#fff',
  },
  btnContainer: {
    flexDirection: 'row',
    gap: horizontalScale(12),
    justifyContent: 'center',
  },
  outlineButton: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: verticalScale(50),
  },
  outlineButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: scaleFontSize(16),
  },
});
export default Filter;

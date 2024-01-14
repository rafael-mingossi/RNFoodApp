import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  SectionList,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import {restaurant} from '@assets';
import {horizontalScale, scaleFontSize, verticalScale} from '@utils';
import {Colors} from '@constants';

const {width} = Dimensions.get('window');
const IMG_HEIGHT = verticalScale(200);

let scrollOfSet: SharedValue<number>;

type Meals = {
  id: number;
  name: string;
  price: number;
  info: string;
  img: number;
};

const Details = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  scrollOfSet = useScrollViewOffset(scrollRef);

  const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  ///USING INTERPOLATE HERE SO WE CAN MAP ONE VALUE TO SOME OTHER VALUE
  const imageAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOfSet.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOfSet.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [1.5, 1, 1],
          ),
        },
      ],
    };
  });

  const separatorLine = () => {
    return <View style={styles.separator} />;
  };

  const renderListItem: ListRenderItem<Meals> = ({item}) => {
    return (
      <TouchableOpacity style={styles.renderItem}>
        <View style={{width: width - verticalScale(80)}}>
          <Text style={styles.dish}>{item.name}</Text>
          <Text style={styles.dishText}>{item.info}</Text>
          <Text style={styles.dishText}>{item.price}</Text>
        </View>
        <Image source={item.img} style={styles.itemImg} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image
          source={restaurant.img}
          style={[styles.image, imageAnimatedStyles]}
        />
        <View
          style={{
            height: 1100,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.delivery} •{' '}
            {restaurant.tags.map(
              (tag, index) =>
                `${tag}${index < restaurant.tags.length - 1 ? ' • ' : ''}`,
            )}
          </Text>
          <Text style={styles.restaurantDescription}>{restaurant.about}</Text>
          <SectionList
            contentContainerStyle={{paddingBottom: verticalScale(50)}}
            keyExtractor={(item, index) => `${item.id + index}`}
            scrollEnabled={false}
            sections={DATA}
            renderItem={renderListItem}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            ItemSeparatorComponent={() => separatorLine()}
            SectionSeparatorComponent={() => separatorLine()}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

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
    height: verticalScale(50),
    marginTop: Platform.OS === 'ios' ? verticalScale(40) : verticalScale(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: scaleFontSize(30),
    marginHorizontal: horizontalScale(16),
  },
  restaurantDescription: {
    fontSize: scaleFontSize(16),
    marginHorizontal: horizontalScale(16),
    lineHeight: verticalScale(22),
    color: Colors.medium,
  },
  sectionHeader: {
    fontSize: scaleFontSize(22),
    fontWeight: 'bold',
    marginTop: verticalScale(40),
    // margin: 16,
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
  },
});

export const HeaderBackground = () => {
  const headerAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOfSet.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });

  return (
    <Animated.View style={[styles.header, headerAnimatedStyles]}>
      <Text>{restaurant.name}</Text>
    </Animated.View>
  );
};

export default Details;

import React, {useRef, useState, FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SectionList,
  TouchableOpacity,
  Image,
  ScrollView,
  SectionListRenderItem,
  Platform,
} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {restaurant} from '@assets';
import {horizontalScale, scaleFontSize, verticalScale} from '@utils';
import {Colors} from '@constants';
import {DetailsProps} from '@config';
// import {useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const IMG_HEIGHT = verticalScale(200);

let scrollOfSet: SharedValue<number>;

type Meals = {
  id: number;
  name: string;
  price: number;
  info: string;
  img: number;
};

type Item = Meals;

interface Section {
  title: string;
  data: Item[];
  index: number;
}

const Details: FC<DetailsProps> = ({navigation}) => {
  ////USED IN THE PARALLAX SCROLL
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  scrollOfSet = useScrollViewOffset(scrollRef);

  ////USED IN THE STICKY MENU BAR
  const scrollRefSticky = useRef<ScrollView>(null);
  const itemsRef = useRef<TouchableOpacity[]>([]);

  const opacity = useSharedValue(0);
  // const route = useRoute();
  // console.log(route.name);
  const [activeIndex, setActiveIndex] = useState(0);

  const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
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

  const renderListItem: SectionListRenderItem<Meals, Section> = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderItem}
        onPress={() =>
          navigation.navigate('Dish', {
            id: item.id,
          })
        }>
        <View style={{width: width - verticalScale(110)}}>
          <Text style={styles.dish}>{item.name}</Text>
          <Text style={styles.dishText}>{item.info}</Text>
          <Text style={styles.dishText}>{item.price}</Text>
        </View>
        <Image source={item.img} style={styles.itemImg} />
      </TouchableOpacity>
    );
  };

  const selectCategory = (index: number) => {
    ///SELECT THE CURRENT SELECTED BTN
    const selectedBtn = itemsRef.current[index];

    selectedBtn.measure(x => {
      scrollRefSticky.current?.scrollTo({
        x: x - horizontalScale(16),
        y: 0,
        animated: true,
      });
    });

    ///SETTING INDEX TO HIGHLIGHT SELECTED BTN
    setActiveIndex(index);
  };

  ///THIS IS FOR THE STICKY MENU SEGMENT
  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > verticalScale(180)) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };

  const handleScrollToSection = (sectionIndex: number) => {
    const scrollViewRef = scrollRef.current;

    if (scrollViewRef) {
      const headerHeight = verticalScale(150); // Adjust based on your header height
      const offset = sectionIndex * headerHeight;
      scrollViewRef.scrollTo({y: offset, animated: true});
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={onScroll}
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Animated.Image
          source={restaurant.img}
          style={[styles.image, imageAnimatedStyles]}
        />
        <View
          style={{
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
            stickySectionHeadersEnabled={false}
            contentContainerStyle={{paddingBottom: 50}}
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
      <Animated.View style={[styles.stickySegment, animatedStyles]}>
        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 4,
          }}>
          <View style={styles.segmentsShadow}>
            <ScrollView
              ref={scrollRefSticky}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.segmentScrollView}>
              {restaurant.food.map((item, index) => (
                <TouchableOpacity
                  ref={ref => (itemsRef.current[index] = ref!)}
                  key={index}
                  onPress={() => {
                    selectCategory(index);
                    handleScrollToSection(index);
                  }}
                  style={
                    activeIndex === index
                      ? styles.segmentButtonActive
                      : styles.segmentButton
                  }>
                  <Text
                    style={
                      activeIndex === index
                        ? styles.segmentTextActive
                        : styles.segmentText
                    }>
                    {item.category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Animated.View>
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
});

export const HeaderBackground = () => {
  const headerAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOfSet.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });

  return (
    <Animated.View style={[styles.header, headerAnimatedStyles]}>
      <Text style={{fontSize: scaleFontSize(16)}}>{restaurant.name}</Text>
    </Animated.View>
  );
};

export default Details;

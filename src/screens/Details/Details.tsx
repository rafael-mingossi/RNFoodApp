import React, {useRef, useState, FC} from 'react';
import {
  View,
  Text,
  Dimensions,
  SectionList,
  TouchableOpacity,
  Image,
  ScrollView,
  SectionListRenderItem,
  SafeAreaView,
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
import {DetailsProps} from '@config';
import {useBasketStore} from '@store';
import styles from './details.styles';
// import {useRoute} from '@react-navigation/native';

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

type Item = Meals;

interface Section {
  title: string;
  data: Item[];
  index: number;
}

const Details: FC<DetailsProps> = ({navigation}) => {
  const {items, total} = useBasketStore();
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

      {/*FOOTER BASKET*/}
      {items > 0 && (
        <View style={styles.footer}>
          <SafeAreaView style={{backgroundColor: '#fff'}}>
            <TouchableOpacity
              style={styles.fullButton}
              onPress={() => navigation.navigate('Basket')}>
              <Text style={styles.basket}>{items}</Text>
              <Text style={styles.footerText}>View Basket</Text>
              <Text style={styles.basketTotal}>${total}</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

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
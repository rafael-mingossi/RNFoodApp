import React, {useRef, useState, FC} from 'react';
import {
  View,
  Text,
  Dimensions,
  SectionList,
  TouchableOpacity,
  Image,
  SectionListRenderItem,
  SafeAreaView,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {restaurant} from '@assets';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
  getResponsive,
} from '@utils';
import {DetailsProps, HeaderPropsNavigation} from '@config';
import {useBasketStore} from '@store';
import styles from './details.styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowUpFromBracket,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {Colors} from '@constants';
import {getRestaurantById} from '@assets';
import {useNavigation} from '@react-navigation/native';
// import {useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const IMG_HEIGHT = getResponsive(200, 'height');

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

const Details: FC<DetailsProps> = ({navigation, route}) => {
  const {items, total} = useBasketStore();
  const {id} = route.params;
  const item = getRestaurantById(id)!;

  ////USED IN THE PARALLAX SCROLL
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  scrollOfSet = useScrollViewOffset(scrollRef);

  ////USED IN THE STICKY MENU BAR
  // const scrollRefSticky = useRef<ScrollView>(null);
  // const itemsRef = useRef<TouchableOpacity[]>([]);
  const tabRef = useRef<SectionList<Item, Section>>(null);

  const opacity = useSharedValue(0);
  // const route = useRoute();
  // console.log(route.name);
  const [activeIndex, setActiveIndex] = useState(0);

  const DATA = item.food.map((item, index) => ({
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

  // THIS IS FOR THE STICKY HEADER
  // const selectCategory = (index: number) => {
  //   ///SELECT THE CURRENT SELECTED BTN
  //   const selectedBtn = itemsRef.current[index];
  //
  //   selectedBtn.measure(x => {
  //     scrollRefSticky.current?.scrollTo({
  //       x: x - horizontalScale(16),
  //       y: 0,
  //       animated: true,
  //     });
  //   });
  //
  //   ///SETTING INDEX TO HIGHLIGHT SELECTED BTN
  //   setActiveIndex(index);
  // };

  ///THIS IS FOR THE STICKY MENU SEGMENT
  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > verticalScale(180)) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };

  // THIS IS TO SCROLL TO LOCATION
  // const handleScrollToSection = (sectionIndex: number) => {
  //   const hasData = DATA[sectionIndex]?.data;
  //
  //   if (hasData && tabRef.current) {
  //     tabRef?.current?.scrollToLocation({
  //       sectionIndex: DATA[sectionIndex].index,
  //       itemIndex: 0,
  //     });
  //   }
  // };

  return (
    <View style={styles.container}>
      <HeaderBackground />
      <Animated.ScrollView
        onScroll={onScroll}
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Animated.Image
          source={item.img}
          style={[styles.image, imageAnimatedStyles]}
        />
        <View
          style={{
            backgroundColor: '#fff',
          }}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <Text style={styles.restaurantDescription}>
            {item.delivery} •{' '}
            {item.tags.map(
              (tag, index) =>
                `${tag}${index < item.tags.length - 1 ? ' • ' : ''}`,
            )}
          </Text>
          <Text style={styles.restaurantDescription}>{item.about}</Text>
          {/*/////SECTION LIST GOES HERE/////*/}
          <SectionList
            ref={tabRef}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={{paddingBottom: 50}}
            keyExtractor={(item, index) => `${item.id + index}`}
            scrollEnabled={false}
            sections={DATA}
            renderItem={renderListItem}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.sectionHeader}> {title}</Text>
            )}
            ItemSeparatorComponent={() => separatorLine()}
            SectionSeparatorComponent={() => separatorLine()}
            onScrollToIndexFailed={err => {
              const wait = new Promise(resolve => setTimeout(resolve, 600));
              wait.then(() => {
                tabRef?.current?.scrollToLocation({
                  animated: true,
                  sectionIndex: 1,
                  itemIndex: 1,
                  viewOffset: 0.5,
                });
              });
            }}
          />
        </View>
      </Animated.ScrollView>

      {/*//////ADD ANIMATED STYLE BACK HERE*/}
      {/*<Animated.View style={[styles.stickySegment]}>*/}
      {/*  <View*/}
      {/*    style={{*/}
      {/*      overflow: 'hidden',*/}
      {/*      paddingBottom: 4,*/}
      {/*    }}>*/}
      {/*    <View style={styles.segmentsShadow}>*/}
      {/*      <ScrollView*/}
      {/*        ref={scrollRefSticky}*/}
      {/*        horizontal*/}
      {/*        showsHorizontalScrollIndicator={false}*/}
      {/*        contentContainerStyle={styles.segmentScrollView}>*/}
      {/*        {restaurant.food.map((item, index) => (*/}
      {/*          <TouchableOpacity*/}
      {/*            ref={ref => (itemsRef.current[index] = ref!)}*/}
      {/*            key={index}*/}
      {/*            onPress={() => {*/}
      {/*              selectCategory(index);*/}
      {/*              handleScrollToSection(index);*/}
      {/*            }}*/}
      {/*            style={*/}
      {/*              activeIndex === index*/}
      {/*                ? styles.segmentButtonActive*/}
      {/*                : styles.segmentButton*/}
      {/*            }>*/}
      {/*            <Text*/}
      {/*              style={*/}
      {/*                activeIndex === index*/}
      {/*                  ? styles.segmentTextActive*/}
      {/*                  : styles.segmentText*/}
      {/*              }>*/}
      {/*              {item.category}*/}
      {/*            </Text>*/}
      {/*          </TouchableOpacity>*/}
      {/*        ))}*/}
      {/*      </ScrollView>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</Animated.View>*/}

      {/*FOOTER BASKET*/}
      {items > 0 && (
        <View style={styles.footer}>
          <SafeAreaView style={{backgroundColor: '#fff'}}>
            <TouchableOpacity
              style={styles.fullButton}
              onPress={() => navigation.navigate('Basket')}>
              <Text style={styles.basket}>{items}</Text>
              <Text style={styles.footerText}>View Basket</Text>
              <Text style={styles.basketTotal}>${total.toFixed(2)}</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export const HeaderBackground = () => {
  const navigation: HeaderPropsNavigation = useNavigation();

  const headerAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOfSet.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });

  const headerAnimatedBg = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollOfSet.value,
        [0, IMG_HEIGHT / 1.5],
        ['transparent', 'white'],
      ),
    };
  });

  return (
    <Animated.View style={[styles.header, headerAnimatedBg]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.buttonWrapper]}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size={horizontalScale(18)}
          color={Colors.primary}
        />
      </TouchableOpacity>
      <Animated.View style={[headerAnimatedStyles]}>
        <Text style={{fontSize: scaleFontSize(16)}}>{restaurant.name}</Text>
      </Animated.View>
      <View style={styles.rightButtons}>
        <TouchableOpacity style={[styles.roundBtnRight, styles.buttonWrapper]}>
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            size={horizontalScale(18)}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundBtnRight, styles.buttonWrapper]}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size={horizontalScale(18)}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Details;

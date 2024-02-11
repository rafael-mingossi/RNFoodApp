import React, {FC, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import {SwipeableRow} from '@components';
import {useBasketStore} from '@store';
import {Colors} from '@constants';
import {BasketProps} from '@config';
import styles from './basket.styles';

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
  quantity: number;
}

type Items = {
  item: ProductProps;
};
const Basket: FC<BasketProps> = ({navigation}) => {
  const {products, total, clearCart, reduceProduct} = useBasketStore();

  const [order, setOrder] = useState(false);

  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };
  const renderItem = ({item}: Items) => {
    return (
      <SwipeableRow onDelete={() => reduceProduct(item)}>
        <View style={styles.row}>
          <Text style={{color: Colors.primary, fontSize: 18}}>
            {item.quantity}x
          </Text>
          <Text style={{flex: 1, fontSize: 18}}>{item.name}</Text>
          <Text style={{fontSize: 18}}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </SwipeableRow>
    );
  };

  const listFooter = () => {
    return (
      <View>
        {/*<View style={{height: 1, backgroundColor: Colors.grey}}></View>*/}
        <View style={styles.totalRow}>
          <Text style={styles.total}>Subtotal</Text>
          <Text style={{fontSize: 18}}>${total.toFixed(2)}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.total}>Service fee</Text>
          <Text style={{fontSize: 18}}>${FEES.service}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.total}>Delivery fee</Text>
          <Text style={{fontSize: 18}}>${FEES.delivery}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.total}>Order Total</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            ${(total + FEES.service + FEES.delivery).toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  const itemSeparator = () => {
    return <View style={{height: 1, backgroundColor: Colors.grey}} />;
  };

  const listHeader = () => {
    return <Text style={styles.section}>Items</Text>;
  };

  const startCheckout = () => {
    setOrder(true);
    clearCart();
  };

  return (
    <>
      {order && (
        <ConfettiCannon
          count={200}
          origin={{x: -10, y: 0}}
          fallSpeed={2500}
          fadeOut={true}
          autoStart={true}
        />
      )}
      {order ? (
        <View style={{marginTop: '50%', padding: 20, alignItems: 'center'}}>
          <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
            Thank you for your order!
          </Text>
          <TouchableOpacity
            style={styles.orderBtn}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={styles.footerText}>New order</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={products}
            renderItem={renderItem}
            ListFooterComponent={listFooter}
            ItemSeparatorComponent={itemSeparator}
            ListHeaderComponent={listHeader}
          />
          <View style={styles.footer}>
            <SafeAreaView edges={['bottom']} style={{backgroundColor: '#fff'}}>
              <TouchableOpacity
                style={styles.fullButton}
                onPress={startCheckout}>
                <Text style={styles.footerText}>Order now</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </>
      )}
    </>
  );
};

export default Basket;

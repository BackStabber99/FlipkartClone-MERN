import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image as ExpoImage } from "react-native-expo-image-cache";

const OrderItemDetails = ({item}) => {
   
    const image = {
        uri: require('../../../assets/catIcons/trash.png'),
    };
    const width = Dimensions.get('screen').width;
    return (
        <View
            style={{
                paddingVertical: 16,
                paddingHorizontal: Dimensions.get('screen').width * 0.02041,
                borderBottomWidth: 0.6,
                borderColor: '#edeeef',
                borderRadius: 2,
            }}>
                {/* { console.log("Item",item)} */}
            <TouchableWithoutFeedback>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View
                        style={{
                            marginLeft:
                                Dimensions.get('screen').width * 0.02041,
                        }}>
                        <TouchableOpacity>
                           
                             <ExpoImage
                style={{
                  width: width * 0.26785,
                  height: 130,
                  borderRadius: 5,
                  resizeMode: "cover",
                }}
                preview={{
                  uri: item.product.image[0].url
                    .slice(0, 48)
                    .concat("t_media_lib_thumb/")
                    .concat(item.product.image[0].url.slice(48)),
                }}
                uri={item.product.image[0].url}
              />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailsBox}>
                        <Text style={styles.delivered}>
                            Delivered On 12/03/2021
                        </Text>
                        <Text style={styles.title}>{item.name}</Text>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 200,
                            }}>
                            <Text style={styles.review}>
                                Rate & Review {'>'}{' '}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};
const styles = StyleSheet.create({
    view: {
        fontFamily: 'popins-bold',
        fontSize: 18,
        color: '#20263e',
        paddingTop: 10,
        position: 'absolute',
        right: Dimensions.get('screen').width * 0.10714,
    },

    detailsBox: {
        padding: 4,
        marginLeft: 24,
        width: 200,
    },
    delivered: {
        fontFamily: 'popins-semibold',
        fontSize: 16,
        color: 'black',
        paddingBottom: 4,
    },
    title: {
        fontFamily: 'popins-med',
        fontSize: 17,
        color: '#4d4b50',
        paddingVertical: 4,
    },
    review: {
        fontFamily: 'popins-med',
        fontSize: 18,
        color: '#FF6B3C',
        paddingTop: 16,
    },
});

export default OrderItemDetails;
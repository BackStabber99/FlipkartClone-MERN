import React, { useRef, useState, useMemo } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    FlatList,
    TextInput,
    StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import { dummyData } from '../data/Data';
import { minData } from '../data/MiniData';
import Header from '../components/Header';
import ProductList from '../components/ProductListingsComponents/ProductList';
import AppCarousel from '../components/AppCarousel';
import Categories from '../components/Categories';
import TopPicks from '../components/TopPicks';
import FeaturedCategories from '../components/FeaturedCategories';
import DealOfTheDay from '../components/DealOfTheDay';
import MiniTextBox from '../components/MiniTextBox';
import PopularTribes from '../components/PopularTribes';
import NewlyArrived from '../components/NewlyArrived';
import InTheSpotlight from '../components/InTheSpotlight';
import TopRated from '../components/TopRated';
import BestSellingInCat from '../components/BestSellingInCat';
import Sell from '../components/Sell';
import BestSellingInJew from '../components/BestSellingInJew';
import ActivityIndicator from '../components/ActivityIndicator';

const ProductListings = () => {
    const [language, setLanguage] = useState('en');
    const [loading, setLoading] = useState(false);
    const carouselRef = useRef(null);
    const mainWork = (lang) => {
        setLanguage(lang);
        setLoading(false);
    };
    const changeLanguage = (lang) => {
        setLoading(true);
        setTimeout(() => {
            mainWork(lang);
        }, 500);
    };

    return (
        <View>
            {loading === true ? (
                <View style={styles.overlay}>
                    <LottieView
                        style={styles.lottie}
                        autoPlay
                        loop
                        source={require('../assets/animations/loader.json')}
                    />

                    <Header
                        language={language}
                        changeLanguage={changeLanguage}
                    />
                    <View
                        style={{
                            marginTop: 105,
                        }}>
                        <ProductList />
                    </View>
                </View>
            ) : (
                <View>
                    <Header
                        language={language}
                        changeLanguage={changeLanguage}
                    />
                    <View
                        style={{
                            marginTop: 105,
                        }}>
                        <ProductList />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        position: 'relative',
        height: '100%',
        width: '100%',
        zIndex: 10,
    },
    lottie: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: '100%',
        width: '100%',
        zIndex: 10,
    },

    ImageOverlay: {
        width: 150,
        height: 250,
        marginRight: 8,
        borderRadius: 10,
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.2,
    },
    imageLocationIcon: {
        position: 'absolute',
        marginTop: 4,
        left: 10,
        bottom: 10,
    },
    imageText: {
        position: 'absolute',
        color: 'white',
        marginTop: 4,
        fontSize: 14,
        left: 30,
        bottom: 10,
    },

    carouselImage: {
        width: 200,
        height: 320,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    carouselText: {
        paddingLeft: 14,
        color: 'white',
        position: 'absolute',
        bottom: 10,
        left: 2,
        fontWeight: 'bold',
    },
    carouselIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    carouselContentContainer: {
        flex: 1,

        minHeight: 720,
        paddingHorizontal: 14,
    },
    ImageBg: {
        flex: 1,
        height: null,
        width: null,
        opacity: 1,
        justifyContent: 'flex-start',
    },
    carouselContainerView: {
        width: '100%',
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carousel: {
        flex: 1,
        overflow: 'visible',
    },
});
export default ProductListings;

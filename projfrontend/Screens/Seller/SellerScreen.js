import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  productName: yup.string().required("Please enter Product Name"),
  amount: yup.string().required("Please enter Product Amount"),
  quantity: yup.string().required("Please enter No. of stocks"),
  discount: yup.string().required("Please enter the Discount"),
  description: yup.string().required("Please enter Product Description"),
});

import Screen from "./../../components/Screen";
import ImageInputList from "./ImageInputList";
import AppPicker from "./AppPicker";
import { StyleSheet } from "react-native";
import BackButtonHeader from "./../../components/BackButtonHeader";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { uploadProduct } from "./SellerAPI/sellerAPI";
import CategoryPickerItem from "./CategoryPickerItem";
import TribePicker from "./../../components/TribePicker";

const categories = [
  {
    name: "dress",
    label: "Clothing",
    value: "60d84e49bef91815c42982df",
  },
  
  {
    name: "jewellery",
    label: "Jewellery",
    value: "60b1016409ad9b40444d8855",
  },
  {
    name: "bag",
    label: "Accessories",
    value: "609fc8f8d36dae0fe8386e6d",
  },
  {
    name: "home",
    label: "Home",
    value: "60ae8233514d2921647c7d23",
  },
  {
    name: "doctor",
    label: "Covid",
    value: "60ab96e8e6b6cf25a841486c",
  },
  {
    name: "food",
    label: "Essentials",
    value: "60aba4ff7f4a1f404489ad56",
  },
];

export default function SellerScreen({ navigation }) {
  const [imageUris, setImageUris] = useState([]);
  const [category, setCategory] = useState(null);
  const [tribe,setTribe] = useState(null)
  const [focusProductName, setFocusProductName] = useState(false);
  const [focusAmount, setFocusAmount] = useState(false);
  const [focusQuantity, setFocusQuantity] = useState(false);
  const [focusDescription, setFocusDescription] = useState(false);
  const [focusDiscount, setFocusDiscount] = useState(false);
  const [focusTribe, setFocusTribe] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(0);

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setLoading(0);
      setCategory(null)
      isAuthenticated()
        .then((res) => {
          if (res.user) {
            setUser(res.user._id);
            setToken(res.token);
          }
        })
        .catch((err) => {
          console.log("Add product screen error: " + err);
        });
    });
  }, [navigation]);

  const onSub = (values) => {
    var data = new FormData();
    for (let i = 0; i < file.length; i++) {
      data.append(`Img${i}`, file[`${i}`]);
    }
    if (file.length === 0) {
      alert("Upload atleast 1 image to proceed!");
    } else if (category === null) {
      alert("Select Category of Product to proceed!");
    } 
    else if (tribe === null) {
      alert("Select Tribe of Product to proceed!");
    }
    else {
      data.append("name", values.productName);
      data.append("stock", values.quantity);
      data.append("description", values.description);
      data.append("price", values.amount);
      data.append("discount", values.discount);
      data.append("tribe", tribe);
      data.append("category",category.value);

      setLoading(1);
      uploadProduct(user, token, category.value, data)
        .then((res) => {
          setLoading(2);
          (values.productName = ""),
            (values.amount = ""),
            (values.quantity = ""),
            (values.description = ""),
            (values.discount = ""),
            setImageUris([]);
          setCategory(null);
          setTimeout(() => {
            navigation.goBack();
          }, 3000);
        })
        .catch((err) => {
          console.log(" Add Product screen error", err);
          setLoading(3);
          setTimeout(() => {
            setLoading(0);
          }, 3000);
        });
    }
  };

  const handleAdd = (uri) => {
    setImageUris([...imageUris, uri]);
  };
  const handleRemove = (uri) => {
    setImageUris(imageUris.filter((imageUri) => imageUri != uri));
  };

  const onfocusProductNameChange = () => {
    setFocusProductName(true);
  };
  const onBlurProductNameChange = () => {
    setFocusProductName(false);
  };

  const onfocusQuantityChange = () => {
    setFocusQuantity(true);
  };
  const onBlurQuantityChange = () => {
    setFocusQuantity(false);
  };

  const onfocusAmountChange = () => {
    setFocusAmount(true);
  };
  const onBlurAmountChange = () => {
    setFocusAmount(false);
  };

  const onfocusDescriptionChange = () => {
    setFocusDescription(true);
  };
  const onBlurDescriptionChange = () => {
    setFocusDescription(false);
  };

  const onfocusDiscountChange = () => {
    setFocusDiscount(true);
  };
  const onBlurDiscountChange = () => {
    setFocusDiscount(false);
  };

  const onfocusTribeChange = () => {
    setFocusTribe(true);
  };
  const onBlurTribeChange = () => {
    setFocusTribe(false);
  };

  const onSelectTribe = (item)=> {
    console.log(item)
    setTribe(item)
  }

  return (
    <>
      <View
        style={
          loading !== 0 ? styles.overlay : { flex: 1, backgroundColor: "white" }
        }
      >
        {loading !== 0 ? (
          <LottieView
            style={styles.lottie}
            autoPlay={loading !== 1 ? false : true}
            loop={loading !== 1 ? false : true}
            source={
              loading === 1
                ? require("../../assets/animations/loader.json")
                : loading === 2
                ? require("../../assets/animations/success.json")
                : require("../../assets/animations/error.json")
            }
          />
        ) : null}
        <BackButtonHeader screenName='Home' navigation={navigation}/>
        <View style={styles.screen}>
          <ImageInputList
            imageUris={imageUris}
            onAddImage={handleAdd}
            onRemoveImage={handleRemove}
            file={file}
            setFile={setFile}
          />
          <AppPicker
            icon="apps"
            items={categories}
            name="category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            selectedItem={category}
            onSelectItem={(item) => setCategory(item)}
          />

          <Formik
            initialValues={{
              productName: "",
              amount: "",
              quantity: "",
              description: "",
              dicount: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              onSub(values);
            }}
          >
            {(formikProps) => (
              <React.Fragment>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      marginHorizontal: 8,
                      marginVertical: 8,
                    }}
                  >
                    <Text style={styles.label}>Product Name</Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      onFocus={onfocusProductNameChange}
                      placeholder="Enter Product Name"
                      autoCorrect={false}
                      style={
                        focusProductName === false
                          ? styles.textInput
                          : styles.textInputName
                      }
                      onChangeText={formikProps.handleChange("productName")}
                      onBlur={onBlurProductNameChange}
                      value={formikProps.values.productName}
                    />
                    <View
                      style={
                        formikProps.errors.productName
                          ? styles.redCircle
                          : styles.greenCircle
                      }
                    ></View>
                  </View>

                  <View
                    style={{
                      marginHorizontal: 8,
                      marginVertical: 8,
                    }}
                  >
                    <Text style={styles.label}>Quantity</Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      onFocus={onfocusQuantityChange}
                      placeholder="Enter The No. Of Stocks"
                      autoCorrect={false}
                      style={
                        focusQuantity === false
                          ? styles.textInput
                          : styles.textInputName
                      }
                      onChangeText={formikProps.handleChange("quantity")}
                      onBlur={onBlurQuantityChange}
                      value={formikProps.values.quantity}
                    />
                    <View
                      style={
                        formikProps.errors.quantity
                          ? styles.redCircle
                          : styles.greenCircle
                      }
                    ></View>
                  </View>

                  <View
                    style={{
                      marginHorizontal: 8,
                      marginVertical: 8,
                    }}
                  >
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      onFocus={onfocusAmountChange}
                      placeholder="Enter The Price"
                      autoCorrect={false}
                      style={
                        focusAmount === false
                          ? styles.textInput
                          : styles.textInputName
                      }
                      onChangeText={formikProps.handleChange("amount")}
                      onBlur={onBlurAmountChange}
                      value={formikProps.values.amount}
                    />
                    <View
                      style={
                        formikProps.errors.amount
                          ? styles.redCircle
                          : styles.greenCircle
                      }
                    ></View>
                  </View>

                  <View
                    style={{
                      marginHorizontal: 8,
                      marginVertical: 8,
                    }}
                  >
                    <Text style={styles.label}>Discount</Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      onFocus={onfocusDiscountChange}
                      placeholder="Enter Discount (in percentage)"
                      autoCorrect={false}
                      style={
                        focusDiscount === false
                          ? styles.textInput
                          : styles.textInputName
                      }
                      onChangeText={formikProps.handleChange("discount")}
                      onBlur={onBlurDiscountChange}
                      value={formikProps.values.discount}
                    />
                    <View
                      style={
                        formikProps.errors.discount
                          ? styles.redCircle
                          : styles.greenCircle
                      }
                    ></View>
                  </View>

                  <View
                    style={{
                      marginHorizontal: 8,
                      marginVertical: 8,
                    }}
                  >
                    <Text
                      style={styles.label}
                    >
                      Tribe
                    </Text>
                    <TribePicker style={styles.label}
                      selectedTribe={tribe}
                      onSelectTribe={(item) => setTribe(item)}/>
                    <View
                      style={
                        formikProps.errors.tribe
                          ? styles.redCircle
                          : styles.greenCircle
                      }
                    ></View>
                  </View>

                  <View
                    style={{
                      marginHorizontal: 8,
                      marginVertical: 8,
                    }}
                  >
                    <Text style={styles.label}>Product Description</Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      onFocus={onfocusDescriptionChange}
                      placeholder="Enter Product Description"
                      autoCorrect={false}
                      style={
                        focusDescription === false
                          ? styles.textInput
                          : styles.textInputName
                      }
                      onChangeText={formikProps.handleChange("description")}
                      onBlur={onBlurDescriptionChange}
                      value={formikProps.values.description}
                    />
                    <View
                      style={
                        formikProps.errors.description
                          ? styles.redCircle
                          : styles.greenCircle
                      }
                    ></View>
                  </View>

                  <TouchableOpacity
                    style={styles.view}
                    onPress={formikProps.handleSubmit}
                  >
                    <View style={{ height: 30, paddingRight: 8 }}>
                      <Feather name="plus" size={24} color="#ff5d42" />
                    </View>

                    <Text style={styles.add}>Add Product</Text>
                  </TouchableOpacity>
                </ScrollView>
              </React.Fragment>
            )}
          </Formik>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  overlay: {
    position: "relative",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  lottie: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  screen: {
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  label: {
    fontFamily: "zilla-med",
    fontSize: 18,
    marginTop: 4,
    letterSpacing: 0.75,
  },
  textInput: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#bdbdbd",
    borderRadius: 2.5,
    position: "relative",
  },

  textInputName: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#ff5d42",
    borderRadius: 2.5,
  },
  errMsg: {
    fontFamily: "zilla-reg",
    fontSize: 16,
    color: "red",
    paddingVertical: 4,
    height: 24,
  },
  greenCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#90EE90",
    position: "absolute",
    right: "0%",
    top: "12.5%",
  },
  redCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#f94d00",
    position: "absolute",
    right: "0%",
    top: "12.5%",
  },

  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 8,
  },
  add: {
    fontFamily: "zilla-reg",
    fontSize: 22,
    color: "#ff5d42",
  },
});

import React from 'react';
import { connect } from 'react-redux'
import { Dimensions, Platform, Linking, StyleSheet, Image, View, Text, TextInput, NativeModules, Switch, TouchableOpacity  } from 'react-native';
import UColor from '../../utils/Colors'
import UImage from '../../utils/Img'
import Header from '../../components/Header'
import ScreenUtil from '../../utils/ScreenUtil'
import { EasyShowLD } from '../../components/EasyShow'
import { EasyToast } from '../../components/Toast';
import BaseComponent from "../../components/BaseComponent";
var dismissKeyboard = require('dismissKeyboard');
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

@connect(({wallet, assets}) => ({...wallet, ...assets}))
class Dappsearch extends BaseComponent {

    static navigationOptions = {
        title: 'DAPP搜索',
        header:null,  
    };

    // 构造函数  
    constructor(props) { 
        super(props);
        this.state = {
            labelname: '',
        }
    }

    componentDidMount() {

    }

    componentWillUnmount(){
        //结束页面前，资源释放操作
        super.componentWillUnmount();
    }

    //清空
    _empty = () => {
        this.dismissKeyboardClick();
        this.setState({ labelname: ''});
    }

    //查询
    _query =(labelname) => {
        this.dismissKeyboardClick();
        if (labelname == "") {
            EasyToast.show('请输入DAPP网址');
            return;
        }else{
            if(Platform.OS === 'ios'){
                // NativeModules.SDKModule.presentViewControllerFromReactNative('DappActivity',labelname);
                EasyToast.show("IOS暂不支持，程序员正在紧急开发中");
            }else if(Platform.OS === 'android'){
                NativeModules.SDKModule.startActivityFromReactNative(labelname,'DappActivity');
            }
        }
    }

    dismissKeyboardClick() {
        dismissKeyboard();
    }

    render() {
        return (
            <View style={[styles.container,{backgroundColor: UColor.secdColor}]}>
                <Header {...this.props} onPressLeft={true} title="DAPP搜索" />
                <View style={[styles.header,{backgroundColor: UColor.mainColor}]}>  
                    <View style={[styles.inptout,{borderColor:UColor.riceWhite,backgroundColor:UColor.btnColor}]} >
                        <Image source={UImage.Magnifier_ash} style={styles.headleftimg} />
                        <TextInput ref={(ref) => this._raccount = ref} value={this.state.labelname} placeholderTextColor={UColor.arrow} 
                            selectionColor={UColor.tintColor} style={[styles.inpt,{color: UColor.arrow}]} placeholder="输入DAPP网址" 
                            underlineColorAndroid="transparent" onChangeText={(labelname) => this.setState({ labelname })}
                             autoCorrect={true} returnKeyType="go" keyboardType="default"  />
                    </View>    
                    <TouchableOpacity onPress={this._query.bind(this,this.state.labelname)}>  
                        <Text style={[styles.canceltext,{color: UColor.fontColor}]}>打开</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity   onPress={this._empty.bind(this,this.state.labelname)}>  
                        <Text style={[styles.canceltext,{color: UColor.fontColor}]}>清空</Text>
                    </TouchableOpacity>  
                </View> 
                <View style={styles.btnout}>
                  <View style={styles.manualout}>
                      <Text style={[styles.prompttext,{color: UColor.arrow}]}>注意：</Text>
                      <Text style={[styles.prompttext,{color: UColor.arrow}]}>手动搜索页面,视为第三方应用,您在此应用上的所有行为应遵守该应用的用户协议和隐私政策,EosToken不承担应有责任。</Text>
                  </View>
                  <View style={styles.logout}>
                      <Image source={UImage.bottom_log} style={styles.logimg}/>
                      <Text style={[styles.logtext,{color: UColor.arrow}]}>EosToken 专注柚子生态</Text>
                  </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: ScreenUtil.autoheight(7),
    },
    leftout: {
      paddingLeft: ScreenUtil.autowidth(15),
    },
    headleftimg: {
      width: ScreenUtil.autowidth(18),
      height: ScreenUtil.autowidth(18),
      marginHorizontal: ScreenUtil.autowidth(10),
    },
    inptout: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'center',
      height: ScreenUtil.autoheight(30),
      marginHorizontal: ScreenUtil.autowidth(10),
    },
    inpt: {
      flex: 1,
      height: ScreenUtil.autoheight(45),
      fontSize: ScreenUtil.setSpText(14),
    },
    listItem: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    listInfo: {
      flex: 1,
      borderTopWidth:1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: ScreenUtil.autoheight(65),
      paddingHorizontal: ScreenUtil.autowidth(16),
    },
    scrollView: {
      flex: 1,
    },
    listInfoTitle: {
      fontSize: ScreenUtil.setSpText(16)
    },
    listInfoRight: {
      flexDirection: "row",
      alignItems: "center",
    },
    modalStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    subView: {
      borderRadius: 5,
      borderWidth: 0.5,
      alignSelf: 'stretch',
      justifyContent: 'center',
      marginHorizontal: ScreenUtil.autowidth(10),
    },
    buttonView: {
      alignItems: 'flex-end',
    },
    butclose: {
      width: ScreenUtil.autowidth(30),
      height: ScreenUtil.autowidth(30),
      fontSize: ScreenUtil.setSpText(28),
    },
    titleText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: ScreenUtil.setSpText(18),
      marginBottom: ScreenUtil.autoheight(5),
    },
    passoutsource: {
      alignItems: 'center',
      flexDirection: 'column', 
      padding:  ScreenUtil.autowidth(10),
    },
    inptpass: {
      width: '100%',
      height: ScreenUtil.autoheight(45),
      fontSize: ScreenUtil.setSpText(16),
      marginVertical: ScreenUtil.autoheight(10),
      paddingHorizontal: ScreenUtil.autowidth(15),
    },
    copyout: {
      borderRadius: 3,  
      alignItems: 'center',
      justifyContent: 'center', 
      margin: ScreenUtil.autowidth(10), 
      height: ScreenUtil.autoheight(45), 
    },
    copytext: {
      fontSize: ScreenUtil.setSpText(16),
    },
    tab1:{
      flex:1,
    },
    tab2:{
      flex:1,
      flexDirection: 'column',
    }, 
    canceltext: {
      justifyContent: 'flex-end',
      fontSize: ScreenUtil.setSpText(18),
      paddingRight: ScreenUtil.autowidth(10),
    },
    prompttext: {
      fontSize: ScreenUtil.setSpText(12),
      lineHeight: ScreenUtil.autoheight(20),
    },
    btnout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    manualout: {
        paddingTop: ScreenUtil.autowidth(40),
        paddingHorizontal: ScreenUtil.autowidth(35),
    },
    btnloginUser: {
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: ScreenUtil.autowidth(150),
      height: ScreenUtil.autoheight(45),
    },
    btntext: {
      fontSize: ScreenUtil.setSpText(17),
    },
    logout:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: ScreenUtil.autoheight(20),
    },
    logimg: {
      width: ScreenUtil.autowidth(50), 
      height: ScreenUtil.autowidth(50)
    },
    logtext: {
      fontSize: ScreenUtil.setSpText(14),
      lineHeight: ScreenUtil.autoheight(30),
    },
})
export default Dappsearch;
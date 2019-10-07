import React, { PureComponent } from 'react';
import { View, Text, TouchableNativeFeedback, TouchableOpacity, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { RScaler } from './../lib/utilites';

type Props = {
    disabled: Boolean,
    onPress: Function,
    onPressIn: Function,
    onPressOut: Function,
    onLongPress: Function,
    delayPressIn: Number,
    delayPressOut: Number,
    delayLongPress: Number,
    activeOpacity: Number,
    background: TouchableNativeFeedback,
    style: StyleSheet,
    text: String,
    iconType?: 'ion' | 'oct' | 'evil' | 'awesome' | 'material',
    icon: String,
    iconSize: Number,
    iconColor?: String | Number,
    iconPosition?: 'left' | 'right',
    iconStyle?: StyleSheet,
    textStyle: StyleSheet,
    loading: Boolean,
    indicatorColor?: String | Number
}

class Button extends PureComponent<Props> {
    static defaultProps = {
        delayPressIn: 0,
        delayPressOut: 0,
        delayLongPress: 0,
        background: TouchableNativeFeedback.Ripple('#6473f3', true),
        activeOpacity: .5,
        iconType: 'ion',
        iconSize: 20,
        iconColor: '#000',
        iconPosition: 'left',
        loading: false,
        indicatorColor: '#000'
    }

    icons(type, icon, color, size, iPosition) {
        const { disabled, text, iconStyle } = this.props;
        let iconType = type.toLowerCase().trim();
        let iconPosition = iPosition ? iPosition : 'left';
        let direction = text ? 10 : null;
        const leftIcon = {position: 'absolute',left: direction};
        const rightIcon = {position: 'absolute',right: direction};

        switch(iconType) {
            case 'ion': 
                return(<Ionicons name={icon} color={disabled ? '#000' : color} size={size} style={[iconPosition == "left" ? leftIcon : rightIcon, iconStyle]} />);
            case 'oct': 
                return(<Octicons name={icon} color={disabled ? '#000' : color} size={size} style={[iconPosition == "left" ? leftIcon : rightIcon, iconStyle]} />);
            case 'evil': 
                return(<EvilIcons name={icon} color={disabled ? '#000' : color} size={size} style={[iconPosition == "left" ? leftIcon : rightIcon, iconStyle]} />);
            case 'awesome': 
                return(<FontAwesome name={icon} color={disabled ? '#000' : color} size={size} style={[iconPosition == "left" ? leftIcon : rightIcon, iconStyle]} />);
            case 'material': 
                return(<MaterialCommunityIcons name={icon} color={disabled ? '#000' : color} size={size} style={[iconPosition == "left" ? leftIcon : rightIcon, iconStyle]} />);
            default: 
                return(<Ionicons name={icon} color={disabled ? '#000' : color} size={size} style={[iconPosition == "left" ? leftIcon : rightIcon, iconStyle]} />);
        }
    }

    render() {
        const ANDROID = Platform.OS === 'android';
        const { text, 
            disabled, 
            onPress, 
            onPressIn, 
            onPressOut, 
            onLongPress,
            delayPressIn, 
            delayPressOut, 
            delayLongPress, 
            background, 
            activeOpacity, 
            style,
            icon,
            iconType,
            iconSize,
            iconColor,
            iconPosition,
            textStyle, 
            loading,
            indicatorColor } = this.props;

        const { Button, Disabled, InnerSection, InnerSectionWIcon } = ButtonStyle;
        const supportBackground = Platform.Version < 21 ? null : background;

        if(ANDROID) {
            return(
                <View style={[disabled || loading ? Disabled : Button, style]}>
                    <TouchableNativeFeedback disabled={loading || disabled} 
                    onPress={onPress}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onLongPress={onLongPress}
                    delayPressIn={delayPressIn}
                    delayPressOut={delayPressOut}
                    delayLongPress={delayLongPress}
                    background={supportBackground}>
                        <View style={[InnerSection, icon && InnerSectionWIcon]}>
                            {!loading ? icon ? this.icons(iconType, icon, iconColor, iconSize, iconPosition) : null : null}
                            {!loading ? text ? <Text style={textStyle}>{text}</Text> : null : null}
                            {loading ? <ActivityIndicator size={'small'} color={indicatorColor} /> : null}
                        </View>
                    </TouchableNativeFeedback>
                </View>
            );
        } else {
            return(
                <TouchableOpacity style={[disabled || loading ? Disabled : Button, style]}
                    onPress={onPress} 
                    disabled={disabled} 
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onLongPress={onLongPress}
                    delayPressIn={delayPressIn}
                    delayPressOut={delayPressOut}
                    activeOpacity={activeOpacity}
                    delayLongPress={delayLongPress} >
                    {icon ? this.icons(iconType, icon, iconColor, iconSize, iconPosition) : null}
                    {!loading ? text ? <Text style={textStyle}>{text}</Text> : null : null}
                    {loading ? <ActivityIndicator size={'small'} color={indicatorColor} /> : null}
                </TouchableOpacity>
            );
        }
    }
}

const buttonHeight = RScaler(6.875);
const ButtonStyle = StyleSheet.create({
    Button: {
        height: buttonHeight,
        borderRadius: 5,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: "#FFF",
        elevation: 3,
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                    width: 1,
                    height: 2
                },
                shadowOpacity: .2,
                shadowRadius: 1
            }
        })
    },
    Disabled: {
        height: buttonHeight,
        borderRadius: 5,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: "#FFF",
        opacity: .7,
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                alignItems: 'center'
            }
        })
    },
    InnerSectionWIcon: {
        paddingStart: 20,
        paddingEnd: 20
    },
    InnerSection: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'row'
    }
});

export { Button };
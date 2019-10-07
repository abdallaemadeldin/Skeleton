import React, { PureComponent } from 'react';
import { View, TouchableNativeFeedback, TouchableOpacity, Platform, ActivityIndicator, StyleSheet } from 'react-native';

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
    loading: Boolean,
    indicatorColor?: String | Number
}

class ClickableView extends PureComponent<Props> {
    
    constructor(props) {
        super(props);
    }
    
    static defaultProps = {
        delayPressIn: 0,
        delayPressOut: 0,
        delayLongPress: 0,
        background: TouchableNativeFeedback.Ripple('#41caf1', true),
        activeOpacity: .5,
        loading: false,
        indicatorColor: '#000'
    }

    render() {
        const ANDROID = Platform.OS === 'android';
        const {
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
            loading,
            indicatorColor,
            children
        } = this.props;
        const { clickableView, Disabled, InnerSection } = styles;
        const justifyContent = style ? style.justifyContent || 'center' : null;
        const alignItems = style ? style.alignItems || 'center' : null;
        const flexDirection = style ? style.flexDirection || 'column' : null;
        const supportBackground = Platform.Version < 21 ? null : background;

        if(ANDROID) {
            return(
                <View style={[disabled || loading ? Disabled : clickableView, style]}>
                    <TouchableNativeFeedback disabled={loading || disabled} 
                    onPress={onPress}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onLongPress={onLongPress}
                    delayPressIn={delayPressIn}
                    delayPressOut={delayPressOut}
                    delayLongPress={delayLongPress}
                    background={supportBackground}>
                        <View style={[InnerSection, {justifyContent: justifyContent, alignItems: alignItems, flexDirection: flexDirection}]}>
                            {loading ? <ActivityIndicator size={'small'} color={indicatorColor} /> : children}
                        </View>
                    </TouchableNativeFeedback>
                </View>
            );
        } else {
            return(
                <TouchableOpacity style={[disabled || loading ? Disabled : clickableView, style]}
                    onPress={onPress} 
                    disabled={disabled} 
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onLongPress={onLongPress}
                    delayPressIn={delayPressIn}
                    delayPressOut={delayPressOut}
                    activeOpacity={activeOpacity}
                    delayLongPress={delayLongPress}
                >
                        {!loading ? children : null}
                        {loading ? <ActivityIndicator size={'small'} color={indicatorColor} /> : null}
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    clickableView: {
        height: 44,
        backgroundColor: '#FFF',
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                alignItems: 'center'
            }
        })
    },
    Disabled: {
        height: 44,
        backgroundColor: '#FFF',
        opacity: .8,
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                alignItems: 'center'
            }
        })
    },
    InnerSection: {
        ...StyleSheet.absoluteFill
    }
});
export { ClickableView };
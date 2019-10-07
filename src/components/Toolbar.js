import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { Button, ClickableView } from './';
import { ToolbarHeight } from './../lib/utilites';

type Props = {
    leftSide: {
        icon: String,
        color: String,
        size: Number,
        iconType: 'ion' | 'oct' | 'evil' | 'awesome' | 'material',
        onPress: Function
    },
    center: {
        title: String,
        color: String,
        size: Number,
        fontFamily: String,
        RTL: StyleSheet
    },
    rightSide: {
        icon: String,
        color: String,
        size: Number,
        iconType: 'ion' | 'oct' | 'evil' | 'awesome' | 'material',
        onPress: Function
    },
    toolbarColor: String,
    flexs: [Number]
};

class Toolbar extends PureComponent<Props> {

    render() {
        const { toolbarColor, leftSide, center, rightSide, flexs } = this.props;
        const { container, section, centerSection, flatButton, titleStyle } = styles;
        return (
            <View style={[container, { backgroundColor: toolbarColor }]}>
                <View style={[section, { flex: flexs[0] }]}>
                    {leftSide ?
                        leftSide.icon ?
                            typeof leftSide.icon == 'number' ?
                                <ClickableView
                                    style={flatButton}
                                    onPress={leftSide.onPress}
                                    background={null}
                                >
                                    <Image
                                        source={leftSide.icon}
                                        style={{
                                            width: leftSide.size,
                                            height: leftSide.size,
                                            tintColor: leftSide.color,
                                            resizeMode: 'stretch'
                                        }}
                                    />
                                </ClickableView>
                                :
                                <Button
                                    style={flatButton}
                                    icon={leftSide.icon}
                                    iconSize={leftSide.size}
                                    iconColor={leftSide.color}
                                    iconType={leftSide.iconType}
                                    onPress={leftSide.onPress}
                                    background={null}
                                />
                            : leftSide
                        : null}
                </View>

                <View style={[centerSection, { flex: flexs[1] }]}>
                    {center ?
                        center.title ?
                            <Text style={[{ fontFamily: center.fontFamily, fontSize: center.size || 25, color: center.color || "#000" }, center.RTL, titleStyle]}>{center.title}</Text>
                            : center
                        : null}
                </View>

                <View style={[section, { flex: flexs[2] }]}>
                    {rightSide ?
                        rightSide.icon ?
                            typeof rightSide.icon == 'number' ?
                                <ClickableView
                                    style={flatButton}
                                    onPress={rightSide.onPress}
                                    background={null}
                                >
                                    <Image
                                        source={rightSide.icon}
                                        style={{
                                            width: rightSide.size,
                                            height: rightSide.size,
                                            tintColor: rightSide.color,
                                            resizeMode: 'stretch'
                                        }}
                                    />
                                </ClickableView>
                                :
                                <Button
                                    style={flatButton}
                                    icon={rightSide.icon}
                                    iconSize={rightSide.size}
                                    iconColor={rightSide.color}
                                    iconType={rightSide.iconType}
                                    onPress={rightSide.onPress}
                                    background={null}
                                />
                            : rightSide
                        : null}
                </View>
            </View>
        );
    }

    static defaultProps = {
        toolbarColor: "#FFF",
        flexs: [1, 3, 1]
    }
}

const { width, height } = Dimensions.get('window');
const isANDROID = Platform.OS == 'android';
const isIPHONEX = Platform.OS == "ios" && (height > 800 || width > 800);
const styles = StyleSheet.create({
    container: {
        width: width,
        height: ToolbarHeight(),
        elevation: 10,
        flexDirection: 'row',
        zIndex: 2
    },
    section: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerSection: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatButton: {
        width: '100%',
        height: '100%',
        elevation: 0,
        borderWidth: 0,
        borderRadius: 0,
        top: isIPHONEX ? 20 : isANDROID ? null : 8,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    titleStyle: {
        top: isIPHONEX ? 16 :  isANDROID ? null : 8
    }
});

export { Toolbar };
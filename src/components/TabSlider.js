import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Animated, Easing, Platform } from 'react-native';

type Props = {
    tabs: Array,
    hidePagination: Boolean,
    tabsHeight: Number,
    pagintaionStyle: StyleSheet,
    dotStyle: StyleSheet,
    page: Number,
    scrollEnabled: Boolean
}

class TabSlider extends PureComponent<Props> {

    static defaultProps = {
        hidePagination: false,
        tabsHeight: 250,
        dotStyle: {
            width: 12
        },
        page: Platform.OS == 'android' ? 1 : 0,
        scrollEnabled: true
    }

    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0,
            tabLeftPosition: new Animated.Value(0)
        }
    }

    componentDidMount() {
        this.nextIndex(Platform.OS == 'android' ? 1 : 0);
    }

    componentWillReceiveProps(nextProps) {
        this.nextIndex(nextProps.page);
    }

    nextIndex(page) {
        this.flatList.scrollToOffset({
            offset: page * width
        });
        this.setState({
            currentTab: page
        });
    }

    renderItem({ item }) {
        return (item);
    }

    renderPagination() {
        const { tabLeftPosition } = this.state;
        const { pagintaionStyle, dotStyle, tabs } = this.props;
        const { paginationContainer, paginationDot } = styles;
        const paginationContainerWidth = (dotStyle.width * tabs.length) + (dotStyle.marginEnd * tabs.length);

        return (
            <View style={[paginationContainer, { width: paginationContainerWidth }, pagintaionStyle]}>
                <Animated.View style={[paginationDot, { position: 'absolute', left: tabLeftPosition }, dotStyle]} />
                {
                    this.props.tabs.map((item, index) => {
                        return (
                            <View key={index} style={[paginationDot, dotStyle, { backgroundColor: '#777', opacity: .5 }]} />
                        );
                    })
                }
            </View>
        );
    }

    onMomentumScrollEnd(e) {
        let index = e.nativeEvent.contentOffset.x / width;
        this.setState({
            currentTab: index
        });
        this.moveTab(index);
    }

    moveTab(activeTab) {
        const { tabLeftPosition } = this.state;
        const { dotStyle, tabs } = this.props;
        const paginationContainerWidth = (dotStyle.width * tabs.length) + (dotStyle.marginEnd * tabs.length);

        Animated.timing(tabLeftPosition, {
            duration: 250,
            toValue: (paginationContainerWidth / tabs.length) * activeTab,
            easing: Easing.cubic
        }).start();
    }

    render() {
        const { tabs, hidePagination, tabsHeight, scrollEnabled } = this.props;
        const { container, flatList } = styles;
        return (
            <View style={[container, { height: tabsHeight }]}>

                {hidePagination ? null : this.renderPagination()}

                <FlatList
                    horizontal
                    data={tabs}
                    pagingEnabled
                    bounces={false}
                    scrollEnabled={scrollEnabled}
                    inverted
                    extraData={width}
                    ref={ref => this.flatList = ref}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                    onMomentumScrollEnd={this.onMomentumScrollEnd.bind(this)}
                    style={[flatList, { backgroundColor: tabs.backgroundColor }]}
                />

            </View>
        );
    }

}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width
    },
    flatList: {
        flex: 1
    },
    itemContainer: {
        width,
        alignItems: 'center'
    },
    itemImage: {
        width,
        resizeMode: 'cover'
    },
    itemCaption: {
        textAlign: 'center',
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        color: '#ffffff',
        fontSize: 17
    },
    paginationContainer: {
        top: 70,
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 5000
    },
    paginationDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginEnd: 10,
        marginStart: 0
    }
});
export { TabSlider };
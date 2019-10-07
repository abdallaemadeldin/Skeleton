import React, { PureComponent } from 'react';
import { FlatList, RefreshControl, View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

type Props= {
    data: Array,
    renderItem: React.ReactElement,
    style: StyleSheet,
    listHeader: React.ReactElement,
    listFooter: React.ReactElement,
    listSeparator: React.ReactElement,
    listEmptyView: React.ReactElement,
    horizontal: Boolean,
    numColumns: Number,
    initRefresh: Boolean,
    initLazyLoad: Boolean,
    refreshIndecatorColors: [String, String],
    lazyLoadIndecatorColor: String,
    onEndReached: Function,
    onRefresh: Function,
    hideScrollIndecator: Boolean,
    initialScrollIndex: Number,
    initialNumToRender: Number,
    inverted: Boolean,
    pagingEnabled: Boolean,
    onScroll: Function,
    onTouchStart: Function,
    listRef: React.LegacyRef<FlatList<>>,
    getItem: (data, index: Number) => any,
    getItemCount: (data) => Number,
    getItemLayout: (data: any[], index: Number) => { length: Number, offset: Number, index: Number },
    bounse: Number
}

class ListView extends PureComponent<Props> {

    static defaultProps = {
        horizontal: false,
        initLazyLoad: false,
        initRefresh: false,
        numColumns: 1,
        refreshIndecatorColors: ["#999900", "#000000"],
        lazyLoadIndecatorColor: "#999900",
        hideScrollIndecator: false,
        inverted: false
    }

    constructor(props) {
        super(props);
        
        this.state = {
            isRefreshing: false,
            hideLazyLoad: false
        }
    }

    componentDidMount() {
        const { listRef } = this.props;

        if(listRef) {
            listRef(this.refs.list);
        }
    }
    
    onRefresh() {
        const { onRefresh } = this.props;

        this.setState({
            isRefreshing: true,
            hideLazyLoad: false
        });

        onRefresh(() => {
            this.setState({
                isRefreshing: false
            });
        });
    }

    onEndReached(bool) {
        if(!bool) {
            return null;
        }
        
        const { onEndReached } = this.props;

        onEndReached((length) => {
            if(length == 0) {
                this.setState({
                    hideLazyLoad: true
                });
            }
        });
    }

    renderFooter() {
        const { lazyLoadIndecatorColor } = this.props;
        const { hideLazyLoad } = this.state;

        if(hideLazyLoad) {
            return null;
        }

        return (
            <View style={styles.footerView}>
                <ActivityIndicator animating size="small" color={lazyLoadIndecatorColor} />
            </View>
        );
    }

    renderRefreshController(bool) {
        if(!bool) {
            return null;
        }

        const { refreshIndecatorColors } = this.props;
        const { isRefreshing } = this.state;

        return(
            <RefreshControl
                colors={refreshIndecatorColors}
                refreshing={isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
            />
        );
    }

    render() {
        const {
            data,
            style,
            renderItem,
            horizontal,
            numColumns,
            listHeader,
            listFooter,
            listSeparator,
            listEmptyView,
            initLazyLoad,
            initRefresh,
            inverted,
            initialNumToRender,
            initialScrollIndex,
            getItem,
            getItemCount,
            getItemLayout,
            hideScrollIndecator,
            onScroll,
            onTouchStart,
            pagingEnabled,
            bounse
        } = this.props;

        let footerItem = initLazyLoad ? this.renderFooter.bind(this) : listFooter ? listFooter() : null;
        let footerView = data.length !== 0 ? footerItem : null;
        let emptyView = listEmptyView ? () => listEmptyView() : null;
        let headerView = listHeader ? () => listHeader() : null;
        let separatorView = listSeparator ? () => listSeparator() : null;
        
        return(
            <FlatList
                data={data}
                ref={'list'}
                style={style}
                bounces={bounse}
                getItem={getItem}
                inverted={inverted}
                onScroll={onScroll}
                numColumns={numColumns}
                horizontal={horizontal}
                onEndReachedThreshold={.5}
                onTouchStart={onTouchStart}
                getItemCount={getItemCount}
                getItemLayout={getItemLayout}
                pagingEnabled={pagingEnabled}
                ListEmptyComponent={emptyView}
                ListFooterComponent={footerView}
                ListHeaderComponent={headerView}
                ItemSeparatorComponent={separatorView}
                initialScrollIndex={initialScrollIndex}
                initialNumToRender={initialNumToRender}
                renderItem={(item) => renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={this.renderRefreshController(initRefresh)}
                showsVerticalScrollIndicator={!hideScrollIndecator}
                onEndReached={() => this.onEndReached(initLazyLoad)}
                showsHorizontalScrollIndicator={!hideScrollIndecator}
            />
        );
    }

}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    footerView: {
        paddingVertical: 20,
        width: width
    }
});


export { ListView };
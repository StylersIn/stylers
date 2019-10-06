import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import ServiceList from './ServiceList';
import GenderList from './GenderList';
import Header from '../../components/Header';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        alert('Hi there!!');
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={"Browse Services"}
                />
                <GenderList {...this.props} />
                <ServiceList {...this.props} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        marginTop: Platform.OS == "ios" ? 50 : 0
    }
})

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
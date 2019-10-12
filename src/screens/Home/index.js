import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
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
            <SafeAreaView>
                <View style={styles.container}>
                    <Header
                        title={"Browse Services"}
                    />
                    <GenderList {...this.props} />
                    <ServiceList {...this.props} />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    }
})

export default Home;
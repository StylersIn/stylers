import React from 'react';
import Component from '../screens/Home';

const Home = (props) => <Component {...props} />

const mapStateToProps = state => ({
    home: state.home,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
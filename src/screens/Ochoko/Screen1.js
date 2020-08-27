import React from 'react';
import {
    Dimensions,
    Text,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import EventCalendar from 'react-native-events-calendar'
import { SafeAreaView } from 'react-navigation';
import moment from "moment";
import { Header, Left, Right, Icon } from 'native-base';
import * as Progress from 'react-native-progress';

let { width } = Dimensions.get('window')

class Screen1 extends React.Component {
    state = {
        selectedDay: undefined,
        hourData: [
            { hours: 8, volume: 25 },
            { hours: 11, volume: 15 },
            { hours: 3, volume: 21 },
            { hours: 4, volume: 47 },
            { hours: 20, volume: 38 }
        ],
    }

    // componentDidMount(){
    //     alert(moment().format("dddd"))
    // }

    getMonthDays(month) {
        if (month == "February") {
            return 28;
        } else if (month == "April" || month == "June" || month == "September" || month == "November") {
            return 30;
        } else {
            return 31;
        }
    }

    renderDays() {
        const {
            selectedDay,
        } = this.state;
        const days = this.getMonthDays(moment().format("MMMM"));
        var result = [];
        for (let i = 1; i <= days; i++) {
            var myDate = `${moment().year()}-${("0" + (moment().month() + 1)).slice(-2)}-${("0" + i).slice(-2)}T00:00:00`;
            var weekDayName = moment(myDate).format("dddd").slice(0, 3);

            let e = <TouchableOpacity
                key={i}
                onPress={() => this.setState({ selectedDay: i })}
                style={{
                    backgroundColor: (selectedDay || moment().date()) == i ? "#fee028" : "#F8F8F8",
                    height: 55,
                    width: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 3,
                    marginRight: 10,
                }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: (selectedDay || moment().date()) == i ? "#000" : "#ccc" }}>{i}</Text>
                <Text style={{ fontSize: 12, }}>{weekDayName}</Text>
            </TouchableOpacity>
            result.push(e);
        }
        return result;
    }

    renderSide() {
        const {
            hourData,
        } = this.state;
        var result = [];
        let sorted = hourData.sort((a, b) => a.hours - b.hours);
        for (let i = sorted[0].hours; i <= sorted[sorted.length - 1].hours; i++) {
            let e = <View style={{ height: 50, }} key={i}>
                <Text style={{ color: "#bbb", fontWeight: "bold", }}>{`${i}h`}</Text>
            </View>;
            result.push(e);
        }
        return result;
    }

    renderMain() {
        const {
            hourData,
        } = this.state;
        var result = [];
        let sorted = hourData.sort((a, b) => a.hours - b.hours);
        for (let i = sorted[0].hours; i <= sorted[sorted.length - 1].hours; i++) {
            let a = sorted.filter(r => r.hours == i);
            const width = a.length ? a[0].volume : 0;
            let e = <View style={{ height: 50, }} key={i}>
                {/* <Text>{`${a.length ? a[0].volume : 0}`}</Text> */}
                {a.length ? <View style={{
                    height: 18,
                    justifyContent: "center",
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{
                            height: 5,
                            width: `${(width / 80) * 100}%`,
                            backgroundColor: "#fee028",
                            borderRadius: 3,
                        }}>

                        </View>

                        <Text style={{ fontWeight: "bold", color: "#000", paddingLeft: 10, }}>{width}</Text>
                    </View>
                </View> : null}
            </View>;
            result.push(e);
        }
        return result;
    }

    render() {
        const {
            hourData,
        } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: "#efeff4" }}>
                <Header>
                    <Left style={{ flexDirection: "row", alignItems: "center", }}>
                        <TouchableOpacity>
                            <Icon
                                type={"Ionicons"}
                                name={"ios-arrow-back"}
                                style={{ color: "#000", }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10, }}>Back</Text>
                        </TouchableOpacity>
                    </Left>
                    <Text style={{ fontSize: 22, fontWeight: "700", marginTop: 8, }}>{moment().format('MMMM')}</Text>
                    <Right>
                        <TouchableOpacity>
                            <Icon
                                type={"Ionicons"}
                                name={"ios-document"}
                                style={{ color: "#ccc", }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon
                                type={"Ionicons"}
                                name={"ios-grid"}
                                style={{ color: "#ccc", marginLeft: 20, }}
                            />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ height: 100, marginTop: 20, }}
                >
                    {this.renderDays()}
                </ScrollView>
                <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                    <View style={{
                        marginTop: 20,
                        backgroundColor: "#fff",
                        marginHorizontal: 20,
                        padding: 20,
                        flexDirection: "row",
                    }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "column", }}>
                                {this.renderSide()}
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: "#ccc", height: "100%", marginHorizontal: 15, }}></View>
                        </View>
                        <View style={{ width: "80%" }}>
                            {this.renderMain()}
                            {/* <View style={{ borderWidth: 2, height: "100%" }}></View> */}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default Screen1;
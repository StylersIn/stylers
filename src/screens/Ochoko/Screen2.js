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
import { Header, Left, Right, Icon, Button } from 'native-base';
import * as Progress from 'react-native-progress';

let { width } = Dimensions.get('window')

const year = moment().year();
const month = moment().month();
const _month_ = (moment().month() + 1);

class Screen2 extends React.Component {
    state = {
        selectedDays: [],
        selectedWeek: undefined,
        hourData: [
            { hours: 8, volume: 25 },
            { hours: 11, volume: 15 },
            { hours: 3, volume: 21 },
            { hours: 4, volume: 47 },
            { hours: 20, volume: 38 }
        ],
    }

    componentDidMount() {
        const process = this.processAll();
        const firstDayOfMonth = `${year}-${("0" + _month_).slice(-2)}-${("01")}T00:00:00`;
        const _date_ = `${year}-${("0" + _month_).slice(-2)}-${("0" + moment().date())}T00:00:00`;
        const weekIndex = moment(firstDayOfMonth).week();
        var weekCount = moment(_date_).week();
        var _currWeekIndex_ = (weekCount - weekIndex) + 1;

        this.setState({ selectedDays: process[_currWeekIndex_].map(e => e.day), selectedWeek: _currWeekIndex_ });
    }

    getMonthDays(month) {
        if (month == "February") {
            return 28;
        } else if (month == "April" || month == "June" || month == "September" || month == "November") {
            return 30;
        } else {
            return 31;
        }
    }

    groupBy(xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    processAll() {
        let final = [];
        const days = this.getMonthDays(moment().format("MMMM"));
        const firstDayOfMonth = `${year}-${("0" + _month_).slice(-2)}-${("01")}T00:00:00`;
        const weekIndex = moment(firstDayOfMonth).week();

        for (let i = 1; i <= days; i++) {
            var _date_ = `${year}-${("0" + _month_).slice(-2)}-${("0" + i).slice(-2)}T00:00:00`;
            var weekCount = moment(_date_).week();
            var _week_ = (weekCount - weekIndex) + 1;
            final.push({ day: i, week: _week_, });
        }

        return this.groupBy(final, 'week');
    }

    weekDayName(day, trim = false) {
        var myDate = `${year}-${("0" + _month_).slice(-2)}-${("0" + day).slice(-2)}T00:00:00`;
        var weekDayName = trim ? moment(myDate).format("dddd").slice(0, 3) : moment(myDate).format("dddd");
        return weekDayName;
    }

    renderDays() {
        const {
            selectedWeek,
        } = this.state;

        const days = this.getMonthDays(moment().format("MMMM"));

        var firstOfMonth = new Date(year, month, 1);
        var lastOfMonth = new Date(year, month, 0);
        var groupedData = this.processAll();

        var result = [];

        return [1, 2, 3, 4, 5].map((e, i) => {

            let obj = groupedData[e];
            var last = obj[obj.length - 1];
            let firstDayOfWeek = groupedData[e][0].day;
            let lastDayOfWeek = last.day;

            let firstDayWeekname = this.weekDayName(firstDayOfWeek);
            let lastDayWeekname = this.weekDayName(lastDayOfWeek);

            i = e;
            return (
                <TouchableOpacity
                    key={i}
                    onPress={() => this.setState({ selectedWeek: i, selectedDays: obj.map(e => e.day), })}
                    style={{
                        backgroundColor: (selectedWeek || moment().date()) == i ? "#fee028" : "#F8F8F8",
                        height: 55,
                        // width: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 3,
                        marginRight: 10,
                        padding: 20,
                    }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                        <View style={{ alignItems: "center", }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: (selectedWeek || moment().date()) == i ? "#000" : "#ccc" }}>
                                {`${firstDayOfWeek} ${moment().format('MMMM').slice(0, 3)}`}</Text>
                            <Text style={{ fontSize: 12, }}>{firstDayWeekname}</Text>
                        </View>

                        <View style={{ paddingHorizontal: 10, }}>
                            <Icon
                                style={{ fontSize: 22, color: (selectedWeek || moment().date()) == i ? "#000" : "#ccc", }}
                                name={"ios-arrow-forward"} />
                        </View>

                        <View style={{ alignItems: "center", }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: (selectedWeek || moment().date()) == i ? "#000" : "#ccc" }}>
                                {`${lastDayOfWeek} ${moment().format('MMMM').slice(0, 3)}`}</Text>
                            <Text style={{ fontSize: 12, }}>{lastDayWeekname}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    renderCard() {
        const {
            hourData,
            selectedDays,
        } = this.state;

        let sorted = hourData.sort((a, b) => a.hours - b.hours);

        return selectedDays.map((e, i) => {

            let a = sorted.filter(r => r.hours == i);
            const width = a.length ? a[0].volume : null;

            var myDate = `${year}-${("0" + _month_).slice(-2)}-${("0" + e).slice(-2)}T00:00:00`;
            var weekDayName = moment(myDate).format("dddd").slice(0, 3);

            return (
                <View key={i} style={{
                    marginTop: 10,
                    backgroundColor: "#fff",
                    marginHorizontal: 20,
                    padding: 10,
                    flexDirection: "row",
                    borderRadius: 3,
                }}>
                    <View style={{ flexDirection: "row", }}>

                        <View style={{ flexDirection: "row", width: "85%", }}>
                            <View style={{ height: 40, justifyContent: "center", alignItems: "center", paddingHorizontal: 10, }}>
                                <Text style={{ color: "#bbb", fontSize: 20, fontWeight: "bold", }}>{`${e}`}</Text>
                                <Text style={{ color: "#bbb", fontSize: 12, }}>{weekDayName}</Text>
                            </View>

                            <View style={{ borderWidth: 0.5, borderColor: "#ccc", height: "100%", marginHorizontal: 15, }}></View>

                            <View style={{
                                height: 40,
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
                            </View>
                        </View>

                        <View style={{ width: "13%", justifyContent: "center", alignItems: "flex-end", }}>
                            <Icon
                                style={{ fontSize: 22, color: "#ccc", }}
                                name={"ios-arrow-forward"} />
                        </View>
                    </View>
                </View>
            )
        })
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
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    height: 70,
                    backgroundColor: "#fff",
                    // marginBottom:-30
                }}>
                    {/* <Button
                        style={{ width: "40%", height: 40, }}
                    >
                        <Text>Day</Text>
                    </Button>
                    <Button
                        style={{ width: "40%", height: 40, }}
                    >
                        <Text>Week</Text>
                    </Button> */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#F8F8F8",
                            height: 40,
                            width: "40%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 3,
                            marginRight: 10,
                            marginTop: 15,
                        }}>
                        <Text style={{ fontWeight: "bold", color: "#bbb", }}>Day</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#fee028",
                            height: 40,
                            width: "40%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 3,
                            marginRight: 10,
                            marginTop: 15,
                        }}>
                        <Text style={{ fontWeight: "bold", }}>Week</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: "10%" }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            // height: 0,
                            marginTop: 20,
                            // flexGrow: 1, 
                        }}
                    >
                        {this.renderDays()}
                    </ScrollView>
                </View>
                <View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                        {this.renderCard()}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default Screen2;
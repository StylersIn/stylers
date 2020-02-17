const options = { year: 'numeric', month: 'long', day: 'numeric' };
// weekday: 'long', 
const options__time = {
    timeZone: "Africa/Accra", hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"
}

export const getRating = (ratings) => {
    let sum = 0,
        average = 0;
    // sum = ratings.reduce((a, b) => a[rating] + b[rating]);
    // average = sum / ratings.length;
    for (let i = 0; i < ratings.length; i++) {
        sum += parseInt(ratings[i].rating, 10)
    }
    average = sum / ratings.length;
    return average;
}

export const calcTotalPrice = (styler, selected) => {
    let total = 0;
    selected.map(e => {
        let service = styler.services.find(r => r.subServiceId._id === e.subServiceId);
        const { adult, child } = service;
        total += (e.adult * adult || 0) + (e.child * child || 0)
    })
    return total;
}

export const formatDate = (d) => {
    var date = new Date(d);
    return date.toLocaleDateString("en-US", options);
}

export const formatTime = (d) => {
    var date = new Date(d);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export const getDate = (d) => {
    var date = new Date(d);
    return date.getDate();
}

export const getDay = (d) => {
    var date = new Date(d);
    var e = date.getDay();
    return e == 0 ? 'Sun' : e == 1 ? 'Mon' : e == 2 ? 'Tues' : e == 3 ? 'Wed' : e == 4 ? 'Thu' : e == 5 ? 'Fri' : e == 6 ? 'Sat' : null;
}
const options = { year: 'numeric', month: 'long', day: 'numeric' };
// weekday: 'long', 
const options__time = {
    timeZone: "Africa/Accra", hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"
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

export const getRating = (ratings = []) => {
    if (ratings.length > 0) {
        let r = ratings.reduce((p, c) => p + c.rating, 0);
        return r / ratings.length;
    }
    return 0;
}

export const getStartingPrice = (services = []) => {
    if (services.length > 0) {
        services.filter(e => {
            if (typeof e.adult != "number") {
                e.adult = 0;
            } else if (typeof e.child != "number") {
                e.child = 0;
            }
            return e;
        })
        // console.warn(services)
        let least;
        services.map(p => {
            if (!p.adult && p.child) {
                return least = least && least < p.child ? least : p.child;
            }
            if (!p.child && p.adult) {
                return least = least && least < p.adult ? least : p.adult;
            }
            if (!p.adult && !p.child) {
                return least = least;
            }
            if (p.adult < p.child) {
                return least = least && least < p.adult ? least : p.adult;
            } else {
                return least = least && least < p.child ? least : p.child;
            }
        })

        // console.warn(least)
        // let e = services.reduce((p, c) => (p.adult && p.adult < p.child ? p.adult : p.child) < (c.adult && c.adult < c.child ? c.adult : c.child) ?
        //     (p.adult && p.adult < p.child ? p.adult : p.child) : (c.adult && c.adult < c.child ? c.adult : c.child));
        return least;
    }
    return 0;
}

export const getTotalAmt = (balance, totalDue) => {
    var e = balance - totalDue;
    if (e.toString().startsWith("-")) {
        return parseInt(e.toString().replace("-", ""));
    }
    return 0;
}


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
        let service = styler.services.find(r => r.serviceId._id === e.id);
        const { adult, child } = service;
        total += (e.adult * adult || 0) + (e.child * child || 0)
    })
    return total;
}
const getOrderSummary = async () => {
    let data = {
        today: [
            { label: 'Pending Orders', value: '6' },
            { label: 'Processing Orders', value: '3' },
            { label: 'Pending Payments', value: '35000.00' },
            { label: 'Confirmed Payments', value: '42000.00' },
            { label: 'Pending Pickup', value: '4' },
            { label: 'Confirmed Pickup', value: '6' },
        ],
        this_week: [
            { label: 'Pending Orders', value: '10' },
            { label: 'Processing Orders', value: '5' },
            { label: 'Pending Payments', value: '70000.00' },
            { label: 'Confirmed Payments', value: '83000.00' },
            { label: 'Pending Pickup', value: '8' },
            { label: 'Confirmed Pickup', value: '12' },
        ],
        this_month: [
            { label: 'Pending Orders', value: '20' },
            { label: 'Processing Orders', value: '12' },
            { label: 'Pending Payments', value: '140000.00' },
            { label: 'Confirmed Payments', value: '165000.00' },
            { label: 'Pending Pickup', value: '16' },
            { label: 'Confirmed Pickup', value: '24' },
        ],
    };    

    return data;
}

const getProductSummary = async () => {
    let data = [
        {label: 'In Stock', value: '14'},
        {label: 'Out of Stock', value: '3'}
    ];

    return data;
}

const getIncomeData = async () => {
    let data=[ 
        {label: 'Jan', value: 50000}, 
        {label: 'Feb', value: 80000}, 
        {label: 'Mar', value: 90000}, 
        {label: 'Apr', value: 10000},
        {label: 'May', value: 10000},
        {label: 'Jun', value: 10000},
        {label: 'Jul', value: 20000},
        {label: 'Aug', value: 20000},
        {label: 'Sep', value: 50000},
        {label: 'Oct', value: 50000},
        {label: 'Nov', value: 100000},
        {label: 'Dec', value: 100000},
    ]

    return { data: data, maxValue: 100000 };
}

export { getOrderSummary, getProductSummary, getIncomeData }
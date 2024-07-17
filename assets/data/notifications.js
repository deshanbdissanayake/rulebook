const getAllNotificationsByUserId = async () => {
    let user_id = 1; //get from async storage
    //get data from descending order
    let data = [
        {
            "n_id": 3,
            "type": "order", //this will change the icon
            "title": "New Order Received",
            "desc": "You have received a new order for a high-performance gaming laptop.",
            "dateTime": "2024-05-10 10:23 PM",
            "readStatus": false
        },
        {
            "n_id": 2,
            "type": "order", //this will change the icon
            "title": "Order Shipped",
            "desc": "Your order for a mechanical keyboard has been shipped.",
            "dateTime": "2024-05-10 10:23 PM",
            "readStatus": true
        },
        {
            "n_id": 1,
            "type": "alert", //this will change the icon
            "title": "Low Stock Alert",
            "desc": "The stock for SSDs is running low. Consider restocking soon.",
            "dateTime": "2024-05-10 10:23 PM",
            "readStatus": true
        }
    ];    

    return data;
}

const markAsRead = async (n_id) => {
    //n_id = notification_id can be 1, 3, 4.. or 'all'
    let user_id = 1; //get from async storage
    
    let data = {stt: 'success', msg: 'Notifications Marked as Read', data: []}

    return data;
}

export { getAllNotificationsByUserId, markAsRead }
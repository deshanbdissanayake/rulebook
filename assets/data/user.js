const getProfileData = async () => {
    let data = {
        "user_id": 1,
        "fullname": "Deshan Dissanayake",
        "username": "0714214755",
        "email": "desh.introps@gmail.com",
        "contact": "0714214755",
        "shop_name": "Introps",
        "pro_pic": "https://static-00.iconduck.com/assets.00/user-icon-512x512-x23sj495.png",
        "shop_contact": "0711500200",
        "shop_email": "introps@gmail.com",
        "shop_address": "No.54, Katugastota Rd, Kandy",
        "shop_city": "Kandy",
        "shop_url": "https://www.introps.com",
        "type": "vendor",
        "shop_desc": "Introps is your one-stop shop for all things computing in Kandy. We offer a wide range of high-performance gaming laptops, professional desktop PCs, and essential peripherals. Our team is dedicated to providing top-quality products and exceptional customer service to meet all your computing needs."
    };
    
    return data;
}

const changePassword = async (formData) => {
    let data = { stt: 'success', msg: 'Your password has been changed!', data: [] };

    return data;
}

const updateProfileData = async (formData) => {
    let data = { stt: 'success', msg: 'Your profile data has been updated!', data: [] };

    return data;
}

export { getProfileData, changePassword, updateProfileData }
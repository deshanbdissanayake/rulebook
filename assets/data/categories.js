const getAllCategories = async () => {
    let data = [
        {
            "cat_id": 1,
            "cat_name": "Laptops"
        },
        {
            "cat_id": 2,
            "cat_name": "Desktops"
        },
        {
            "cat_id": 3,
            "cat_name": "Components"
        },
        {
            "cat_id": 4,
            "cat_name": "Accessories"
        },
        {
            "cat_id": 5,
            "cat_name": "Peripherals"
        }
    ]    

    return data;
}

export { getAllCategories }
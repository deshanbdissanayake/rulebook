const getProductsByUserId = async () => {
    //get by user id
    let user_id = 1;
    let data = [
        {
            "pro_id": 1,
            "pro_name": "High-Performance Gaming Laptop",
            "pro_sku": "GL-XYZ-001",
            "pro_desc": "This gaming laptop offers top-notch performance with its powerful GPU and CPU. Perfect for both gaming and professional work.",
            "pro_images": [
                {
                    "img_id": 1,
                    "img": "https://www.pcworld.com/wp-content/uploads/2024/07/msi-titan-gt77-4.jpg?quality=50&strip=all&w=1024",
                    "stt": "active"
                },
                {
                    "img_id": 2,
                    "img": "https://b2c-contenthub.com/wp-content/uploads/2024/03/Alienware-m16-R2-starfield.jpg?quality=50&strip=all",
                    "stt": "active"
                },
                {
                    "img_id": 3,
                    "img": "https://b2c-contenthub.com/wp-content/uploads/2024/02/msi-titan-18-hx-6_e288eb.jpg?quality=50&strip=all",
                    "stt": "active"
                },
                {
                    "img_id": 4,
                    "img": "https://b2c-contenthub.com/wp-content/uploads/2023/04/20230424_094122.jpg?quality=50&strip=all",
                    "stt": "active"
                },
            ],
            "categories": [1, 2, 5],
            "tags": [1, 2, 3, 4],
            "price": "1000.00",
            "discount": {
                "dis_price": "800.00",
                "dis_start": "2024-05-10",
                "dis_end": "2024-05-15"
            },
            "stock_status": "in"
        },
        {
            "pro_id": 2,
            "pro_name": "Professional Desktop PC",
            "pro_sku": "PD-901",
            "pro_desc": "A powerful desktop PC designed for professional work, offering excellent performance and reliability.",
            "pro_images": [
                {
                    "img_id": 5,
                    "img": "https://www.laptop.lk/wp-content/uploads/2024/06/HP-Pro-Tower-280-G9-i3-300x300.jpg",
                    "stt": "active"
                },
                {
                    "img_id": 6,
                    "img": "https://www.laptop.lk/wp-content/uploads/2023/02/Hp-Pro-Tower-280-G9-2-300x300.jpg",
                    "stt": "active"
                },
                {
                    "img_id": 7,
                    "img": "https://www.laptop.lk/wp-content/uploads/2021/11/01-6-300x300.jpg",
                    "stt": "active"
                },
                {
                    "img_id": 8,
                    "img": "https://www.laptop.lk/wp-content/uploads/2024/01/Dell-Vostro-3020-Desktop-with-Monitor-%E2%80%93-i3-300x300.jpg",
                    "stt": "active"
                }
            ],
            "categories": [1, 3],
            "tags": [2, 3, 4],
            "price": "45000.00",
            "discount": null,
            "stock_status": "out"
        },
        {
            "pro_id": 3,
            "pro_name": "Ultra-Wide Monitor",
            "pro_sku": "UM-123",
            "pro_desc": "A 34-inch ultra-wide monitor with a high refresh rate and excellent color accuracy. Ideal for gaming and professional use.",
            "pro_images": [
                {
                    "img_id": 9,
                    "img": "https://i.pcmag.com/imagery/reviews/04yXpm5uyjix6ORSzFZVOrA-1.fit_lim.size_120x68.v1693014357.jpg",
                    "stt": "active"
                },
                {
                    "img_id": 10,
                    "img": "https://i.pcmag.com/imagery/reviews/072xjeYbUdAtECi5QfhzC2p-1.fit_lim.size_120x68.v1658782835.jpg",
                    "stt": "active"
                }
            ],
            "categories": [4],
            "tags": [5, 6],
            "price": "700.00",
            "discount": {
                "dis_price": "650.00",
                "dis_start": "2024-06-01",
                "dis_end": "2024-06-07"
            },
            "stock_status": "in"
        },
        {
            "pro_id": 4,
            "pro_name": "Mechanical Keyboard",
            "pro_sku": "MK-456",
            "pro_desc": "A mechanical keyboard with customizable RGB lighting and programmable keys. Suitable for gamers and professionals.",
            "pro_images": [
                {
                    "img_id": 11,
                    "img": "https://www.nexxcom.lk/wp-content/uploads/2023/05/MBA-61R_2-1000x1000-copy-min.png",
                    "stt": "active"
                },
                {
                    "img_id": 12,
                    "img": "https://www.nexxcom.lk/wp-content/uploads/2023/03/ARMAGGEDDON-MKA-1C-NEO-LED-BACKLIGHT-MECHANICAL-GAMING-KEYBOARD-61-KEY-HOT-SWAPABLE-min.png",
                    "stt": "active"
                }
            ],
            "categories": [4],
            "tags": [4, 5],
            "price": "150.00",
            "discount": null,
            "stock_status": "in"
        },
        {
            "pro_id": 5,
            "pro_name": "Wireless Gaming Mouse",
            "pro_sku": "WM-789",
            "pro_desc": "A high-precision wireless gaming mouse with adjustable DPI and ergonomic design.",
            "pro_images": [
                {
                    "img_id": 13,
                    "img": "https://i.rtings.com/assets/products/x4xvSa5x/razer-viper-v3-pro/design-small.jpg?format=auto",
                    "stt": "active"
                },
                {
                    "img_id": 14,
                    "img": "https://i.rtings.com/assets/products/e2RM2l2o/razer-viper-v3-pro/mouse-feet-small.jpg?format=auto",
                    "stt": "active"
                }
            ],
            "categories": [4],
            "tags": [4, 6],
            "price": "80.00",
            "discount": {
                "dis_price": "70.00",
                "dis_start": "2024-06-10",
                "dis_end": "2024-06-15"
            },
            "stock_status": "in"
        }
    ];

    return data;
}

export { getProductsByUserId }
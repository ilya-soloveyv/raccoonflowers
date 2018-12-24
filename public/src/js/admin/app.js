var bouquet = new Vue({
    el: '#app',
    data: {
        title: "Hello!",
        sizeTabActive: 0,
        sizes: [
            {
                id: '111',
                title: 'XS'
            },
            {
                id: '222',
                title: 'S'
            },
            {
                id: '333',
                title: 'M'
            },
            {
                id: '444',
                title: 'L'
            },
            {
                id: '555',
                title: 'XL'
            },
        ],
        bouquet: {
            id: "5c14035b162dcb376c4d1c1c",
            title: "Второй букет",
            uri: "vtoroi_buket",
            sizes: [
                {
                    "title": "XS",
                    "price": 1500,
                    "flowers": [
                        {
                            title: "Роза",
                            count: 3
                        }
                    ]
                },
                {
                    "title": "S",
                    "price": 2000,
                    "flowers": [
                        {
                            title: "Роза",
                            count: 5
                        },
                        {
                            title: "Лютик",
                            count: 1
                        }
                    ]
                },
                {
                    "title": "XL",
                    "price": 3500,
                    "flowers": [
                        {
                            title: "Роза",
                            count: 10
                        },
                        {
                            title: "Лютик",
                            count: 5
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        sizeTabUse: function (index) {
            Vue.set(bouquet, 'sizeTabActive', index)
        }
    }
})
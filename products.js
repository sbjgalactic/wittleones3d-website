const tagColors = {
    Bestseller: '#ffe7bc',
    New: '#5AC6C3',
    Limited: '#736CED',
    Bees: '#FDBB49',
    Nature: '#35964a',
    Interactable: '#71fcf7',
    Household: '#e9b712',
    Cute: '#ffa1c5',
    Farm: '#a4f376',
    Christmas: '#ff1f1f',
    Space: '#8e7dff',
    Spooky: '#ff8c42',
    Halloween: '#f2994a',
    Water: '#5bb8ff',
    Ocean: '#2f8fd8',
    Fire: '#ff5a3c',
    Flowers: '#ff8fd0',
    Summer: '#ffd84d',
    Beach: '#f5d79a',
    Jungle: '#2ea36b',
    Autumn: '#d9822b',
    Winter: '#a9dcff',
    Craft: '#c58bff',
    Relaxing: '#9fe0c8',
    Mushroom: '#e07a7a',
};


const products = [
    // MINIS
    { id: 'mini-1', category: 'minis', name: 'Mini Mushroom', price: 6.00 },

    // CRITTERS
    {
        id: 'critter-1',
        category: 'critters',
        image: './images/catalogue-items/critters/capybara-critter.png',
        name: 'Capybara',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/capybara-critter.png'
        ],
        tags: ['Cute', 'Bestseller'],
        description: 'lorem ipsum dolor sit amet.',
        details: [
            { label: 'Includes', value: '1 capybara' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Modeller', value: '3DGOB' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }, 
        ],
    },

    // HABITATS
    {
        id: 'habitat-1',
        category: 'habitats',
        image: './images/catalogue-items/habitats/bee-playset.png',
        name: 'Beehive Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/bee-playset.png',
            './images/catalogue-items/habitats/bee-playset2.png',
            './images/catalogue-items/habitats/bee-playset3.png',
        ],
        tags: ['Bees', 'Nature', 'Bestseller'],
        description: 'Watch out! These worker bees need a home and fast! Give them the perfect habitat with this bee-friendly design.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' },
        ]
    },
    {
        id: 'habitat-2',
        category: 'habitats',
        image: './images/catalogue-items/habitats/cat-playset.png',
        name: 'Cat Playset Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/cat-playset.png',
            './images/catalogue-items/habitats/cat-playset2.png',
            './images/catalogue-items/habitats/cat-playset3.png',
        ],
        tags: ['Household', 'Cute', 'Interactable'],
        description: 'Give your kitty crew the perfect playset habitat with this adorable design! Your feline friends will love the climbing posts, cozy hideaways and fun toys.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' },
        ]
    },
    {
        id: 'habitat-3',
        category: 'habitats',
        image: './images/catalogue-items/habitats/cow-playset.png',
        name: 'Country House Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/cow-playset.png',
            './images/catalogue-items/habitats/cow-playset2.png',
            './images/catalogue-items/habitats/cow-playset3.png',
        ],
        tags: ['Farm', 'Cute'],
        description: 'Transform your farm animals into a cozy home with this charming habitat design. Perfect for playtime and imaginative adventures.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' },
        ]
    },
    {
        id: 'habitat-5',
        category: 'habitats',
        image: './images/catalogue-items/habitats/alien-playset.png',
        name: 'Alien Abduction Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/alien-playset.png',
            './images/catalogue-items/habitats/alien-playset2.png',
            './images/catalogue-items/habitats/alien-playset3.png',
        ],
        tags: ['Space', 'Interactable', 'New'],
        description: 'Beam your tiny friends up into the stars! This playset features a hovering flying saucer and paranormal corn fields, perfect for out-of-this-world adventures.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' },
        ]
    },
    {
        id: 'habitat-6',
        category: 'habitats',
        image: './images/catalogue-items/habitats/duckybath-playset2.png',
        name: 'Bubble Bath Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/duckybath-playset.png',
            './images/catalogue-items/habitats/duckybath-playset2.png',
            './images/catalogue-items/habitats/duckybath-playset3.png',
        ],
        tags: ['Household', 'Water', 'Cute'],
        description: 'A bubbly bathtime scene complete with a cosy tub and rubber duck. Splash-free fun for your tiny friends to relax in.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' }
        ]
    },
    {
        id: 'habitat-7',
        category: 'habitats',
        image: './images/catalogue-items/habitats/firestation-playset.png',
        name: 'Firestation Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/firestation-playset.png',
            './images/catalogue-items/habitats/firestation-playset2.png',
            './images/catalogue-items/habitats/firestation-playset3.png',
        ],
        tags: ['Fire', 'Interactable', 'Bestseller'],
        description: 'Ready for action! This firestation playset has a ladder, a garage bay and everything needed for your tiny heroes to save the day.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' }
        ]
    },
    {
        id: 'habitat-8',
        category: 'habitats',
        image: './images/catalogue-items/habitats/flowergarden-playset2.png',
        name: 'Flower Garden Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/flowergarden-playset.png',
            './images/catalogue-items/habitats/flowergarden-playset2.png',
            './images/catalogue-items/habitats/flowergarden-playset3.png',
        ],
        tags: ['Flowers', 'Nature', 'Cute'],
        description: 'A blooming garden full of colourful flowers and winding paths. A peaceful little spot for your tiny friends to explore and relax.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' }
        ]
    },
    {
        id: 'habitat-9',
        category: 'habitats',
        image: './images/catalogue-items/habitats/ottersauna-playset.png',
        name: 'Sauna Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/ottersauna-playset.png',
            './images/catalogue-items/habitats/ottersauna-playset2.png',
            './images/catalogue-items/habitats/ottersauna-playset3.png',
        ],
        tags: ['Relaxing', 'Water', 'Cute'],
        description: 'Time to unwind! A snug wooden sauna with benches and a steamy stove, perfect for a relaxing soak with your tiny otter pals.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' }
        ]
    },
    {
        id: 'habitat-10',
        category: 'habitats',
        image: './images/catalogue-items/habitats/sandcastle-playset2.png',
        name: 'Sand Castle Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/sandcastle-playset.png',
            './images/catalogue-items/habitats/sandcastle-playset2.png',
            './images/catalogue-items/habitats/sandcastle-playset3.png',
        ],
        tags: ['Beach', 'Summer', 'New'],
        description: 'A sunny day at the beach in miniature form. Towers, shells and a little tower make this sand castle fit for royalty.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' }
        ]
    },
    {
        id: 'habitat-11',
        category: 'habitats',
        image: './images/catalogue-items/habitats/spooky-playset.png',
        name: 'Spooky Castle Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/spooky-playset.png',
            './images/catalogue-items/habitats/spooky-playset2.png',
            './images/catalogue-items/habitats/spooky-playset3.png',
        ],
        tags: ['Spooky', 'Halloween', 'Limited'],
        description: 'A haunted castle with creaky towers and devilish details. Not-so-scary frights await your tiny ghouls and goblins.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' }
        ]
    },
    {
        id: 'habitat-12',
        category: 'habitats',
        image: './images/catalogue-items/habitats/yarnstore-playset.png',
        name: 'Yarn Store Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/yarnstore-playset.png',
            './images/catalogue-items/habitats/yarnstore-playset2.png',
            './images/catalogue-items/habitats/yarnstore-playset3.png',
        ],
        tags: ['Craft', 'Household', 'Cute'],
        description: 'A cosy little shop stacked with miniature yarn balls and knitting supplies. A dream for your craftiest tiny friends.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' }
        ]
    },
    {
        id: 'habitat-13',
        category: 'habitats',
        image: './images/catalogue-items/habitats/jungle-playset2.png',
        name: 'Jungle Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/jungle-playset.png',
            './images/catalogue-items/habitats/jungle-playset2.png',
            './images/catalogue-items/habitats/jungle-playset3.png',
        ],
        tags: ['Jungle', 'Nature', 'Interactable'],
        description: 'Lush vines, towering leaves and plenty of hiding spots. Send your tiny explorers deep into the wild!',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'Fortis Filaments PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Colours', value: 'Dark Green, Light Green, Pink, Green and Brown' },
            { label: 'ETA', value: 'Printed to order, ships in 3-5 days' }
        ]
    },
    {
        id: 'habitat-14',
        category: 'habitats',
        image: './images/catalogue-items/habitats/watermelonresort-playset.png',
        name: 'Watermelon Resort Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/watermelonresort-playset.png',
            './images/catalogue-items/habitats/watermelonresort-playset2.png',
            './images/catalogue-items/habitats/watermelonresort-playset3.png',
        ],
        tags: ['Summer', 'Water', 'Cute', 'New'],
        description: 'A juicy holiday getaway! Lounge by the pool in a giant watermelon slice resort made for sunny tiny vacations.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' },
        ]
    },
    {
        id: 'habitat-15',
        category: 'habitats',
        image: './images/catalogue-items/habitats/arctic-playset.webp',
        name: 'Arctic Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/arctic-playset.webp',
            './images/catalogue-items/habitats/arctic-playset2.png',
            './images/catalogue-items/habitats/arctic-playset3.png',
        ],
        tags: ['Winter', 'Nature', 'Cute'],
        description: 'Icy cliffs, frozen lakes and your favourite furry friends. A chilly home for your tiny polar pals.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' }
        ]
    },
    {
        id: 'habitat-16',
        category: 'habitats',
        image: './images/catalogue-items/habitats/autumnforest-playset.png',
        name: 'Autumn Forest Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/autumnforest-playset.png',
            './images/catalogue-items/habitats/autumnforest-playset2.png',
            './images/catalogue-items/habitats/autumnforest-playset3.png',
        ],
        tags: ['Autumn', 'Nature', 'Relaxing'],
        description: 'A woodland scene alive with golden leaves and warm autumn colours. The perfect cosy retreat for your tiny forest dwellers.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' }
        ]
    },
    {
        id: 'habitat-17',
        category: 'habitats',
        image: './images/catalogue-items/habitats/mushroom-playset.webp',
        name: 'Mushroom Stump Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/mushroom-playset.webp',
        ],
        tags: ['Mushroom', 'Nature', 'Cute', 'Bestseller'],
        description: 'A set of 3 tree stumps perfect when topped with toadstools and tiny doors to discover. A fairytale home for your smallest friends.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' }
        ]
    },
    {
        id: 'habitat-18',
        category: 'habitats',
        image: './images/catalogue-items/habitats/deepsea-playset.png',
        name: 'Deep Sea Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/deepsea-playset.png',
            './images/catalogue-items/habitats/deepsea-playset2.png',
            './images/catalogue-items/habitats/deepsea-playset3.png',
        ],
        tags: ['Ocean', 'Water', 'Interactable'],
        description: 'Dive down into the deep with coral, treasure and mysterious anchors. An underwater adventure for your bravest tiny divers.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' }
        ]
    },
    {
        id: 'habitat-19',
        category: 'habitats',
        image: './images/catalogue-items/habitats/aquarium-playset.png',
        name: 'Aquarium Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/aquarium-playset.png',
            './images/catalogue-items/habitats/aquarium-playset2.png',
            './images/catalogue-items/habitats/aquarium-playset3.png',
        ],
        tags: ['Ocean', 'Water', 'Household', 'Cute'],
        description: 'A little tank filled with plants, rocks and plenty of room to swim. A sweet home for your tiny aquatic friends.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'Fortis Filaments PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' }
        ]
    },



    // FIDGETS
    { id: 'fidget-1', category: 'fidgets', name: 'Infinity Cube', price: 9.00 },

    
    // CHRISTMAS SECTION

    // gingerbread house card set
    {
        id: 'christmas-1',
        category: 'christmas',
        image: './images/catalogue-items/christmas/gingerbread-house.png',
        name: 'Gingerbread House Card Set',
        price: 2.50,
        images: [
            './images/catalogue-items/christmas/gingerbread-house.png',
            './images/catalogue-items/christmas/gingerbread-house2.webp',
            './images/catalogue-items/christmas/gingerbread-house3.webp',
        ],
        description: 'A card sized christmas gift that attaches into a 3d gingerbread house! Perfect for small gifts or gift cards, and a cute decoration for your tiny friends to enjoy during the holiday season.',
        tags: ['Christmas', 'Craft','Interactable'],
        details: [
            { label: 'Includes', value: 'One Gingerbread House Card' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Modeller', value: 'NAKOZEN on MakerWorld' },
        ],
        options: [
        {
            name: 'Colour',
            choices: [
                { label: 'Blue', color: '#49c4fd' },
                { label: 'Red',   color: '#ff3131' },
                { label: 'Brown', color: '#8B4513' },
                { label: 'Pink',   color: '#ff92e4' },
            ]
        }
        ],
    },
    // christmas house playset
    {
        id: 'christmas-2',
        category: 'christmas',
        image: './images/catalogue-items/habitats/sausagedog-playset2.png',
        name: 'Cozy Christmas Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/sausagedog-playset.png',
            './images/catalogue-items/habitats/sausagedog-playset2.png',
            './images/catalogue-items/habitats/sausagedog-playset3.png',
        ],
        tags: ['Christmas', 'Household', 'Bestseller', 'Cute'],
        description: "It's the season of giving! Give your tiny friends a festive makeover with this Cozy Christmas Habitat!",
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' },
        ]
    },
    // gingerbread critter
    {
        id: 'christmas-3',
        category: 'christmas',
        image: './images/catalogue-items/christmas/gingerbread-critter.png',
        name: 'Gingerbread Critter',
        price: 5.00,
        images: [
            './images/catalogue-items/christmas/gingerbread-critter.png',
        ],
        tags: ['Christmas', 'Bestseller', 'Cute'],
        description: "A cute, tasty gingerbread critter straight from the oven! Perfect for your tiny friends to enjoy during the holiday season.",
        details: [
            { label: 'Includes', value: '1 of either gender' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' },
        ],
        options: [
        {
            name: 'Gender',
            choices: [
                { label: 'Male', color: '#49c4fd' },
                { label: 'Female',   color: '#ff92e4' },
            ]
        }, {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }, {
            name: 'Candy Cane',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }
        ],
    },
    // reindeer dragon critter
    {
        id: 'christmas-4',
        category: 'christmas',
        image: './images/catalogue-items/christmas/reindeerdragon-critter.png',
        name: 'Reindeer Dragon Critter',
        price: 5.00,
        images: [
            './images/catalogue-items/christmas/reindeerdragon-critter.png',
            './images/catalogue-items/christmas/reindeerdragon-critter2.png',
            './images/catalogue-items/christmas/reindeerdragon-critter3.png',
        ],
        tags: ['Christmas', 'Cute'],
        description: "A festive reindeer dragon critter ready to spread holiday cheer! Perfect for your tiny friends to enjoy during the holiday season.",
        details: [
            { label: 'Includes', value: 'Critter only' },
            { label: 'Material', value: 'Fortis Filaments PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' },
        ]
    },
    // santa critter
    {
        id: 'christmas-5',
        category: 'christmas',
        image: './images/catalogue-items/christmas/santa-critter.png',
        name: 'Santa Critter',
        price: 5.00,
        images: [
            './images/catalogue-items/christmas/santa-critter.png',
        ],
        tags: ['Christmas', 'Bestseller', 'Cute'],
        description: "Ho ho ho! A jolly Santa critter ready to deliver holiday cheer! Perfect for your tiny friends to enjoy during the holiday season.",
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' },
        ]
    },
    // reindeer critter
    {
        id: 'christmas-6',
        category: 'christmas',
        image: './images/catalogue-items/christmas/reindeer-critter.png',
        name: 'Reindeer Critter',
        price: 5.00,
        images: [
            './images/catalogue-items/christmas/reindeer-critter.png',
            './images/catalogue-items/christmas/reindeer-critter2.png',
            './images/catalogue-items/christmas/reindeer-critter3.png',
        ],
        tags: ['Christmas', 'Winter', 'Cute'],
        description: "Is it dasher or prancer or vixen? Maybe even rudolph! This festive reindeer critter is ready to spread holiday cheer! Perfect for your tiny friends to enjoy during the holiday season.",
        details: [
            { label: 'Includes', value: '1 reindeer critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' },
        ]
    },
    // christmas sausage dog
    {
        id: 'christmas-7',
        category: 'christmas',
        image: './images/catalogue-items/habitats/sausagedog-playset.png',
        name: 'Christmas Sausage Dog Critter',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/sausagedog-playset.png',
            './images/catalogue-items/christmas/sausage-dog.png',
            './images/catalogue-items/habitats/sausagedog-playset3.png',
        ],
        tags: ['Christmas', 'Household', 'Bestseller', 'Cute'],
        description: "It's the season of giving! Give your tiny friends a festive makeover with this Cozy Christmas Habitat!",
        details: [
            { label: 'Includes', value: 'Critter only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Modeller', value: '3DGOB' },
        ],

         options: [
        {
            name: 'Santa Hat',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }, {
            name: 'Jacket',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }, {
            name: 'Fluffy',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        ],
    },
];
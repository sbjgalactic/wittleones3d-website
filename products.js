const tagColors = {
    Bestseller: '#ffe7bc',
    New: '#5AC6C3',
    Limited: '#736CED',
    Bees: '#FDBB49',
    Nature: '#35964a',
};

const products = [
    // MINIS
    { id: 'mini-1', category: 'minis', name: 'Mini Mushroom', price: 6.00 },
    { id: 'mini-2', category: 'minis', name: 'Mini Cactus', price: 6.00 },
    { id: 'mini-3', category: 'minis', name: 'Mini Teacup', price: 7.50 },
    { id: 'mini-4', category: 'minis', name: 'Mini Pumpkin', price: 6.50 },
    { id: 'mini-5', category: 'minis', name: 'Mini Snowman', price: 7.00 },

    // CRITTERS
    { id: 'critter-1', category: 'critters', name: 'Articulated Dragon', price: 18.00 },
    { id: 'critter-2', category: 'critters', name: 'Flexi Axolotl', price: 14.00 },
    { id: 'critter-3', category: 'critters', name: 'Baby Octopus', price: 12.00 },
    { id: 'critter-4', category: 'critters', name: 'Sleepy Cat', price: 10.00 },

    // HABITATS
    {
        id: 'habitat-1',
        category: 'habitats',
        image: './images/catalogue-items/habitats/bee-playset.png',
        name: 'Beehive Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/bee-playset.png',
            './images/placeholder.png',
            './images/placeholder.png',
        ],
        tags: ['Bees', 'Nature', 'Bestseller'],
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc eget nunc. Sed euismod, nisl nec tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc eget nunc.',
        details: [
            { label: 'Includes', value: 'Beehive only' },
            { label: 'Material', value: 'Fortis Filaments PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Colours', value: 'Yellow, Brown and White' },
            { label: 'ETA', value: 'Printed to order, ships in 3-5 days' }
        ]
    },
    { id: 'habitat-2', category: 'habitats', image: './images/catalogue-items/habitats/cat-playset.png', name: 'Cat Playset Habitat', price: 35.00 },
    { id: 'habitat-3', category: 'habitats', image: './images/catalogue-items/habitats/cow-playset.png', name: 'Country House Habitat', price: 35.00 },
    { id: 'habitat-4', category: 'habitats', image: './images/catalogue-items/habitats/sausagedog-playset.png', name: 'Cozy Christmas Habitat', price: 35.00 },
    { id: 'habitat-5', category: 'habitats', image: './images/catalogue-items/habitats/alien-playset.png', name: 'Alien Abduction Habitat', price: 35.00 },
    { id: 'habitat-6', category: 'habitats', image: './images/catalogue-items/habitats/duckybath-playset.png', name: 'Bubble Bath Habitat', price: 35.00 },
    { id: 'habitat-7', category: 'habitats', image: './images/catalogue-items/habitats/firestation-playset.png', name: 'Firestation Habitat', price: 35.00 },
    { id: 'habitat-8', category: 'habitats', image: './images/catalogue-items/habitats/flowergarden-playset.png', name: 'Flower Garden Habitat', price: 35.00 },
    { id: 'habitat-9', category: 'habitats', image: './images/catalogue-items/habitats/ottersauna-playset.png', name: 'Sauna Habitat', price: 35.00 },
    { id: 'habitat-10', category: 'habitats', image: './images/catalogue-items/habitats/sandcastle-playset.png', name: 'Sand Castle Habitat', price: 35.00 },
    { id: 'habitat-11', category: 'habitats', image: './images/catalogue-items/habitats/spooky-playset.png', name: 'Spooky Castle Habitat', price: 35.00 },
    { id: 'habitat-12', category: 'habitats', image: './images/catalogue-items/habitats/yarnstore-playset.png', name: 'Yarn Store Habitat', price: 35.00 },
    { id: 'habitat-13', category: 'habitats', image: './images/catalogue-items/habitats/jungle-playset.png', name: 'Jungle Habitat', price: 35.00 },
    { id: 'habitat-14', category: 'habitats', image: './images/catalogue-items/habitats/watermelonresort-playset.png', name: 'Watermelon Resort Habitat', price: 35.00 },
    { id: 'habitat-15', category: 'habitats', image: './images/catalogue-items/habitats/arctic-playset.webp', name: 'Arctic Habitat', price: 35.00 },
    { id: 'habitat-16', category: 'habitats', image: './images/catalogue-items/habitats/autumnforest-playset.png', name: 'Autumn Forest Habitat', price: 35.00 },
    { id: 'habitat-17', category: 'habitats', image: './images/catalogue-items/habitats/mushroom-playset.webp', name: 'Mushroom Stump Habitat', price: 35.00 },
    { id: 'habitat-18', category: 'habitats', image: './images/catalogue-items/habitats/deepsea-playset.png', name: 'Deep Sea Habitat', price: 35.00 },
    { id: 'habitat-19', category: 'habitats', image: './images/catalogue-items/habitats/aquarium-playset.png', name: 'Aquarium Habitat', price: 35.00 },


    // FIDGETS
    { id: 'fidget-1', category: 'fidgets', name: 'Infinity Cube', price: 9.00 },
    { id: 'fidget-2', category: 'fidgets', name: 'Spinner Ring', price: 8.00 },
    { id: 'fidget-3', category: 'fidgets', name: 'Click Slider', price: 11.00 },
    { id: 'fidget-4', category: 'fidgets', name: 'Twist Snake', price: 10.00 },

    // CHRISTMAS
    {
        id: 'christmas-1',
        category: 'christmas',
        image: './images/catalogue-items/christmas/gingerbread-house.png',
        name: 'Gingerbread House Card Set',
        price: 2.50,
        images: [
            './images/catalogue-items/christmas/gingerbread-house.png',
            './images/placeholder.png',
            './images/placeholder.png',
        ],
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc eget nunc. Sed euismod, nisl nec tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc eget nunc.',
        details: [
            { label: 'Includes', value: 'One Gingerbread House Card' },
            { label: 'Material', value: 'Fortis Filaments PLA Pro and Matte' },
            { label: 'Size', value: 'idk' },
            { label: 'Colours', value: 'Choice of Brown, Red, Blue or Pink' },
            { label: 'ETA', value: 'Printed to order, ships in 1 day' }
        ]
    },
    { id: 'christmas-2', category: 'christmas', name: 'christmas Name Plate', price: 15.00 },
    { id: 'christmas-3', category: 'christmas', name: 'christmas Figurine', price: 35.00 },
    { id: 'christmas-4', category: 'christmas', name: 'christmas Request', price: 20.00 }
];
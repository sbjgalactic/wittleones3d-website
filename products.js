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
    Australian: '#ffb84d',
    Pets: '#ffb199',
    Wildlife: '#8fcf6b',
    Dinosaur: '#7ccf5a',
    Fantasy: '#d9a7ff',
    Bugs: '#c6d94a',
    Mini: '#ffd1e8',
    Fidget: '#7fd1ff',
    Keychain: '#f7a8c9',
    Customisable: '#b9a4ff',
};


const products = [
    // MINIS
    {
        id: 'mini-1',
        category: 'minis',
        image: './images/catalogue-items/minis/mini-croc.webp',
        name: 'Mini Crocodile',
        price: 3.00,
        images: [
            './images/catalogue-items/minis/mini-croc.webp'
        ],
        tags: ['Mini', 'Wildlife', 'Water'],
        description: 'A teeny crocodile with a big toothy grin! Small enough to sit on your desk, keyboard or windowsill and keep you company.',
        details: [
            { label: 'Includes', value: '1 mini crocodile' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },
    {
        id: 'mini-2',
        category: 'minis',
        image: './images/catalogue-items/minis/mini-stego.webp',
        name: 'Mini Stegosaurus',
        price: 3.00,
        images: [
            './images/catalogue-items/minis/mini-stego.webp'
        ],
        tags: ['Mini', 'Dinosaur'],
        description: 'A pocket-sized stegosaurus with a row of chunky back plates. Prehistoric, but very much up to date on cuteness.',
        details: [
            { label: 'Includes', value: '1 mini stegosaurus' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },
    {
        id: 'mini-3',
        category: 'minis',
        image: './images/catalogue-items/minis/mini-squirrel.webp',
        name: 'Mini Squirrel',
        price: 3.00,
        images: [
            './images/catalogue-items/minis/mini-squirrel.webp'
        ],
        tags: ['Mini', 'Wildlife', 'Nature'],
        description: 'A bushy-tailed little squirrel, always on the hunt for the next acorn. Tiny, speedy and full of beans.',
        details: [
            { label: 'Includes', value: '1 mini squirrel' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },
    {
        id: 'mini-4',
        category: 'minis',
        image: './images/catalogue-items/minis/mini-shark.webp',
        name: 'Mini Shark',
        price: 3.00,
        images: [
            './images/catalogue-items/minis/mini-shark.webp'
        ],
        tags: ['Mini', 'Ocean', 'Water'],
        description: 'Baby shark, doo doo! This mini shark is all smiles and no bite, ready to cruise around your shelf.',
        details: [
            { label: 'Includes', value: '1 mini shark' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },
    {
        id: 'mini-5',
        category: 'minis',
        image: './images/catalogue-items/minis/mini-fox.webp',
        name: 'Mini Fox',
        price: 3.00,
        images: [
            './images/catalogue-items/minis/mini-fox.webp'
        ],
        tags: ['Mini', 'Wildlife', 'Nature'],
        description: 'A clever little fox with a fluffy tail and a sly smile. Small in size, big on charm.',
        details: [
            { label: 'Includes', value: '1 mini fox' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },
    {
        id: 'mini-6',
        category: 'minis',
        image: './images/catalogue-items/minis/mini-bee.webp',
        name: 'Mini Bee',
        price: 3.00,
        images: [
            './images/catalogue-items/minis/mini-bee.webp'
        ],
        tags: ['Mini', 'Bees', 'Bugs', 'Nature'],
        description: 'A busy little bee, buzzing in at mini size. Pairs perfectly with the Beehive Habitat and its bigger bee friends.',
        details: [
            { label: 'Includes', value: '1 mini bee' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },
    {
        id: 'mini-7',
        category: 'minis',
        image: './images/catalogue-items/minis/mini-elephant.webp',
        name: 'Mini Elephant',
        price: 3.00,
        images: [
            './images/catalogue-items/minis/mini-elephant.webp'
        ],
        tags: ['Mini', 'Wildlife'],
        description: 'A tiny elephant with big floppy ears and a curly trunk. Proof that the best things come in small packages.',
        details: [
            { label: 'Includes', value: '1 mini elephant' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },
    {
        id: 'mini-8',
        category: 'minis',
        image: './images/catalogue-items/minis/mini-duck.webp',
        name: 'Mini Duck',
        price: 3.00,
        images: [
            './images/catalogue-items/minis/mini-duck.webp'
        ],
        tags: ['Mini', 'Water', 'Nature'],
        description: 'A dinky little duck ready to waddle into your collection. Quack-tastic on a desk, shelf or dashboard.',
        details: [
            { label: 'Includes', value: '1 mini duck' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },
    {
        id: 'mini-9',
        category: 'minis',
        image: './images/catalogue-items/minis/mini-dolphin.webp',
        name: 'Mini Dolphin',
        price: 3.00,
        images: [
            './images/catalogue-items/minis/mini-dolphin.webp'
        ],
        tags: ['Mini', 'Ocean', 'Water'],
        description: 'A mini dolphin mid-leap with a happy little smile. Brings a splash of the ocean wherever you put it.',
        details: [
            { label: 'Includes', value: '1 mini dolphin' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },
    {
        id: 'mini-10',
        category: 'minis',
        image: './images/catalogue-items/minis/mini-axolotl.webp',
        name: 'Mini Axolotl',
        price: 3.00,
        images: [
            './images/catalogue-items/minis/mini-axolotl.webp'
        ],
        tags: ['Mini', 'Water', 'Wildlife'],
        description: 'A tiny frilly axolotl with the sweetest smile. All the charm of our axolotl critter, shrunk down to mini size.',
        details: [
            { label: 'Includes', value: '1 mini axolotl' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },
    {
        id: 'mini-11',
        category: 'minis',
        image: './images/catalogue-items/minis/mini-bunny.webp',
        name: 'Mini Bunny',
        price: 3.00,
        images: [
            './images/catalogue-items/minis/mini-bunny.webp'
        ],
        tags: ['Mini', 'Pets', 'Nature'],
        description: 'A little bunny with long ears and a fluffy tail, hopping straight into your heart. Soft-looking, sweet and tiny.',
        details: [
            { label: 'Includes', value: '1 mini bunny' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },


    // CRITTERS
    {
        id: 'critter-1',
        category: 'critters',
        image: './images/catalogue-items/critters/capybara-critter.webp',
        name: 'Capybara',
        price: 5.00,
        badge: 'Bestseller ⭐',
        badgeColor: '#FDBB49',
        images: [
            './images/catalogue-items/critters/capybara-critter.webp'
        ],
        tags: ['Wildlife', 'Water', 'Relaxing', 'Bestseller', 'Keychain'],
        description: 'The world\'s most relaxed critter! This chilled-out capybara is ready to lounge with your tiny friends, no worries in sight.',
        details: [
            { label: 'Includes', value: '1 capybara' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
    {
        id: 'critter-2',
        category: 'critters',
        image: './images/catalogue-items/critters/beagle-critter.webp',
        name: 'Beagle',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/beagle-critter.webp',
            './images/catalogue-items/critters/beagle-critter2.webp',
            './images/catalogue-items/critters/beagle-critter3.webp'
        ],
        tags: ['Pets', 'Bestseller', 'Keychain'],
        description: 'A floppy-eared beagle with a nose for adventure! Loyal, curious and always sniffing out the next snack.',
        details: [
            { label: 'Includes', value: '1 beagle critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
    {
        id: 'critter-3',
        category: 'critters',
        image: './images/catalogue-items/critters/axolotl-critter.webp',
        name: 'Axolotl',
        price: 5.00,
        badge: 'Bestseller ⭐',
        badgeColor: '#FDBB49',
        images: [
            './images/catalogue-items/critters/axolotl-critter.webp',
            './images/catalogue-items/critters/axolotl-critter2.webp',
            './images/catalogue-items/critters/axolotl-critter3.webp'
        ],
        tags: ['Water', 'Wildlife', 'Bestseller', 'Keychain', 'Customisable'],
        description: 'Smiley, frilly and impossible not to love! This axolotl comes in four bright colours, so pick your favourite swimming buddy.',
        details: [
            { label: 'Includes', value: '1 axolotl critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        {
            name: 'Colour',
            choices: [
                { label: 'Pink', color: '#ff54f1' },
                { label: 'Blue',   color: '#49b5fd' },
                { label: 'Green',   color: '#49fd70' },
                { label: 'Yellow',   color: '#ffeb3b' },
            ]
        },  
        ],
    },
    {
        id: 'critter-4',
        category: 'critters',
        image: './images/catalogue-items/critters/corgi-critter.webp',
        name: 'Corgi',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/corgi-critter.webp',
            './images/catalogue-items/critters/corgi-critter2.webp',
            './images/catalogue-items/critters/corgi-critter3.webp'
        ],
        tags: ['Pets', 'Bestseller', 'Keychain'],
        description: 'Short legs, big personality! This fluffy-bottomed corgi is ready to trot into your collection.',
        details: [
            { label: 'Includes', value: '1 corgi critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
    {
        id: 'critter-5',
        category: 'critters',
        image: './images/catalogue-items/critters/kangaroo-critter.webp',
        name: 'Kangaroo',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/kangaroo-critter.webp',
            './images/catalogue-items/critters/kangaroo-critter2.webp',
            './images/catalogue-items/critters/kangaroo-critter3.webp'
        ],
        tags: ['Australian', 'Wildlife', 'Keychain', 'Customisable'],
        description: 'G\'day mate! A bouncy kangaroo straight from the outback. Add an optional joey pouch to carry a tiny passenger.',
        details: [
            { label: 'Includes', value: '1 kangaroo critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        {
            name: 'Joey Pouch',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        ],
    },
    {
        id: 'critter-6',
        category: 'critters',
        image: './images/catalogue-items/critters/panda-critter.webp',
        name: 'Panda',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/panda-critter.webp',
            './images/catalogue-items/critters/panda-critter2.webp',
            './images/catalogue-items/critters/panda-critter3.webp'
        ],
        tags: ['Wildlife', 'Keychain', 'Customisable'],
        description: 'A cuddly black and white panda who loves a good snack. Add a bamboo stalk for the ultimate munching session.',
        details: [
            { label: 'Includes', value: '1 panda critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        {
            name: 'Bamboo',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        ],
    },
    {
        id: 'critter-7',
        category: 'critters',
        image: './images/catalogue-items/critters/peacock-critter.webp',
        name: 'Peacock',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/peacock-critter.webp',
            './images/catalogue-items/critters/peacock-critter2.webp',
            './images/catalogue-items/critters/peacock-critter3.webp'
        ],
        tags: ['Wildlife', 'Keychain'],
        description: 'Show-off alert! This proud peacock is ready to flaunt its magnificent tail feathers for your tiny friends.',
        details: [
            { label: 'Includes', value: '1 peacock critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
    {
        id: 'critter-8',
        category: 'critters',
        image: [
            './images/catalogue-items/critters/pet-carrier.webp',
            './images/catalogue-items/critters/pet-carrier2.webp',
            './images/catalogue-items/critters/pet-carrier3.webp'
        ],
        name: 'Pet Carrier',
        price: 8.00,
        images: [
            './images/catalogue-items/critters/pet-carrier.webp',
            './images/catalogue-items/critters/pet-carrier2.webp',
            './images/catalogue-items/critters/pet-carrier3.webp'
        ],
        tags: ['Pets', 'Household', 'Customisable'],
        description: 'Take your tiny pets on the go with this cute little carrier! Available in a whole rainbow of colours.',
        details: [
            { label: 'Includes', value: '1 pet carrier' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Colour',
            choices: [
                { label: 'Red', color: '#fd4949' },
                { label: 'Orange',   color: '#ff8c00' },
                { label: 'Yellow',   color: '#ffff00' },
                { label: 'Green',   color: '#00ff00' },
                { label: 'Blue',   color: '#2cc3ff' },
                { label: 'Pink',   color: '#ffc0cb' },
                { label: 'Purple',   color: '#b900b9' },
            ]
        },
        ],
    },
    {
        id: 'critter-9',
        category: 'critters',
        image: './images/catalogue-items/critters/raccoon-critter.webp',
        name: 'Raccoon',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/raccoon-critter.webp',
            './images/catalogue-items/critters/raccoon-critter2.webp',
            './images/catalogue-items/critters/raccoon-critter3.webp'
        ],
        tags: ['Wildlife', 'Keychain'],
        description: 'A mischievous little bandit with a masked face and sticky paws. Keep an eye on your snacks!',
        details: [
            { label: 'Includes', value: '1 raccoon critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
    {
        id: 'critter-44',
        category: 'critters',
        image: './images/catalogue-items/critters/turtle-critter.webp',
        name: 'Turtle',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/turtle-critter.webp',
            './images/catalogue-items/critters/turtle-critter2.webp',
            './images/catalogue-items/critters/turtle-critter3.webp'
        ],
        tags: ['Water', 'Wildlife', 'Relaxing', 'Keychain'],
        description: 'Slow and steady wins the race! This sweet turtle takes life at its own pace and carries its home on its back.',
        details: [
            { label: 'Includes', value: '1 turtle critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
    {
        id: 'critter-10',
        category: 'critters',
        image: './images/catalogue-items/critters/sheep-critter.webp',
        name: 'Sheep',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/sheep-critter.webp',
            './images/catalogue-items/critters/sheep-critter2.webp',
            './images/catalogue-items/critters/sheep-critter3.webp'
        ],
        tags: ['Farm', 'Keychain', 'Customisable'],
        description: 'Baa-rilliant! A woolly sheep ready to join the flock. Dress it up with an optional bowtie for a dapper look.',
        details: [
            { label: 'Includes', value: '1 sheep critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        {
            name: 'Bowtie',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        ],
    },
    {
        id: 'critter-11',
        category: 'critters',
        image: './images/catalogue-items/critters/trex-critter.webp',
        name: 'T-Rex',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/trex-critter.webp',
            './images/catalogue-items/critters/trex-critter2.webp',
            './images/catalogue-items/critters/trex-critter3.webp'
        ],
        tags: ['Dinosaur', 'Keychain', 'Customisable'],
        description: 'Tiny arms, huge attitude! This pint-sized T-Rex is ready to stomp into your collection in a rainbow of colours.',
        details: [
            { label: 'Includes', value: '1 t-rex critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        {
            name: 'Colour',
            choices: [
                { label: 'Red', color: '#fd4949' },
                { label: 'Orange',   color: '#ff8c00' },
                { label: 'Yellow',   color: '#ffff00' },
                { label: 'Green',   color: '#00ff00' },
                { label: 'Blue',   color: '#2cc3ff' },
                { label: 'Pink',   color: '#ffc0cb' },
                { label: 'Purple',   color: '#b900b9' },
            ]
        },
        ],
    },
    {
        id: 'critter-12',
        category: 'critters',
        image: [
            './images/catalogue-items/critters/mushroom-critter.webp',
            './images/catalogue-items/critters/mushroom-critter2.webp',
            './images/catalogue-items/critters/mushroom-critter3.webp',
            './images/catalogue-items/critters/mushroom-critter4.webp',
            './images/catalogue-items/critters/mushroom-critter5.webp'
        ],
        name: 'Mushroom',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/mushroom-critter.webp',
            './images/catalogue-items/critters/mushroom-critter2.webp',
            './images/catalogue-items/critters/mushroom-critter3.webp',
            './images/catalogue-items/critters/mushroom-critter4.webp',
            './images/catalogue-items/critters/mushroom-critter5.webp'
        ],
        tags: ['Mushroom', 'Nature', 'Customisable'],
        description: 'A friendly little fungi critter that looks good enough to... admire! Choose from yellow, pink, brown or tall brown.',
        details: [
            { label: 'Includes', value: '1 mushroom critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Kind',
            choices: [
                { label: 'Yellow',   color: '#ffff00' },
                { label: 'Pink',   color: '#ffc0cb' },
                { label: 'Brown', color: '#704d01' },
                { label: 'Tall Brown',   color: '#704d01' },
            ]
        },
        ],
    },
    {
        id: 'critter-13',
        category: 'critters',
        image: './images/catalogue-items/critters/husky-critter.webp',
        name: 'Husky',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/husky-critter.webp',
            './images/catalogue-items/critters/husky-critter2.webp',
        ],
        tags: ['Pets', 'Winter', 'Keychain'],
        description: 'A fluffy husky with icy eyes and a whole lot of energy. Always ready for a snowy adventure!',
        details: [
            { label: 'Includes', value: '1 husky critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
    {
        id: 'critter-14',
        category: 'critters',
        image: './images/catalogue-items/critters/explorer-critter.webp',
        name: 'Explorer',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/explorer-critter.webp',
            './images/catalogue-items/critters/husky-critter2.webp',
        ],
        tags: ['Nature', 'Jungle', 'Keychain'],
        description: 'Adventure awaits! This little explorer is kitted out and ready to discover new places with your tiny friends.',
        details: [
            { label: 'Includes', value: '1 explorer critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
    {
        id: 'critter-15',
        category: 'critters',
        image: [
            './images/catalogue-items/critters/snake-critter.webp',
            './images/catalogue-items/critters/snake-critter2.webp',
            './images/catalogue-items/critters/snake-critter3.webp',
        ],
        name: 'Snake',
        price: 12.50,
        images: [
            './images/catalogue-items/critters/snake-critter.webp',
            './images/catalogue-items/critters/snake-critter2.webp',
            './images/catalogue-items/critters/snake-critter3.webp',
        ],
        tags: ['Wildlife', 'Jungle', 'Customisable'],
        description: 'A friendly, wiggly snake with no bite at all! Choose from three colourful patterns.',
        details: [
            { label: 'Includes', value: '1 snake critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Colour',
            choices: [
                { label: 'Orange & White', color: '#fda949' },
                { label: 'Green & Yellow', color: '#5aff31' },
                { label: 'Blue & Orange', color: '#319bff' },
            ]
        },
        ],
    },
    {
        id: 'critter-16',
        category: 'critters',
        image: './images/catalogue-items/critters/hippo-critter.webp',
        name: 'Hippo',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/hippo-critter.webp',
            './images/catalogue-items/critters/hippo-critter2.webp',
            './images/catalogue-items/critters/hippo-critter3.webp',
        ],
        tags: ['Wildlife', 'Water', 'Keychain'],
        description: 'Big, round and adorable! This happy hippo loves a good wade in the water.',
        details: [
            { label: 'Includes', value: '1 hippo critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
    {
        id: 'critter-17',
        category: 'critters',
        image: './images/catalogue-items/critters/dalmatian-critter.webp',
        name: 'Dalmatian',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/dalmatian-critter.webp',
            './images/catalogue-items/critters/dalmatian-critter2.webp',
        ],
        tags: ['Pets', 'Fire', 'Keychain', 'Customisable'],
        description: 'Spotted and sensational! This dalmatian can be a classic pup or a brave fireman, ready for action.',
        details: [
            { label: 'Includes', value: '1 dalmatian critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        {
            name: 'Style',
            choices: [
                { label: 'Default', color: '#fdfffd' },
                { label: 'Fireman',   color: '#ff3131' },
            ]
        },
        ],
    },
    {
        id: 'critter-18',
        category: 'critters',
        image: './images/catalogue-items/critters/cow-critter.webp',
        name: 'Cow',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/cow-critter.webp',
            './images/catalogue-items/critters/cow-critter2.webp',
        ],
        tags: ['Farm', 'Keychain', 'Customisable'],
        description: 'Moo-ve over, everyone! A cheerful cow available as a classic spotted style or a shaggy Highland cow.',
        details: [
            { label: 'Includes', value: '1 cow critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        {
            name: 'Style',
            choices: [
                { label: 'Default', color: '#fdfffd' },
                { label: 'Highland',   color: '#855600' },
            ]
        },
        ],
    },
    {
        id: 'critter-19',
        category: 'critters',
        image: './images/catalogue-items/critters/dracula-critter.webp',
        name: 'Dracula',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/dracula-critter.webp',
            './images/catalogue-items/critters/dracula-critter2.webp',
        ],
        tags: ['Spooky', 'Halloween', 'Keychain', 'Customisable'],
        description: 'Not-so-scary Count Dracula! This little vampire loves a spooky night. Add the optional coat for extra drama.',
        details: [
            { label: 'Includes', value: '1 dracula critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },{
            name: 'Coat',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },]
    },
    {
        id: 'critter-20',
        category: 'critters',
        image: './images/catalogue-items/critters/alpaca-critter.webp',
        name: 'Alpaca',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/alpaca-critter.webp',
            './images/catalogue-items/critters/alpaca-critter2.webp',
            './images/catalogue-items/critters/alpaca-critter3.webp',
        ],
        tags: ['Farm', 'Keychain', 'Customisable'],
        description: 'Fluffy, curious and just a little bit sassy! This alpaca comes in tan or brown.',
        details: [
            { label: 'Includes', value: '1 alpaca critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },{
            name: 'Colour',
            choices: [
                { label: 'Tan', color: '#ffc16f' },
                { label: 'Brown',   color: '#c46f00' },
            ]
        },]
    },
    {
        id: 'critter-21',
        category: 'critters',
        image: './images/catalogue-items/critters/manatee-critter.webp',
        name: 'Manatee',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/manatee-critter.webp',
            './images/catalogue-items/critters/manatee-critter2.webp',
            './images/catalogue-items/critters/manatee-critter3.webp',
        ],
        tags: ['Ocean', 'Water', 'Summer', 'Keychain', 'Customisable'],
        description: 'A gentle sea cow who loves floating about all day. Choose the classic look or a fun swimwear style!',
        details: [
            { label: 'Includes', value: '1 manatee critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },{
            name: 'Style',
            choices: [
                { label: 'Default', color: '#fffefd' },
                { label: 'Swimwear',   color: '#ff8420' },
            ]
        },]
    },
    {
        id: 'critter-22',
        category: 'critters',
        image: './images/catalogue-items/critters/rubberduck-critter.webp',
        name: 'Rubber Duck',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/rubberduck-critter.webp',
            './images/catalogue-items/critters/rubberduck-critter2.webp',
            './images/catalogue-items/critters/rubberduck-critter3.webp',
        ],
        tags: ['Household', 'Water', 'Keychain'],
        description: 'Squeaky clean fun! A classic rubber duck that is ready to bob about at bath time.',
        details: [
            { label: 'Includes', value: '1 rubber duck critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-23',
        category: 'critters',
        image: './images/catalogue-items/critters/aushepherd-critter.webp',
        name: 'Aussie Shepherd',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/aushepherd-critter.webp',
            './images/catalogue-items/critters/aushepherd-critter2.webp',
            './images/catalogue-items/critters/aushepherd-critter3.webp',
        ],
        tags: ['Pets', 'Farm', 'Keychain'],
        description: 'A smart, fluffy and loyal Aussie shepherd with a gorgeous coat. Always up for a game of fetch!',
        details: [
            { label: 'Includes', value: '1 aussie shepherd critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-24',
        category: 'critters',
        image: './images/catalogue-items/critters/crab-critter2.webp',
        name: 'Crab',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/crab-critter.webp',
            './images/catalogue-items/critters/crab-critter2.webp',
            './images/catalogue-items/critters/crab-critter3.webp',
        ],
        tags: ['Ocean', 'Beach', 'Summer', 'Keychain'],
        description: 'Snip snip! This sideways-scuttling crab is ready to hit the beach with your tiny friends.',
        details: [
            { label: 'Includes', value: '1 crab critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-25',
        category: 'critters',
        image: './images/catalogue-items/critters/moose-critter.webp',
        name: 'Moose',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/moose-critter.webp',
            './images/catalogue-items/critters/moose-critter2.webp',
            './images/catalogue-items/critters/moose-critter3.webp',
        ],
        tags: ['Wildlife', 'Nature', 'Winter', 'Keychain'],
        description: 'Big antlers, bigger heart! This gentle moose is ready to wander through the forest.',
        details: [
            { label: 'Includes', value: '1 moose critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-26',
        category: 'critters',
        image: './images/catalogue-items/critters/dolphin-critter.webp',
        name: 'Dolphin',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/dolphin-critter.webp',
            './images/catalogue-items/critters/dolphin-critter2.webp',
            './images/catalogue-items/critters/dolphin-critter3.webp',
        ],
        tags: ['Ocean', 'Water', 'Keychain'],
        description: 'Leaping out of the waves with a big smile! This playful dolphin is the friendliest critter in the sea.',
        details: [
            { label: 'Includes', value: '1 dolphin critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-27',
        category: 'critters',
        image: './images/catalogue-items/critters/badger-critter.webp',
        name: 'Badger',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/badger-critter.webp',
            './images/catalogue-items/critters/badger-critter2.webp',
            './images/catalogue-items/critters/badger-critter3.webp',
        ],
        tags: ['Wildlife', 'Nature', 'Keychain'],
        description: 'A stripy little scavenger with a big personality. Perfect for rummaging through the dumpster habitat!',
        details: [
            { label: 'Includes', value: '1 badger critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-28',
        category: 'critters',
        image: './images/catalogue-items/critters/macaw-critter.webp',
        name: 'Macaw',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/macaw-critter.webp',
            './images/catalogue-items/critters/macaw-critter2.webp',
            './images/catalogue-items/critters/macaw-critter3.webp',
        ],
        tags: ['Wildlife', 'Jungle', 'Keychain', 'Customisable'],
        description: 'A bright and bold macaw straight from the rainforest canopy. Choose a classic red or a blue and yellow colourway.',
        details: [
            { label: 'Includes', value: '1 macaw critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },{
            name: 'Colour',
            choices: [
                { label: 'Red', color: '#fd4949' },
                { label: 'Blue & Yellow',   color: '#31b3ff' },
            ]
        },]
    },
    {
        id: 'critter-29',
        category: 'critters',
        image: './images/catalogue-items/critters/ladybug-critter.webp',
        name: 'Ladybug',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/ladybug-critter.webp',
            './images/catalogue-items/critters/ladybug-critter2.webp',
            './images/catalogue-items/critters/ladybug-critter3.webp',
        ],
        tags: ['Bugs', 'Nature', 'Flowers', 'Keychain'],
        description: 'A lucky little ladybug with a shiny spotted shell. A tiny garden friend that is sure to bring good luck!',
        details: [
            { label: 'Includes', value: '1 ladybug critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },]
    },
    {
        id: 'critter-30',
        category: 'critters',
        image: './images/catalogue-items/critters/chefmouse-critter.webp',
        name: 'Chef Mouse',
        price: 5.00,
        badge: 'Free cheese 🧀',
        badgeColor: '#F376A5',
        images: [
            './images/catalogue-items/critters/chefmouse-critter.webp',
            './images/catalogue-items/critters/chefmouse-critter2.webp',
            './images/catalogue-items/critters/chefmouse-critter3.webp',
        ],
        tags: ['Household', 'Keychain', 'Customisable'],
        description: 'This little chef is ready to whip up something delicious! Order 3 or more and he\'ll bring a cheese along for free.',
        details: [
            { label: 'Includes', value: '1 chef mouse critter, 1 cheese when ordering 3 or more' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },{
            name: 'Colour',
            choices: [
                { label: 'Brown', color: '#be8200' },
                { label: 'Grey',   color: '#808080' },
            ]
        },]
    },
    {
        id: 'critter-31',
        category: 'critters',
        image: [
            './images/catalogue-items/critters/gecko-critter.webp',
            './images/catalogue-items/critters/gecko-critter2.webp',
            './images/catalogue-items/critters/gecko-critter3.webp',
        ],
        name: 'Gecko',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/gecko-critter.webp',
            './images/catalogue-items/critters/gecko-critter2.webp',
            './images/catalogue-items/critters/gecko-critter3.webp',
        ],
        tags: ['Wildlife', 'Keychain', 'Customisable'],
        description: 'A little climber that is always ready to cling on to something. Choose brown, leopard or savannah patterns.',
        details: [
            { label: 'Includes', value: '1 gecko critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },{
            name: 'Style',
            choices: [
                { label: 'Brown', color: '#be8200' },
                { label: 'Leopard',   color: '#ff6f0f' },
                { label: 'Savannah',   color: '#808080' },
            ]
        },]
    },
    {
        id: 'critter-32',
        category: 'critters',
        image: './images/catalogue-items/critters/otter-critter.webp',
        name: 'Otter',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/otter-critter.webp',
            './images/catalogue-items/critters/otter-critter2.webp',
        ],
        tags: ['Water', 'Wildlife', 'Relaxing', 'Keychain', 'Customisable'],
        description: 'Sleek, playful and always snuggled up! Dress this otter in a cosy towel for the ultimate spa day.',
        details: [
            { label: 'Includes', value: '1 otter critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },{
            name: 'Style',
            choices: [
                { label: 'Default', color: '#ffffff' },
                { label: 'Towel',   color: '#be8200' },
            ]
        },]
    },
    {
        id: 'critter-33',
        category: 'critters',
        image: './images/catalogue-items/critters/orca-critter.webp',
        name: 'Orca',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/orca-critter.webp',
        ],
        tags: ['Ocean', 'Water', 'Keychain'],
        description: 'The sleek and smart black and white whale of the sea. This little orca is ready to make a splash!',
        details: [
            { label: 'Includes', value: '1 orca critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-34',
        category: 'critters',
        image: './images/catalogue-items/critters/giraffe-critter.webp',
        name: 'Giraffe',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/giraffe-critter.webp',
            './images/catalogue-items/critters/giraffe-critter2.webp',
        ],
        tags: ['Wildlife', 'Keychain'],
        description: 'Sky-high cuteness! This long-necked giraffe is the tallest member of your critter crew.',
        details: [
            { label: 'Includes', value: '1 giraffe critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-35',
        category: 'critters',
        image: './images/catalogue-items/critters/lobster-critter.webp',
        name: 'Lobster',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/lobster-critter.webp',
            './images/catalogue-items/critters/lobster-critter2.webp',
        ],
        tags: ['Ocean', 'Beach', 'Keychain'],
        description: 'A big-clawed lobster with a big heart. Cute, bright red and ready to pinch (a little).',
        details: [
            { label: 'Includes', value: '1 lobster critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-36',
        category: 'critters',
        image: './images/catalogue-items/critters/skeleton-critter.webp',
        name: 'Skeleton',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/skeleton-critter.webp',
            './images/catalogue-items/critters/skeleton-critter2.webp',
        ],
        tags: ['Spooky', 'Halloween', 'Keychain'],
        description: 'Spooky, but make it cute! This rattling little skeleton is perfect for Halloween or any time of year.',
        details: [
            { label: 'Includes', value: '1 skeleton critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-37',
        category: 'critters',
        image: './images/catalogue-items/critters/chameleon-critter.webp',
        name: 'Chameleon',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/chameleon-critter.webp',
            './images/catalogue-items/critters/chameleon-critter2.webp',
        ],
        tags: ['Wildlife', 'Jungle', 'Keychain'],
        description: 'A colourful chameleon with swirly tail and rolling eyes. Always on the lookout for a tasty bug!',
        details: [
            { label: 'Includes', value: '1 chameleon critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-38',
        category: 'critters',
        image: './images/catalogue-items/critters/shark-critter.webp',
        name: 'Shark',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/shark-critter.webp',
            './images/catalogue-items/critters/shark-critter2.webp',
            './images/catalogue-items/critters/shark-critter3.webp'
        ],
        tags: ['Ocean', 'Water', 'Keychain', 'Customisable'],
        description: 'Not so scary after all! This toothy little shark comes in a classic blue or a dotty style.',
        details: [
            { label: 'Includes', value: '1 shark critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },{
            name: 'Style',
            choices: [
                { label: 'Default', color: '#2c6fad' },
                { label: 'Dotty',   color: '#fcfbfb' },
            ]
        }]
    },
    {
        id: 'critter-45',
        category: 'critters',
        image: './images/catalogue-items/critters/unicorn-critter.webp',
        name: 'Unicorn',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/unicorn-critter.webp',
            './images/catalogue-items/critters/unicorn-critter2.webp',
            './images/catalogue-items/critters/unicorn-critter3.webp'
        ],
        tags: ['Fantasy', 'Keychain'],
        description: 'A magical unicorn with a sparkling horn and a heart of gold. Every collection needs a little bit of magic!',
        details: [
            { label: 'Includes', value: '1 unicorn critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-39',
        category: 'critters',
        image: [
            './images/catalogue-items/critters/cat-critter.webp',
            './images/catalogue-items/critters/cat-critter2.webp',
            './images/catalogue-items/critters/cat-critter3.webp'
        ],
        name: 'Cat',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/cat-critter.webp',
            './images/catalogue-items/critters/cat-critter2.webp',
            './images/catalogue-items/critters/cat-critter3.webp'
        ],
        tags: ['Pets', 'Household', 'Keychain', 'Customisable'],
        description: 'Purr-fect for any collection! This cuddly cat comes in a classic, dotty or calico pattern.',
        details: [
            { label: 'Includes', value: '1 cat critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },{
            name: 'Style',
            choices: [
                { label: 'Default', color: '#fdfdfd' },
                { label: 'Dotty',   color: '#8d8c8c' },
                { label: 'Calico',   color: '#fcfbfb' },
            ]
        }]
    },
    {
        id: 'critter-40',
        category: 'critters',
        image: [
            './images/catalogue-items/critters/spider-critter.webp',
            './images/catalogue-items/critters/spider-critter2.webp',
            './images/catalogue-items/critters/spider-critter3.webp'
        ],
        name: 'Spider',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/spider-critter.webp',
            './images/catalogue-items/critters/spider-critter2.webp',
            './images/catalogue-items/critters/spider-critter3.webp'
        ],
        tags: ['Bugs', 'Spooky', 'Halloween', 'Australian', 'Keychain', 'Customisable'],
        description: 'Eight legs of cuteness! This friendly little spider is available as a classic, a redback or a grey style.',
        details: [
            { label: 'Includes', value: '1 spider critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },{
            name: 'Style',
            choices: [
                { label: 'Default', color: '#fdfdfd' },
                { label: 'Redback',   color: '#fd0f0f' },
                { label: 'Grey',   color: '#535353' },
            ]
        }]
    },
    {
        id: 'critter-41',
        category: 'critters',
        image: './images/catalogue-items/critters/catalien-critter.webp',
        name: 'Cat Alien',
        price: 5.00,
        badge: 'Bundle deal 👽',
        badgeColor: '#736CED',
        images: [
            './images/catalogue-items/critters/catalien-critter.webp',
            './images/catalogue-items/critters/catalien-critter2.webp',
            './images/catalogue-items/critters/catalien-critter3.webp'
        ],
        tags: ['Space', 'Pets', 'Keychain'],
        description: 'Not from around here! This cat from another galaxy is ready to be beamed into your collection.',
        details: [
            { label: 'Includes', value: '1 cat alien critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-46',
        category: 'critters',
        image: [
            './images/catalogue-items/critters/tropicalfish-critter.webp',
            './images/catalogue-items/critters/tropicalfish-critter2.webp',
            './images/catalogue-items/critters/tropicalfish-critter3.webp'
        ],
        name: 'Tropical Fish',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/tropicalfish-critter.webp',
            './images/catalogue-items/critters/tropicalfish-critter2.webp',
            './images/catalogue-items/critters/tropicalfish-critter3.webp'
        ],
        tags: ['Ocean', 'Water', 'Keychain', 'Customisable'],
        description: 'A splash of colour from the reef! Choose a clownfish, surgeon fish or butterfly fish.',
        details: [
            { label: 'Includes', value: '1 tropical fish critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },{
            name: 'Style',
            choices: [
                { label: 'Clownfish', color: '#ff941a' },
                { label: 'Surgeon Fish',   color: '#420ffd' },
                { label: 'Butterfly Fish',   color: '#e6d925' },
            ]
        }]
    },
    {
        id: 'critter-42',
        category: 'critters',
        image: './images/catalogue-items/critters/bee-critter.webp',
        name: 'Bee',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/bee-critter.webp',
            './images/catalogue-items/critters/bee-critter2.webp',
            './images/catalogue-items/critters/bee-critter3.webp'
        ],
        tags: ['Bees', 'Bugs', 'Nature', 'Keychain'],
        description: 'Buzz buzz! A hard-working little bee ready to fly into your collection. It pairs perfectly with the Beehive Habitat.',
        details: [
            { label: 'Includes', value: '1 bee critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
    {
        id: 'critter-43',
        category: 'critters',
        image: './images/catalogue-items/critters/sloth-critter.webp',
        name: 'Sloth',
        price: 5.00,
        images: [
            './images/catalogue-items/critters/sloth-critter.webp',
            './images/catalogue-items/critters/sloth-critter2.webp',
            './images/catalogue-items/critters/sloth-critter3.webp'
        ],
        tags: ['Wildlife', 'Jungle', 'Relaxing', 'Keychain'],
        description: 'Slow down and chill out! This sleepy sloth is hanging around for the long haul.',
        details: [
            { label: 'Includes', value: '1 sloth critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },
        {
        id: 'critter-47',
        category: 'critters',
        image: './images/catalogue-items/critters/monkey-critter.webp',
        name: 'Monkey',
        price: 5.00,
        badge: 'New 🐒',
        badgeColor: '#5AC6C3',
        images: [
            './images/catalogue-items/critters/monkey-critter.webp',
            './images/catalogue-items/critters/monkey-critter2.webp',
            './images/catalogue-items/critters/monkey-critter3.webp'
        ],
        tags: ['Wildlife', 'Jungle', 'New', 'Keychain'],
        description: 'Cheeky little monkey swinging through the trees! This playful primate is ready to join your critter collection.',
        details: [
            { label: 'Includes', value: '1 monkey critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        }]
    },


    // HABITATS
    {
        id: 'habitat-1',
        category: 'habitats',
        image: './images/catalogue-items/habitats/bee-playset.webp',
        name: 'Beehive Habitat',
        price: 35.00,
        badge: 'Bestseller ⭐',
        badgeColor: '#FDBB49',
        images: [
            './images/catalogue-items/habitats/bee-playset.webp',
            './images/catalogue-items/habitats/bee-playset2.webp',
            './images/catalogue-items/habitats/bee-playset3.webp',
        ],
        tags: ['Bees', 'Nature', 'Bestseller'],
        description: 'Watch out! These worker bees need a home and fast! Give them the perfect habitat with this bee-friendly design.',
        defaultCritters: [{ id: 'critter-42', qty: 3 }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-2',
        category: 'habitats',
        image: './images/catalogue-items/habitats/cat-playset.webp',
        name: 'Cat Playset Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/cat-playset.webp',
            './images/catalogue-items/habitats/cat-playset2.webp',
            './images/catalogue-items/habitats/cat-playset3.webp',
        ],
        tags: ['Pets', 'Household', 'Interactable'],
        description: 'Give your kitty crew the perfect playset habitat with this adorable design! Your feline friends will love the climbing posts, cozy hideaways and fun toys.',
        defaultCritters: [{ id: 'critter-39', qty: 1 }, { id: 'critter-39', qty: 1, options: { Style: 'Dotty' } }, { id: 'critter-39', qty: 1, options: { Style: 'Calico' } }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-3',
        category: 'habitats',
        image: './images/catalogue-items/habitats/cow-playset.webp',
        name: 'Country House Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/cow-playset.webp',
            './images/catalogue-items/habitats/cow-playset2.webp',
            './images/catalogue-items/habitats/cow-playset3.webp',
        ],
        tags: ['Farm', 'Household'],
        description: 'A charming country house with a cosy farmhouse feel. The perfect home base for your farm animals, packed with spots for playtime and imaginative adventures.',
        defaultCritters: [{ id: 'critter-18', qty: 1 }, { id: 'critter-18', qty: 1, options: { Style: 'Highland' } }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-5',
        category: 'habitats',
        image: './images/catalogue-items/habitats/alien-playset.webp',
        name: 'Alien Abduction Habitat',
        price: 35.00,
        badge: 'New 🛸',
        badgeColor: '#5AC6C3',
        images: [
            './images/catalogue-items/habitats/alien-playset.webp',
            './images/catalogue-items/habitats/alien-playset2.webp',
            './images/catalogue-items/habitats/alien-playset3.webp',
        ],
        tags: ['Space', 'Farm', 'Interactable', 'New'],
        description: 'Beam your tiny friends up into the stars! This playset features a hovering flying saucer and paranormal corn fields, perfect for out-of-this-world adventures.',
        defaultCritters: [{ id: 'critter-41', qty: 3 }],
        details: [
            { label: 'Includes', value: 'Playset and 1 cow' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-6',
        category: 'habitats',
        image: './images/catalogue-items/habitats/duckybath-playset2.webp',
        name: 'Bubble Bath Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/duckybath-playset.webp',
            './images/catalogue-items/habitats/duckybath-playset2.webp',
            './images/catalogue-items/habitats/duckybath-playset3.webp',
        ],
        tags: ['Household', 'Water', 'Relaxing'],
        description: 'A bubbly bathtime scene complete with a cosy tub and rubber duck. Splash-free fun for your tiny friends to relax in.',
        defaultCritters: [{ id: 'critter-22', qty: 3 }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-7',
        category: 'habitats',
        image: './images/catalogue-items/habitats/firestation-playset.webp',
        name: 'Firestation Habitat',
        price: 35.00,
        badge: 'Bestseller ⭐',
        badgeColor: '#FDBB49',
        images: [
            './images/catalogue-items/habitats/firestation-playset.webp',
            './images/catalogue-items/habitats/firestation-playset2.webp',
            './images/catalogue-items/habitats/firestation-playset3.webp',
        ],
        tags: ['Fire', 'Interactable', 'Bestseller'],
        description: 'Ready for action! This firestation playset has a ladder, a garage bay and everything needed for your tiny heroes to save the day.',
        defaultCritters: [{ id: 'critter-17', qty: 1 }, { id: 'critter-17', qty: 1, options: { Style: 'Fireman' } }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-8',
        category: 'habitats',
        image: './images/catalogue-items/habitats/flowergarden-playset2.webp',
        name: 'Flower Garden Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/flowergarden-playset.webp',
            './images/catalogue-items/habitats/flowergarden-playset2.webp',
            './images/catalogue-items/habitats/flowergarden-playset3.webp',
        ],
        tags: ['Flowers', 'Nature', 'Relaxing'],
        description: 'A blooming garden full of colourful flowers and winding paths. A peaceful little spot for your tiny friends to explore and relax.',
        defaultCritters: [{ id: 'critter-29', qty: 3 }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-9',
        category: 'habitats',
        image: './images/catalogue-items/habitats/ottersauna-playset.webp',
        name: 'Sauna Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/ottersauna-playset.webp',
            './images/catalogue-items/habitats/ottersauna-playset2.webp',
            './images/catalogue-items/habitats/ottersauna-playset3.webp',
        ],
        badge: 'owner recommended ⭐',
        badgeColor: '#1bcaff',
        tags: ['Relaxing', 'Water'],
        description: 'Time to unwind! A snug wooden sauna with benches and a steamy stove, perfect for a relaxing soak with your tiny otter pals.',
        defaultCritters: [{ id: 'critter-32', qty: 3 }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-10',
        category: 'habitats',
        image: './images/catalogue-items/habitats/sandcastle-playset2.webp',
        name: 'Sand Castle Habitat',
        price: 35.00,
        badge: 'New 🏖️',
        badgeColor: '#5AC6C3',
        images: [
            './images/catalogue-items/habitats/sandcastle-playset.webp',
            './images/catalogue-items/habitats/sandcastle-playset2.webp',
            './images/catalogue-items/habitats/sandcastle-playset3.webp',
        ],
        tags: ['Beach', 'Summer', 'New'],
        description: 'A sunny day at the beach in miniature form. Turrets, shells and sandy walls make this sand castle fit for tiny royalty.',
        defaultCritters: [{ id: 'critter-24', qty: 2 }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-11',
        category: 'habitats',
        image: './images/catalogue-items/habitats/spooky-playset.webp',
        name: 'Spooky Castle Habitat',
        price: 35.00,
        badge: 'Limited 🦇',
        badgeColor: '#736CED',
        images: [
            './images/catalogue-items/habitats/spooky-playset.webp',
            './images/catalogue-items/habitats/spooky-playset2.webp',
            './images/catalogue-items/habitats/spooky-playset3.webp',
        ],
        tags: ['Spooky', 'Halloween', 'Fantasy', 'Limited'],
        description: 'A haunted castle with creaky towers and devilish details. Not-so-scary frights await your tiny ghouls and goblins.',
        defaultCritters: [{ id: 'critter-19', qty: 2 }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-12',
        category: 'habitats',
        image: './images/catalogue-items/habitats/yarnstore-playset.webp',
        name: 'Yarn Store Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/yarnstore-playset.webp',
            './images/catalogue-items/habitats/yarnstore-playset2.webp',
            './images/catalogue-items/habitats/yarnstore-playset3.webp',
        ],
        tags: ['Craft', 'Household'],
        description: 'A cosy little shop stacked with miniature yarn balls and knitting supplies. A dream for your craftiest tiny friends.',
        defaultCritters: [{ id: 'critter-20', qty: 2, options: { Colour: 'Tan' } }, { id: 'critter-20', qty: 1, options: { Colour: 'Brown' } }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-13',
        category: 'habitats',
        image: './images/catalogue-items/habitats/jungle-playset2.webp',
        name: 'Jungle Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/jungle-playset.webp',
            './images/catalogue-items/habitats/jungle-playset2.webp',
            './images/catalogue-items/habitats/jungle-playset3.webp',
        ],
        tags: ['Jungle', 'Nature', 'Interactable'],
        description: 'Lush vines, towering leaves and plenty of hiding spots. Send your tiny explorers deep into the wild!',
        defaultCritters: [{ id: 'critter-28', qty: 2, options: { Colour: 'Red' } }, { id: 'critter-28', qty: 2, options: { Colour: 'Blue & Yellow' } }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Colours', value: 'Dark Green, Light Green, Pink, Green and Brown' },
            { label: 'ETA', value: 'Printed to order, ships in 3-5 days' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-14',
        category: 'habitats',
        image: './images/catalogue-items/habitats/watermelonresort-playset.webp',
        name: 'Watermelon Resort Habitat',
        price: 35.00,
        badge: 'New 🍉',
        badgeColor: '#5AC6C3',
        images: [
            './images/catalogue-items/habitats/watermelonresort-playset.webp',
            './images/catalogue-items/habitats/watermelonresort-playset2.webp',
            './images/catalogue-items/habitats/watermelonresort-playset3.webp',
        ],
        tags: ['Summer', 'Water', 'Relaxing', 'New'],
        description: 'A juicy holiday getaway! Lounge by the pool in a giant watermelon slice resort made for sunny tiny vacations.',
        defaultCritters: [{ id: 'critter-16', qty: 3 }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
            './images/catalogue-items/habitats/arctic-playset2.webp',
            './images/catalogue-items/habitats/arctic-playset3.webp',
        ],
        tags: ['Winter', 'Nature'],
        description: 'Icy cliffs, frozen lakes and your favourite furry friends. A chilly home for your tiny polar pals.',
        defaultCritters: [{ id: 'critter-13', qty: 2 }, { id: 'critter-14', qty: 1 }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-16',
        category: 'habitats',
        image: './images/catalogue-items/habitats/autumnforest-playset.webp',
        name: 'Forest Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/autumnforest-playset.webp',
            './images/catalogue-items/habitats/autumnforest-playset2.webp',
            './images/catalogue-items/habitats/autumnforest-playset3.webp',
        ],
        tags: ['Autumn', 'Nature', 'Relaxing', 'Customisable'],
        description: 'A woodland scene alive with golden leaves and warm autumn colours. The perfect cosy retreat for your tiny forest dwellers.',
        defaultCritters: [{ id: 'critter-25', qty: 2 }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
        options: [
        {
            name: 'Season',
            choices: [
                { label: 'Summer', color: '#fdeb49' },
                { label: 'Autumn',   color: '#ffa631' },
                { label: 'Spring', color: '#36bb1b' },
                { label: 'Winter',   color: '#3c8efa' },
            ]
        }
        ],
    },
    {
        id: 'habitat-17',
        category: 'habitats',
        image: './images/catalogue-items/habitats/mushroom-playset.webp',
        name: 'Mushroom Stump Habitat',
        price: 10.00,
        badge: 'Only $10!',
        badgeColor: '#F376A5',
        images: [
            './images/catalogue-items/habitats/mushroom-playset.webp',
        ],
        tags: ['Mushroom', 'Nature', 'Fantasy', 'Bestseller'],
        description: 'A set of 3 tree stumps perfect when topped with toadstools and tiny doors to discover. A fairytale home for your smallest friends.',
        defaultCritters: [{ id: 'critter-12', qty: 1, options: { Kind: 'Yellow' } }, { id: 'critter-12', qty: 1, options: { Kind: 'Pink' } }, { id: 'critter-12', qty: 1, options: { Kind: 'Brown' } }],
        details: [
            { label: 'Includes', value: '3 tree stumps' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-18',
        category: 'habitats',
        image: './images/catalogue-items/habitats/deepsea-playset.webp',
        name: 'Deep Sea Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/deepsea-playset.webp',
            './images/catalogue-items/habitats/deepsea-playset2.webp',
            './images/catalogue-items/habitats/deepsea-playset3.webp',
        ],
        tags: ['Ocean', 'Water', 'Interactable'],
        description: 'Dive down into the deep with coral, treasure and mysterious anchors. An underwater adventure for your bravest tiny divers.',
        defaultCritters: [{ id: 'critter-38', qty: 1 }, { id: 'critter-38', qty: 1, options: { Style: 'Dotty' } }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-19',
        category: 'habitats',
        image: './images/catalogue-items/habitats/aquarium-playset.webp',
        name: 'Aquarium Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/aquarium-playset.webp',
            './images/catalogue-items/habitats/aquarium-playset2.webp',
            './images/catalogue-items/habitats/aquarium-playset3.webp',
        ],
        tags: ['Ocean', 'Water', 'Household'],
        description: 'A little tank filled with plants, rocks and plenty of room to swim. A sweet home for your tiny aquatic friends.',
        defaultCritters: [{ id: 'critter-46', qty: 1, options: { Style: 'Clownfish' } }, { id: 'critter-46', qty: 1, options: { Style: 'Surgeon Fish' } }, { id: 'critter-46', qty: 1, options: { Style: 'Butterfly Fish' } }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-20',
        category: 'habitats',
        image: './images/catalogue-items/habitats/manatee-poolplayset.webp',
        name: 'Pool Party Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/manatee-poolplayset.webp',
            './images/catalogue-items/habitats/manatee-poolplayset2.webp',
            './images/catalogue-items/habitats/manatee-poolplayset3.webp',
        ],
        tags: ['Summer', 'Water', 'Relaxing'],
        description: 'Chill out with your tiny friends in this fun pool party habitat!',
        defaultCritters: [{ id: 'critter-21', qty: 1 }, { id: 'critter-21', qty: 1, options: { Style: 'Swimwear' } }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-21',
        category: 'habitats',
        image: './images/catalogue-items/habitats/badger-dumpsterplayset.webp',
        name: 'Dumpster Habitat',
        price: 35.00,
        badge: 'New 🦡',
        badgeColor: '#5AC6C3',
        images: [
            './images/catalogue-items/habitats/badger-dumpsterplayset.webp',
            './images/catalogue-items/habitats/badger-dumpsterplayset2.webp',
            './images/catalogue-items/habitats/badger-dumpsterplayset3.webp',
        ],
        tags: ['Wildlife', 'Interactable', 'New'],
        description: 'What’s crawling around in the trash!? A cheeky badger and friends are ready to rummage through this dumpster habitat. Perfect for your tiny scavengers.',
        defaultCritters: [{ id: 'critter-27', qty: 2 }, { id: 'critter-9', qty: 1 }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-22',
        category: 'habitats',
        image: './images/catalogue-items/habitats/jurassic-playset.webp',
        name: 'Jurassic World Habitat',
        price: 35.00,
        badge: 'New 🦖',
        badgeColor: '#5AC6C3',
        images: [
            './images/catalogue-items/habitats/jurassic-playset.webp',
            './images/catalogue-items/habitats/jurassic-playset2.webp',
            './images/catalogue-items/habitats/jurassic-playset3.webp',
        ],
        tags: ['Dinosaur', 'Jungle', 'Interactable', 'New'],
        defaultCritters: [{ id: 'critter-11', qty: 2, options: { Colour: 'Green' } }],
        description: 'A prehistoric park overgrown with jungle and filled with dinosaurs! Perfect for your tiny explorers to discover.',
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-23',
        category: 'habitats',
        image: './images/catalogue-items/habitats/graveyard-playset.webp',
        name: 'Graveyard Habitat',
        price: 35.00,
        images: [
            './images/catalogue-items/habitats/graveyard-playset.webp',
            './images/catalogue-items/habitats/graveyard-playset2.webp',
            './images/catalogue-items/habitats/graveyard-playset3.webp',
        ],
        tags: ['Spooky', 'Halloween', 'Interactable'],
        description: 'A spooky graveyard habitat for your boney friends to explore!',
        defaultCritters: [{ id: 'critter-36', qty: 3 }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    {
        id: 'habitat-24',
        category: 'habitats',
        image: './images/catalogue-items/habitats/treehouse-playset.webp',
        name: 'Treehouse Habitat',
        price: 35.00,
        badge: 'New 🌳',
        badgeColor: '#5AC6C3',
        images: [
            './images/catalogue-items/habitats/treehouse-playset.webp',
            './images/catalogue-items/habitats/treehouse-playset2.webp',
        ],
        tags: ['Jungle', 'Nature', 'Interactable', 'New'],
        description: 'A cozy treehouse hideaway with a rope ladder and a bunch of bananas. Made for your cheekiest jungle friends to climb, swing and explore!',
        defaultCritters: [{ id: 'critter-47', qty: 3 }],
        details: [
            { label: 'Includes', value: 'Playset and a bunch of bananas!' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },



    // FIDGETS
    {
        id: 'fidget-1',
        category: 'fidgets',
        image: './images/catalogue-items/fidgets/large-star-fidget-gif.gif',
        name: 'Large Star Fidget',
        price: 15.00,
        badge: 'New ✨',
        badgeColor: '#5AC6C3',
        images: [
            './images/catalogue-items/fidgets/large-star-fidget.webp',
            './images/catalogue-items/fidgets/large-star-fidget2.webp',
            './images/catalogue-items/fidgets/large-star-fidget3.webp',
        ],
        description: 'A satisfying fidget toy that provides a unique tactile experience. Perfect for stress relief and focus enhancement.',
        tags: ['Fidget', 'Interactable', 'Relaxing', 'Customisable', 'New'],
        details: [
            { label: 'Includes', value: '1 large star fidget' },
            { label: 'Material', value: 'PLA Pro' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
        options: [
        { name: 'Base Colour', type: 'text', maxLength: 20, placeholder: 'e.g. White', required: true},
        { name: 'Accent Colour', type: 'text', maxLength: 20, placeholder: 'e.g. Red', required: true},
        ],
    },
    {
        id: 'fidget-2',
        category: 'fidgets',
        image: './images/catalogue-items/fidgets/christmas-tree-clicker.webp',
        name: 'Christmas Tree Clicker',
        price: 8.00,
        badge: 'Satisfying',
        badgeColor: '#0a9206',
        images: [
            './images/catalogue-items/fidgets/christmas-tree-clicker.webp',
        ],
        description: 'A satisfying fidget toy that provides a unique tactile experience. Perfect for stress relief and focus enhancement.',
        tags: ['Fidget', 'Interactable', 'Relaxing', 'Customisable', 'New'],
        details: [
            { label: 'Includes', value: '1 large star fidget' },
            { label: 'Material', value: 'PLA Pro' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },

    
    // CHRISTMAS SECTION

    // gingerbread house card set
    {
        id: 'christmas-1',
        category: 'christmas',
        image: './images/catalogue-items/christmas/gingerbread-house.webp',
        name: 'Gingerbread House Card Set',
        price: 2.50,
        images: [
            './images/catalogue-items/christmas/gingerbread-house.webp',
            './images/catalogue-items/christmas/gingerbread-house2.webp',
            './images/catalogue-items/christmas/gingerbread-house3.webp',
        ],
        description: 'A card-sized Christmas gift that pops out and builds into a 3D gingerbread house! Perfect for small gifts or gift cards, and a cute decoration for your tiny friends during the holiday season.',
        tags: ['Christmas', 'Craft', 'Interactable', 'Customisable'],
        details: [
            { label: 'Includes', value: '1 gingerbread house card' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
        image: './images/catalogue-items/habitats/sausagedog-playset2.webp',
        name: 'Cozy Christmas Habitat',
        price: 35.00,
        badge: 'Bundle deal 🎁',
        badgeColor: '#2B8A4E',
        images: [
            './images/catalogue-items/habitats/sausagedog-playset.webp',
            './images/catalogue-items/habitats/sausagedog-playset2.webp',
            './images/catalogue-items/habitats/sausagedog-playset3.webp',
        ],
        tags: ['Christmas', 'Household', 'Bestseller'],
        description: "It's the season of giving! Give your tiny friends a festive makeover with this Cozy Christmas Habitat!",
        defaultCritters: [{ id: 'christmas-7', qty: 2 }],
        details: [
            { label: 'Includes', value: 'Playset only' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    // gingerbread critter
    {
        id: 'christmas-3',
        category: 'christmas',
        image: './images/catalogue-items/christmas/gingerbread-critter.webp',
        name: 'Gingerbread',
        price: 5.00,
        images: [
            './images/catalogue-items/christmas/gingerbread-critter.webp',
            './images/catalogue-items/christmas/gingerbread-critter2.webp',
            './images/catalogue-items/christmas/gingerbread-critter3.webp'
        ],
        tags: ['Christmas', 'Bestseller', 'Keychain', 'Customisable'],
        description: "A cute, tasty gingerbread critter straight from the oven! Perfect for your tiny friends to enjoy during the holiday season.",
        details: [
            { label: 'Includes', value: '1 gingerbread critter (boy or girl)' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
        image: './images/catalogue-items/christmas/reindeerdragon-critter.webp',
        name: 'Reindeer Dragon',
        price: 5.00,
        images: [
            './images/catalogue-items/christmas/reindeerdragon-critter.webp',
            './images/catalogue-items/christmas/reindeerdragon-critter2.webp',
            './images/catalogue-items/christmas/reindeerdragon-critter3.webp',
        ],
        tags: ['Christmas', 'Fantasy', 'Keychain'],
        description: "A festive reindeer dragon critter ready to spread holiday cheer! Perfect for your tiny friends to enjoy during the holiday season.",
        details: [
            { label: 'Includes', value: '1 reindeer dragon critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
        options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        ]
    },
    // santa critter
    {
        id: 'christmas-5',
        category: 'christmas',
        image: './images/catalogue-items/christmas/santa-critter.webp',
        name: 'Santa',
        price: 5.00,
        images: [
            './images/catalogue-items/christmas/santa-critter.webp',
            './images/catalogue-items/christmas/santa-critter2.webp',
            './images/catalogue-items/christmas/santa-critter3.webp'
        ],
        tags: ['Christmas', 'Bestseller', 'Keychain'],
        description: 'Ho ho ho! A jolly Santa critter ready to deliver holiday cheer. Perfect for your tiny friends to enjoy during the holiday season.',
        details: [
            { label: 'Includes', value: '1 Santa critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
         options: [
        {
            name: 'Keychain',
            choices: [
                { label: 'Yes', color: '#49fd70' },
                { label: 'No',   color: '#ff3131' },
            ]
        },
        ]
    },
    // reindeer critter
    {
        id: 'christmas-6',
        category: 'christmas',
        image: './images/catalogue-items/christmas/reindeer-critter.webp',
        name: 'Reindeer',
        price: 5.00,
        images: [
            './images/catalogue-items/christmas/reindeer-critter.webp',
            './images/catalogue-items/christmas/reindeer-critter2.webp',
            './images/catalogue-items/christmas/reindeer-critter3.webp',
        ],
        tags: ['Christmas', 'Winter', 'Wildlife'],
        description: "Is it dasher or prancer or vixen? Maybe even rudolph! This festive reindeer critter is ready to spread holiday cheer! Perfect for your tiny friends to enjoy during the holiday season.",
        details: [
            { label: 'Includes', value: '1 reindeer critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ]
    },
    // christmas sausage dog
    {
        id: 'christmas-7',
        category: 'christmas',
        image: './images/catalogue-items/habitats/sausagedog-playset.webp',
        name: 'Christmas Sausage Dog',
        price: 5.00,
        badge: 'Hot 🔥!',
        pinned: true,
        images: [
            './images/catalogue-items/habitats/sausagedog-playset.webp',
            './images/catalogue-items/christmas/sausage-dog.webp',
            './images/catalogue-items/habitats/sausagedog-playset3.webp',
        ],
        tags: ['Christmas', 'Pets', 'Bestseller', 'Customisable'],
        description: 'A long, lovable sausage dog dressed up for the holidays! Add a Santa hat, jacket or fluffy coat for extra festive cheer.',
        details: [
            { label: 'Includes', value: '1 sausage dog critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
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
    // snowman
    {
        id: 'christmas-8',
        category: 'christmas',
        image: './images/catalogue-items/christmas/snowman.webp',
        name: 'Snowman',
        price: 5.00,
        images: [
            './images/catalogue-items/christmas/snowman.webp',
            './images/catalogue-items/christmas/snowman2.webp',
            './images/catalogue-items/christmas/snowman3.webp',
            './images/catalogue-items/christmas/snowman4.webp',
        ],
        tags: ['Christmas', 'Winter', 'Bestseller', 'Customisable'],
        description: "Let's build a snowman! This cute little snowman critter is ready to spread holiday cheer! Perfect for your tiny friends to enjoy during the holiday season.",
        details: [
            { label: 'Includes', value: '1 snowman critter' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],

         options: [
        {
            name: 'Style',
            choices: [
                { label: 'Santa Hat', color: '#ff3131' },
                { label: 'Snow Beanie',   color: '#31d6ff' },
                { label: 'Top Hat',   color: 'rgb(255, 166, 49)' },
            ]
        }, 
        ],
    },
    // christmas tree
    {
        id: 'christmas-9',
        category: 'christmas',
        image: './images/catalogue-items/christmas/christmastree-playset3.webp',
        name: 'Christmas Tree',
        price: 15.00,
        images: [
            './images/catalogue-items/christmas/christmastree-playset.webp',
            './images/catalogue-items/christmas/christmastree-playset2.webp',
            './images/catalogue-items/christmas/christmastree-playset3.webp'
        ],
        tags: ['Christmas', 'Household', 'Bestseller'],
        description: "Decorate your space with this festive Christmas tree! Perfect for your tiny friends to enjoy during the holiday season.",
        details: [
            { label: 'Includes', value: '1 Christmas tree' },
            { label: 'Material', value: 'PLA Pro and Matte' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },
    {
        id: 'fidget-2',
        category: 'christmas',
        image: './images/catalogue-items/fidgets/christmas-tree-clicker.webp',
        name: 'Christmas Tree Clicker',
        price: 8.00,
        badge: 'Satisfying',
        badgeColor: '#0a9206',
        images: [
            './images/catalogue-items/fidgets/christmas-tree-clicker.webp',
        ],
        description: 'A satisfying fidget toy that provides a unique tactile experience. Perfect for stress relief and focus enhancement.',
        tags: ['Fidget', 'Interactable', 'Relaxing', 'Customisable', 'New'],
        details: [
            { label: 'Includes', value: '1 large star fidget' },
            { label: 'Material', value: 'PLA Pro' },
            { label: 'Small parts', value: 'Not suitable for children under 3' },
        ],
    },
];

/* ---------- catalogue card pictures ----------
   image:  './a.webp'                  one picture on the catalogue card (it never changes)
   image:  ['./a.webp', './b.gif']    several pictures: the card slowly cycles through them
   images: [...]                       ONLY the gallery on the product's own page
   .webp, .gif, .png and .jpg all work.

   defaultCritters (habitats): [{ id: 'critter-47', qty: 3 }]
   shows an "add the critters" button on the habitat's own page.

   badge:      'Hot 🔥!'   a tag on the front of the catalogue card (top left of the picture)
   badgeColor: '#736CED'   optional background for that tag (default fiery orange)
   pinned:     true        always shown first in its category, whatever the sort (after the shopper's own pins) */
products.forEach(p => {
    if (Array.isArray(p.image)) {
        p.cardImages = p.image.filter(Boolean);
        p.image = p.cardImages[0];
    }
});

/* ============================================================
   OFFERS - everything in the Promotions section is controlled here.
   Delete everything from "const offers = [" to the end of products.js
   and paste this whole file in its place.

   Two kinds of offer:

   1) DEAL  - discounts ONE product (this is the only type that uses productId)
      { id, type: 'deal', productId, salePrice, ... }

   2) PROMO / LIMITED - a banner, optionally a bundle ("set"). No productId.
      The banner is built from `includes`.
      { id, type: 'promo' | 'limited', includes: [...], price, ... }

   FIELDS (all optional unless marked required)
     id            required, unique, e.g. 'summer-set'. The cart id is 'bundle-' + id
     type          required: 'deal' | 'promo' | 'limited'
     productId     deals only
     salePrice     deals only
     includes      promo/limited: ['habitat-5', { id: 'critter-41', qty: 3 }]
     price         promo/limited: set price. Leave out to add up the included items
     name          name used in the cart / Stripe (headline is used if left out)
     headline      big title on the banner
     badge         the little tag, e.g. 'Limited time!'
     blurb         description paragraph
     button        button text (default 'Add to cart')
     buttonLink    make the button a plain link instead, e.g. './catalogue.html#habitats'
     link          where the picture and headline click through to
     image         your own picture path (default: first included product's picture)
     imageSide     'left' (default) or 'right'
     size          'wide' (half row, default) or 'full'
     theme         'pink' | 'teal' | 'purple' | 'yellow' | 'red' | 'green' | 'blue' | 'dark'
     colors        { bg, text, accent, onAccent, dot } overrides the theme
     pattern       'dots' | 'stripes' | 'none'
     fx            'float' | 'rain' | 'sparkle' | 'none'   (drifting background bits)
     fxCount       how many bits (default 6)
     emojis        ['🍉', '☀️'] used for stickers, fx and the click explosion
     decor         false = hide the sticker emojis beside the text
     starts / ends ISO dates, e.g. '2026-12-25T23:59:59+10:00'
     showCountdown false = hide the countdown even when `ends` is set
     showContains  false = hide the "Contains" list
     showPrice     false = hide the price line
     showSavings   false = hide the "Save $X" pill
     tilt          false = no 3D tilt on hover
     burst         false = no emoji pop on hover
     order         lower numbers show first (default 0)
   ============================================================ */

const offers = [
    {
        id: 'gingerbread-class-set',
        type: 'limited',
        badge: 'Limited time!',
        headline: 'Gingerbread Class Set',
        name: 'Gingerbread Class Set',
        blurb: 'The perfect Christmas gift for your sports team, classmates or friends! Set of 25 assorted coloured cards.',
        ends: '2026-12-25T23:59:59+10:00',
        includes: [{ id: 'christmas-1', qty: 25 }],
        options: false, // assorted colours, so no picker
        price: 35.00,
        emojis: ['🍪', '🎄', '🎁', '⭐', '❄️'],
        theme: 'red', fx: 'rain', pattern: 'stripes',
        order: 1,
    },
    {
        id: 'alien-abduction-set',
        type: 'promo',
        badge: 'Out of this world',
        headline: 'Alien Abduction Bundle',
        name: 'Alien Abduction Habitat Set',
        blurb: 'Beam your tiny friends up into the stars with a hovering saucer and paranormal corn fields.',
        includes: ['habitat-5', { id: 'critter-41', qty: 3 }],
        // no price = the items are added up
        emojis: ['👽', '🛸', '✨', '🌌', '🐄'],
        theme: 'purple', fx: 'sparkle', pattern: 'dots',
        order: 2,
    },
    {
        id: 'summer-watermelon-set',
        type: 'limited',
        badge: 'Summer sale vibes',
        headline: '🍉 Summer Watermelon Resort 🍉',
        name: 'Summer Watermelon Resort',
        blurb: 'A juicy holiday getaway for your tiny friends, along with the essential Wittle Ones to chill with!',
        ends: '2026-11-28T23:59:59+10:00',
        includes: ['habitat-14', { id: 'critter-16', qty: 2 }, { id: 'critter-21', qty: 2 }, { id: 'critter-35', qty: 2 }],
        price: 60.00,
        emojis: ['🍉', '☀️', '🏖️', '🌴', '🍹'],
        colors: { bg: '#FF6B81', text: '#FFFFFF', accent: '#2B8A4E' },
        fx: 'float', pattern: 'stripes', size: 'full',
        order: 3,
    },

    {
        id: 'cozy-christmas-sausage-set',
        type: 'limited',
        badge: 'Christmas only!',
        headline: 'Cozy Christmas Home & Sausage Dog',
        name: 'Cozy Christmas Home & Sausage Dog',
        blurb: 'Everything for a snug little Christmas: the Cozy Christmas Habitat plus a festive sausage dog to curl up by the fire.',
        ends: '2026-12-25T23:59:59+10:00',
        includes: ['christmas-2', { id: 'christmas-7', qty: 2 }],
        price: 36.00,
        image: './images/catalogue-items/habitats/sausagedog-playset.webp',
        emojis: ['🐶', '🏠', '🎄', '🎁', '❄️'],
        theme: 'green', fx: 'rain', pattern: 'dots',
        order: 2,
    },
    {
        id: 'christmas-sausage-dog-deal',
        type: 'deal',
        productId: 'christmas-7',
        salePrice: 4.00,
        badge: 'Sale',
        blurb: 'Our festive sausage dog, $1 off until Christmas. Pick a Santa hat, jacket or fluffy coat!',
        button: 'Choose your style',
        buttonLink: './product.html?id=christmas-7',
        ends: '2026-12-25T23:59:59+10:00',
        emojis: ['🐶', '🎅', '🧣', '🎄'],
        order: 2,
    },
    {
        id: 'pet-carrier-deal',
        type: 'deal',
        productId: 'critter-8',
        salePrice: 8.00,
        badge: 'Featured',
        blurb: 'The perfect little container for all critter sizes! Available in a whole range of colours.',
        button: 'Take a closer look',
        buttonLink: './product.html?id=critter-8',
        emojis: ['🐶', '🐰', '🐟', '🐦'],
        theme: 'blue',
        order: 2,
    },

    // DEAL example (copy, uncomment and edit):
    // {
    //     id: 'mini-croc-sale',
    //     type: 'deal',
    //     productId: 'mini-1',
    //     salePrice: 2.00,
    //     badge: 'Sale',
    //     blurb: 'Snap up a mini croc while they last.',
    //     ends: '2026-12-01T23:59:59+10:00',
    // },
];

function offerLive(o, now = Date.now()) {
    const start = o.starts ? Date.parse(o.starts) : -Infinity;
    const end = o.ends ? Date.parse(o.ends) : Infinity;
    return now >= start && now <= end;
}

// deals change the product's own price while they are live
offers.forEach(o => {
    if (o.type !== 'deal' || !offerLive(o)) return;
    const p = products.find(x => x.id === o.productId);
    if (p && o.salePrice != null) { p.originalPrice = p.price; p.price = o.salePrice; }
});

// promos/limited offers with several items (or their own price) become a "set" product
const bundles = [];
offers.forEach(o => {
    if (o.type === 'deal' || !o.id || !offerLive(o) || !o.includes || !o.includes.length) return;
    const parts = o.includes.map(e => typeof e === 'object' ? { id: e.id, qty: e.qty || 1 } : { id: e, qty: 1 });
    const items = parts.map(pt => ({ p: products.find(x => x.id === pt.id), qty: pt.qty }));
    if (items.some(it => !it.p)) {
        console.warn('Offer "' + o.id + '" includes a product id that does not exist.');
        return;
    }
    const justOneItem = items.length === 1 && items[0].qty === 1 && o.price == null;
    if (justOneItem) return; // the button just adds that product

    const sum = items.reduce((s, it) => s + it.p.price * it.qty, 0);
    bundles.push({
        id: 'bundle-' + o.id,
        category: 'bundles',
        name: (o.name || o.headline || items[0].p.name) + ' (Set)',
        price: o.price != null ? o.price : Math.round(sum * 100) / 100,
        image: o.image || items[0].p.image,
        images: items[0].p.images,
        tags: [],
        contentsText: 'Includes: ' + items.map(it => (it.qty > 1 ? it.qty + ' \u00D7 ' : '') + it.p.name).join(', '),
        description: o.blurb || '',
    });
});

// lets api/_prices.js read this same file on the server (the browser ignores this line)
if (typeof module !== 'undefined' && module.exports) module.exports = { products, offers, bundles };
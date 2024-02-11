export const getDishById = (id: number) => {
  const meals = restaurantsList.flatMap(category =>
    category.food.map(meals => meals.meals),
  );
  // const meals = restaurant.food.flatMap(category => category.meals);
  return meals[0].find(meal => meal.id === id);
};

export const getRestaurantById = (id: number) => {
  return restaurantsList.find(restaurant => restaurant.id === id);
};
export const restaurant = {
  name: 'Vapiano',
  rating: '4.5 Excellent',
  ratings: '(500+)',
  img: require('./r1.jpeg'),
  distance: '0.85 miles away',
  delivery: '10-20 min',
  tags: [
    'Italian',
    'Pizza',
    'Pasta',
    'Salads',
    'Vegetarian',
    'Alcohol',
    'Wine',
    'Vegan Friendly',
  ],
  about:
    'The home of handmade fresh pasta, thin crust pizza, protein packed salads, homemade sauces and dressings too. Choose your pasta shape and add any extras you like.',
  food: [
    {
      category: 'Meal Deals',
      meals: [
        {
          id: 1,
          name: 'Pasta Power ✊',
          price: 17,
          info: 'Includes one garlic bread, one pasta and one soft drink.',
          img: require('./1.png'),
        },
        {
          id: 2,
          name: 'Vegetariano 💚',
          price: 17,
          info: 'Includes one garlic bread, one vegetarian pasta and one soft drink',
          img: require('./2.png'),
        },
        {
          id: 3,
          name: 'Vaps Date 💕',
          price: 40,
          info: 'Includes one garlic bread with or without cheese, choice of two pizzas, one bottle of wine or four bottles of Moretti',
          img: require('./3.png'),
        },
        {
          id: 4,
          name: "Livin' your best life 😎",
          price: 80,
          info: 'Includes two garlic breads with or without cheese, four pizzas, two bottles of wine or eight bottles of beer or a mix of both',
          img: require('./4.png'),
        },
      ],
    },
    {
      category: 'Pasta',
      meals: [
        {
          id: 5,
          name: 'Arrabbiata',
          price: 9.35,
          info: 'Tomato sauce, chilli, garlic, and onions',
          img: require('./5.png'),
        },
        {
          id: 6,
          name: 'Pomodoro e Mozzarella',
          price: 10.75,
          info: 'Tomato sauce, onions, mozzarella',
          img: require('./6.png'),
        },
      ],
    },
    {
      category: 'Pizza',
      meals: [
        {
          id: 7,
          name: 'Salame',
          price: 11.35,
          info: 'Spicy Italian sausage, tomato sauce, mozzarella',
          img: require('./7.png'),
        },
        {
          id: 8,
          name: 'Margherity',
          price: 9.75,
          info: 'Tomato sauce, mozzarella',
          img: require('./8.png'),
        },
      ],
    },
    {
      category: 'Salad',
      meals: [
        {
          id: 9,
          name: 'Insalata Mista Piccola',
          price: 5.99,
          info: 'Mixed leaf salad, cherry tomatoes and grated carrot. There can be no swaps, if you would like to add any extras please customise below.',
          img: require('./9.png'),
        },
        {
          id: 10,
          name: 'Insalata Mista della Casa',
          price: 8.95,
          info: 'Large mixed salad. There can be no swaps, if you would like to add any extras please customise below.',
          img: require('./10.png'),
        },
      ],
    },
    {
      category: 'Meal Deals NEW',
      meals: [
        {
          id: 11,
          name: 'Pasta Power ✊',
          price: 17,
          info: 'Includes one garlic bread, one pasta and one soft drink.',
          img: require('./1.png'),
        },
        {
          id: 12,
          name: 'Vegetariano 💚',
          price: 17,
          info: 'Includes one garlic bread, one vegetarian pasta and one soft drink',
          img: require('./2.png'),
        },
        {
          id: 13,
          name: 'Vaps Date 💕',
          price: 40,
          info: 'Includes one garlic bread with or without cheese, choice of two pizzas, one bottle of wine or four bottles of Moretti',
          img: require('./3.png'),
        },
        {
          id: 14,
          name: "Livin' your best life 😎",
          price: 80,
          info: 'Includes two garlic breads with or without cheese, four pizzas, two bottles of wine or eight bottles of beer or a mix of both',
          img: require('./4.png'),
        },
      ],
    },
    {
      category: 'Pasta NEW',
      meals: [
        {
          id: 15,
          name: 'Arrabbiata',
          price: 9.35,
          info: 'Tomato sauce, chilli, garlic, and onions',
          img: require('./5.png'),
        },
        {
          id: 16,
          name: 'Pomodoro e Mozzarella',
          price: 10.75,
          info: 'Tomato sauce, onions, mozzarella',
          img: require('./6.png'),
        },
      ],
    },
    {
      category: 'Pizza NEW',
      meals: [
        {
          id: 17,
          name: 'Salame',
          price: 11.35,
          info: 'Spicy Italian sausage, tomato sauce, mozzarella',
          img: require('./7.png'),
        },
        {
          id: 18,
          name: 'Margherity',
          price: 9.75,
          info: 'Tomato sauce, mozzarella',
          img: require('./8.png'),
        },
      ],
    },
    {
      category: 'Salad NEW',
      meals: [
        {
          id: 19,
          name: 'Insalata Mista Piccola',
          price: 5.99,
          info: 'Mixed leaf salad, cherry tomatoes and grated carrot. There can be no swaps, if you would like to add any extras please customise below.',
          img: require('./9.png'),
        },
        {
          id: 20,
          name: 'Insalata Mista della Casa',
          price: 8.95,
          info: 'Large mixed salad. There can be no swaps, if you would like to add any extras please customise below.',
          img: require('./10.png'),
        },
      ],
    },
  ],
};

export const restaurantsList = [
  {
    name: 'Vapiano',
    id: 1,
    rating: '4.5 Excellent',
    ratings: '(500+)',
    img: require('./r1.jpeg'),
    distance: '0.85 miles away',
    delivery: '10-20 min',
    tags: [
      'Italian',
      'Pizza',
      'Pasta',
      'Salads',
      'Vegetarian',
      'Alcohol',
      'Wine',
      'Vegan Friendly',
    ],
    about:
      'About 1: The home of handmade fresh pasta, thin crust pizza, protein packed salads, homemade sauces and dressings too. Choose your pasta shape and add any extras you like.',
    food: [
      {
        category: 'Meal Deals',
        meals: [
          {
            id: 1,
            name: 'Pasta Power ✊',
            price: 17,
            info: 'Includes one garlic bread, one pasta and one soft drink.',
            img: require('./1.png'),
          },
          {
            id: 2,
            name: 'Vegetariano 💚',
            price: 17,
            info: 'Includes one garlic bread, one vegetarian pasta and one soft drink',
            img: require('./2.png'),
          },
          {
            id: 3,
            name: 'Vaps Date 💕',
            price: 40,
            info: 'Includes one garlic bread with or without cheese, choice of two pizzas, one bottle of wine or four bottles of Moretti',
            img: require('./3.png'),
          },
          {
            id: 4,
            name: "Livin' your best life 😎",
            price: 80,
            info: 'Includes two garlic breads with or without cheese, four pizzas, two bottles of wine or eight bottles of beer or a mix of both',
            img: require('./4.png'),
          },
        ],
      },
      {
        category: 'Pasta',
        meals: [
          {
            id: 5,
            name: 'Arrabbiata',
            price: 9.35,
            info: 'Tomato sauce, chilli, garlic, and onions',
            img: require('./5.png'),
          },
          {
            id: 6,
            name: 'Pomodoro e Mozzarella',
            price: 10.75,
            info: 'Tomato sauce, onions, mozzarella',
            img: require('./6.png'),
          },
        ],
      },
      {
        category: 'Pizza',
        meals: [
          {
            id: 7,
            name: 'Salame',
            price: 11.35,
            info: 'Spicy Italian sausage, tomato sauce, mozzarella',
            img: require('./7.png'),
          },
          {
            id: 8,
            name: 'Margherity',
            price: 9.75,
            info: 'Tomato sauce, mozzarella',
            img: require('./8.png'),
          },
        ],
      },
      {
        category: 'Salad',
        meals: [
          {
            id: 9,
            name: 'Insalata Mista Piccola',
            price: 5.99,
            info: 'Mixed leaf salad, cherry tomatoes and grated carrot. There can be no swaps, if you would like to add any extras please customise below.',
            img: require('./9.png'),
          },
          {
            id: 10,
            name: 'Insalata Mista della Casa',
            price: 8.95,
            info: 'Large mixed salad. There can be no swaps, if you would like to add any extras please customise below.',
            img: require('./10.png'),
          },
        ],
      },
      {
        category: 'Meal Deals NEW',
        meals: [
          {
            id: 11,
            name: 'Pasta Power ✊',
            price: 17,
            info: 'Includes one garlic bread, one pasta and one soft drink.',
            img: require('./1.png'),
          },
          {
            id: 12,
            name: 'Vegetariano 💚',
            price: 17,
            info: 'Includes one garlic bread, one vegetarian pasta and one soft drink',
            img: require('./2.png'),
          },
          {
            id: 13,
            name: 'Vaps Date 💕',
            price: 40,
            info: 'Includes one garlic bread with or without cheese, choice of two pizzas, one bottle of wine or four bottles of Moretti',
            img: require('./3.png'),
          },
          {
            id: 14,
            name: "Livin' your best life 😎",
            price: 80,
            info: 'Includes two garlic breads with or without cheese, four pizzas, two bottles of wine or eight bottles of beer or a mix of both',
            img: require('./4.png'),
          },
        ],
      },
      {
        category: 'Pasta NEW',
        meals: [
          {
            id: 15,
            name: 'Arrabbiata',
            price: 9.35,
            info: 'Tomato sauce, chilli, garlic, and onions',
            img: require('./5.png'),
          },
          {
            id: 16,
            name: 'Pomodoro e Mozzarella',
            price: 10.75,
            info: 'Tomato sauce, onions, mozzarella',
            img: require('./6.png'),
          },
        ],
      },
      {
        category: 'Pizza NEW',
        meals: [
          {
            id: 17,
            name: 'Salame',
            price: 11.35,
            info: 'Spicy Italian sausage, tomato sauce, mozzarella',
            img: require('./7.png'),
          },
          {
            id: 18,
            name: 'Margherity',
            price: 9.75,
            info: 'Tomato sauce, mozzarella',
            img: require('./8.png'),
          },
        ],
      },
      {
        category: 'Salad NEW',
        meals: [
          {
            id: 19,
            name: 'Insalata Mista Piccola',
            price: 5.99,
            info: 'Mixed leaf salad, cherry tomatoes and grated carrot. There can be no swaps, if you would like to add any extras please customise below.',
            img: require('./9.png'),
          },
          {
            id: 20,
            name: 'Insalata Mista della Casa',
            price: 8.95,
            info: 'Large mixed salad. There can be no swaps, if you would like to add any extras please customise below.',
            img: require('./10.png'),
          },
        ],
      },
    ],
  },
  {
    name: '✨Urban Greens✨',
    id: 2,
    rating: '4.5 Excellent',
    ratings: '(400+)',
    img: require('./r2.jpeg'),
    distance: '0.85 miles away',
    delivery: '20-30 min',
    tags: [
      'Italian2',
      'Salads2',
      'Vegetarian2',
      'Alcohol2',
      'Wine',
      'Vegan Friendly',
    ],
    about:
      'About 2: The home of handmade fresh pasta, thin crust pizza, protein packed salads, homemade sauces and dressings too. Choose your pasta shape and add any extras you like.',
    food: [
      {
        category: 'Meal Deals',
        meals: [
          {
            id: 1,
            name: 'Pasta Power ✊',
            price: 17,
            info: 'Includes one garlic bread, one pasta and one soft drink.',
            img: require('./1.png'),
          },
          {
            id: 2,
            name: 'Vegetariano 💚',
            price: 17,
            info: 'Includes one garlic bread, one vegetarian pasta and one soft drink',
            img: require('./2.png'),
          },
          {
            id: 3,
            name: 'Vaps Date 💕',
            price: 40,
            info: 'Includes one garlic bread with or without cheese, choice of two pizzas, one bottle of wine or four bottles of Moretti',
            img: require('./3.png'),
          },
          {
            id: 4,
            name: "Livin' your best life 😎",
            price: 80,
            info: 'Includes two garlic breads with or without cheese, four pizzas, two bottles of wine or eight bottles of beer or a mix of both',
            img: require('./4.png'),
          },
        ],
      },
      {
        category: 'Pasta',
        meals: [
          {
            id: 5,
            name: 'Arrabbiata',
            price: 9.35,
            info: 'Tomato sauce, chilli, garlic, and onions',
            img: require('./5.png'),
          },
          {
            id: 6,
            name: 'Pomodoro e Mozzarella',
            price: 10.75,
            info: 'Tomato sauce, onions, mozzarella',
            img: require('./6.png'),
          },
        ],
      },
      {
        category: 'Pizza',
        meals: [
          {
            id: 7,
            name: 'Salame',
            price: 11.35,
            info: 'Spicy Italian sausage, tomato sauce, mozzarella',
            img: require('./7.png'),
          },
          {
            id: 8,
            name: 'Margherity',
            price: 9.75,
            info: 'Tomato sauce, mozzarella',
            img: require('./8.png'),
          },
        ],
      },
      {
        category: 'Salad',
        meals: [
          {
            id: 9,
            name: 'Insalata Mista Piccola',
            price: 5.99,
            info: 'Mixed leaf salad, cherry tomatoes and grated carrot. There can be no swaps, if you would like to add any extras please customise below.',
            img: require('./9.png'),
          },
          {
            id: 10,
            name: 'Insalata Mista della Casa',
            price: 8.95,
            info: 'Large mixed salad. There can be no swaps, if you would like to add any extras please customise below.',
            img: require('./10.png'),
          },
        ],
      },
      {
        category: 'Meal Deals NEW',
        meals: [
          {
            id: 11,
            name: 'Pasta Power ✊',
            price: 17,
            info: 'Includes one garlic bread, one pasta and one soft drink.',
            img: require('./1.png'),
          },
          {
            id: 12,
            name: 'Vegetariano 💚',
            price: 17,
            info: 'Includes one garlic bread, one vegetarian pasta and one soft drink',
            img: require('./2.png'),
          },
          {
            id: 13,
            name: 'Vaps Date 💕',
            price: 40,
            info: 'Includes one garlic bread with or without cheese, choice of two pizzas, one bottle of wine or four bottles of Moretti',
            img: require('./3.png'),
          },
          {
            id: 14,
            name: "Livin' your best life 😎",
            price: 80,
            info: 'Includes two garlic breads with or without cheese, four pizzas, two bottles of wine or eight bottles of beer or a mix of both',
            img: require('./4.png'),
          },
        ],
      },
      {
        category: 'Pasta NEW',
        meals: [
          {
            id: 15,
            name: 'Arrabbiata',
            price: 9.35,
            info: 'Tomato sauce, chilli, garlic, and onions',
            img: require('./5.png'),
          },
          {
            id: 16,
            name: 'Pomodoro e Mozzarella',
            price: 10.75,
            info: 'Tomato sauce, onions, mozzarella',
            img: require('./6.png'),
          },
        ],
      },
      {
        category: 'Pizza NEW',
        meals: [
          {
            id: 17,
            name: 'Salame',
            price: 11.35,
            info: 'Spicy Italian sausage, tomato sauce, mozzarella',
            img: require('./7.png'),
          },
          {
            id: 18,
            name: 'Margherity',
            price: 9.75,
            info: 'Tomato sauce, mozzarella',
            img: require('./8.png'),
          },
        ],
      },
      {
        category: 'Salad NEW',
        meals: [
          {
            id: 19,
            name: 'Insalata Mista Piccola',
            price: 5.99,
            info: 'Mixed leaf salad, cherry tomatoes and grated carrot. There can be no swaps, if you would like to add any extras please customise below.',
            img: require('./9.png'),
          },
          {
            id: 20,
            name: 'Insalata Mista della Casa',
            price: 8.95,
            info: 'Large mixed salad. There can be no swaps, if you would like to add any extras please customise below.',
            img: require('./10.png'),
          },
        ],
      },
    ],
  },
  {
    name: 'El Minero',
    id: 3,
    rating: '4.5 Excellent',
    ratings: '(600+)',
    img: require('./r3.jpeg'),
    distance: '0.85 miles away',
    delivery: '30-50 min',
    tags: [
      'Italian3',
      'Pizza3',
      'Pasta3',
      'Salads3',
      'Vegetarian3',
      'Alcohol3',
      'Wine3',
      'Drinks',
      'Vegan Friendly',
    ],
    about:
      'About 3: The home of handmade fresh pasta, thin crust pizza, protein packed salads, homemade sauces and dressings too. Choose your pasta shape and add any extras you like.',
    food: [
      {
        category: 'Meal Deals',
        meals: [
          {
            id: 1,
            name: 'Pasta Power ✊',
            price: 17,
            info: 'Includes one garlic bread, one pasta and one soft drink.',
            img: require('./1.png'),
          },
          {
            id: 2,
            name: 'Vegetariano 💚',
            price: 17,
            info: 'Includes one garlic bread, one vegetarian pasta and one soft drink',
            img: require('./2.png'),
          },
          {
            id: 3,
            name: 'Vaps Date 💕',
            price: 40,
            info: 'Includes one garlic bread with or without cheese, choice of two pizzas, one bottle of wine or four bottles of Moretti',
            img: require('./3.png'),
          },
          {
            id: 4,
            name: "Livin' your best life 😎",
            price: 80,
            info: 'Includes two garlic breads with or without cheese, four pizzas, two bottles of wine or eight bottles of beer or a mix of both',
            img: require('./4.png'),
          },
        ],
      },
      {
        category: 'Pasta',
        meals: [
          {
            id: 5,
            name: 'Arrabbiata',
            price: 9.35,
            info: 'Tomato sauce, chilli, garlic, and onions',
            img: require('./5.png'),
          },
          {
            id: 6,
            name: 'Pomodoro e Mozzarella',
            price: 10.75,
            info: 'Tomato sauce, onions, mozzarella',
            img: require('./6.png'),
          },
        ],
      },
      {
        category: 'Pizza',
        meals: [
          {
            id: 7,
            name: 'Salame',
            price: 11.35,
            info: 'Spicy Italian sausage, tomato sauce, mozzarella',
            img: require('./7.png'),
          },
          {
            id: 8,
            name: 'Margherity',
            price: 9.75,
            info: 'Tomato sauce, mozzarella',
            img: require('./8.png'),
          },
        ],
      },
      {
        category: 'Salad',
        meals: [
          {
            id: 9,
            name: 'Insalata Mista Piccola',
            price: 5.99,
            info: 'Mixed leaf salad, cherry tomatoes and grated carrot. There can be no swaps, if you would like to add any extras please customise below.',
            img: require('./9.png'),
          },
          {
            id: 10,
            name: 'Insalata Mista della Casa',
            price: 8.95,
            info: 'Large mixed salad. There can be no swaps, if you would like to add any extras please customise below.',
            img: require('./10.png'),
          },
        ],
      },
      {
        category: 'Meal Deals NEW',
        meals: [
          {
            id: 11,
            name: 'Pasta Power ✊',
            price: 17,
            info: 'Includes one garlic bread, one pasta and one soft drink.',
            img: require('./1.png'),
          },
          {
            id: 12,
            name: 'Vegetariano 💚',
            price: 17,
            info: 'Includes one garlic bread, one vegetarian pasta and one soft drink',
            img: require('./2.png'),
          },
          {
            id: 13,
            name: 'Vaps Date 💕',
            price: 40,
            info: 'Includes one garlic bread with or without cheese, choice of two pizzas, one bottle of wine or four bottles of Moretti',
            img: require('./3.png'),
          },
          {
            id: 14,
            name: "Livin' your best life 😎",
            price: 80,
            info: 'Includes two garlic breads with or without cheese, four pizzas, two bottles of wine or eight bottles of beer or a mix of both',
            img: require('./4.png'),
          },
        ],
      },
      {
        category: 'Pasta NEW',
        meals: [
          {
            id: 15,
            name: 'Arrabbiata',
            price: 9.35,
            info: 'Tomato sauce, chilli, garlic, and onions',
            img: require('./5.png'),
          },
          {
            id: 16,
            name: 'Pomodoro e Mozzarella',
            price: 10.75,
            info: 'Tomato sauce, onions, mozzarella',
            img: require('./6.png'),
          },
        ],
      },
      {
        category: 'Pizza NEW',
        meals: [
          {
            id: 17,
            name: 'Salame',
            price: 11.35,
            info: 'Spicy Italian sausage, tomato sauce, mozzarella',
            img: require('./7.png'),
          },
          {
            id: 18,
            name: 'Margherity',
            price: 9.75,
            info: 'Tomato sauce, mozzarella',
            img: require('./8.png'),
          },
        ],
      },
      {
        category: 'Salad NEW',
        meals: [
          {
            id: 19,
            name: 'Insalata Mista Piccola',
            price: 5.99,
            info: 'Mixed leaf salad, cherry tomatoes and grated carrot. There can be no swaps, if you would like to add any extras please customise below.',
            img: require('./9.png'),
          },
          {
            id: 20,
            name: 'Insalata Mista della Casa',
            price: 8.95,
            info: 'Large mixed salad. There can be no swaps, if you would like to add any extras please customise below.',
            img: require('./10.png'),
          },
        ],
      },
    ],
  },
];

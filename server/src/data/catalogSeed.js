const pizzaImages = [
  '/zuzi99-pizza-3010062.jpg',
  '/tamas-pap-XLmhRnV8yuc-unsplash.jpg',
  '/tommao-wang-brC9jqsAxmU-unsplash.jpg',
  '/shourav-sheikh-Q9VEWorDhaY-unsplash.jpg',
  '/daniel-QmN3yuv5L_c-unsplash.jpg',
  '/dinesh-lunked-pxmBc2lDiMU-unsplash.jpg',
  '/fatima-akram-uU0Anw-8Vsg-unsplash.jpg',
  '/klara-kulikova-RsiNFKMvqtg-unsplash.jpg',
  '/klara-kulikova-jvWZYnxBDlQ-unsplash.jpg',
  '/mahyar-motebassem-pGA4zHvpo5E-unsplash.jpg',
  '/pablo-pacheco-D3Mag4BKqns-unsplash.jpg',
  '/pranjall-kumar-sejqj6Eaqe8-unsplash.jpg',
  '/shayan-ramesht-exSEmuA7R7k-unsplash.jpg'
];

const drinkImages = [
  'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1200&q=85'
];

const alcoholicDrinkNames = new Set([
  'Pale Lager', 'Pilsner', 'Stout', 'Wheat Ale', 'Pale Ale', 'IPA',
  'Chianti', 'Barbera', 'Lambrusco', 'Pinot Noir', 'Malbec', 'Cabernet Sauvignon',
  'Prosecco', 'Pinot Grigio', 'Sauvignon Blanc', 'Chardonnay', 'Rosé', 'Moscato d’Asti'
]);

const beverageProducts = [
  ['Dr Pepper', 'Drink', 'A complex spiced cola served cold.', [], 3, '500ml', 'Cold'],
  ['Diet Coke', 'Drink', 'Chilled zero-sugar cola.', [], 3, '500ml', 'Cold'],
  ['Fanta Orange', 'Drink', 'Cold orange soda with bright citrus flavor.', [], 3, '500ml', 'Cold'],
  ['Sprite', 'Drink', 'Cold lemon-lime soda.', [], 3, '500ml', 'Cold'],
  ['Ginger Ale', 'Drink', 'Refreshing sparkling ginger soda.', [], 3, '500ml', 'Cold'],
  ['Root Beer', 'Drink', 'Sweet vanilla and herbal soda.', [], 3, '500ml', 'Cold'],
  ['Cream Soda', 'Drink', 'Smooth vanilla-flavored sparkling soda.', [], 3, '500ml', 'Cold'],
  ['Iced Tea', 'Drink', 'Chilled black tea with lemon.', ['Tea', 'Lemon'], 3.5, '500ml', 'Cold'],
  ['Aranciata', 'Drink', 'Italian bittersweet orange soda.', ['Orange'], 3.5, '500ml', 'Cold'],
  ['Chinotto', 'Drink', 'Italian bittersweet citrus soda.', ['Citrus'], 3.5, '500ml', 'Cold'],
  ['Apple Cider', 'Drink', 'Chilled sparkling apple cider.', ['Apple'], 4, '500ml', 'Cold'],
  ['Kombucha', 'Drink', 'Chilled fermented tea tonic.', ['Tea'], 4, '500ml', 'Cold'],
  ['Pale Lager', 'Drink', 'Clean, crisp and highly carbonated lager.', [], 5, '330ml', 'Cold'],
  ['Pilsner', 'Drink', 'Light malt and a clean, refreshing finish.', [], 5, '330ml', 'Cold'],
  ['Stout', 'Drink', 'Roasted malt beverage with deep coffee notes.', [], 5.5, '330ml', 'Cold'],
  ['Wheat Ale', 'Drink', 'Soft wheat ale with light citrus notes.', [], 5.5, '330ml', 'Cold'],
  ['Pale Ale', 'Drink', 'Balanced malt and hop bitterness.', [], 5.5, '330ml', 'Cold'],
  ['IPA', 'Drink', 'Bold hop bitterness for spicy and meaty pizzas.', [], 6, '330ml', 'Cold'],
  ['Chianti', 'Drink', 'High-acid red wine for tomato-based pizzas.', [], 9, '375ml', 'Chilled'],
  ['Barbera', 'Drink', 'Bright, tart red wine for rich toppings.', [], 9, '375ml', 'Chilled'],
  ['Lambrusco', 'Drink', 'Light sparkling red wine.', [], 9, '375ml', 'Chilled'],
  ['Pinot Noir', 'Drink', 'Light red wine for mushrooms and herbs.', [], 10, '375ml', 'Chilled'],
  ['Malbec', 'Drink', 'Full-bodied red wine for meat lovers pizza.', [], 10, '375ml', 'Chilled'],
  ['Cabernet Sauvignon', 'Drink', 'Bold red wine for rich, meaty toppings.', [], 11, '375ml', 'Chilled'],
  ['Prosecco', 'Drink', 'Sparkling wine with a crisp, lifting finish.', [], 10, '375ml', 'Chilled'],
  ['Pinot Grigio', 'Drink', 'Crisp white wine for vegetables and seafood.', [], 9, '375ml', 'Chilled'],
  ['Sauvignon Blanc', 'Drink', 'Fresh citrus white wine.', [], 9, '375ml', 'Chilled'],
  ['Chardonnay', 'Drink', 'Richer white wine for creamy cheese pizzas.', [], 10, '375ml', 'Chilled'],
  ['Rosé', 'Drink', 'Bright, fruity wine between red and white.', [], 9, '375ml', 'Chilled'],
  ['Moscato d’Asti', 'Drink', 'Sweet sparkling wine for spicy toppings.', [], 10, '375ml', 'Chilled']
];

const products = [
  ['Classic Margherita', 'Classic Pizza', 'Tomato sauce, mozzarella, basil, and olive oil.', ['Tomato Sauce', 'Mozzarella', 'Basil'], 10, 'Medium', 'Thin Crust'],
  ['Marinara Napoli', 'Marinara Pizza', 'A simple Neapolitan pizza with garlic, oregano, and tomato.', ['Tomato Sauce', 'Garlic', 'Oregano'], 9, 'Medium', 'Thin Crust'],
  ['Classic Pepperoni', 'Pepperoni Pizza', 'Crisp pepperoni over rich tomato sauce and melted mozzarella.', ['Pepperoni', 'Mozzarella', 'Tomato Sauce'], 12, 'Medium', 'Thin Crust'],
  ['Four Cheese Melt', 'Cheese Pizza', 'Mozzarella, cheddar, parmesan, and creamy cheese sauce.', ['Mozzarella', 'Cheddar', 'Parmesan', 'Cheese Sauce'], 13, 'Medium', 'Cheese Burst'],
  ['Hawaiian Sunshine', 'Hawaiian Pizza', 'Ham, sweet pineapple, mozzarella, and tomato sauce.', ['Ham', 'Pineapple', 'Mozzarella'], 14, 'Medium', 'Thick Crust'],
  ['BBQ Chicken Feast', 'BBQ Pizza', 'Smoky BBQ chicken with red onion, peppers, and cheddar.', ['BBQ Chicken', 'Red Onion', 'Peppers', 'Cheddar'], 15, 'Large', 'Pan Pizza'],
  ['Buffalo Chicken Heat', 'Chicken Pizza', 'Spicy buffalo chicken with ranch drizzle and mozzarella.', ['Buffalo Chicken', 'Ranch', 'Mozzarella'], 15, 'Large', 'Stuffed Crust'],
  ['Peri Peri Chicken', 'Spicy Pizza', 'Roasted chicken, peppers, onions, and a peri peri finish.', ['Chicken', 'Green Peppers', 'Onions', 'Peri Peri Sauce'], 15, 'Large', 'Stuffed Crust'],
  ['Meat Lovers Deluxe', 'Meat Lovers Pizza', 'Beef, sausage, bacon, ham, pepperoni, and mozzarella.', ['Beef', 'Sausage', 'Bacon', 'Ham', 'Pepperoni'], 17, 'Extra Large', 'Pan Pizza'],
  ['Beef Supreme', 'Beef Pizza', 'Seasoned beef, mushrooms, peppers, onions, and mozzarella.', ['Beef', 'Mushrooms', 'Peppers', 'Onions'], 16, 'Large', 'Thick Crust'],
  ['Sausage and Hot Honey', 'Gourmet Pizza', 'Italian sausage, mozzarella, chili flakes, and sweet hot honey.', ['Sausage', 'Mozzarella', 'Chili', 'Hot Honey'], 17, 'Large', 'Thin Crust'],
  ['Garden Harvest', 'Vegetarian Pizza', 'Mushrooms, olives, spinach, sweet corn, and fresh tomatoes.', ['Mushrooms', 'Black Olives', 'Spinach', 'Sweet Corn', 'Tomatoes'], 13, 'Medium', 'Thin Crust'],
  ['Mediterranean Feta', 'Vegetarian Pizza', 'Feta, olives, tomato, spinach, peppers, and herbs.', ['Feta', 'Black Olives', 'Tomatoes', 'Spinach'], 14, 'Medium', 'Thin Crust'],
  ['Vegan Garden', 'Vegan Pizza', 'Plant-based cheese, mushrooms, peppers, onions, and basil.', ['Vegan Cheese', 'Mushrooms', 'Peppers', 'Onions'], 14, 'Medium', 'Thin Crust'],
  ['Truffle Mushroom', 'Gourmet Pizza', 'Roasted mushrooms, mozzarella, parmesan, and truffle oil.', ['Mushrooms', 'Mozzarella', 'Parmesan', 'Truffle Oil'], 18, 'Large', 'Thin Crust'],
  ['Garlic Prawn Coast', 'Seafood Pizza', 'Garlic prawns, tomatoes, mozzarella, and fresh herbs.', ['Prawns', 'Garlic', 'Tomatoes', 'Mozzarella'], 18, 'Large', 'Thin Crust'],
  ['Tuna Mediterranean', 'Seafood Pizza', 'Tuna, olives, red onion, tomato, and mozzarella.', ['Tuna', 'Black Olives', 'Red Onion', 'Mozzarella'], 16, 'Large', 'Thin Crust'],
  ['Mexican Fiesta', 'International Pizza', 'Spiced beef, jalapenos, corn, beans, and cheddar.', ['Spiced Beef', 'Jalapenos', 'Corn', 'Beans', 'Cheddar'], 16, 'Large', 'Pan Pizza'],
  ['Tandoori Paneer', 'International Pizza', 'Tandoori paneer, peppers, onion, coriander, and mozzarella.', ['Paneer', 'Peppers', 'Onions', 'Coriander'], 15, 'Large', 'Thin Crust'],
  ['Breakfast Brunch', 'Breakfast Pizza', 'Egg, bacon, sausage, tomato, and cheddar on a golden crust.', ['Egg', 'Bacon', 'Sausage', 'Tomato', 'Cheddar'], 16, 'Large', 'Pan Pizza'],
  ['Dessert Cinnamon Apple', 'Dessert Pizza', 'Warm apple, cinnamon, caramel, and sweet cream drizzle.', ['Apple', 'Cinnamon', 'Caramel', 'Sweet Cream'], 11, 'Medium', 'Sweet Crust'],
  ['Chocolate Strawberry', 'Dessert Pizza', 'Chocolate spread, strawberries, banana, and powdered sugar.', ['Chocolate', 'Strawberry', 'Banana'], 12, 'Medium', 'Sweet Crust'],
  ['Garlic Cheese Bread', 'Side', 'Oven-baked garlic bread with mozzarella and herb butter.', ['Garlic', 'Mozzarella', 'Herb Butter'], 7, 'Regular', 'Baked'],
  ['Loaded Potato Wedges', 'Side', 'Crispy wedges with cheese sauce, herbs, and chili.', ['Potato', 'Cheese Sauce', 'Herbs', 'Chili'], 6, 'Regular', 'Baked'],
  ['Mozzarella Sticks', 'Side', 'Golden mozzarella sticks served with tomato dipping sauce.', ['Mozzarella', 'Breadcrumbs', 'Tomato Sauce'], 8, 'Regular', 'Fried'],
  ['Cola', 'Drink', 'Chilled sparkling cola.', [], 3, '500ml', 'Cold'],
  ['Diet Coke', 'Drink', 'Chilled zero-sugar cola.', [], 3, '500ml', 'Cold'],
  ['Fanta Orange', 'Drink', 'Cold orange soda with a bright citrus taste.', [], 3, '500ml', 'Cold'],
  ['Sprite', 'Drink', 'Cold lemon-lime soda.', [], 3, '500ml', 'Cold'],
  ['Ginger Ale', 'Drink', 'Refreshing sparkling ginger soda.', [], 3, '500ml', 'Cold'],
  ['Iced Tea', 'Drink', 'Chilled black tea with lemon.', ['Tea', 'Lemon'], 3.5, '500ml', 'Cold'],
  ['Fresh Lemonade', 'Drink', 'Fresh lemon, water, and a touch of sweetness.', ['Lemon', 'Water'], 4, '500ml', 'Cold'],
  ['Mango Juice', 'Drink', 'Smooth chilled mango juice.', ['Mango'], 4, '500ml', 'Cold'],
  ['Apple Juice', 'Drink', 'Chilled apple juice.', ['Apple'], 4, '500ml', 'Cold'],
  ['Still Water', 'Drink', 'Cold still mineral water.', [], 2, '500ml', 'Cold'],
  ['Sparkling Water', 'Drink', 'Cold sparkling mineral water.', [], 2, '500ml', 'Cold']
  ,...beverageProducts
].map(([name, category, description, ingredients, price, size, crust], index) => {
  const imageSource = category === 'Drink' ? drinkImages : pizzaImages;
  const image = imageSource[index % imageSource.length];
  return {
    name,
    category,
    description,
    ingredients,
    price,
    size,
    crust,
    availability: true,
    isAlcoholic: alcoholicDrinkNames.has(name),
    imageUrl: image,
    imageUrls: [image],
    createdBy: 'admin@pizzaflow.local',
    updatedBy: 'admin@pizzaflow.local'
  };
});

export const productSeed = products;

export const bannerSeed = [
  {
    id: 'b1',
    title: 'Free delivery on your first order',
    subtitle: 'Use code PIZZA10 and get 10% off tonight.',
    imageUrl: pizzaImages[0],
    ctaLabel: 'Order now',
    ctaHref: '/builder',
    createdBy: 'admin@pizzaflow.local',
    updatedBy: 'admin@pizzaflow.local'
  },
  {
    id: 'b2',
    title: 'The PizzaFlow favourites',
    subtitle: 'Explore classics, chicken, BBQ, seafood, vegan, sides, desserts, and drinks.',
    imageUrl: pizzaImages[3],
    ctaLabel: 'Explore menu',
    ctaHref: '/menu',
    createdBy: 'admin@pizzaflow.local',
    updatedBy: 'admin@pizzaflow.local'
  }
];

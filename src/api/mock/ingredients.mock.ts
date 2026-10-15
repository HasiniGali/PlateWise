import { Ingredient } from '../../types';

export const MOCK_INGREDIENTS: Ingredient[] = [
  // Grains & Flours
  { id: 'ing_rice', name: 'White Basmati/Sona Masoori Rice', category: 'grain', defaultUnit: 'g', estimatedUnitCostINR: 0.06 },
  { id: 'ing_brown_rice', name: 'Brown Rice', category: 'grain', defaultUnit: 'g', estimatedUnitCostINR: 0.09 },
  { id: 'ing_poha', name: 'Flattened Rice (Poha)', category: 'grain', defaultUnit: 'g', estimatedUnitCostINR: 0.05 },
  { id: 'ing_rava', name: 'Semolina (Rava / Sooji)', category: 'grain', defaultUnit: 'g', estimatedUnitCostINR: 0.045 },
  { id: 'ing_oats', name: 'Rolled Oats', category: 'grain', defaultUnit: 'g', estimatedUnitCostINR: 0.12 },
  { id: 'ing_atta', name: 'Whole Wheat Flour (Atta)', category: 'grain', defaultUnit: 'g', estimatedUnitCostINR: 0.042 },
  { id: 'ing_bread', name: 'Bread Slices', category: 'grain', defaultUnit: 'slice', estimatedUnitCostINR: 2.5 },
  { id: 'ing_noodles', name: 'Hakka / Instant Noodles', category: 'grain', defaultUnit: 'packet', estimatedUnitCostINR: 20 },

  // Legumes & Pulses
  { id: 'ing_toor_dal', name: 'Toor Dal (Arhar Dal)', category: 'legume', defaultUnit: 'g', estimatedUnitCostINR: 0.14 },
  { id: 'ing_moong_dal', name: 'Yellow Moong Dal', category: 'legume', defaultUnit: 'g', estimatedUnitCostINR: 0.12 },
  { id: 'ing_chana_dal', name: 'Bengal Gram (Chana Dal)', category: 'legume', defaultUnit: 'g', estimatedUnitCostINR: 0.09 },
  { id: 'ing_kala_chana', name: 'Black Chickpeas (Kala Chana)', category: 'legume', defaultUnit: 'g', estimatedUnitCostINR: 0.085 },
  { id: 'ing_kabuli_chana', name: 'White Chickpeas (Chole)', category: 'legume', defaultUnit: 'g', estimatedUnitCostINR: 0.13 },
  { id: 'ing_rajma', name: 'Red Kidney Beans (Rajma)', category: 'legume', defaultUnit: 'g', estimatedUnitCostINR: 0.14 },
  { id: 'ing_soya_chunks', name: 'Nutrela Soya Chunks', category: 'legume', defaultUnit: 'g', estimatedUnitCostINR: 0.09 },

  // Dairy, Eggs & Poultry
  { id: 'ing_paneer', name: 'Fresh Paneer (Cottage Cheese)', category: 'dairy', defaultUnit: 'g', estimatedUnitCostINR: 0.42 },
  { id: 'ing_curd', name: 'Fresh Curd (Dahi)', category: 'dairy', defaultUnit: 'g', estimatedUnitCostINR: 0.08 },
  { id: 'ing_milk', name: 'Cow Milk', category: 'dairy', defaultUnit: 'ml', estimatedUnitCostINR: 0.064 },
  { id: 'ing_butter', name: 'Butter', category: 'dairy', defaultUnit: 'g', estimatedUnitCostINR: 0.55 },
  { id: 'ing_ghee', name: 'Desi Ghee', category: 'dairy', defaultUnit: 'tbsp', estimatedUnitCostINR: 15 },
  { id: 'ing_eggs', name: 'Farm Fresh Eggs', category: 'egg', defaultUnit: 'piece', estimatedUnitCostINR: 7 },
  { id: 'ing_chicken', name: 'Boneless Chicken Breast', category: 'poultry', defaultUnit: 'g', estimatedUnitCostINR: 0.32 },

  // Fresh Vegetables
  { id: 'ing_onion', name: 'Red Onion', category: 'vegetable', defaultUnit: 'g', estimatedUnitCostINR: 0.035 },
  { id: 'ing_tomato', name: 'Fresh Tomatoes', category: 'vegetable', defaultUnit: 'g', estimatedUnitCostINR: 0.03 },
  { id: 'ing_potato', name: 'Potatoes (Aloo)', category: 'vegetable', defaultUnit: 'g', estimatedUnitCostINR: 0.028 },
  { id: 'ing_green_peas', name: 'Green Peas (Matar)', category: 'vegetable', defaultUnit: 'g', estimatedUnitCostINR: 0.12 },
  { id: 'ing_spinach', name: 'Palak (Spinach)', category: 'vegetable', defaultUnit: 'bunch', estimatedUnitCostINR: 20 },
  { id: 'ing_ginger', name: 'Fresh Ginger', category: 'vegetable', defaultUnit: 'g', estimatedUnitCostINR: 0.15 },
  { id: 'ing_garlic', name: 'Garlic Cloves', category: 'vegetable', defaultUnit: 'clove', estimatedUnitCostINR: 1.5 },
  { id: 'ing_green_chili', name: 'Spicy Green Chilies', category: 'vegetable', defaultUnit: 'piece', estimatedUnitCostINR: 1 },
  { id: 'ing_capsicum', name: 'Green Bell Pepper (Capsicum)', category: 'vegetable', defaultUnit: 'g', estimatedUnitCostINR: 0.1 },
  { id: 'ing_lemon', name: 'Fresh Lemon', category: 'vegetable', defaultUnit: 'piece', estimatedUnitCostINR: 5 },
  { id: 'ing_coriander', name: 'Fresh Coriander (Dhania)', category: 'vegetable', defaultUnit: 'sprig', estimatedUnitCostINR: 2 },
  { id: 'ing_curry_leaves', name: 'Curry Leaves (Kadi Patta)', category: 'vegetable', defaultUnit: 'sprig', estimatedUnitCostINR: 2 },

  // Spices, Condiments & Pantry
  { id: 'ing_mustard_seeds', name: 'Mustard Seeds (Rai)', category: 'spice', defaultUnit: 'tsp', estimatedUnitCostINR: 2 },
  { id: 'ing_cumin_seeds', name: 'Cumin Seeds (Jeera)', category: 'spice', defaultUnit: 'tsp', estimatedUnitCostINR: 3 },
  { id: 'ing_turmeric', name: 'Turmeric Powder (Haldi)', category: 'spice', defaultUnit: 'tsp', estimatedUnitCostINR: 2 },
  { id: 'ing_red_chili_powder', name: 'Red Chili Powder', category: 'spice', defaultUnit: 'tsp', estimatedUnitCostINR: 3 },
  { id: 'ing_garam_masala', name: 'Garam Masala', category: 'spice', defaultUnit: 'tsp', estimatedUnitCostINR: 4 },
  { id: 'ing_cooking_oil', name: 'Refined Cooking Oil', category: 'condiment', defaultUnit: 'tbsp', estimatedUnitCostINR: 3 },
  { id: 'ing_peanuts', name: 'Roasted Peanuts (Moongphali)', category: 'other', defaultUnit: 'g', estimatedUnitCostINR: 0.18 },
  { id: 'ing_salt', name: 'Table Salt', category: 'condiment', defaultUnit: 'pinch', estimatedUnitCostINR: 0.5 },
];

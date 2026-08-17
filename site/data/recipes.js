/*
 * RECIPES data file.
 * Each ingredient has: name (lowercase, matches a key in NUTRITION), qty (number),
 * unit ('g'|'ml'|'tbsp'|'tsp'|'cup'|'count'|'clove'|'pinch'|'to taste'),
 * displayText (fallback original text for odd measures),
 * grams (best-estimate gram weight of THIS quantity, used only for macro calculation).
 * qty/unit scale with servings and convert between metric/imperial for display;
 * grams is used purely for nutrition math and is scaled by the same serving multiplier.
 */

const RECIPES = [
// ---------------------------------------------------------------------
{
  id: "curry-base",
  title: "Curry Base (Approx. 1 Litre Yield)",
  category: "sauce",
  tags: ["curry", "gluten-free", "sauce-base"],
  servings: 8,
  prepTime: "25-35 min (incl. cashew soak)",
  cookTime: "45-55 min + cooling",
  notes: [
    "Yields approx. 1 litre of base curry sauce, used in Madras Curry and other curries.",
    "Servings estimated at ~125ml portions of finished base."
  ],
  ingredients: [
    { name: "red onion", qty: 500, unit: "g", displayText: "500g (approx. 2-3 medium onions)", grams: 500 },
    { name: "tomato", qty: 375, unit: "g", displayText: "375g (approx. 3-4 medium tomatoes)", grams: 375 },
    { name: "garlic", qty: 38, unit: "g", displayText: "35-40g (approx. 7-10 cloves)", grams: 38 },
    { name: "ginger", qty: 20, unit: "g", displayText: "20g (approx. 1 inch piece, peeled)", grams: 20 },
    { name: "green chili", qty: 1, unit: "count", displayText: "1 (adjust to taste)", grams: 15 },
    { name: "cashew nuts", qty: 70, unit: "g", displayText: "70g (soaked 30+ min)", grams: 70 },
    { name: "cinnamon stick", qty: 1, unit: "count", displayText: "1 Ceylon cinnamon stick", grams: 3 },
    { name: "green cardamom", qty: 4, unit: "count", displayText: "4 pods", grams: 1.2 },
    { name: "black cardamom", qty: 1, unit: "count", displayText: "1 pod", grams: 0.6 },
    { name: "black peppercorn", qty: 1, unit: "count", displayText: "1 (or 2)", grams: 0.1 },
    { name: "cloves", qty: 4, unit: "count", displayText: "4", grams: 1.2 },
    { name: "star anise", qty: 0.5, unit: "count", displayText: "1/2 (or 1 small)", grams: 0.4 },
    { name: "bay leaf", qty: 1, unit: "count", displayText: "optional, 1 European bay leaf", grams: 0.2 },
    { name: "cumin", qty: 1.5, unit: "tsp", displayText: "1/2 tbsp (1.5 tsp)", grams: 3.75 },
    { name: "turmeric", qty: 1.5, unit: "tsp", displayText: "1/2 tbsp (1.5 tsp)", grams: 3.75 },
    { name: "coriander (ground)", qty: 1.5, unit: "tsp", displayText: "1/2 tbsp (1.5 tsp)", grams: 3.75 },
    { name: "red chili powder", qty: 1.5, unit: "tsp", displayText: "1/2 tbsp (1.5 tsp), to taste", grams: 3.75 },
    { name: "garam masala", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 1.25 },
    { name: "vegetable oil", qty: 200, unit: "ml", displayText: "200ml total (100ml Part 1 + 100ml Part 2)", grams: 184 },
    { name: "vegan butter", qty: 1, unit: "tbsp", displayText: "1 tbsp", grams: 14 },
    { name: "brown sugar", qty: 1.5, unit: "tsp", displayText: "1/2 tbsp (1.5 tsp)", grams: 6 },
    { name: "salt", qty: 1.5, unit: "tsp", displayText: "1/2 tbsp (1.5 tsp), to taste", grams: 9 },
    { name: "water", qty: 0, unit: "to taste", displayText: "as needed for paste/consistency", grams: 0 }
  ],
  instructions: [
    { section: "Part 1: Building the Aromatic Base", steps: [
      "Heat 100ml oil in a heavy-bottomed pot over medium heat. Add cinnamon, green & black cardamom, star anise, cloves, peppercorn (and bay leaf if using). Cook 2-3 min until fragrant.",
      "Add minced garlic, cook 1-2 min until lightly golden. Add grated ginger, cook 1 more minute.",
      "Add chopped onions and salt. Cover, cook on low 10 min, stirring occasionally, until softened and lightly browned.",
      "Remove the cinnamon stick, black cardamom and star anise piece (optional).",
      "Add chopped green chili and soaked, drained cashews.",
      "Add chopped tomatoes. Cover, cook on low 15-20 min until very soft and broken down.",
      "Remove from heat, cool completely, then blend until very smooth (add a splash of water if needed). Set aside."
    ]},
    { section: "Part 2: Finishing the Curry Base", steps: [
      "Combine cumin, turmeric, coriander and red chili powder with enough water to form a smooth paste.",
      "Melt vegan butter and the remaining 100ml oil in a clean pot over medium heat. Add the spice paste, cook 1 min, stirring, until fragrant.",
      "Add the blended tomato-onion-cashew base and the brown sugar. Stir well.",
      "Cover and cook on low 15-20 min, stirring occasionally. Adjust consistency with water if needed.",
      "Stir in the garam masala. Taste and adjust salt."
    ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "savory-dry-seasoning-blend",
  title: "Savory Dry Seasoning Blend",
  category: "condiment",
  tags: ["gluten-free", "seasoning"],
  servings: 1,
  prepTime: "5 min",
  cookTime: "0 min",
  notes: [ "Yields approx. 1/3 cup (~80mL, ~43.6g total). Treat 'servings' as one batch." ],
  ingredients: [
    { name: "nutritional yeast", qty: 26.7, unit: "g", displayText: "5 tbsp + 1 tsp (80mL), lightly packed", grams: 26.7 },
    { name: "garlic powder", qty: 3.0, unit: "g", displayText: "1 tsp", grams: 3.0 },
    { name: "brown sugar", qty: 4.0, unit: "g", displayText: "1 tsp, packed", grams: 4.0 },
    { name: "smoked paprika", qty: 1.6, unit: "g", displayText: "2/3 tsp", grams: 1.6 },
    { name: "paprika", qty: 1.6, unit: "g", displayText: "2/3 tsp", grams: 1.6 },
    { name: "salt", qty: 2.0, unit: "g", displayText: "1/3 tsp, fine grain", grams: 2.0 },
    { name: "rosemary", qty: 0.3, unit: "g", displayText: "1/3 tsp, dried", grams: 0.3 },
    { name: "chili powder", qty: 0.9, unit: "g", displayText: "1/3 tsp", grams: 0.9 },
    { name: "onion powder", qty: 1.1, unit: "g", displayText: "1/3 tsp", grams: 1.1 },
    { name: "black pepper", qty: 0.8, unit: "g", displayText: "1/3 tsp, ground", grams: 0.8 },
    { name: "coriander seeds", qty: 0.7, unit: "g", displayText: "1/3 tsp, ground", grams: 0.7 },
    { name: "cornstarch", qty: 0.9, unit: "g", displayText: "1/3 tsp cornflour", grams: 0.9 }
  ],
  instructions: [
    { section: "Method", steps: [
      "Ensure all ingredients are finely ground (especially rosemary).",
      "Combine all ingredients in a small bowl.",
      "Whisk or sift thoroughly to distribute evenly and break up clumps.",
      "Store in an airtight container in a cool, dark, dry place."
    ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "madras-curry",
  title: "Madras Curry",
  category: "curry",
  tags: ["curry", "spicy"],
  servings: 3,
  prepTime: "15-20 min",
  cookTime: "20-30 min",
  notes: [
    "Assumes you have Curry Base and pre-cooked vegetables/protein ready.",
    "\"Heaped chef's spoon\" ≈ 2-3 tbsp — used here as 2.5 tbsp."
  ],
  ingredients: [
    { name: "tomato purée", qty: 2.5, unit: "tbsp", displayText: "plain tomato paste, 1 heaped chef's spoon (~2-3 tbsp)", grams: 40 },
    { name: "vegan butter", qty: 1, unit: "tbsp", displayText: "1 knob (~1 tbsp)", grams: 14 },
    { name: "ground fenugreek", qty: 1, unit: "pinch", displayText: "1 pinch", grams: 0.3 },
    { name: "chaat masala", qty: 1, unit: "pinch", displayText: "1 pinch", grams: 0.3 },
    { name: "vegetable oil", qty: 1.5, unit: "tbsp", displayText: "spiced oil from curry base, 1-2 tbsp", grams: 14 },
    { name: "kasuri methi", qty: 1, unit: "pinch", displayText: "dried fenugreek leaves, 1 pinch", grams: 0.2 },
    { name: "ginger", qty: 10, unit: "g", displayText: "approx. 1 inch piece, finely chopped", grams: 10 },
    { name: "garlic", qty: 2.5, unit: "clove", displayText: "2-3 cloves, minced", grams: 7.5 },
    { name: "green chili", qty: 1.5, unit: "count", displayText: "1-2, slit or chopped (optional)", grams: 15 },
    { name: "water", qty: 0, unit: "to taste", displayText: "as needed for consistency", grams: 0 },
    { name: "turmeric", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 1.25 },
    { name: "kashmiri chili powder", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 1.25 },
    { name: "coriander (ground)", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 1.25 },
    { name: "cumin", qty: 0.5, unit: "tsp", displayText: "ground cumin, 1/2 tsp", grams: 1.25 },
    { name: "black pepper", qty: 0.5, unit: "tsp", displayText: "ground black pepper, 1/2 tsp", grams: 1.25 },
    { name: "pre-cooked vegetables", qty: 200, unit: "g", displayText: "e.g. potatoes, peas, cauliflower, carrots, bell peppers", grams: 200 },
    { name: "pre-cooked protein", qty: 200, unit: "g", displayText: "e.g. tofu, chickpeas, seitan, lentils", grams: 200 },
    { name: "fresh coriander", qty: 1, unit: "pinch", displayText: "a pinch, chopped (for cooking)", grams: 1 },
    { name: "green chili", qty: 1, unit: "count", displayText: "1, finely chopped (extra fresh heat, optional)", grams: 10 },
    { name: "curry base sauce", qty: 2.5, unit: "tbsp", displayText: "1 heaped chef's spoon (~2-3 tbsp, or more to taste)", grams: 40 },
    { name: "salt", qty: 0.5, unit: "tsp", displayText: "1/2 tsp, or to taste", grams: 3 },
    { name: "coconut cream", qty: 1.5, unit: "tbsp", displayText: "full-fat coconut cream, 1.5 tbsp", grams: 23 },
    { name: "chaat masala", qty: 0.5, unit: "tsp", displayText: "for finishing, 1/2 tsp", grams: 1.25 },
    { name: "ginger", qty: 2, unit: "g", displayText: "thin strips, for garnish", grams: 2 }
  ],
  instructions: [
    { section: "Step 1: Enriched Tomato Paste", steps: [
      "Gently heat the plain tomato paste with the knob of vegan butter, pinch of ground fenugreek, and pinch of chaat masala until combined and fragrant. Set aside (or do this directly in the curry pan)."
    ]},
    { section: "Step 2: Build the Curry", steps: [
      "Heat the spiced oil (or plain oil) in a medium pot/karahi over medium heat.",
      "Scrunch in the dried fenugreek leaves, let sizzle a few seconds.",
      "Add chopped ginger, cook ~30 sec until aromatic.",
      "Add minced garlic, cook 30-60 sec until fragrant (do not brown).",
      "If using, add optional green chilies, cook 1 minute.",
      "Add the enriched tomato paste. Cook 1-2 min, stirring, until it deepens in colour.",
      "Splash of water if too thick.",
      "Stir in turmeric, kashmiri chili powder, coriander powder, cumin, black pepper. Cook 30-60 sec until fragrant.",
      "Add a little more water to form a thick sauce base.",
      "Add pre-cooked vegetables and protein. Stir to coat, cook 2-3 min.",
      "Add the pinch of fresh coriander and extra chopped green chili if using. Cook 1 more minute.",
      "Add the curry base sauce. Stir well, cook 2-3 min to meld flavours.",
      "Add salt and stir.",
      "Continue cooking, stirring occasionally, until oil visibly separates at the edges (5-10 min). Add water splashes if too thick.",
      "Stir in the coconut cream. Cook 1 more minute until heated through.",
      "Off heat: stir in chaat masala and a large pinch of fresh coriander."
    ]},
    { section: "Step 3: Garnish and Serve", steps: [
      "Garnish with more fresh coriander and ginger strips.",
      "Serve hot with rice, roti, naan, or your preferred accompaniment."
    ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "vegan-butter-tofu-makhani",
  title: "Vegan Butter Tofu (Tofu Makhani)",
  category: "curry",
  tags: ["tofu", "curry", "gluten-free"],
  servings: 4,
  prepTime: "20 min",
  cookTime: "35-40 min + 1-4h marinating",
  notes: ["Serve with steamed basmati rice and vegan naan (not scaled as ingredients here)."],
  ingredients: [
    { name: "extra-firm tofu", qty: 450, unit: "g", displayText: "pressed 30+ min, 450g", grams: 450 },
    { name: "vegan yogurt", qty: 45, unit: "ml", displayText: "plain unsweetened, 3 tbsp", grams: 45 },
    { name: "lemon juice", qty: 15, unit: "ml", displayText: "1 tbsp", grams: 15 },
    { name: "ginger-garlic paste", qty: 22.5, unit: "ml", displayText: "1.5 tbsp", grams: 24 },
    { name: "vegetable oil", qty: 15, unit: "ml", displayText: "neutral oil, 1 tbsp", grams: 13.8 },
    { name: "kashmiri chili powder", qty: 5, unit: "ml", displayText: "1 tsp (or 3/4 tsp paprika + 1/4 tsp cayenne)", grams: 2.5 },
    { name: "garam masala", qty: 5, unit: "ml", displayText: "1 tsp", grams: 2.5 },
    { name: "turmeric", qty: 2.5, unit: "ml", displayText: "1/2 tsp", grams: 1.25 },
    { name: "salt", qty: 5, unit: "ml", displayText: "1 tsp", grams: 6 },
    { name: "nutritional yeast", qty: 30, unit: "ml", displayText: "2 tbsp, optional", grams: 10 },
    { name: "raw cashews", qty: 35, unit: "g", displayText: "35g", grams: 35 },
    { name: "water", qty: 120, unit: "ml", displayText: "hot water, 120ml", grams: 120 },
    { name: "vegan butter", qty: 60, unit: "g", displayText: "60g, divided", grams: 60 },
    { name: "green cardamom", qty: 3, unit: "count", displayText: "3 pods, optional", grams: 0.9 },
    { name: "cinnamon stick", qty: 1, unit: "count", displayText: "2-3cm piece, optional", grams: 2 },
    { name: "cloves", qty: 2.5, unit: "count", displayText: "2-3 whole, optional", grams: 0.75 },
    { name: "ginger-garlic paste", qty: 22.5, unit: "ml", displayText: "1.5 tbsp", grams: 24 },
    { name: "kashmiri chili powder", qty: 5, unit: "ml", displayText: "1 tsp", grams: 2.5 },
    { name: "turmeric", qty: 2.5, unit: "ml", displayText: "1/2 tsp", grams: 1.25 },
    { name: "crushed tomatoes", qty: 800, unit: "g", displayText: "crushed tomatoes or passata, 800g", grams: 800 },
    { name: "salt", qty: 5, unit: "ml", displayText: "1 tsp, plus more to taste", grams: 6 },
    { name: "sugar", qty: 7.5, unit: "ml", displayText: "sugar or maple syrup, 1.5 tsp", grams: 8 },
    { name: "garam masala", qty: 5, unit: "ml", displayText: "1 tsp", grams: 2.5 },
    { name: "kasuri methi", qty: 15, unit: "ml", displayText: "dried fenugreek leaves, 1 tbsp", grams: 1.5 },
    { name: "plant milk", qty: 90, unit: "ml", displayText: "full-fat unsweetened plant milk or vegan cream, 60-120ml", grams: 90 },
    { name: "fresh coriander", qty: 3, unit: "g", displayText: "chopped, to garnish", grams: 3 }
  ],
  instructions: [
    { section: "Stage 1: Marinate the Tofu", steps: [
      "Tear pressed tofu into bite-sized irregular pieces.",
      "Whisk yogurt, lemon juice, ginger-garlic paste, oil, chili powder, garam masala, turmeric, salt and nutritional yeast until smooth.",
      "Toss tofu in the marinade, cover and refrigerate 1-4 hours."
    ]},
    { section: "Stage 2: Cook the Tofu", steps: [
      "Pan-fry: 1-2 tbsp oil, medium-high heat, 3-4 min per side until golden.",
      "Or air fry at 200°C for 12-15 min, shaking halfway.",
      "Or bake at 200°C for 20-25 min, turning halfway."
    ]},
    { section: "Stage 3: Makhani Sauce", steps: [
      "Soak cashews in hot water 15 min; blend with soaking liquid until smooth.",
      "Melt 45g vegan butter in a pot over medium heat, add whole spices, cook 30-45 sec until fragrant.",
      "Add ginger-garlic paste, cook 1 min.",
      "Add chili powder and turmeric, stir 20-30 sec (do not burn).",
      "Add tomatoes and salt, simmer partially covered 15-20 min until raw taste is gone.",
      "Stir in cashew cream, simmer 5 min.",
      "Remove whole spices; blend the sauce until smooth.",
      "Return to low heat, stir in sugar/syrup, garam masala, kasuri methi, remaining 15g butter and plant milk. Heat gently 1-2 min (do not boil)."
    ]},
    { section: "Stage 4 & 5: Assemble and Serve", steps: [
      "Fold the cooked tofu into the sauce, simmer 2-3 minutes.",
      "Divide into bowls, garnish with coriander, serve with basmati rice and naan."
    ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "kebab-shop-doner-wrap-bread",
  title: "Kebab Shop Döner Wrap Bread (Lavash-style)",
  category: "bread",
  tags: ["bread", "yeasted"],
  servings: 6,
  prepTime: "15 min + ~1h proof",
  cookTime: "~2 min per wrap",
  notes: [],
  ingredients: [
    { name: "plain flour", qty: 400, unit: "g", displayText: "400g", grams: 400 },
    { name: "salt", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 6 },
    { name: "sugar", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 4 },
    { name: "yeast", qty: 7, unit: "g", displayText: "instant yeast, 7g", grams: 7 },
    { name: "water", qty: 250, unit: "ml", displayText: "warm water, 250ml", grams: 250 },
    { name: "vegetable oil", qty: 2, unit: "tbsp", displayText: "2 tbsp", grams: 27 },
    { name: "vegan yogurt", qty: 2, unit: "tbsp", displayText: "unsweetened, 2 tbsp", grams: 30 }
  ],
  instructions: [
    { section: "Method", steps: [
      "Mix all ingredients in a large bowl until a shaggy dough forms.",
      "Knead 8-10 minutes until smooth and elastic.",
      "First proof: cover and rest 45-75 minutes.",
      "Punch down, divide into 6 equal balls, rest covered 10-15 minutes.",
      "Roll each ball into a thin circle, 2-3mm thick.",
      "Cook in a dry pan over medium-high heat, 45-60 sec first side, 30-45 sec second side, until bubbling and lightly charred.",
      "Stack cooked wraps on a plate and cover immediately with a towel to trap steam and keep them soft."
    ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "soya-milk-vegan-burger-buns",
  title: "Soya Milk Vegan Burger Buns",
  category: "bread",
  tags: ["bread", "yeasted"],
  servings: 6,
  prepTime: "20 min",
  cookTime: "15-17 min + 1h40 rise",
  notes: [
    "Makes bigger buns: for ~118g buns ('The Perfect \"Just Bigger\" Burger Buns' variant), scale to 400g flour, 7g yeast, 240ml soya milk, 35ml vegetable oil, 20g sugar, 7g salt — same method, still makes 6 buns."
  ],
  ingredients: [
    { name: "plain flour", qty: 300, unit: "g", displayText: "all-purpose flour, ~9.7% protein, 300g", grams: 300 },
    { name: "yeast", qty: 6, unit: "g", displayText: "active dry yeast, 6g", grams: 6 },
    { name: "soy milk", qty: 180, unit: "ml", displayText: "soya milk, warmed, plus extra for brushing", grams: 180 },
    { name: "vegetable oil", qty: 25, unit: "ml", displayText: "25ml", grams: 23 },
    { name: "sugar", qty: 15, unit: "g", displayText: "15g", grams: 15 },
    { name: "salt", qty: 5, unit: "g", displayText: "5g", grams: 5 }
  ],
  instructions: [
    { section: "Method", steps: [
      "Whisk together 200g of the flour and all the yeast. In a separate jug combine warm soya milk, oil, sugar and salt.",
      "Pour wet into dry, stir to a shaggy dough. Gradually add remaining 100g flour until dough pulls from the sides.",
      "Knead 8-10 minutes until smooth and elastic.",
      "First rise: cover, let rise in a warm place ~1 hour until doubled.",
      "Punch down, divide into 6 portions (~90g each), shape into tight balls.",
      "Second rise: proof on a lined tray, covered, ~40 minutes until puffy.",
      "Preheat oven to 190°C (375°F). Brush tops with a little soya milk.",
      "Bake 15-17 minutes until deep golden and hollow-sounding.",
      "Cool completely on a wire rack before slicing."
    ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "vegan-naan",
  title: "Vegan Naan",
  category: "bread",
  tags: ["bread", "no-yeast"],
  servings: 7,
  prepTime: "15 min + 30-60 min rest",
  cookTime: "10-15 min",
  notes: [],
  ingredients: [
    { name: "strong white bread flour", qty: 300, unit: "g", displayText: "300g", grams: 300 },
    { name: "salt", qty: 6, unit: "g", displayText: "6g", grams: 6 },
    { name: "baking powder", qty: 6, unit: "g", displayText: "6g", grams: 6 },
    { name: "sugar", qty: 1, unit: "tsp", displayText: "1 tsp (optional)", grams: 4 },
    { name: "vegan yogurt", qty: 90, unit: "g", displayText: "plant-based Greek-style yoghurt, 90g", grams: 90 },
    { name: "water", qty: 130, unit: "g", displayText: "warm water, 120-140g", grams: 130 },
    { name: "vegan butter", qty: 25, unit: "g", displayText: "melted vegan butter or neutral oil, 25g", grams: 25 },
    { name: "vegetable oil", qty: 5, unit: "g", displayText: "neutral oil, for greasing", grams: 5 },
    { name: "strong white bread flour", qty: 10, unit: "g", displayText: "extra flour, for dusting", grams: 10 }
  ],
  instructions: [
    { section: "Method", steps: [
      "Mix flour, salt, baking powder and sugar.",
      "Add yoghurt and melted vegan butter. Gradually add warm water to form a soft dough.",
      "Knead 5-8 minutes until smooth, then rest covered for 30-60 minutes.",
      "Divide into 6-8 balls and roll into ovals or teardrops.",
      "Cook in a very hot dry pan until bubbles form and underside is browned, then flip and cook the other side.",
      "Brush with melted vegan butter or oil and serve."
    ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "water-based-vegan-burger-buns",
  title: "Water-Based Vegan Burger Buns",
  category: "bread",
  tags: ["bread", "yeasted"],
  servings: 6,
  prepTime: "20 min",
  cookTime: "17-20 min + ~1h50 rise",
  notes: ["Water-based version — paler crust and slightly chewier crumb than the soya milk version; use the optional sugar wash for better colour."],
  ingredients: [
    { name: "plain flour", qty: 375, unit: "g", displayText: "all-purpose flour, 375g", grams: 375 },
    { name: "yeast", qty: 6.5, unit: "g", displayText: "active dry yeast, 6.5g", grams: 6.5 },
    { name: "water", qty: 225, unit: "ml", displayText: "warm water, 225ml", grams: 225 },
    { name: "vegetable oil", qty: 33, unit: "ml", displayText: "33ml", grams: 30 },
    { name: "sugar", qty: 20, unit: "g", displayText: "20g", grams: 20 },
    { name: "salt", qty: 6, unit: "g", displayText: "6g", grams: 6 },
    { name: "sugar", qty: 1, unit: "tsp", displayText: "optional sugar wash: 1 tsp sugar", grams: 4 },
    { name: "water", qty: 1, unit: "tbsp", displayText: "optional sugar wash: 1 tbsp warm water", grams: 15 }
  ],
  instructions: [
    { section: "Method", steps: [
      "Whisk 250g of the flour with all the yeast. In a jug, stir warm water, oil, sugar and salt until dissolved.",
      "Combine wet and dry to a shaggy dough, gradually add remaining 125g flour until it pulls from the sides.",
      "Knead 8-10 minutes until smooth and elastic.",
      "First rise ~1 hour, covered, until doubled.",
      "Divide into 6 portions (~110g each), shape into tight balls.",
      "Second rise 40-50 minutes, covered, until puffy.",
      "Preheat oven to 190°C (375°F). Brush with optional sugar wash for colour.",
      "Bake 17-20 minutes until light golden and hollow-sounding.",
      "Cool completely on a wire rack."
    ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "gastropub-vegan-sausage-meat",
  title: "Gastropub Vegan Pork-Style Sausage Meat",
  category: "protein",
  tags: ["seitan", "high-protein"],
  servings: 7,
  prepTime: "30 min",
  cookTime: "20-22 min steam + chill",
  notes: ["Optimised for duxelle + caramelised onion + laminated croissant dough sausage rolls. Yields enough for approx. 6-8 large rolls."],
  ingredients: [
    { name: "vital wheat gluten", qty: 110, unit: "g", displayText: "110g", grams: 110 },
    { name: "methylcellulose", qty: 13.5, unit: "g", displayText: "Methocel F50, 12-15g", grams: 13.5 },
    { name: "oat flour", qty: 25, unit: "g", displayText: "25g", grams: 25 },
    { name: "tapioca starch", qty: 10, unit: "g", displayText: "10g", grams: 10 },
    { name: "nutritional yeast", qty: 1, unit: "tbsp", displayText: "1 tbsp", grams: 5 },
    { name: "salt", qty: 1.25, unit: "tsp", displayText: "1¼ tsp", grams: 7.5 },
    { name: "MSG", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 3 },
    { name: "white pepper", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 2.5 },
    { name: "black pepper", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 1.25 },
    { name: "dried sage", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 1.25 },
    { name: "nutmeg", qty: 0.125, unit: "tsp", displayText: "1/8 tsp", grams: 0.6 },
    { name: "baking powder", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 1.5 },
    { name: "cannellini beans", qty: 240, unit: "g", displayText: "240g", grams: 240 },
    { name: "refined coconut oil", qty: 30, unit: "g", displayText: "frozen solid, 30g", grams: 30 },
    { name: "vegan butter", qty: 20, unit: "g", displayText: "melted, 20g", grams: 20 },
    { name: "vegetable oil", qty: 1, unit: "tbsp", displayText: "neutral oil, 1 tbsp", grams: 13.5 },
    { name: "water", qty: 140, unit: "ml", displayText: "cold water, 140ml", grams: 140 },
    { name: "soy sauce", qty: 1, unit: "tbsp", displayText: "1 tbsp", grams: 15 },
    { name: "cider vinegar", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 5 },
    { name: "maple syrup", qty: 1, unit: "tsp", displayText: "maple syrup or sugar, 1 tsp", grams: 7 },
    { name: "marmite", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 3 },
    { name: "onion", qty: 0.5, unit: "count", displayText: "1/2 small onion", grams: 60 },
    { name: "garlic", qty: 1, unit: "clove", displayText: "1 clove", grams: 3 }
  ],
  instructions: [
    { section: "1. Prepare the 'Suet' Fat", steps: [ "Freeze coconut oil 20 min until rock hard. Chop into pebble-sized granules (3-5mm). Keep chilled until needed." ]},
    { section: "2. The Wet Phase", steps: [ "Blitz cannellini beans, onion, garlic, melted vegan butter, neutral oil, cold water, soy sauce, vinegar, maple syrup and marmite until completely smooth." ]},
    { section: "3. Combine", steps: [ "Add the wet mixture to the dry mixture. Mix lightly by hand ~25 seconds. Fold in the frozen coconut oil pebbles last, using fingertips only." ]},
    { section: "4. Rest", steps: [ "Let the dough sit 10 minutes to hydrate." ]},
    { section: "5. Shape", steps: [ "Form into tight sausage logs (~3cm diameter). Wrap firmly in cling film or parchment + foil." ]},
    { section: "6. Pre-Set (Steam)", steps: [ "Steam or covered-bake at 92-95°C for 20-22 minutes." ]},
    { section: "7. Chill Fully", steps: [ "Refrigerate the cooked logs until completely cold and the fat re-solidifies before using in pastry." ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "smoky-savory-vegan-deli-ham",
  title: "Smoky & Savory Vegan Deli Ham",
  category: "protein",
  tags: ["seitan", "high-protein", "deli"],
  servings: 10,
  prepTime: "20 min",
  cookTime: "40-60 min + chilling",
  notes: ["Seitan-based sliceable deli ham. No deli press? Shape into a tight log, wrap in parchment then foil, twist ends, and bake as directed."],
  ingredients: [
    { name: "cannellini beans", qty: 400, unit: "g", displayText: "1 tin (~400g/15oz), drained, liquid reserved", grams: 400 },
    { name: "aquafaba", qty: 60, unit: "g", displayText: "reserved liquid from the tin", grams: 60 },
    { name: "miso paste", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 5 },
    { name: "nutritional yeast", qty: 3, unit: "tbsp", displayText: "3 tbsp", grams: 15 },
    { name: "garlic granules", qty: 1, unit: "tbsp", displayText: "1 tbsp", grams: 7 },
    { name: "onion granules", qty: 1, unit: "tbsp", displayText: "1 tbsp", grams: 10 },
    { name: "smoked salt", qty: 1, unit: "tbsp", displayText: "1 tbsp (or 1 tbsp salt + 1 tsp smoked paprika)", grams: 18 },
    { name: "MSG", qty: 1, unit: "tsp", displayText: "1 tsp, optional", grams: 5 },
    { name: "baking powder", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 3 },
    { name: "tapioca starch", qty: 2, unit: "tbsp", displayText: "2 tbsp", grams: 18 },
    { name: "liquid smoke", qty: 1, unit: "tbsp", displayText: "1 tbsp", grams: 15 },
    { name: "red food colouring", qty: 0.25, unit: "tsp", displayText: "1/4 tsp, liquid or powder", grams: 1 },
    { name: "vital wheat gluten", qty: 250, unit: "g", displayText: "250g (~2 cups)", grams: 250 }
  ],
  instructions: [
    { section: "Method", steps: [
      "Preheat oven to 175°C (350°F). Lightly grease your deli press.",
      "Blend all Wet Blend ingredients until completely smooth and uniform in colour.",
      "Pour the liquid blend into a large bowl. Add the vital wheat gluten and mix until a shaggy dough forms.",
      "Knead 3-5 minutes until firm and elastic.",
      "Shape into a compact log, pack into the greased deli press, secure the lid.",
      "Bake 40-60 min; internal temp should reach ~85°C (185°F).",
      "Cool completely on a wire rack before opening; refrigerate a few hours or overnight for best texture.",
      "Slice thinly for sandwiches or cube for other uses."
    ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "umami-burger",
  title: "The Definitive Umami Burger",
  category: "protein",
  tags: ["high-protein", "burger"],
  servings: 9,
  prepTime: "30 min",
  cookTime: "8-10 min per batch + 90+ min chill",
  notes: ["Yields 8-10 substantial patties."],
  ingredients: [
    { name: "olive oil", qty: 2, unit: "tbsp", displayText: "2 tbsp", grams: 27 },
    { name: "red onion", qty: 1, unit: "count", displayText: "1 large, finely chopped", grams: 280 },
    { name: "red bell pepper", qty: 1, unit: "count", displayText: "1 whole, finely chopped", grams: 180 },
    { name: "garlic", qty: 6, unit: "clove", displayText: "6 cloves, minced", grams: 18 },
    { name: "tomato purée", qty: 2, unit: "tbsp", displayText: "2 tbsp", grams: 32 },
    { name: "soy sauce", qty: 2, unit: "tbsp", displayText: "tamari or soy sauce, 2 tbsp", grams: 30 },
    { name: "worcestershire sauce", qty: 2, unit: "tbsp", displayText: "vegan Worcestershire sauce, 2 tbsp", grams: 30 },
    { name: "miso paste", qty: 2, unit: "tbsp", displayText: "red or white miso, 2 tbsp", grams: 32 },
    { name: "marmite", qty: 2, unit: "tsp", displayText: "2 tsp", grams: 12 },
    { name: "brown sugar", qty: 2, unit: "tsp", displayText: "light brown sugar (or maple syrup), 2 tsp", grams: 8 },
    { name: "dried porcini powder", qty: 3.5, unit: "tbsp", displayText: "3-4 tbsp", grams: 25 },
    { name: "vital wheat gluten", qty: 90, unit: "g", displayText: "3/4 cup, 90g", grams: 90 },
    { name: "nutritional yeast", qty: 40, unit: "g", displayText: "1/2 cup, 40g", grams: 40 },
    { name: "smoked paprika", qty: 2, unit: "tsp", displayText: "2 tsp", grams: 5 },
    { name: "black pepper", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 2.5 },
    { name: "MSG", qty: 0.625, unit: "tsp", displayText: "1/2 - 3/4 tsp", grams: 3.75 },
    { name: "kidney beans", qty: 850, unit: "g", displayText: "2 cans (15oz/425g each) red kidney or cannellini beans, rinsed, oven-dried", grams: 850 },
    { name: "walnuts", qty: 120, unit: "g", displayText: "toasted, 1 cup, 120g", grams: 120 },
    { name: "fresh coriander", qty: 0.5, unit: "cup", displayText: "chopped, 1/2 cup", grams: 8 },
    { name: "methylcellulose", qty: 16, unit: "g", displayText: "Methocel F50, 4 tsp (~16g)", grams: 16 },
    { name: "water", qty: 120, unit: "ml", displayText: "ice-cold, 1/2 cup", grams: 120 }
  ],
  instructions: [
    { section: "1. Sauté the Flavour Base", steps: [
      "Heat olive oil in a large skillet over medium heat. Cook onion and red pepper 10-15 min until very soft and jammy.",
      "Add garlic and tomato purée, cook 1 more minute. Scrape into a large bowl and cool completely."
    ]},
    { section: "2. Prepare the Liquids", steps: [
      "Whisk together all Umami Liquid ingredients until dissolved.",
      "In a separate bowl, whisk methylcellulose into the ice-cold water until smooth. Pour the umami liquid into the methocel water and whisk to combine."
    ]},
    { section: "3. Process the Bulk Ingredients", steps: [
      "Pulse toasted walnuts in a food processor until coarsely ground.",
      "Add the oven-dried beans, pulse 4-6 times only — keep it coarse and crumbly."
    ]},
    { section: "4. Combine", steps: [
      "Add the bean/walnut mix to the cooled sautéed vegetables. Sprinkle over the Dry Mix ingredients and chopped coriander."
    ]},
    { section: "5. Bring it Together", steps: [
      "Pour in the liquid binder. Mix by hand until just incorporated — do not overmix."
    ]},
    { section: "6. Chill", steps: [
      "Cover and refrigerate at least 90 minutes so the gluten hydrates and the mixture firms up."
    ]},
    { section: "7. Shape", steps: [
      "Divide into 8-10 portions. With damp hands, shape into patties 1/2-3/4 inch thick, dimple the centre."
    ]},
    { section: "8. Cook", steps: [
      "Heat oil in a cast-iron or non-stick skillet over medium-high. Cook patties 4-5 min per side until a deep crust forms and they feel firm. Cook in batches."
    ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "tofu-beef-mince",
  title: "Tofu \"Beef\" Mince",
  category: "protein",
  tags: ["tofu", "high-protein", "gluten-free"],
  servings: 4,
  prepTime: "10 min",
  cookTime: "20-30 min",
  notes: [
    "Yields approx. 2 cups, enough to substitute ~450g ground beef.",
    "Great in bolognese, chili, tacos, shepherd's pie, lasagna, or stuffed peppers."
  ],
  ingredients: [
    { name: "firm tofu", qty: 300, unit: "g", displayText: "firm or extra-firm tofu, crumbled, 300g", grams: 300 },
    { name: "vegetable oil", qty: 2, unit: "tbsp", displayText: "neutral oil, 2 tbsp", grams: 27 },
    { name: "soy sauce", qty: 2, unit: "tbsp", displayText: "soy sauce or tamari, 2 tbsp", grams: 30 },
    { name: "nutritional yeast", qty: 2, unit: "tbsp", displayText: "2 tbsp", grams: 10 },
    { name: "water", qty: 2, unit: "tbsp", displayText: "2 tbsp", grams: 30 },
    { name: "marmite", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 6 },
    { name: "garlic powder", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 2.5 },
    { name: "smoked paprika", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 2.5 },
    { name: "liquid smoke", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 2.5 },
    { name: "maggi seasoning", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 2.5 },
    { name: "onion powder", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 1.25 },
    { name: "worcestershire sauce", qty: 1, unit: "tsp", displayText: "vegan Worcestershire sauce, 1 tsp", grams: 5 }
  ],
  instructions: [
    { section: "Step 1: Prepare the Tofu and Oven", steps: [
      "Preheat oven to 175°C (350°F). Line a baking sheet with parchment.",
      "Press the tofu well, then crumble into irregular pieces resembling ground meat."
    ]},
    { section: "Step 2: Marinade", steps: [
      "Whisk together the oil, soy sauce, nutritional yeast, water, marmite, garlic powder, smoked paprika, liquid smoke, maggi, onion powder and Worcestershire sauce until the marmite dissolves and the marinade is smooth."
    ]},
    { section: "Step 3: Marinate", steps: [
      "Pour the marinade over the crumbled tofu and toss until every piece is coated."
    ]},
    { section: "Step 4: Bake", steps: [
      "Spread in a single even layer on the baking sheet.",
      "Bake 20-30 min: 20-25 for a softer mince (sauces), full 30 for firmer/browned (tacos, chili). Stir at halfway.",
      "Ready when browned, chewy, and liquid is absorbed."
    ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "cauliflower-steaks-butter-bean-puree-chimichurri",
  title: "Cauliflower Steaks with Butter Bean Purée & Chimichurri",
  category: "mains",
  tags: ["gluten-free", "high-protein"],
  servings: 2,
  prepTime: "20 min",
  cookTime: "15-20 min",
  notes: ["Roast the leftover florets on a tray at the same time — don't waste them."],
  ingredients: [
    { name: "cauliflower", qty: 2, unit: "count", displayText: "2 thick steaks, cut from the centre of 1 large head", grams: 500 },
    { name: "smoked paprika", qty: 1, unit: "tbsp", displayText: "1 tbsp", grams: 7 },
    { name: "garlic", qty: 3, unit: "clove", displayText: "3 cloves, bashed", grams: 9 },
    { name: "vegan butter", qty: 2, unit: "tbsp", displayText: "2 tbsp (or use vegan butter)", grams: 28 },
    { name: "olive oil", qty: 1, unit: "tbsp", displayText: "for drizzling and massaging into the cauliflower", grams: 14 },
    { name: "salt", qty: 0, unit: "to taste", displayText: "to taste", grams: 0 },
    { name: "black pepper", qty: 0, unit: "to taste", displayText: "to taste", grams: 0 },
    { name: "cauliflower leaves and stems", qty: 100, unit: "g", displayText: "reserved, finely chopped", grams: 100 },
    { name: "fresh coriander", qty: 30, unit: "g", displayText: "flat-leaf parsley, 1 large bunch, finely chopped", grams: 30 },
    { name: "garlic", qty: 1, unit: "clove", displayText: "1 clove, minced (chimichurri)", grams: 3 },
    { name: "red chili", qty: 1, unit: "count", displayText: "1, finely diced, de-seeded for less heat", grams: 15 },
    { name: "red wine vinegar", qty: 2, unit: "tbsp", displayText: "2 tbsp", grams: 30 },
    { name: "extra virgin olive oil", qty: 100, unit: "ml", displayText: "100ml", grams: 92 },
    { name: "salt", qty: 0, unit: "to taste", displayText: "salt and pepper, to taste", grams: 0 },
    { name: "butter beans", qty: 700, unit: "g", displayText: "jarred, keep the liquid/aquafaba", grams: 700 },
    { name: "lemon", qty: 1, unit: "count", displayText: "1, juiced", grams: 45 },
    { name: "garlic", qty: 1, unit: "clove", displayText: "1 clove (purée)", grams: 3 },
    { name: "nutritional yeast", qty: 2, unit: "tbsp", displayText: "2 tbsp", grams: 10 },
    { name: "salt", qty: 0, unit: "to taste", displayText: "salt and pepper, to taste", grams: 0 }
  ],
  instructions: [
    { section: "1. Make the Chimichurri", steps: [ "Combine chopped parsley, diced chili and minced garlic. Stir in vinegar. Slowly whisk in the olive oil. Season and let sit 20-30 minutes." ]},
    { section: "2. Butter Bean Purée", steps: [ "Blitz the beans (with liquid), lemon juice, garlic, nutritional yeast, salt and pepper until completely smooth. Thin with water/lemon juice if needed." ]},
    { section: "3. Prep the Cauliflower", steps: [ "Cut two 1-inch thick steaks from the centre of the cauliflower. Season both sides with salt, pepper and smoked paprika, drizzle with oil and massage in." ]},
    { section: "4. Sear and Baste", steps: [ "Heat olive oil in a large pan over medium-high. Press the steaks in, fry 4-5 min until deeply golden.", "Flip, add butter and bashed garlic. Baste continuously as the butter foams until tender but still with a bite. Rest." ]},
    { section: "5. Zero-Waste Garnish", steps: [ "In the same pan, sauté the chopped cauliflower leaves and stems with a pinch of salt until crispy and golden." ]},
    { section: "6. Assembly", steps: [ "Spread warm butter bean purée on each plate. Top with the cauliflower steak, spoon over chimichurri, finish with crispy leaves and stems." ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "cozy-italian-lentil-stew",
  title: "Cozy Italian Lentil Stew",
  category: "mains",
  tags: ["gluten-free", "stew", "high-protein"],
  servings: 5,
  prepTime: "20 min",
  cookTime: "30-40 min",
  notes: [
    "Optional toppings not scaled as core ingredients: baked spiced tofu cubes, sautéed collard greens, peas/broccoli/roasted veg, vegan feta or Beyond sausage slices."
  ],
  ingredients: [
    { name: "onion", qty: 1.5, unit: "count", displayText: "1-2 onions", grams: 225 },
    { name: "red bell pepper", qty: 3, unit: "count", displayText: "3 multicoloured bell peppers", grams: 450 },
    { name: "potatoes", qty: 1.5, unit: "count", displayText: "1-2 potatoes, diced small", grams: 225 },
    { name: "celery", qty: 1, unit: "count", displayText: "optional", grams: 50 },
    { name: "carrots", qty: 1, unit: "count", displayText: "optional", grams: 60 },
    { name: "garlic", qty: 6, unit: "clove", displayText: "6 cloves", grams: 18 },
    { name: "lemon", qty: 1, unit: "count", displayText: "1, zest + juice", grams: 60 },
    { name: "tomato purée", qty: 3, unit: "tbsp", displayText: "tomato paste, 3 tbsp", grams: 48 },
    { name: "crushed tomatoes", qty: 400, unit: "g", displayText: "1 can, no salt added", grams: 400 },
    { name: "water", qty: 1080, unit: "ml", displayText: "water or broth, 4-5 cups", grams: 1080 },
    { name: "bay leaf", qty: 2, unit: "count", displayText: "2 bay leaves", grams: 0.4 },
    { name: "lentils (dried)", qty: 250, unit: "g", displayText: "French green lentils, rinsed", grams: 250 },
    { name: "olive oil", qty: 2, unit: "tbsp", displayText: "for cooking", grams: 27 },
    { name: "fresh coriander", qty: 10, unit: "g", displayText: "fresh parsley, chopped", grams: 10 },
    { name: "salt", qty: 0, unit: "to taste", displayText: "salt & black pepper, to taste", grams: 0 },
    { name: "coriander seeds", qty: 1, unit: "tbsp", displayText: "1 tbsp", grams: 7 },
    { name: "fennel seeds", qty: 1, unit: "tbsp", displayText: "1 tbsp", grams: 7 },
    { name: "anise seeds", qty: 0.75, unit: "tsp", displayText: "3/4 tsp", grams: 1.9 },
    { name: "white peppercorns", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 2.5 },
    { name: "chili flakes", qty: 1, unit: "pinch", displayText: "red chili flakes, pinch", grams: 0.3 }
  ],
  instructions: [
    { section: "1. Prep Vegetables", steps: [ "Dice onions, peppers and potatoes small to match lentil size. Optionally add celery and carrots." ]},
    { section: "2. Make Spice Paste", steps: [ "Crush coriander seeds, fennel seeds, anise seeds, peppercorns and chili in a mortar and pestle. Add garlic and lemon zest, pound into a paste." ]},
    { section: "3. Build Flavour Base", steps: [
      "Heat olive oil in a pan. Fry tomato paste until it darkens and caramelises.",
      "Add the spice paste and garlic, stir until fragrant.",
      "Stir in rinsed lentils.",
      "Add lemon juice, bay leaves, crushed tomatoes and water/broth. Bring to a boil."
    ]},
    { section: "4. Add Potatoes & Simmer", steps: [ "Add diced potatoes once boiling. Lower heat and simmer 20-30 min until lentils are tender and stew thickens. Adjust with extra broth if too thick." ]},
    { section: "5. Season & Finish", steps: [ "Taste and adjust with salt, pepper, smoked paprika. Stir in fresh parsley near the end." ]},
    { section: "6. Prepare Toppings", steps: [ "Bake tofu cubes with spice rub at 175°C for ~30 min. Blanch and sauté collard greens with garlic. Prepare other toppings as desired." ]},
    { section: "7. Serve", steps: [ "Ladle stew into bowls, add colourful toppings, and serve." ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "crispy-tofu-shawarma",
  title: "Crispy Tofu Shawarma",
  category: "mains",
  tags: ["tofu", "gluten-free", "high-protein"],
  servings: 2,
  prepTime: "15 min",
  cookTime: "20-25 min",
  notes: [],
  ingredients: [
    { name: "firm tofu", qty: 400, unit: "g", displayText: "firm or extra-firm tofu, 400g", grams: 400 },
    { name: "olive oil", qty: 2, unit: "tbsp", displayText: "2 tbsp", grams: 27 },
    { name: "vegan yogurt", qty: 2, unit: "tbsp", displayText: "unsweetened, 2 tbsp", grams: 30 },
    { name: "cornstarch", qty: 1, unit: "tbsp", displayText: "1 tbsp, optional", grams: 8 },
    { name: "soy sauce", qty: 1, unit: "tbsp", displayText: "1 tbsp, optional", grams: 15 },
    { name: "garlic powder", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 2.5 },
    { name: "onion powder", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 2.5 },
    { name: "smoked paprika", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 2.5 },
    { name: "cumin", qty: 1, unit: "tsp", displayText: "ground cumin, 1 tsp", grams: 2.5 },
    { name: "coriander (ground)", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 2.5 },
    { name: "dried oregano", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 1.25 },
    { name: "chili flakes", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 1.25 },
    { name: "black pepper", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 1.25 },
    { name: "sea salt", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 3 },
    { name: "vegan yogurt", qty: 0.5, unit: "cup", displayText: "1/2 cup", grams: 120 },
    { name: "lemon juice", qty: 1, unit: "tbsp", displayText: "1 tbsp", grams: 15 },
    { name: "garlic", qty: 1, unit: "clove", displayText: "1 clove, grated", grams: 3 },
    { name: "dill", qty: 2, unit: "tbsp", displayText: "fresh dill or mint, chopped, 2 tbsp", grams: 6 },
    { name: "salt", qty: 1, unit: "pinch", displayText: "pinch", grams: 0.3 },
    { name: "red onion", qty: 0.25, unit: "count", displayText: "1/4, thinly sliced", grams: 35 },
    { name: "cucumber", qty: 0.5, unit: "count", displayText: "1/2, diced", grams: 150 },
    { name: "cherry tomatoes", qty: 1, unit: "cup", displayText: "halved, 1 cup", grams: 150 },
    { name: "salt", qty: 1, unit: "pinch", displayText: "salt and pepper, pinch", grams: 0.3 },
    { name: "flatbread", qty: 2, unit: "count", displayText: "2 large flatbreads or wraps", grams: 160 }
  ],
  instructions: [
    { section: "Method", steps: [
      "Preheat oven to 220°C (425°F), line a baking sheet.",
      "Pat tofu dry, shave into thin slices (2-4mm) with a peeler, knife or mandoline.",
      "Toss tofu with olive oil, yogurt, cornstarch, soy sauce and all the spices until evenly coated.",
      "Spread in a single layer, bake 20-25 min, flipping halfway, until crispy and golden.",
      "Stir together the Garlic Yogurt Sauce ingredients while tofu bakes.",
      "Toss the salad ingredients with a pinch of salt and pepper.",
      "Warm the flatbreads in a dry skillet, ~30 sec per side.",
      "Spread yogurt sauce on a warm flatbread, top with crispy tofu and salad, drizzle more sauce, wrap tightly."
    ]}
  ]
}
,// ---------------------------------------------------------------------
{
  id: "beefy-tofu-shepherds-pie",
  title: "Ultimate \"Beefy\" Tofu Shepherd's Pie",
  category: "mains",
  tags: ["tofu", "high-protein", "comfort-food"],
  servings: 5,
  prepTime: "20 min",
  cookTime: "1 hour",
  notes: [
    "Uses the larger, later 1.2kg potato-topping version (the earlier 600g version is a duplicate/superseded draft)."
  ],
  ingredients: [
    { name: "firm tofu", qty: 450, unit: "g", displayText: "firm or extra-firm tofu, pressed, 450g", grams: 450 },
    { name: "soy sauce", qty: 3, unit: "tbsp", displayText: "soy sauce or tamari, 3 tbsp", grams: 45 },
    { name: "marmite", qty: 1.5, unit: "tsp", displayText: "1½ tsp, dissolved in warm water", grams: 9 },
    { name: "water", qty: 3, unit: "tbsp", displayText: "warm water for dissolving marmite, 3 tbsp", grams: 45 },
    { name: "tomato purée", qty: 1, unit: "tbsp", displayText: "1 tbsp", grams: 16 },
    { name: "balsamic vinegar", qty: 1.5, unit: "tbsp", displayText: "balsamic vinegar or red wine, 1½ tbsp", grams: 22.5 },
    { name: "vegetable oil", qty: 1.5, unit: "tbsp", displayText: "neutral or toasted sesame oil, 1½ tbsp", grams: 20.25 },
    { name: "nutritional yeast", qty: 1.5, unit: "tbsp", displayText: "1½ tbsp", grams: 7.5 },
    { name: "garlic powder", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 2.5 },
    { name: "MSG", qty: 0.5, unit: "tsp", displayText: "1/2 tsp, optional", grams: 3 },
    { name: "dried thyme", qty: 0.75, unit: "tsp", displayText: "3/4 tsp", grams: 1.9 },
    { name: "fennel seeds", qty: 0.5, unit: "tsp", displayText: "toasted, crushed, scant 1/2 tsp", grams: 1.25 },
    { name: "cumin", qty: 0.5, unit: "tsp", displayText: "ground cumin, scant 1/2 tsp", grams: 1.25 },
    { name: "ground clove/allspice", qty: 1, unit: "pinch", displayText: "generous pinch", grams: 0.3 },
    { name: "bay leaf", qty: 1, unit: "count", displayText: "1 medium, crumbled or ground", grams: 0.2 },
    { name: "smoked paprika", qty: 0.75, unit: "tsp", displayText: "3/4 tsp", grams: 1.9 },
    { name: "black pepper", qty: 1, unit: "tsp", displayText: "generous amount, cracked", grams: 1.5 },
    { name: "liquid smoke", qty: 0.375, unit: "tsp", displayText: "3/8 tsp, optional", grams: 1.9 },
    { name: "potatoes", qty: 1200, unit: "g", displayText: "Maris Piper or King Edward, 1.2kg", grams: 1200 },
    { name: "vegan butter", qty: 50, unit: "g", displayText: "50g", grams: 50 },
    { name: "soy milk", qty: 87.5, unit: "ml", displayText: "unsweetened, 75-100ml", grams: 87.5 },
    { name: "nutritional yeast", qty: 2, unit: "tbsp", displayText: "2 tbsp", grams: 10 },
    { name: "salt", qty: 0, unit: "to taste", displayText: "salt and white pepper, to taste", grams: 0 },
    { name: "olive oil", qty: 2, unit: "tbsp", displayText: "for frying, 2 tbsp", grams: 27 },
    { name: "onion", qty: 1, unit: "count", displayText: "1 large, diced", grams: 200 },
    { name: "carrots", qty: 2, unit: "count", displayText: "2, diced", grams: 120 },
    { name: "celery", qty: 2, unit: "count", displayText: "2 sticks, diced", grams: 80 },
    { name: "garlic", qty: 2, unit: "clove", displayText: "2 cloves, minced", grams: 6 },
    { name: "tomato purée", qty: 2, unit: "tbsp", displayText: "2 tbsp", grams: 32 },
    { name: "plain flour", qty: 1, unit: "tbsp", displayText: "1 tbsp", grams: 8 },
    { name: "vegetable stock", qty: 250, unit: "ml", displayText: "250ml", grams: 250 },
    { name: "red wine", qty: 100, unit: "ml", displayText: "100ml, optional but recommended", grams: 100 },
    { name: "worcestershire sauce", qty: 1, unit: "tbsp", displayText: "vegan Worcestershire sauce, 1 tbsp", grams: 15 },
    { name: "english mustard", qty: 1, unit: "tsp", displayText: "1 tsp", grams: 5 },
    { name: "fresh thyme", qty: 1, unit: "tsp", displayText: "1 tsp (or 1/2 tsp dried)", grams: 1 },
    { name: "rosemary", qty: 0.5, unit: "tsp", displayText: "1/2 tsp", grams: 1.25 },
    { name: "frozen peas", qty: 100, unit: "g", displayText: "100g", grams: 100 }
  ],
  instructions: [
    { section: "1. Bake the Tofu Mince", steps: [
      "Preheat oven to 200°C (180°C fan/400°F). Crumble pressed tofu into 'mince'.",
      "Dissolve marmite in the warm water, then whisk in tomato purée, MSG, garlic powder and remaining marinade ingredients.",
      "Toss the tofu in the marinade until fully coated. Spread on a lined tray and bake 20-25 min, tossing halfway, until darkened and chewy."
    ]},
    { section: "2. Make the Mash", steps: [
      "Boil the potatoes until tender. Drain well, let steam escape a minute.",
      "Mash with vegan butter, soy milk and nutritional yeast. Season with salt and white pepper."
    ]},
    { section: "3. Build the Gravy Base", steps: [
      "Heat olive oil in a large pan over medium heat. Fry onion, carrot, celery ~10 min until softened.",
      "Add garlic, cook 1 min until fragrant."
    ]},
    { section: "4. Thicken and Deglaze", steps: [
      "Stir in tomato purée, cook 1 min to darken. Add flour, cook 30 sec.",
      "Pour in red wine, scraping up any bits, and reduce by about half."
    ]},
    { section: "5. Simmer and Combine", steps: [
      "Add vegetable stock, Worcestershire sauce, mustard, rosemary and thyme.",
      "Scrape the baked tofu mince into the gravy. Simmer 5-10 min until thickened.",
      "Fold in frozen peas at the end. Adjust seasoning."
    ]},
    { section: "6. Assemble and Bake", steps: [
      "Transfer filling to a 9x13-inch baking dish. Spread mash on top, rough the surface with a fork.",
      "Bake at 200°C/180°C fan for 25-30 min until bubbling. Grill 3-5 min for a crispy top."
    ]}
  ]
}
];

if (typeof module !== "undefined" && module.exports) { module.exports = RECIPES; }

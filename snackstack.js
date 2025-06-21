// 🔁 Load existing foods from localStorage, or start with an empty array
let favoriteFoods = JSON.parse(localStorage.getItem("favoriteFoods")) || [];

// 💾 Save current food list to localStorage
function saveFoods() {
  localStorage.setItem("favoriteFoods", JSON.stringify(favoriteFoods));
}

// 🎨 Get an emoji based on the food category
function getEmoji(category) {
  const map = {
    healthy: "🥗",
    junk: "🍔",
    dessert: "🍩",
    fruit: "🍎",
    drink: "🥤"
  };
  return map[category.toLowerCase()] || "🍽️";
}

// 🎉 Fun facts to show randomly
const facts = [
  "🥕 Carrots were originally purple!",
  "🍍 Pineapples take 2 years to grow.",
  "🍫 Chocolate was once used as money.",
  "🥚 Eggs float when they go bad.",
  "🌶️ Spicy foods trigger feel-good hormones.",
  "🍌 Bananas are berries, but strawberries aren't!",
  "🧄 Garlic can help repel mosquitoes.",
  "🥒 Cucumbers are 95% water.",
  "🍯 Honey never spoils — archaeologists found edible honey in ancient tombs.",
  "🥜 Peanuts aren’t nuts; they’re legumes!"
];
// 🧠 Pick a random fact and show it in the page
function showRandomFact() {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  const factElement = document.getElementById("food-fact");
  if (factElement) {
    factElement.textContent = fact;
  }
}

// 🧾 Render all foods in the UI
function renderFoods(foodArray) {
  const list = document.getElementById("food-list");
  list.innerHTML = "";

  if (foodArray.length === 0) {
    list.innerHTML = "<li>No favorite foods yet!</li>";
    return;
  }

  foodArray.forEach((food, index) => {
    const li = document.createElement("li");
    li.classList.add("fade-in");

    // 🧠 Add emoji + random border color
    li.textContent = `${getEmoji(food.category)} ${food.name} (${food.category})`;
    li.style.borderLeft = `5px solid hsl(${Math.random() * 360}, 70%, 60%)`;

    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.onclick = () => {
      favoriteFoods.splice(index, 1);
      saveFoods();
      renderFoods(favoriteFoods);
    };

    li.appendChild(btn);
    list.appendChild(li);
  });
}

// ➕ Handle food submission
document.getElementById("food-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("food-name").value.trim();
  const category = document.getElementById("food-category").value.trim();

  if (name && category) {
    const food = { name, category };
    favoriteFoods.push(food);
    saveFoods();
    document.getElementById("food-name").value = "";
    document.getElementById("food-category").value = "";
    renderFoods(favoriteFoods);
    showRandomFact(); // 👀 Show a new fact every time a food is added
  }
});

// 🔎 Filter foods by category
function filterByCategory() {
  const filter = document.getElementById("category-filter").value.trim().toLowerCase();

  const filtered = favoriteFoods.filter(food =>
    food.category.toLowerCase() === filter
  );

  renderFoods(filtered);
}

// 🔄 Reset filter and show full list again
function resetFilter() {
  document.getElementById("category-filter").value = "";
  renderFoods(favoriteFoods);
}

// 🚀 Start by rendering any saved foods
renderFoods(favoriteFoods);
showRandomFact(); // ✨ Show a fun fact on page load too

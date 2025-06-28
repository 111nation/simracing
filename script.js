// Define all available tags here for easy editing
const availableTags = [
  "Wheel",
  "2 Pedals",
  "3 Pedals",
  "Paddle Shifters",
  "Clutch",
  "Gearbox",
  "Handbrake",
  "Force Feedback",
  "Vibration",
  "Shifter"
];

// Aliases map: alias -> canonical tag
const tagAliases = {
  "Clutch": "3 Pedals",
  "Paddle Shifts": "Paddle Shifters",
  "3 Pedal": "3 Pedals",
  "Paddles": "Paddle Shifters",
  "Shifter": "Gearbox",
  "Vibration": "Vibration Feedback"
  // Add more as needed
};

// List of tags to show as buttons (canonical + selected aliases)
const tagButtons = [
  ...availableTags,
  ...Object.keys(tagAliases)
];

const products = [
  {
    title: "PXN V900 Gaming Steering Wheel",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/71dKxA9AxRL._SL1500_.jpg",
    buyLink: "https://amzn.to/3GjFGb2",
    tags: ["Wheel", "2 Pedals", "Paddle Shifters", "Vibration"]
  },
  {
    title: "HORI Racing Wheel Apex",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/41YQ6-A5YIL._SX342_.jpg",
    buyLink: "https://amzn.to/4khZ7iz",
    tags: ["Wheel", "2 Pedals", "Paddle Shifters", "Vibration"]
  },
  {
    title: "PXN V9 Steering Wheel",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/61pryi2dtdL._SX342_.jpg",
    buyLink: "https://amzn.to/44nwSJh",
    tags: ["Wheel", "3 Pedals", "Paddle Shifters", "Gearbox", "Vibration"]
  },
  {
    title: "PXN V3II Racing Wheel",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/71HLlsPBVXL._SX342_.jpg",
    buyLink: "https://amzn.to/44gkZWV",
    tags: ["Wheel", "2 Pedals", "Paddle Shifters", "Vibration", "Gearbox"]
  },
  {
    title: "Superdrive SV450 Racing Wheel",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/812Oo+ztqzL._SX342_.jpg",
    buyLink: "https://amzn.to/3TRWUiN",
    tags: ["Wheel", "2 Pedals", "Paddle Shifters", "Vibration"]
  },
  {
    title: "PXN V9 GEN2 Racing Wheel",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/61uU9YruRAL._SX342_.jpg",
    buyLink: "https://amzn.to/4ezXEmn",
    tags: ["Wheel", "3 Pedals", "Paddle Shifters", "Gearbox", "Vibration Feedback"]
  },
  {
    title: "DOYO Gaming Racing Wheel 1080 Degree",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/61Q1GzBkPML._SX342_.jpg",
    buyLink: "https://amzn.to/4nofDQP",
    tags: ["Wheel", "3 Pedals", "Paddle Shifters", "Clutch", "Vibration Feedback", "Force Feedback"]
  },
  {
    title: "DOYO 270 Degree Racing Wheel",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/61yC4vaKfKL._SX342_.jpg",
    buyLink: "https://amzn.to/3TRYD7L",
    tags: ["Wheel", "2 Pedals", "Paddle Shifters", "Vibration", "Gearbox"]
  },
  {
    title: "DOYO Gaming Steering Wheel",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/616o-mpEBDL._SX342_.jpg",
    buyLink: "https://amzn.to/4lmQwvM",
    tags: ["Wheel", "2 Pedals", "Paddle Shifters", "PC Compatible"]
  },
  {
    title: "Superdrive GS850-X Racing Steering Wheel",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/71B9x5Fw9cL._SX342_.jpg",
    buyLink: "https://amzn.to/4l4yq24",
    tags: ["Wheel", "3 Pedals", "Paddle Shifters", "Gearbox", "Handbrake", "Vibration"]
  },
  {
    title: "DOYO Gaming Steering Wheel",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/71KyN4U8MtL._SX342_.jpg",
    buyLink: "https://amzn.to/3I0mC1Z",
    tags: ["Wheel", "3 Pedals", "Paddle Shifters", "Gearbox", "Vibration Feedback"]
  },
  {
    title: "THRUSTMASTER Ferrari 458 Spider Racing Wheel",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/61Q1qeI7B-S._SX342_.jpg",
    buyLink: "https://amzn.to/3I0IjPz",
    tags: ["Wheel", "2 Pedals", "Paddle Shifters"]
  },
  {
    title: "SUBSONIC Superdrive GS550",
    price: null,
    oldPrice: null,
    discount: "",
    description: "",
    image: "https://m.media-amazon.com/images/I/519D3HC067L._SX342_.jpg",
    buyLink: "https://amzn.to/40urOS6",
    tags: ["Wheel", "2 Pedals", "Paddle Shifters", "Shifter", "Vibration"]
  }
];
let filteredProducts = [...products];
let currentSort = 'recommended';
let lastFilter = { min: null, max: null };
let selectedTags = [];

// Helper to get/set favourites in localStorage
function getFavourites() {
  return JSON.parse(localStorage.getItem('favourites') || '[]');
}
function setFavourites(favs) {
  localStorage.setItem('favourites', JSON.stringify(favs));
}

// Add a favourite property to products if not present
products.forEach(p => { if (p.favourite === undefined) p.favourite = false; });

// On load, sync favourites from localStorage
const favIds = getFavourites();
products.forEach((p, i) => { p.favourite = favIds.includes(p.title); });

function toggleFavourite(title) {
  const favs = getFavourites();
  const idx = favs.indexOf(title);
  if (idx === -1) favs.push(title);
  else favs.splice(idx, 1);
  setFavourites(favs);
  products.forEach(p => { p.favourite = favs.includes(p.title); });
  // Re-render grid
  renderProducts(filteredProducts);
  // Update favourite button in detail view if open
  const detail = document.getElementById('productDetail');
  if (detail.style.display === 'block') {
    const btn = detail.querySelector('.favourite-btn');
    const p = products.find(p => p.title === title);
    if (btn && p) {
      btn.innerHTML = p.favourite ? '★ Remove Favourite' : '☆ Add Favourite';
    }
    // Also update the title star
    const titleSpan = detail.querySelector('.product-detail-title');
    if (titleSpan) {
      titleSpan.innerHTML = p.title + (p.favourite ? ' ★' : '');
    }
  }
}

function renderProducts(list) {
  // Favourites first unless sorted/filtered
  let sortedList = list;
  if (currentSort === 'recommended' && !window._filterActive) {
    sortedList = [...list].sort((a, b) => (b.favourite ? 1 : 0) - (a.favourite ? 1 : 0));
  }
  const grid = document.getElementById('productGrid');
  grid.innerHTML = sortedList.map((p) => `
    <div class="product-card${p.favourite ? ' favourite' : ''}" onclick="showProductDetailByTitle('${encodeURIComponent(p.title)}')">
      ${p.discount ? `<div class="discount-badge">${p.discount}</div>` : ""}
      <div class="product-img-wrap" style="width: 100%; margin: auto; margin-bottom: 10px">
        <img src="${p.image}" alt="${p.title}" style="width: 100%; height: auto; display: block; box-sizing: border-box;" />
      </div>
      <div class="product-info">
        <div class="product-title">${p.title} ${p.favourite ? '★' : ''}</div>
        <!-- Price hidden -->
        <!--<div class="product-price">$${p.price} ${p.oldPrice ? `<span class=\"old-price\">$${p.oldPrice}</span>` : ""}</div>-->
      </div>
    </div>
  `).join('');
}

window.showProductDetailByTitle = function(title) {
  title = decodeURIComponent(title);
  const idx = filteredProducts.findIndex(p => p.title === title);
  if (idx !== -1) showProductDetail(idx);
}

window.showProductDetail = function(idx, pushState = true) {
  const p = filteredProducts[idx];
  const detail = document.getElementById('productDetail');

  // Render tags for this product
  const tagHtml = p.tags.map(tag => `<span class="product-tag">${tag}</span>`).join(' ');
  // Render compatibility info
  const compatTags = p.tags.filter(tag => tag.includes('Compatible'));
  let compatHtml = '';
  if (compatTags.length > 0) {
    compatHtml = `<div class="product-compat"><b>Compatible with:</b> ${compatTags.join(', ')}</div>`;
  }

  detail.innerHTML = `
    <button class=\"back-btn\" onclick=\"hideProductDetail()\">&larr; Back</button>
    <div class=\"product-detail-discount-badge${p.discount ? '' : ' hidden'}\">${p.discount || ''}</div>
    <span class=\"product-detail-title\">${p.title} ${p.favourite ? '★' : ''}</span>
    <div class=\"product-detail-img-wrap\">
      <img src="${p.image}" alt="${p.title}" class="product-detail-img" style="width: 100%; object-fit: cover; border-radius: 12px; margin: 18px 0 10px 0; display: block;" />
    </div>
    <div class=\"product-detail-tags\">${tagHtml}</div>
    <div class=\"product-detail-top\">
      <div class=\"product-detail-info-block\">
        <div class=\"product-detail-price-wrap\">
          <!-- Price hidden -->
        </div>
      </div>
    </div>
    <button class=\"favourite-btn\" onclick=\"event.stopPropagation();toggleFavourite('${p.title}')\">${p.favourite ? '★ Remove Favourite' : '☆ Add Favourite'}</button>
    <p class=\"product-desc\">${compatHtml}${p.description || "No description available."}</p>
    <div class=\"detail-actions\">
      <a href=\"${p.video || '#'}\" target=\"_blank\" class=\"detail-btn\">Video Reviews</a>
      <a href=\"${p.reviews || '#'}\" target=\"_blank\" class=\"detail-btn\">Customer Reviews</a>
    </div>
  `;
  document.getElementById('productGrid').style.display = 'none';
  detail.style.display = 'block';

  // Hide tag filter bar
  const tagFilterBar = document.getElementById('tagFilterBar');
  if (tagFilterBar) tagFilterBar.style.display = 'none';

  // Hide search, sort, and filter controls
  document.querySelector('.search-bar-container').style.display = 'none';
  document.querySelector('.controls-container').style.display = 'none';

  // Render the buy button in its own container
  const buyBtnContainer = document.getElementById('buyBtnContainer');
  buyBtnContainer.innerHTML = `<a href="${p.buyLink}" target="_blank" class="buy-btn-link"><button class="buy-btn">Buy at amazon.com</button></a>`;
  buyBtnContainer.style.display = 'block';

  // Show notif bar
  document.querySelector('.notif-bar').classList.add('show');

  // Push state to history for back button support
  if (pushState) {
    history.pushState({ productDetail: true }, '', '');
  }
}

window.hideProductDetail = function(popState = false) {
  document.getElementById('productDetail').style.display = 'none';
  document.getElementById('productGrid').style.display = 'grid';
  // Show tag filter bar again
  const tagFilterBar = document.getElementById('tagFilterBar');
  if (tagFilterBar) tagFilterBar.style.display = '';
  // Show search, sort, and filter controls again
  document.querySelector('.search-bar-container').style.display = '';
  document.querySelector('.controls-container').style.display = '';
  // Hide the buy button container
  document.getElementById('buyBtnContainer').style.display = 'none';
  // Hide notif bar
  document.querySelector('.notif-bar').classList.remove('show');
  // Only go back in history if not triggered by popstate
  if (!popState && history.state && history.state.productDetail) {
    history.back();
  }
}

// Listen for browser back/forward
window.addEventListener('popstate', function(e) {
  const detail = document.getElementById('productDetail');
  if (detail && detail.style.display === 'block') {
    window.hideProductDetail(true);
  }
});

function setSort(order) {
  currentSort = order;
  sortProducts();
  document.getElementById('sortDropdown').style.display = 'none';
}

function sortProducts() {
  if (currentSort === 'asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else {
    // Recommended: original order
    filteredProducts = filteredProducts.slice().sort((a, b) => products.indexOf(a) - products.indexOf(b));
  }
  renderProducts(filteredProducts);
}

function applyFilter() {
  const min = parseFloat(document.getElementById('minPrice').value) || 0;
  const max = parseFloat(document.getElementById('maxPrice').value) || Infinity;
  lastFilter = { min, max };
  filteredProducts = products.filter(p => p.price >= min && p.price <= max);
  sortProducts();
  document.getElementById('filterPanel').style.display = 'none';
}

function closeFilterPanel() {
  document.getElementById('filterPanel').style.display = 'none';
}

document.getElementById('searchInput').addEventListener('input', function(e) {
  const val = e.target.value.toLowerCase();
  filteredProducts = products.filter(p => p.title.toLowerCase().includes(val));
  // Re-apply filter if set
  if (lastFilter.min !== null || lastFilter.max !== null) {
    filteredProducts = filteredProducts.filter(p => p.price >= (lastFilter.min || 0) && p.price <= (lastFilter.max || Infinity));
  }
  sortProducts();
});

document.getElementById('sortBtn').addEventListener('click', function() {
  const dropdown = document.getElementById('sortDropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'flex' : 'none';
  document.getElementById('filterPanel').style.display = 'none';
});

document.getElementById('filterBtn').addEventListener('click', function() {
  const panel = document.getElementById('filterPanel');
  panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
  document.getElementById('sortDropdown').style.display = 'none';
});

// Hide dropdowns when clicking outside
window.addEventListener('click', function(e) {
  if (!e.target.closest('.main-controls') && !e.target.closest('.dropdown-menu')) {
    document.getElementById('sortDropdown').style.display = 'none';
  }
  if (!e.target.closest('.main-controls') && !e.target.closest('.filter-panel')) {
    document.getElementById('filterPanel').style.display = 'none';
  }
});

function getCanonicalTag(tag) {
  return tagAliases[tag] || tag;
}

function filterByTags() {
  if (selectedTags.length === 0) {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(p =>
      selectedTags.every(tag => {
        const canonical = getCanonicalTag(tag);
        return p.tags.includes(canonical);
      })
    );
  }
  renderProducts(filteredProducts);
}

// Dynamically render tag buttons from tagButtons (canonical + aliases)
window.addEventListener('DOMContentLoaded', function() {
  const tagList = document.querySelector('.tag-list');
  if (tagList) {
    tagList.innerHTML = tagButtons.map(tag => {
      const isAlias = !!tagAliases[tag];
      return `<button class="tag-btn${isAlias ? ' tag-alias' : ''}" data-tag="${tag}">${tag}</button>`;
    }).join('');
  }

  // Tag button click logic (works with dynamic buttons)
  let tagBtns = document.querySelectorAll('.tag-btn');
  tagBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tag = btn.getAttribute('data-tag');
      if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(t => t !== tag);
        btn.classList.remove('selected');
      } else {
        selectedTags.push(tag);
        btn.classList.add('selected');
      }
      filterByTags();
    });
  });
});

// Initial render
renderProducts(filteredProducts); 
const products = [
  { title: "Quality Tyres", price: 150, oldPrice: 200, discount: "-25%", description: "High-quality tyres for all terrains. Durable and reliable.", video: "https://www.youtube.com/results?search_query=tyres+review", reviews: "https://www.trustpilot.com/review/tyres.com", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80" },
  { title: "Shocks", price: 20, oldPrice: 30, discount: "-33%", description: "Premium shocks for a smooth ride.", video: "https://www.youtube.com/results?search_query=shocks+review", reviews: "https://www.trustpilot.com/review/shocks.com", image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80" },
  { title: "Ceramic Brake Pads", price: 125, oldPrice: 150, discount: "-16%", description: "Long-lasting ceramic brake pads for superior stopping power.", video: "https://www.youtube.com/results?search_query=ceramic+brake+pads+review", reviews: "https://www.trustpilot.com/review/brakepads.com", image: "https://images.unsplash.com/photo-1465146344425-f00d5f8b7885?auto=format&fit=crop&w=400&q=80" },
  { title: "Interior Mats", price: 20, description: "Comfortable and easy-to-clean interior mats.", video: "https://www.youtube.com/results?search_query=interior+mats+review", reviews: "https://www.trustpilot.com/review/interiormats.com", image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80" },
  { title: "Interior Mats", price: 20, description: "Comfortable and easy-to-clean interior mats.", video: "https://www.youtube.com/results?search_query=interior+mats+review", reviews: "https://www.trustpilot.com/review/interiormats.com", image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80" },
  { title: "Interior Mats", price: 20, description: "Comfortable and easy-to-clean interior mats.", video: "https://www.youtube.com/results?search_query=interior+mats+review", reviews: "https://www.trustpilot.com/review/interiormats.com", image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80" }
];
let filteredProducts = [...products];
let currentSort = 'recommended';
let lastFilter = { min: null, max: null };

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
      <div class="product-info">
        <div class="product-title">${p.title} ${p.favourite ? '★' : ''}</div>
        <div class="product-price">$${p.price} ${p.oldPrice ? `<span class=\"old-price\">$${p.oldPrice}</span>` : ""}</div>
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
  detail.innerHTML = `
    <button class=\"back-btn\" onclick=\"hideProductDetail()\">&larr; Back</button>
    <div class=\"product-detail-discount-badge${p.discount ? '' : ' hidden'}\">${p.discount || ''}</div>
    <span class=\"product-detail-title\">${p.title} ${p.favourite ? '★' : ''}</span>
    <div class=\"product-detail-top\">
      <div class=\"product-detail-title-img\">
        <div class=\"product-detail-img-wrap\"></div>
      </div>
      <div class=\"product-detail-info-block\">
        <span class=\"product-detail-rating\">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
        <div class=\"product-detail-summary\">Includes blah blah blah</div>
        <div class=\"product-detail-price-wrap\">
          <div class=\"product-price-detail\">$${p.price} ${p.oldPrice ? `<span class='old-price'>$${p.oldPrice}</span>` : ""}</div>
        </div>
      </div>
    </div>
    <button class=\"favourite-btn\" onclick=\"event.stopPropagation();toggleFavourite('${p.title}')\">${p.favourite ? '★ Remove Favourite' : '☆ Add Favourite'}</button>
    <p class=\"product-desc\">${p.description || "No description available."}</p>
    <div class=\"detail-actions\">
      <a href=\"${p.video}\" target=\"_blank\" class=\"detail-btn\">Video Reviews</a>
      <a href=\"${p.reviews}\" target=\"_blank\" class=\"detail-btn\">Customer Reviews</a>
    </div>
  `;
  document.getElementById('productGrid').style.display = 'none';
  detail.style.display = 'block';

  // Hide search, sort, and filter controls
  document.querySelector('.search-bar-container').style.display = 'none';
  document.querySelector('.controls-container').style.display = 'none';

  // Render the buy button in its own container
  const buyBtnContainer = document.getElementById('buyBtnContainer');
  buyBtnContainer.innerHTML = '<button class="buy-btn">Buy at amazon.com</button>';
  buyBtnContainer.style.display = 'block';

  // Show notif bar
  document.querySelector('.notif-bar').classList.add('show');

  // Set the background image for the product-detail-img-wrap
  const imgWrap = detail.querySelector('.product-detail-img-wrap');
  if (imgWrap && p.image) {
    imgWrap.style.backgroundImage = `url('${p.image}')`;
    imgWrap.style.backgroundSize = 'cover';
    imgWrap.style.backgroundPosition = 'center';
    imgWrap.style.backgroundRepeat = 'no-repeat';
  }

  // Push state to history for back button support
  if (pushState) {
    history.pushState({ productDetail: true }, '', '');
  }
}

window.hideProductDetail = function(popState = false) {
  document.getElementById('productDetail').style.display = 'none';
  document.getElementById('productGrid').style.display = 'grid';
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

// Initial render
renderProducts(filteredProducts); 
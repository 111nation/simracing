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

function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = list.map((p, i) => `
    <div class="product-card" onclick="showProductDetail(${i})">
      ${p.discount ? `<div class="discount-badge">${p.discount}</div>` : ""}
      <div class="product-info">
        <div class="product-title">${p.title}</div>
        <div class="product-price">$${p.price} ${p.oldPrice ? `<span class="old-price">$${p.oldPrice}</span>` : ""}</div>
      </div>
    </div>
  `).join('');
}

window.showProductDetail = function(idx) {
  const p = filteredProducts[idx];
  const detail = document.getElementById('productDetail');
  detail.innerHTML = `
    <button class="back-btn" onclick="hideProductDetail()">&larr; Back</button>
    ${p.discount ? `<div class="product-detail-discount-badge">${p.discount}</div>` : ''}
    <div class="product-detail-header">
      <span class="product-detail-title">${p.title}</span>
      <span class="product-detail-rating">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
    </div>
    <div class="product-detail-summary">Includes blah blah blah</div>
    <div class="product-detail-main-row">
      <div class="product-detail-img-wrap">
        ${p.image ? `<img src="${p.image}" alt="${p.title}" class="product-detail-img">` : ''}
      </div>
      <div class="product-detail-price-wrap">
        <div class="product-price-detail">$${p.price} ${p.oldPrice ? `<span class='old-price'>$${p.oldPrice}</span>` : ""}</div>
      </div>
    </div>
    <p class="product-desc">${p.description || "No description available."}</p>
    <div class="detail-actions">
      <a href="${p.video}" target="_blank" class="detail-btn">Video Reviews</a>
      <a href="${p.reviews}" target="_blank" class="detail-btn">Customer Reviews</a>
    </div>
  `;
  document.getElementById('productGrid').style.display = 'none';
  detail.style.display = 'block';
}

window.hideProductDetail = function() {
  document.getElementById('productDetail').style.display = 'none';
  document.getElementById('productGrid').style.display = 'grid';
}

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
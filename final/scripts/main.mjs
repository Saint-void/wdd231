import { fetchItems } from './data.mjs';

const itemsContainer = document.getElementById('items');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');
const modalDate = document.getElementById('modalDate');

let items = [];

function createCardHTML(item){
  return `
    <article class="card" data-id="${item.id}" tabindex="0">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="card-body">
        <h3>${item.title}</h3>
        <p class="muted">${item.category} — ${item.date}</p>
        <p>${item.description}</p>
      </div>
    </article>
  `;
}

function openModalById(id){
  const item = items.find(i => String(i.id) === String(id));
  if(!item) return;
  modalTitle.textContent = item.title;
  modalImage.src = item.image;
  modalImage.alt = item.title;
  modalDescription.textContent = item.description;
  modalCategory.textContent = item.category;
  modalDate.textContent = item.date;
  modal.setAttribute('aria-hidden','false');
  modal.classList.add('open');
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modal.classList.remove('open');
}

document.addEventListener('click', (e)=>{
  if(e.target.matches('.card') || e.target.closest('.card')){
    const card = e.target.closest('.card');
    openModalById(card.dataset.id);
  }
  if(e.target.matches('.modal-close')) closeModal();
});

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  if(e.key === 'Enter' && document.activeElement && document.activeElement.classList.contains('card')){
    openModalById(document.activeElement.dataset.id);
  }
});

// close when clicking outside content
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

async function init(){
  try{
    items = await fetchItems();
    if(!items || !items.length){
      itemsContainer.innerHTML = '<p>No items found.</p>';
      return;
    }

    // Ensure we render at least 15 items if available
    const display = items.slice(0,15);

    // Use array.map and template literals to build HTML
    const html = display.map(createCardHTML).join('');
    itemsContainer.innerHTML = html;

    // Demonstrate an array method: count categories
    const categoryCounts = items.reduce((acc, it)=>{ acc[it.category] = (acc[it.category]||0)+1; return acc; }, {});
    // (Category counts are logged for debugging/demo.)
    console.log('categoryCounts', categoryCounts);

  }catch(err){
    console.error('init error', err);
    itemsContainer.innerHTML = '<p>Unable to load items.</p>';
  }
}

init();

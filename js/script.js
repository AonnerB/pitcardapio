function addToCart(item) {
  alert(item + " foi adicionado ao carrinho!");
}

function toggleItems(className, btn) {
  const items = document.querySelectorAll("." + className);
  const isHidden = items[0].classList.contains("hidden");

  items.forEach(item => {
    if (isHidden) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });

  btn.textContent = isHidden ? "Ver menos" : "Ver mais";
}

// Pega os elementos
const cartBtn = document.getElementById('cartBtn');
const profileBtn = document.getElementById('profileBtn');
const cartSidebar = document.getElementById('cartSidebar');
const profileModal = document.getElementById('profileModal');
const closeModal = document.getElementById('closeModal');
const profileForm = document.getElementById('profileForm');

// Abre/fecha sidebar do carrinho
cartBtn.addEventListener('click', () => {
  const isOpen = cartSidebar.classList.contains('open');
  if (isOpen) {
    cartSidebar.classList.remove('open');
  } else {
    cartSidebar.classList.add('open');
    // fecha o modal de perfil se aberto
    profileModal.classList.remove('active');
  }
});

// Abre o modal do perfil
profileBtn.addEventListener('click', () => {
  profileModal.classList.add('active');
  // fecha sidebar se aberta
  cartSidebar.classList.remove('open');
});

// Fecha modal clicando no X
closeModal.addEventListener('click', () => {
  profileModal.classList.remove('active');
});

// Fecha modal clicando fora do conteúdo
profileModal.addEventListener('click', e => {
  if (e.target === profileModal) {
    profileModal.classList.remove('active');
  }
});

// Handle submit do formulário (exemplo simples)
profileForm.addEventListener('submit', e => {
  e.preventDefault();

  const cpf = profileForm.cpf.value.trim();
  const name = profileForm.name.value.trim();

  if (cpf.length === 11 && name.length > 0) {
    alert(`Cadastro realizado!\nNome: ${name}\nCPF: ${cpf}`);
    profileModal.classList.remove('active');
    profileForm.reset();
  } else {
    alert('Por favor, preencha os dados corretamente.');
  }
});



const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, '');

  if (value.length > 11) value = value.slice(0, 11);

  if (value.length > 6) {
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  } else {
    value = value.replace(/(\d{0,2})/, '($1');
  }

  e.target.value = value;
});


// Scroll para topo
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Botão WhatsApp
const whatsappBtn = document.getElementById('whatsappBtn');
whatsappBtn.addEventListener('click', () => {
  const message = encodeURIComponent("Olá! Vi o cardápio da Pit Mania e gostaria de pedir uma pizza grande de calabresa com borda recheada. Está disponível?");
  const phoneNumber = "62993454968"; // Substitua pelo seu número no formato internacional
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
});


function addToCart(productName) {
  const allItems = document.querySelectorAll('.menu-item');
  let selectedItem = null;

  allItems.forEach(item => {
    const title = item.querySelector('h3').textContent;
    if (title === productName) {
      selectedItem = item;
    }
  });

  if (!selectedItem) return;

  const imgSrc = selectedItem.querySelector('img').src;
  const name = selectedItem.querySelector('h3').textContent;
  const desc = selectedItem.querySelector('p').textContent;
  const price = selectedItem.querySelector('.price')?.textContent || ''; // <-- pega o preço

  const cartItemsContainer = document.getElementById('cartItems');

  const existingItem = Array.from(cartItemsContainer.children).find(item => {
    return item.querySelector('h4').textContent === name;
  });
  if (existingItem) {
    alert('Este item já está no carrinho.');
    return;
  }

  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.style.position = 'relative';

  cartItem.innerHTML = `
    <img src="${imgSrc}" alt="${name}">
      <div class="cart-item-details">
        <h4>${name}</h4>
        <p>${desc}</p>
        <div class="price">${price}</div> <!-- Mostra o preço no carrinho -->
        <textarea class="obs-field" placeholder="Deseja remover algum ingrediente?"></textarea>
      </div>
      <button class="edit-btn" aria-label="Adicionar observação">✏️</button>
      <button class="remove-btn" aria-label="Remover item">🗑️</button>
  `;

  // Botão remover
  cartItem.querySelector('.remove-btn').addEventListener('click', () => {
    cartItem.classList.remove('show');      // remove classe de entrada
    cartItem.classList.add('fade-out');     // adiciona saída

    setTimeout(() => {
      cartItem.remove();
      updateCartCount();
    }, 300); // tempo deve bater com o CSS .fade-out
  });

  // Botão lápis toggle textarea
  const editBtn = cartItem.querySelector('.edit-btn');
  const obsField = cartItem.querySelector('.obs-field');
  editBtn.addEventListener('click', () => {
    if (obsField.style.display === 'block') {
      obsField.style.display = 'none';
    } else {
      obsField.style.display = 'block';
      obsField.focus();
    }
  });

  cartItemsContainer.appendChild(cartItem);

  setTimeout(() => {
    cartItem.classList.add('show');
  }, 10); // delay curto para ativar a transição

  updateCartCount();

  document.querySelector('.sidebar').classList.add('open');
}

function updateCartCount() {
  const cartItemsContainer = document.getElementById('cartItems');
  const count = cartItemsContainer.children.length;

  // Atualiza badge dentro do botão carrinho (se quiser manter)
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'inline-block' : 'none';
  }

  // Atualiza contador fora do carrinho, ao lado do título
  const totalItemsCount = document.getElementById('totalItemsCount');
  if (totalItemsCount) {
    totalItemsCount.textContent = count;
  }
}

document.addEventListener('click', function (e) {
  const btn = e.target.closest('.add-to-cart-btn');
  if (!btn) return;

  const card = btn.closest('.menu-item');
  if (!card) return;

  const name = card.querySelector('h3')?.textContent?.trim();
  if (name) addToCart(name);
});

const popup = document.getElementById('whatsappPopup');

function showPopup() {
  popup.classList.add('show');

  // Esconde após 5 segundos
  setTimeout(() => {
    popup.classList.remove('show');
  }, 5000);
}

// Inicia o ciclo a cada 10 segundos
setInterval(showPopup, 20000);

function toggleItems(className, btn) {
  const items = document.querySelectorAll(`.${className}`);
  items.forEach(item => {
    item.classList.toggle('hidden');
    item.classList.toggle('show');
  });
  btn.textContent = btn.textContent === "Ver mais" ? "Ver menos" : "Ver mais";
}

function toggleItems(className, btn) {
  const items = document.querySelectorAll(`.${className}`);
  const isShowing = !items[0].classList.contains('hidden');

  if (isShowing) {
    // Animação de saída
    items.forEach(item => {
      item.classList.remove('show');
      item.classList.add('fade-out');

      // Após a animação, esconder
      setTimeout(() => {
        item.classList.add('hidden');
        item.classList.remove('fade-out');
      }, 400); // igual ao tempo da animação
    });
    btn.textContent = "Ver mais";
  } else {
    // Mostrar com animação de entrada
    items.forEach(item => {
      item.classList.remove('hidden');
      item.classList.add('show');
    });
    btn.textContent = "Ver menos";
  }
}

const modal = document.getElementById('profileModal');
const modalTitle = document.getElementById('modalTitle');
const toggleLoginText = document.createElement('p');
toggleLoginText.id = 'toggleLoginText';
toggleLoginText.style.marginTop = '15px';
toggleLoginText.style.textAlign = 'center';
toggleLoginText.style.cursor = 'pointer';

const form = document.getElementById('profileForm');
const nameInput = document.getElementById('name');
const nameLabel = form.querySelector('label[for="name"]');


let isLogin = false;

function setToggleText() {
  if (!isLogin) {
    toggleLoginText.innerHTML = 'Já tem cadastro? <span id="toggleLoginLink" style="text-decoration: underline; cursor: pointer;">Clique aqui</span>';
  } else {
    toggleLoginText.innerHTML = 'Ainda não tem cadastro? <span id="toggleLoginLink" style="text-decoration: underline; cursor: pointer;">Crie uma conta</span>';
  }
}

function toggleMode() {
  isLogin = !isLogin;
  if (isLogin) {
    // Modo login
    modalTitle.textContent = 'Bem vindo de volta';
    nameInput.classList.add('hidden');
    nameLabel.classList.add('hidden');
    form.querySelector('button[type="submit"]').textContent = 'Entrar';
  } else {
    // Modo cadastro
    modalTitle.textContent = 'Cadastro de Perfil';
    nameInput.classList.remove('hidden');
    nameLabel.classList.remove('hidden');
    form.querySelector('button[type="submit"]').textContent = 'Cadastrar';
  }
  setToggleText();
  // Animação simples
  form.style.opacity = 0;
  setTimeout(() => {
    form.style.opacity = 1;
  }, 200);
}

modal.querySelector('.modal').appendChild(toggleLoginText);
setToggleText();

modal.addEventListener('click', e => {
  if (e.target.id === 'toggleLoginLink') {
    toggleMode();
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  // Aqui pode colocar sua lógica real de submit
  toggleMode(); // Volta para modo cadastro após enviar
});

// teste
const pizzaCursor = document.getElementById('pizzaCursor');

document.addEventListener('mousemove', (e) => {
  pizzaCursor.style.left = `${e.clientX}px`;
  pizzaCursor.style.top = `${e.clientY}px`;
});
// final teste


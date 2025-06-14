const url = 'https://dummyjson.com/products';

async function getData() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error in getData() [G'aaa karochi]", error);
    }
}

const productList = document.getElementById('product-list');
const showAllBtn = document.getElementById('show-all');
const hideBtn = document.getElementById('hide-button');
const inputText = document.getElementById('eng');
const outputText = document.getElementById('uzb');
const fromLangSelect = document.querySelector('.engQuti .til'); 
const toLangSelect = document.querySelector('.uzbQuti .til');   

function mahsulotChiqar(products, limit) {
    productList.innerHTML = '';
    
    let korsatish;
    if (limit) {
        korsatish = products.slice(0, limit);
    } else {
        korsatish = products;
    }

    korsatish.forEach(item => {
        const box = document.createElement('div');
        box.className = 'box';

        const sarlavha = document.createElement('h3');
        sarlavha.textContent = item.title;
        sarlavha.classList.add('sarlavha');

        const rasm = document.createElement('img');
        rasm.src = item.images[0];
        rasm.classList.add('rasm');

        const text = document.createElement('p');
        text.textContent = item.description;
        text.className = 'text';

        const price = document.createElement('strong');
        price.textContent = `$${item.price}`;
        price.className = 'price';

        box.appendChild(rasm);
        box.appendChild(sarlavha);
        box.appendChild(text);
        box.appendChild(price);

        productList.appendChild(box);
    });
}

let hammaMahsulotlar = [];
getData().then(data => {
    hammaMahsulotlar = data.products;
    mahsulotChiqar(hammaMahsulotlar, 5);
});

showAllBtn.onclick = () => {
    mahsulotChiqar(hammaMahsulotlar);
};

hideBtn.onclick = () => {
    mahsulotChiqar(hammaMahsulotlar, 5);
};

inputText.addEventListener('input', async () => {
    const text = inputText.value.trim();
    const source = fromLangSelect.value; 
    const target = toLangSelect.value;   

    if (!text) {
        outputText.value = '';
        return;
    }

    try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`);
        const data = await res.json();
        outputText.value = data.responseData.translatedText || 'Tarjima topilmadi';
    } catch (err) {
        outputText.value = 'Tarjima xatosi yuz berdi 😢';
        console.error('Tarjima xatosi:', err);
    }
});
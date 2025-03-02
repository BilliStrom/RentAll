const loadItems = async () => {
    const itemsGrid = document.querySelector('.items-grid');
    console.log('Загрузка данных...'); // Отладка
    try {
        const querySnapshot = await db.collection('items').get();
        console.log('Документы:', querySnapshot.docs); // Отладка
        itemsGrid.innerHTML = ''; // Очищаем контейнер перед загрузкой
        querySnapshot.forEach(doc => {
            const item = doc.data();
            console.log('Товар:', item); // Отладка
            itemsGrid.innerHTML += `
                <article class="item-card">
                    <img src="${item.image}" alt="${item.title}" class="item-image">
                    <div class="item-info">
                        <h3>${item.title}</h3>
                        <p class="price">${item.price} руб/день</p>
                        <p>${item.description}</p>
                        <button class="btn btn-primary" onclick="rentItem('${doc.id}')">Арендовать</button>
                    </div>
                </article>
            `;
        });
    } catch (error) {
        console.error('Ошибка загрузки данных:', error); // Отладка
    }
};

const rentItem = async (itemId) => {
    if (!auth.currentUser) {
        alert('Пожалуйста, войдите в систему, чтобы арендовать товар.');
        window.location.href = 'login.html';
        return;
    }
    try {
        await db.collection('bookings').add({
            userId: auth.currentUser.uid,
            itemId: itemId,
            date: new Date().toISOString(),
        });
        alert('Товар успешно арендован!');
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена'); // Отладка
    loadItems();
});

const loadItems = async () => {
    const itemsGrid = document.querySelector('.items-grid');
    console.log('Загрузка данных...'); // Отладка
    try {
        const querySnapshot = await db.collection('items').get();
        console.log('Документы:', querySnapshot.docs); // Отладка
        itemsGrid.innerHTML = ''; // Очищаем контейнер перед загрузкой
        querySnapshot.forEach(doc => {
            const item = doc.data();
            console.log('Товар:', item); // Проверьте структуру объекта item
            itemsGrid.innerHTML += `
                <article class="item-card">
                    <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.title || 'Без названия'}" class="item-image">
                    <div class="item-info">
                        <h3>${item.title || 'Без названия'}</h3>
                        <p class="price">${item.price || 'Цена не указана'} руб/день</p>
                        <p>${item.description || 'Описание отсутствует'}</p>
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

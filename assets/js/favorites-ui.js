document.addEventListener('DOMContentLoaded', () => {
    const favButton = document.getElementById('favoritesButton');
    const favModal = new bootstrap.Modal(document.getElementById('favoritesModal'));
    const favoritesContainer = document.getElementById('favoritesContainer');
    
    function createFavoriteElement(video) {
        const colElement = document.createElement('div');
        colElement.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';
        
        const figure = document.createElement('figure');
        figure.className = 'figure video-thumb';
        figure.dataset.videoId = video.id;
        
        const img = document.createElement('img');
        img.className = 'img-fluid figure-img';
        img.src = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
        img.alt = `صورة مصغرة لـ ${video.title}`;
        
        img.onerror = () => {
            img.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
        };
        
        const playButton = document.createElement('div');
        playButton.className = 'play-button';
        
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-sm btn-danger remove-favorite';
        removeButton.innerHTML = '&times;';
        removeButton.setAttribute('title', 'إزالة من المفضلة');
        
        const caption = document.createElement('figcaption');
        caption.className = 'figure-caption';
        caption.textContent = video.title;
        
        const categoryBadge = document.createElement('span');
        categoryBadge.className = 'badge bg-secondary category-badge';
        categoryBadge.textContent = video.category;
        
        figure.appendChild(img);
        figure.appendChild(playButton);
        figure.appendChild(removeButton);
        figure.appendChild(caption);
        figure.appendChild(categoryBadge);
        colElement.appendChild(figure);
        
        figure.addEventListener('click', (e) => {
    if (e.target === removeButton || e.target.closest('.remove-favorite')) {
        e.stopPropagation();
        if (window.favoritesManager.removeFavorite(video.id)) {
            colElement.remove();
            updateFavoritesEmptyState();
        }
    } else {
        // إغلاق مودال المفضلات أولاً
        const favoritesModalElement = document.getElementById('favoritesModal');
        const favoritesModalInstance = bootstrap.Modal.getInstance(favoritesModalElement);
        favoritesModalInstance.hide();
        
        // ثم بعد ذلك فتح مودال الفيديو
        setTimeout(() => {
            const modalElement = document.querySelector('.video-modal');
            const modal = new bootstrap.Modal(modalElement);
            const modalIframe = modalElement.querySelector('iframe');
            const modalTitle = modalElement.querySelector('.modal-title');
            const modalDescription = modalElement.querySelector('.modal-body p');
            
            modalIframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1`;
            modalTitle.textContent = video.title;
            modalDescription.innerHTML = `تشاهد الآن: ${video.title} <span class="badge bg-secondary">${video.category}</span>`;
            modal.show();
        }, 150); // انتظار لحظة قصيرة للتأكد من إغلاق المودال الأول
    }
});
        
        return colElement;
    }
    
    function updateFavoritesEmptyState() {
    const favorites = window.favoritesManager.getFavorites();
    const emptyMessage = document.getElementById('emptyFavoritesMessage');
    const clearButton = document.getElementById('clearFavoritesBtn');
    
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '';
        emptyMessage.classList.remove('d-none');
        clearButton.disabled = true; // تعطيل الزر
        // أو بدلاً من ذلك: clearButton.style.display = 'none'; // إخفاء الزر
    } else {
        emptyMessage.classList.add('d-none');
        clearButton.disabled = false; // تفعيل الزر
        // أو بدلاً من ذلك: clearButton.style.display = 'block'; // إظهار الزر
    }
}
    
    function displayFavorites() {
        const favorites = window.favoritesManager.getFavorites();
        
        favoritesContainer.innerHTML = '';
        
        if (favorites.length === 0) {
            updateFavoritesEmptyState();
            return;
        }
        
        favorites.forEach(video => {
            const favoriteElement = createFavoriteElement(video);
            favoritesContainer.appendChild(favoriteElement);
        });
         updateFavoritesEmptyState();
    }
    
    favButton.addEventListener('click', () => {
        displayFavorites();
        favModal.show();
    });
    
    document.getElementById('clearFavoritesBtn').addEventListener('click', () => {
    const favorites = window.favoritesManager.getFavorites();
    
    // إظهار مربع الحوار فقط إذا كانت هناك عناصر مفضلة للحذف
    if (favorites.length > 0) {
        if (confirm('هل أنت متأكد من حذف جميع المفضلات؟')) {
            localStorage.removeItem('videoFavorites');
            window.favoritesManager.updateFavoritesCount();
            displayFavorites();
        }
    }
});
});

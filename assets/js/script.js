document.addEventListener('DOMContentLoaded', () => {
    const allVideos = [
        { id: "odGTd-O3RO8", title: "فيديو تعليمي 1", category: "رياضيات" },
        { id: "CCiWWTHz-ZY", title: "فيديو تعليمي 2", category: "علوم" },
        { id: "r9OxY05qszE", title: "فيديو تعليمي 3", category: "لغة عربية" },
        { id: "dQw4w9WgXcQ", title: "فيديو تعليمي 4", category: "رياضيات" },
        { id: "ZZ5LpwO-An4", title: "فيديو تعليمي 5", category: "علوم" },
        { id: "djV11Xbc914", title: "فيديو تعليمي 6", category: "تاريخ" },
        { id: "btPJPFnesV4", title: "فيديو تعليمي 7", category: "لغة عربية" },
        { id: "YR5ApYxkU-U", title: "فيديو تعليمي 8", category: "رياضيات" },
        { id: "pAgnJDJN4VA", title: "فيديو تعليمي 9", category: "تاريخ" },
        { id: "fJ9rUzIMcZQ", title: "فيديو تعليمي 10", category: "علوم" },
        { id: "l0NtUxBnbzo", title: "فيديو تعليمي 11", category: "لغة عربية" },
        { id: "EK_LN3XEcnw", title: "فيديو تعليمي 12", category: "رياضيات" },
        { id: "JGwWNGJdvx8", title: "فيديو تعليمي 13", category: "تاريخ" },
        { id: "kJQP7kiw5Fk", title: "فيديو تعليمي 14", category: "علوم" },
        { id: "RgKAFK5djSk", title: "فيديو تعليمي 15", category: "رياضيات" },
        { id: "U3ASj1L6_sY", title: "فيديو تعليمي 16", category: "لغة عربية" },
        { id: "31CnPqxVZiw", title: "فيديو تعليمي 17", category: "تاريخ" },
        { id: "8SbUC-UaAxE", title: "فيديو تعليمي 18", category: "علوم" },
        { id: "YVkUvmDQ3HY", title: "فيديو تعليمي 19", category: "رياضيات" },
        { id: "6Ejga4kJUts", title: "فيديو تعليمي 20", category: "لغة عربية" },
        { id: "ALZHF5UqnU4", title: "فيديو تعليمي 21", category: "تاريخ" },
        { id: "y6120QOlsfU", title: "فيديو تعليمي 22", category: "علوم" },
        { id: "aQUlA8Hcv4s", title: "فيديو تعليمي 23", category: "رياضيات" },
        { id: "vx2u5uUu3DE", title: "فيديو تعليمي 24", category: "لغة عربية" },
    ];

    // استخراج التصنيفات الفريدة من الفيديوهات
    const categories = [...new Set(allVideos.map(video => video.category))];

    const videosContainer = document.querySelector('.videos-container');
    const paginationContainer = document.querySelector('.pagination');
    const modalElement = document.querySelector('.video-modal');
    const modal = new bootstrap.Modal(modalElement);
    const modalIframe = modalElement.querySelector('iframe');
    const modalTitle = modalElement.querySelector('.modal-title');
    const modalDescription = modalElement.querySelector('.modal-body p');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const categoriesContainer = document.getElementById('categoriesContainer');

    const videosPerPage = 8; 
    let currentPage = 1;
    let filteredVideos = [...allVideos]; // نسخة من جميع الفيديوهات
    let searchTerm = ''; // كلمة البحث الحالية
    let activeCategory = 'all'; // التصنيف النشط حاليًا
    
    // إنشاء أزرار التصنيفات
    function createCategoryButtons() {
        // إنشاء زر "الكل"
        const allButton = document.createElement('button');
        allButton.className = 'btn btn-outline-primary me-2 mb-2 category-btn active';
        allButton.textContent = 'الكل';
        allButton.dataset.category = 'all';
        categoriesContainer.appendChild(allButton);
        
        // إنشاء زر لكل تصنيف
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'btn btn-outline-primary me-2 mb-2 category-btn';
            button.textContent = category;
            button.dataset.category = category;
            categoriesContainer.appendChild(button);
        });
        
        // إضافة حدث النقر على أزرار التصنيفات
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                // إزالة الصنف النشط من جميع الأزرار
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // إضافة الصنف النشط للزر المحدد
                button.classList.add('active');
                
                // تحديث التصنيف النشط
                activeCategory = button.dataset.category;
                
                // تحديث القائمة
                applyFilters();
            });
        });
    }
    
    function getTotalPages() {
        return Math.ceil(filteredVideos.length / videosPerPage);
    }

    // تطبيق الفلاتر (البحث والتصنيف)
    function applyFilters() {
        // فلترة حسب كلمة البحث والتصنيف
        if (activeCategory === 'all') {
            // البحث فقط في جميع التصنيفات
            if (searchTerm === '') {
                filteredVideos = [...allVideos];
            } else {
                filteredVideos = allVideos.filter(video => 
                    video.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
        } else {
            // البحث في التصنيف المحدد
            if (searchTerm === '') {
                filteredVideos = allVideos.filter(video => 
                    video.category === activeCategory
                );
            } else {
                filteredVideos = allVideos.filter(video => 
                    video.category === activeCategory && 
                    video.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
        }
        
        // إعادة تعيين رقم الصفحة الحالية
        currentPage = 1;
        
        // عرض النتائج
        displayVideosForCurrentPage();
    }

    function displayVideosForCurrentPage() {
        const startIndex = (currentPage - 1) * videosPerPage;
        const endIndex = Math.min(startIndex + videosPerPage, filteredVideos.length);
        const currentPageVideos = filteredVideos.slice(startIndex, endIndex);

        // إضافة فئة التحميل
        videosContainer.classList.add('loading');
        
        // إفراغ حاوية الفيديوهات
        videosContainer.innerHTML = '';
        
        // إظهار أو إخفاء رسالة عدم وجود نتائج
        if (filteredVideos.length === 0) {
            noResultsMessage.classList.remove('d-none');
            paginationContainer.classList.add('d-none');
        } else {
            noResultsMessage.classList.add('d-none');
            paginationContainer.classList.remove('d-none');
            
            // إنشاء عناصر الفيديو للصفحة الحالية
            currentPageVideos.forEach((video) => {
                const videoElement = createVideoElement(video);
                videosContainer.appendChild(videoElement);
            });
        }

        // محاكاة التحميل
        setTimeout(() => {
            videosContainer.classList.remove('loading');
        }, 300);

        updatePagination();
    }

    function createVideoElement(video) {
    const colElement = document.createElement('div');
    colElement.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';

    const figure = document.createElement('figure');
    figure.className = 'figure video-thumb';
    figure.dataset.videoId = video.id;
    figure.dataset.videoTitle = video.title;
    figure.dataset.videoCategory = video.category;

    const img = document.createElement('img');
    img.className = 'img-fluid figure-img';
    img.src = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
    img.alt = `صورة مصغرة لـ ${video.title}`;

    img.onerror = () => {
        img.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
    };

    const playButton = document.createElement('div');
    playButton.className = 'play-button';
    
    const isFavorite = window.favoritesManager && window.favoritesManager.isFavorite(video.id);
    
    const favoriteButton = document.createElement('button');
    favoriteButton.className = `favorite-button ${isFavorite ? 'active' : ''}`;
    favoriteButton.innerHTML = isFavorite ? '★' : '☆';
    favoriteButton.setAttribute('title', isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة');
    favoriteButton.setAttribute('aria-label', isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة');

    const caption = document.createElement('figcaption');
    caption.className = 'figure-caption';
    
    if (searchTerm && video.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        caption.innerHTML = video.title.replace(regex, '<span class="highlight-match">$1</span>');
    } else {
        caption.textContent = video.title;
    }

    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'badge bg-secondary category-badge';
    categoryBadge.textContent = video.category;

    figure.appendChild(img);
    figure.appendChild(playButton);
    figure.appendChild(favoriteButton);
    figure.appendChild(caption);
    figure.appendChild(categoryBadge);
    colElement.appendChild(figure);

    figure.addEventListener('click', (e) => {
        if (e.target === favoriteButton || e.target.closest('.favorite-button')) {
            e.stopPropagation();
            toggleFavorite(video, favoriteButton);
        } else {
            modalIframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1`;
            modalTitle.textContent = video.title;
            modalDescription.innerHTML = `تشاهد الآن: ${video.title} <span class="badge bg-secondary">${video.category}</span>`;
            modal.show();
        }
    });

    return colElement;
}

function toggleFavorite(video, button) {
    if (!window.favoritesManager) return;
    
    const isCurrentlyFavorite = window.favoritesManager.isFavorite(video.id);
    
    if (isCurrentlyFavorite) {
        window.favoritesManager.removeFavorite(video.id);
        button.innerHTML = '☆';
        button.classList.remove('active');
        button.setAttribute('title', 'إضافة للمفضلة');
    } else {
        window.favoritesManager.addFavorite(video.id, video.title, video.category);
        button.innerHTML = '★';
        button.classList.add('active');
        button.setAttribute('title', 'إزالة من المفضلة');
    }
}

    function updatePagination() {
        paginationContainer.innerHTML = '';
        
        const totalPages = getTotalPages();
        
        // إذا لم تكن هناك نتائج أو صفحة واحدة فقط، فلا نعرض التنقل بين الصفحات
        if (filteredVideos.length === 0 || totalPages <= 1) {
            return;
        }

        const prevItem = document.createElement('li');
        prevItem.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        
        const prevLink = document.createElement('a');
        prevLink.className = 'page-link';
        prevLink.href = '#';
        prevLink.textContent = 'السابق';
        prevLink.setAttribute('aria-label', 'الصفحة السابقة');
        
        prevItem.appendChild(prevLink);
        paginationContainer.appendChild(prevItem);

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
            
            const pageLink = document.createElement('a');
            pageLink.className = 'page-link';
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.setAttribute('data-page', i);
            
            pageItem.appendChild(pageLink);
            paginationContainer.appendChild(pageItem);
        }

        if (endPage < totalPages) {
            const ellipsisItem = document.createElement('li');
            ellipsisItem.className = 'page-item disabled';
            
            const ellipsisSpan = document.createElement('span');
            ellipsisSpan.className = 'page-link';
            ellipsisSpan.innerHTML = '&hellip;';
            
            ellipsisItem.appendChild(ellipsisSpan);
            paginationContainer.appendChild(ellipsisItem);
            
            const lastPageItem = document.createElement('li');
            lastPageItem.className = 'page-item';
            
            const lastPageLink = document.createElement('a');
            lastPageLink.className = 'page-link';
            lastPageLink.href = '#';
            lastPageLink.textContent = totalPages;
            lastPageLink.setAttribute('data-page', totalPages);
            
            lastPageItem.appendChild(lastPageLink);
            paginationContainer.appendChild(lastPageItem);
        }

        const nextItem = document.createElement('li');
        nextItem.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        
        const nextLink = document.createElement('a');
        nextLink.className = 'page-link';
        nextLink.href = '#';
        nextLink.textContent = 'التالي';
        nextLink.setAttribute('aria-label', 'الصفحة التالية');
        
        nextItem.appendChild(nextLink);
        paginationContainer.appendChild(nextItem);

        assignPaginationEvents();
    }

    function assignPaginationEvents() {
        paginationContainer.querySelectorAll('.page-link[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = parseInt(link.dataset.page);
                displayVideosForCurrentPage();
                window.scrollTo(0, 0); 
            });
        });

        const prevButton = paginationContainer.querySelector('.page-item:first-child .page-link');
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayVideosForCurrentPage();
                window.scrollTo(0, 0);
            }
        });

        const nextButton = paginationContainer.querySelector('.page-item:last-child .page-link');
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < getTotalPages()) {
                currentPage++;
                displayVideosForCurrentPage();
                window.scrollTo(0, 0);
            }
        });
    }
    
    // وظيفة البحث
    function performSearch() {
        const query = searchInput.value.trim();
        searchTerm = query;
        
        applyFilters();
    }
    
    // الاستماع لأحداث البحث
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
    
    // إضافة حدث لحقل البحث للبحث أثناء الكتابة (اختياري)
    searchInput.addEventListener('input', () => {
        clearTimeout(searchInput.searchTimeout);
        searchInput.searchTimeout = setTimeout(performSearch, 500);
    });

    modalElement.addEventListener('hidden.bs.modal', () => {
        modalIframe.src = 'about:blank';
    });

    // إنشاء أزرار التصنيفات
    createCategoryButtons();
    
    // عرض جميع الفيديوهات عند التحميل
    displayVideosForCurrentPage();
});
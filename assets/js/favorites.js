document.addEventListener('DOMContentLoaded', () => {
    const favoritesManager = {
        getFavorites() {
            const favorites = localStorage.getItem('videoFavorites');
            return favorites ? JSON.parse(favorites) : [];
        },
        
        addFavorite(videoId, videoTitle, videoCategory) {
            const favorites = this.getFavorites();
            if (!favorites.some(fav => fav.id === videoId)) {
                favorites.push({ id: videoId, title: videoTitle, category: videoCategory });
                localStorage.setItem('videoFavorites', JSON.stringify(favorites));
                this.updateFavoritesCount();
                return true;
            }
            return false;
        },
        
        removeFavorite(videoId) {
            const favorites = this.getFavorites();
            const updatedFavorites = favorites.filter(fav => fav.id !== videoId);
            localStorage.setItem('videoFavorites', JSON.stringify(updatedFavorites));
            this.updateFavoritesCount();
            return favorites.length !== updatedFavorites.length;
        },
        
        isFavorite(videoId) {
            const favorites = this.getFavorites();
            return favorites.some(fav => fav.id === videoId);
        },
        
        updateFavoritesCount() {
            const count = this.getFavorites().length;
            const badge = document.getElementById('favoritesCount');
            if (badge) {
                badge.textContent = count;
                badge.style.display = count > 0 ? 'inline-block' : 'none';
            }
        }
    };

    window.favoritesManager = favoritesManager;
    favoritesManager.updateFavoritesCount();
});
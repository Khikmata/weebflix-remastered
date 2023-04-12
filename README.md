<h1>В активной разработке</h1>
<a href='https://weebflix-remastered.vercel.app/'> Деплой </a>
<br>
<br>



<img src='Screenshot_1.png'></img>


<br>

<h2> Текущий стек: </h2>
<strong>[X] React </strong>  <br>
<strong>[X] Typescript </strong> <br>
<strong>[X] Redux Toolkit </strong> <br>
<strong>[X] Axios </strong> <br>
<strong>[X] Router-DOM </strong> <br>
<strong>[X] Redux-Persist </strong> <br>
<strong>[X] React-Range </strong> <br>
<strong>[X] React css modules (SCSS) </strong> <br>
<strong>[X] Swiper </strong>  <br>
<strong>[X] Jest && testing libraries </strong>  <br> <br>

<h2> Функционал: </h2> 
<br>
<strong>[X] RTK query для фетча данных с разных эндпоинтов </strong> 
<br>
<strong>[X] Слайдер с текущим/будущим сезоном </strong> 
<br>
<strong>[X] Переход на странице по айди аниме </strong> 
<br>
[0%] Модальное окно с дополнительной информацией при наведении на карточку </> 

<br>
<br>
[50%] Поиск: 
<br>
<strong>[X] Поиск на навбаре </strong>
<br>
[0%] - Модальное окно возможных вариантов поиска
<br>
<br>
[???] Слайдер новостей? 
<br>
<br>
[40%] Фильтры: <br>
<strong>[X] Фильтрация по рейтингу </strong> 
<br>
<strong>[X] Фильтрация по датам </strong> 
<br>
<strong>[X] Фильтрация по жанрам </strong> 
<br>
<strong>[X] Фильтрация по тематикам </strong> 
<br>
[0%] Фильтрация по типу 
<br>
[0%] Фильтрация по рейтингу  
<br>
[0%] Фильтрация по сезону 
<br>
[0%] Фильтрация по количеству эпизодов 
<br>
[0%] Фильтрация по студиям
<br>
[0%] Фильтрация по статусу выхода
<br>
<br>
[0%] - Lazy загрузка карточек в каталоге при скролле вниз </> 
<br>
<br>
[0%] Внутренний плеер <br>
[0%] Скриншоты <br>
[0%] Персонажи и их актеры <br>
[0%] Комментарии <br>
<br>
[0%] Авторизация в аккаунт <br>
[0%] История просмотра (После захода в аккаунт) <br>
[0%] Рекоммендации основанные на последнем просмотренном шоу <br>
[0%] Изменение стейта просмотра и возможность оценивания <br>
[0%] Админ-панель <br> <br>

<h3> Текущее дерево проекта: </h3> <br>
📦src
<br/>┣ 📂assets
<br/>┃ ┣ 📂icons
<br/>┃ ┃ ┣ 📜close.svg
<br/>┃ ┃ ┣ 📜dropdown.svg
<br/>┃ ┃ ┣ 📜erase.svg
<br/>┃ ┃ ┣ 📜filters.svg
<br/>┃ ┃ ┣ 📜logo.svg
<br/>┃ ┃ ┣ 📜profile.svg
<br/>┃ ┃ ┣ 📜search.svg
<br/>┃ ┃ ┗ 📜star.svg
<br/>┃ ┗ 📂images
<br/>┃ ┃ ┗ 📜home.png
<br/>┣ 📂components
<br/>┃ ┣ 📂Blocks
<br/>┃ ┃ ┣ 📂AnimeGrid
<br/>┃ ┃ ┃ ┣ 📜AnimeGridBlock.styles.module.scss
<br/>┃ ┃ ┃ ┣ 📜AnimeGridBlock.tsx
<br/>┃ ┃ ┃ ┗ 📜index.ts
<br/>┃ ┃ ┣ 📂Catalogue
<br/>┃ ┃ ┃ ┣ 📜CatalogueBlock.styles.module.scss
<br/>┃ ┃ ┃ ┣ 📜CatalogueBlock.tsx
<br/>┃ ┃ ┃ ┗ 📜index.ts
<br/>┃ ┃ ┣ 📂CatalogueFilter
<br/>┃ ┃ ┃ ┣ 📜CatalogueFilterBlock.styles.module.scss
<br/>┃ ┃ ┃ ┣ 📜CatalogueFilterBlock.tsx
<br/>┃ ┃ ┃ ┗ 📜index.ts
<br/>┃ ┃ ┣ 📂Filter
<br/>┃ ┃ ┃ ┣ 📜FilterBlock.styles.module.scss
<br/>┃ ┃ ┃ ┣ 📜FilterBlock.tsx
<br/>┃ ┃ ┃ ┗ 📜index.ts
<br/>┃ ┃ ┣ 📂History
<br/>┃ ┃ ┃ ┣ 📜HistoryBlock.styles.module.scss
<br/>┃ ┃ ┃ ┣ 📜HistoryBlock.tsx
<br/>┃ ┃ ┃ ┗ 📜index.ts
<br/>┃ ┃ ┣ 📂Info
<br/>┃ ┃ ┃ ┣ 📜index.ts
<br/>┃ ┃ ┃ ┣ 📜InfoBlock.styles.module.scss
<br/>┃ ┃ ┃ ┗ 📜InfoBlock.tsx
<br/>┃ ┃ ┣ 📂News
<br/>┃ ┃ ┃ ┣ 📜index.ts
<br/>┃ ┃ ┃ ┣ 📜NewsBlock.styles.module.scss
<br/>┃ ┃ ┃ ┗ 📜NewsBlock.tsx
<br/>┃ ┃ ┣ 📂Rank
<br/>┃ ┃ ┃ ┣ 📜index.ts
<br/>┃ ┃ ┃ ┣ 📜RankBlock.styles.module.scss
<br/>┃ ┃ ┃ ┗ 📜RankBlock.tsx
<br/>┃ ┃ ┗ 📂Recommendations
<br/>┃ ┃ ┃ ┣ 📜index.ts
<br/>┃ ┃ ┃ ┣ 📜RecommendationsBlock.styles.module.scss
<br/>┃ ┃ ┃ ┗ 📜RecommendationsBlock.tsx
<br/>┃ ┣ 📂Button
<br/>┃ ┃ ┣ 📜Button.styles.module.scss
<br/>┃ ┃ ┣ 📜Button.test.ts
<br/>┃ ┃ ┣ 📜Button.tsx
<br/>┃ ┃ ┗ 📜index.ts
<br/>┃ ┣ 📂Card
<br/>┃ ┃ ┣ 📜AnimeCard.styles.module.scss
<br/>┃ ┃ ┣ 📜AnimeCard.tsx
<br/>┃ ┃ ┗ 📜index.ts
<br/>┃ ┣ 📂Input
<br/>┃ ┃ ┣ 📜index.ts
<br/>┃ ┃ ┣ 📜Input.styles.module.scss
<br/>┃ ┃ ┗ 📜Input.tsx
<br/>┃ ┣ 📂Navbar
<br/>┃ ┃ ┣ 📜index.ts
<br/>┃ ┃ ┣ 📜Navbar.styles.module.scss
<br/>┃ ┃ ┗ 📜Navbar.tsx
<br/>┃ ┣ 📂Range
<br/>┃ ┃ ┣ 📜index.ts
<br/>┃ ┃ ┣ 📜Range.styles.module.scss
<br/>┃ ┃ ┗ 📜RangeComponent.tsx
<br/>┃ ┗ 📂Select
<br/>┃ ┃ ┣ 📜index.ts
<br/>┃ ┃ ┣ 📜SelectComponent.styles.module.scss
<br/>┃ ┃ ┗ 📜SelectComponent.tsx
<br/>┣ 📂hooks
<br/>┃ ┣ 📜debounce.ts
<br/>┃ ┣ 📜redux.ts
<br/>┃ ┗ 📜scroll.ts
<br/>┣ 📂Layout
<br/>┃ ┣ 📜Layout.styles.module.scss
<br/>┃ ┗ 📜Layout.tsx
<br/>┣ 📂pages
<br/>┃ ┣ 📂AnimePage
<br/>┃ ┃ ┣ 📜animepage.styles.module.scss
<br/>┃ ┃ ┗ 📜AnimePage.tsx
<br/>┃ ┗ 📂HomePage
<br/>┃ ┃ ┣ 📜home.styles.module.scss
<br/>┃ ┃ ┗ 📜HomePage.tsx
<br/>┣ 📂router
<br/>┃ ┗ 📜AppRouter.tsx
<br/>┣ 📂store
<br/>┃ ┣ 📂reducers
<br/>┃ ┃ ┣ 📜CatalogueFilterSlice.ts
<br/>┃ ┃ ┗ 📜SearchFilterSlice.ts
<br/>┃ ┣ 📂services
<br/>┃ ┃ ┗ 📜getAnime.ts
<br/>┃ ┣ 📜index.ts
<br/>┃ ┗ 📜store.ts
<br/>┣ 📂styles
<br/>┃ ┣ 📜global.scss
<br/>┃ ┣ 📜swiper-styles.scss
<br/>┃ ┣ 📜tooltip.scss
<br/>┃ ┗ 📜_variables.scss
<br/>┣ 📂types
<br/>┃ ┗ 📜GetAnimeTypes.ts
<br/>┣ 📂utils
<br/>┃ ┣ 📂Coloring
<br/>┃ ┃ ┣ 📜ColorRating.ts
<br/>┃ ┃ ┗ 📜ColorWatchState.ts
<br/>┃ ┣ 📂Portal
<br/>┃ ┃ ┣ 📜index.ts
<br/>┃ ┃ ┗ 📜Portal.tsx
<br/>┃ ┣ 📂Tooltip
<br/>┃ ┃ ┣ 📜index.ts
<br/>┃ ┃ ┣ 📜Tooltip.styles.module.scss
<br/>┃ ┃ ┗ 📜Tooltip.tsx
<br/>┃ ┗ 📂Translation
<br/>┃ ┃ ┣ 📜TranslateGenres.ts
<br/>┃ ┃ ┣ 📜TranslateRating.ts
<br/>┃ ┃ ┣ 📜TranslateRelease.ts
<br/>┃ ┃ ┣ 📜TranslateStatus.ts
<br/>┃ ┃ ┗ 📜TranslateTypes.ts
<br/>┣ 📜App.tsx
<br/>┣ 📜index.tsx
<br/>┗ 📜types.d.ts

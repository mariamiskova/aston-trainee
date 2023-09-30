# Сайт-музей с коллекцией произведений искусств института - Art Institute of Chicago


# 1 уровень (необходимый минимум)

## React
Пишем функциональные компоненты c хуками в приоритете над классовыми.
Есть разделение на умные и глупые компоненты: Login, Register(smart) / Form(simple).
Есть рендеринг списков: searhDatas, favoriteItems, historyList, itemsData.
Реализована хотя бы одна форма: Search, Login, Register.
Есть применение Контекст API: themeContext.
Есть применение предохранителя: ErrorBoundary.
Есть хотя бы один кастомный хук: useAuth.
Хотя бы несколько компонентов используют PropTypes: Card, ErrorBoundary, ThemeConsumer, ThemeProvider.
Поиск не триггерит много запросов к серверу: Не выполнено, поиск по кнопке Search.
Есть применение lazy + Suspense: App.

## Redux
Используем Modern Redux with Redux Toolkit: store.
Используем слайсы: artworksSlice, authorizationSlice, favoriteSlice, historySlice, searchSlice.
Есть хотя бы одна кастомная мидлвара: Не выполнено, не смогла найти место для применения.
Используется RTK Query: Не выполнено.
Используется Transforming Responses: Не выполнено, не смогла найти место для применения.

# 2 уровень (необязательный)

Использован TypeScript.
Использован Firebase для учетных записей пользователей.
Используются мемоизированные селекторы.

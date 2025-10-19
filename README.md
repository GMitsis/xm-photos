# XM Photos Gallery

A modern, responsive photo gallery application built with Angular 19 and Angular Material, featuring infinite scroll, favorites management, and a beautiful user interface.

## 🚀 Features

### 📸 Photo Gallery

-   **Infinite Scroll**: Seamlessly browse through thousands of photos with automatic loading
-   **Random Delays**: 2-3 second loading delays to simulate real-world API behavior
-   **Responsive Grid**: Adaptive photo grid that works on all screen sizes
-   **High-Quality Images**: Photos sourced from Picsum Photos API
-   **Click to Favorite**: Add photos to favorites with a single click

### ⭐ Favorites Management

-   **Persistent Storage**: Favorites saved to localStorage
-   **Smart Notifications**: Success messages with undo functionality
-   **Duplicate Prevention**: Intelligent filtering to avoid duplicate photos
-   **Quick Removal**: Easy removal from favorites with confirmation

### 🎨 User Interface

-   **Material Design**: Professional UI using Angular Material components
-   **Sticky Navigation**: Header remains visible while scrolling
-   **Loading States**: Beautiful spinner animations with cyan theming
-   **404 Page**: Custom not-found page with navigation
-   **Active Route Highlighting**: Clear visual feedback for current page

### 📱 Responsive Design

-   **Mobile First**: Optimized for mobile devices
-   **Tablet Support**: Perfect layout for tablets
-   **Desktop Experience**: Enhanced experience on larger screens
-   **Touch Friendly**: All interactions optimized for touch devices

## 🛠 Technical Stack

### Core Technologies

-   **Angular 19.2**: Latest Angular framework with standalone components
-   **TypeScript 5.7**: Strong typing and modern JavaScript features
-   **Angular Material 19.2**: Material Design UI components
-   **NgRx Signals**: Modern state management solution
-   **RxJS**: Reactive programming for data streams

### Key Libraries & Tools

-   **Angular Router**: SPA navigation and routing
-   **Angular HTTP Client**: API integration
-   **Angular Animations**: Smooth UI transitions
-   **Jasmine & Karma**: Testing framework
-   **SCSS**: Enhanced CSS with variables and mixins

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── favorites/           # Favorites page component
│   │   ├── navigation-menu/     # Sticky header navigation
│   │   ├── not-found/          # 404 error page
│   │   ├── photo-details/      # Individual photo view
│   │   ├── photo-grid/         # Reusable photo grid
│   │   └── photo-list/         # Main gallery with infinite scroll
│   ├── services/
│   │   ├── favorites.service.ts # Favorites management
│   │   └── photos.service.ts   # API integration
│   └── store/
│       ├── photos.facade.ts    # Service layer facade
│       ├── photos.model.ts     # TypeScript interfaces
│       ├── photos.store.ts     # NgRx Signals store
│       └── photos.updater.ts   # State update functions
```

## 🎯 Key Features Implementation

### Infinite Scroll

-   **Intersection Observer API**: Efficient scroll detection
-   **Smart Loading**: Prevents spam requests with debouncing
-   **End Detection**: Graceful handling when no more photos available
-   **Performance Optimized**: Minimal DOM manipulation

### State Management

-   **NgRx Signals**: Modern reactive state management
-   **Computed Selectors**: Efficient data derivation
-   **Error Handling**: Robust error recovery
-   **Loading States**: Comprehensive loading feedback

### API Integration

-   **Picsum Photos API**: High-quality placeholder images
-   **Pagination Support**: Efficient data loading
-   **Error Recovery**: Graceful handling of network issues
-   **Response Caching**: Optimized performance

## 🚦 Getting Started

### Prerequisites

-   Node.js 18 or higher
-   npm or yarn package manager

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd xm-photos
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start development server**

    ```bash
    npm start
    ```

4. **Open in browser**
   Navigate to `http://localhost:4200`

### Available Scripts

-   `npm start` - Start development server
-   `npm run build` - Build for production
-   `npm test` - Run unit tests
-   `npm run watch` - Build in watch mode

Built with ❤️ using Angular 19 and Modern Web Technologies

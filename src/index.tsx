import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Context providers
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import ErrorBoundary from './components/ErrorBoundary';

// Use non-null assertion (make sure you have a root element in index.html)
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
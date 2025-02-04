import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated for React Router v6 :contentReference[oaicite:0]{index=0}
import { Navbar, Sidebar, Footer, ScrollToTop } from './components';

import {
  Home,
  Error,
  Shipping,
  SingleProduct,
  Checkout,
  Products,
  Cart,
  SuccessfulPayment,
} from './pages';

function App() {
  return (
    <Router>
      {/* The Layout component wraps common UI elements */}
      <Layout>
        {/* Routes replaces Switch in react-router-dom v6 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/successful_payment" element={<SuccessfulPayment />} />
          {/* The wildcard route renders the Error page for all unmatched routes */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

// Explicitly define the props type to include children
interface LayoutProps {
  children: React.ReactNode;
}

// Personalized Layout component with semantic elements and a welcome comment
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Sidebar />
      <main>
        {/* You can further customize your main content area with styles or even a welcome banner */}
        {children}
      </main>
      <Footer />
    </>
  );
};

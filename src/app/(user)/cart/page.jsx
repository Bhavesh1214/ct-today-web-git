import React from 'react';

// mui
import { Container } from '@mui/material';

// component
import CartMain from 'src/components/_main/cart';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// Meta information
export const metadata = {
  title: 'Seodrra Shopping Cart | Seodrra - Convenient Shopping Cart for Easy Checkout',
  description:
    'View your shopping cart on Seodrra for easy checkout. Add, remove, and manage items effortlessly. Enjoy a seamless shopping experience with secure transactions and personalized recommendations. Explore your cart now!',
  applicationName: 'Seodrra',
  authors: 'Seodrra',
  keywords:
    'shopping cart, Seodrra, view cart, cart items, add to cart, remove from cart, manage cart, checkout, online shopping, secure transactions, personalized recommendations, seamless shopping, convenient shopping'
};

export default async function Cart() {
  return (
    <>
      <HeaderBreadcrumbs
        heading="Cart"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Products',
            href: '/products'
          },
          {
            name: 'Cart'
          }
        ]}
      />

      <Container maxWidth="xl">
        <CartMain />
      </Container>
    </>
  );
}
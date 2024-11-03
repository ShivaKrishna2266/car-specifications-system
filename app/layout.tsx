import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';

export const metadata = {
  title: 'Next.js App with Bootstrap',
  description: 'A Next.js app using Bootstrap for styling.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className="d-flex flex-column min-vh-100">
      <CartProvider>
        <Header />
        <div className="flex-grow-1">{children}</div> 
        <Footer />
        </CartProvider>
      </body>
      
    </html>
  );
}

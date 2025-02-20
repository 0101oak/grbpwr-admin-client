import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginBlock } from 'components/login/login';
import ProtectedRoute from 'components/login/protectedRoute';
import { Analitic } from 'components/managers/analitic';
import { Archive } from 'components/managers/archive/archive';
import { Hero } from 'components/managers/hero/hero';
import { MediaManager } from 'components/managers/media/mediaManager';
import { OrderDetails } from 'components/managers/orders/order-details/page';
import { Orders } from 'components/managers/orders/orders';
import { ProductForm } from 'components/managers/products/productForm/productForm';
import { Product } from 'components/managers/products/products';
import { Promo } from 'components/managers/promo/promo';
import { Settings } from 'components/managers/settings/settings';
import { ROUTES } from 'constants/routes';
import { ContextProvider } from 'context';
import { StoreProvider } from 'lib/stores/store-provider';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './global.css';

const container = document.getElementById('root') ?? document.body;
const root = createRoot(container);
const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      light: '#9e9e9e',
      main: '#616161',
      dark: '#424242',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <StoreProvider>
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path={ROUTES.login} element={<LoginBlock />} />
              <Route
                path={ROUTES.main}
                element={
                  <ProtectedRoute>
                    <Analitic />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.media}
                element={
                  <ProtectedRoute>
                    <MediaManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.singleProduct}
                element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.product}
                element={
                  <ProtectedRoute>
                    <Product />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.addProduct}
                element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path={`${ROUTES.copyProduct}/:id`}
                element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.hero}
                element={
                  <ProtectedRoute>
                    <Hero />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.promo}
                element={
                  <ProtectedRoute>
                    <Promo />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.archive}
                element={
                  <ProtectedRoute>
                    <Archive />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.settings}
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.orderDetails}
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.orders}
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ContextProvider>
    </StoreProvider>
  </ThemeProvider>,
);

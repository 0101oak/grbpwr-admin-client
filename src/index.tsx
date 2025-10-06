import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from 'components/login/protectedRoute';

import { Archive } from 'components/managers/archives/archive';
import { Hero } from 'components/managers/hero/components';
import { OrderDetails } from 'components/managers/order/page';
import { OrdersCatalog } from 'components/managers/orders-catalog/page';
import { Analitic } from 'components/managers/page';
import { Product } from 'components/managers/product/page';
import ProductsCatalog from 'components/managers/products-catalog/page';
import { Promo } from 'components/managers/promo/promo';
import { Settings } from 'components/managers/settings/settings';
import { MediaLayout } from 'components/media';
import { ROUTES } from 'constants/routes';
import { ContextProvider } from 'context';
import { StoreProvider } from 'lib/stores/store-provider';
import { createRoot } from 'react-dom/client';
import { HashRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Layout } from 'ui/layout';
import './global.css';

const container = document.getElementById('root') ?? document.body;
const root = createRoot(container);
const queryClient = new QueryClient();

const ProtectedLayout = () => (
  <ProtectedRoute>
    <Layout>
      <Outlet />
    </Layout>
  </ProtectedRoute>
);

root.render(
  <StoreProvider>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path='/' element={<ProtectedLayout />}>
              <Route path={ROUTES.main} element={<Analitic />} />
              <Route path={ROUTES.media} element={<MediaLayout disableSelection={true} />} />
              <Route path={ROUTES.singleProduct} element={<Product />} />
              <Route path={ROUTES.product} element={<ProductsCatalog />} />
              <Route path={ROUTES.addProduct} element={<Product />} />
              <Route path={`${ROUTES.copyProduct}/:id`} element={<Product />} />
              <Route path={ROUTES.hero} element={<Hero />} />
              <Route path={ROUTES.promo} element={<Promo />} />
              <Route path={ROUTES.archives} element={<Archive />} />
              <Route path={ROUTES.settings} element={<Settings />} />
              <Route path={ROUTES.orderDetails} element={<OrderDetails />} />
              <Route path={ROUTES.orders} element={<OrdersCatalog />} />
            </Route>
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </ContextProvider>
  </StoreProvider>,
);

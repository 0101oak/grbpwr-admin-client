import { useNavigate } from '@tanstack/react-location';
import { deleteProductByID, getProductsPaged } from 'api/admin';
import {
  GetProductsPagedRequest,
  GetProductsPagedResponse,
  common_FilterConditions,
  common_Product,
} from 'api/proto-http/admin';
import { Layout } from 'components/login/layout';
import { ROUTES } from 'constants/routes';
import React, { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import styles from 'styles/paged.scss';
import { Filter } from './filterComponents/filterProducts';
import { initialFilter } from './filterComponents/initialFilterStates';
import { ListProducts } from './listProducts';

export const PageProduct: FC = () => {
  const [products, setProducts] = useState<common_Product[] | undefined>([]);
  const [filter, setFilter] = useState<GetProductsPagedRequest>(initialFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<number | undefined>(undefined);
  const [deletionMessage, setDeletionMessage] = useState('');
  const [deletingProductId, setDeletingProductId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const response: GetProductsPagedResponse = await getProductsPaged({
      ...filter,
    });
    setProducts((prevProducts) => [...(prevProducts || []), ...(response.products || [])]);
    setLoading(false);
  }, [filter, currentPage, loading]);

  const isScrollingNearBottom = useCallback(() => {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (isScrollingNearBottom() && !loading) {
        setCurrentPage((currentPage) => currentPage + 1);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading, isScrollingNearBottom]);
  useEffect(() => {
    fetchData();
  }, [currentPage, fetchData]);

  const handleProductClick = (index: number | undefined) => {
    navigate({ to: `${ROUTES.singleProduct}/${index}` });
  };

  const handleDeleteClick = async (
    e: MouseEvent<HTMLButtonElement>,
    productId: number | undefined,
  ) => {
    e.stopPropagation();
    if (confirmDelete !== productId) {
      setConfirmDelete(productId);
    } else {
      setDeletingProductId(productId);
      setTimeout(async () => {
        await deleteProductByID({ id: productId });
        setProducts((prevProducts) => prevProducts?.filter((product) => product.id !== productId));
        setDeletingProductId(undefined);
        setTimeout(() => setDeletionMessage(''), 3000);
      }, 3000);
      setConfirmDelete(undefined);
    }
  };

  const handleFilterChange = <
    K extends keyof GetProductsPagedRequest | keyof common_FilterConditions,
  >(
    key: K,
    value:
      | (K extends keyof GetProductsPagedRequest ? GetProductsPagedRequest[K] : never)
      | (K extends keyof common_FilterConditions ? common_FilterConditions[K] : never),
  ) => {
    setFilter(
      (prevFilter) =>
        ({
          ...prevFilter,
          ...(key in prevFilter
            ? { [key]: value }
            : {
                filterConditions: {
                  ...(prevFilter.filterConditions || {}),
                  [key]: value,
                },
              }),
        }) as GetProductsPagedRequest,
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <Layout>
      {deletionMessage && <div>{deletionMessage}</div>}
      <div className={styles.product_container}>
        <div className={styles.product_wrapper}>
          <ListProducts
            products={products}
            productClick={handleProductClick}
            deleteProduct={handleDeleteClick}
            confirmDeleteProductId={confirmDelete}
            deletingProductId={deletingProductId}
            showHidden={filter.showHidden}
          />
        </div>
        <Filter filter={filter} filterChange={handleFilterChange} onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

import { useParams } from '@tanstack/react-router';
import { getProductByID } from 'api/admin';
import { common_ProductFull } from 'api/proto-http/admin';
import { FC, useEffect, useState } from 'react';

export const ProductID: FC = () => {
  const { productId } = useParams({ from: 'product-by-id/$productId' });
  const [product, setProduct] = useState<common_ProductFull>();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductByID({
        id: Number(productId),
      });
      setProduct(response.product);
    };
    fetchProduct();
  }, [productId]);
  return (
    <div>
      <h3>{product?.product?.createdAt}</h3>
      <h3>Product ID</h3>
    </div>
  );
};

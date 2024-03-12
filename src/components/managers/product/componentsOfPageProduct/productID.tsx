import { useParams } from '@tanstack/react-router';
import { getProductByID } from 'api/admin';
import { common_ProductFull } from 'api/proto-http/admin';
import { ROUTES } from 'constants/routes';
import { FC, useEffect, useState } from 'react';

export const ProductID: FC = () => {
  const { productId }: any = useParams({ from: ROUTES.singleProduct });
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

  return <div>{product?.product?.createdAt}</div>;
};

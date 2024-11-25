import { GetServerSideProps } from 'next';
import { Product } from '@shared/pages/product';
import { SearchProductResponse } from '@shared/shared/model';
import { products } from '@shared/shared/api';

interface ProductPageProps {
  product: SearchProductResponse;
}

const ProductPage = ({ product }: ProductPageProps) => {
  return <Product product={product} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  try {
    const response = await products.getProductById(id as string);
    return {
      props: {
        product: response.data,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductPage;

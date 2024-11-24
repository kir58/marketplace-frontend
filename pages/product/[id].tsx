import { GetServerSideProps } from 'next';
import axios from 'axios';
import styles from '../../styles/Home.module.css';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductPageProps {
  product: Product;
}

const ProductPage = ({ product }: ProductPageProps) => {
  return (
    <div className={styles.productPage}>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <span>{product.price} USD</span>
      <button>Add to cart</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  try {
    const response = await axios.get(`http://localhost:8080/api/products/${id}`);
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

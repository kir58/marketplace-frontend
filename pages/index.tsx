import { GetServerSideProps } from 'next';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Home.module.css';
import { ResponsiveAppBar } from "@shared/widgets/appBar/ui/AppBar";
import * as React from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface HomeProps {
  products: Product[];
}

const Home = ({ products }: HomeProps) => {
  return (
    <div className={styles.container}>
      <ResponsiveAppBar />
      <h1>Marketplace</h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/products');
    return {
      props: {
        products: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
};

export default Home;

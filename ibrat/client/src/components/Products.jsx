import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {

    const getProducts = async () => {

      try {
        // console.log(cat+"22434");
        const res = await axios.get(cat ? `http://localhost:8000/api/product?category=${cat}` : "http://localhost:8000/api/product");
        // console.log(res);
        // console.log("fined");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }

    }
    getProducts();

  }, [cat]);


  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);


  useEffect(() => {
    if (sort == "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      )
    }
    else if (sort == "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      )
    }
    else if (sort == "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      )
    }
  }, [sort]);





  return (
    <Container>
      {cat ? filteredProducts.map((item, i) => (
        < Product item={item} key={i} />
      )) :
        products.slice(2,8).map((item, i) => (
          < Product item={item} key={i} />
        ))}

    </Container>
  );
};

export default Products;

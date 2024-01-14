import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import './Products.scss';
import Aside from '../Aside/Aside';
import { useValue } from '../../Context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { ClockLoader,  } from 'react-spinners';


export default function Product() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { amt } = useValue();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const applyFilters = (filters) => {
    setSelectedFilters(filters);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch the product collection from Firestore
        const querySnapshot = await getDocs(collection(db, 'products'));

        // Extract the data from the query snapshot
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Set the retrieved products to the state
        setProducts(productsData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="home">
        <input
          type="text"
          className="searchinput"
          placeholder="Search By Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="product">
        <Aside applyFilters={applyFilters} />
        {loading ? ( 
          <div className="spinner">
          <ClockLoader  color="#176ae6" size={80} loading={loading} />
          </div>
        ) : (
          products
            .filter(
              (item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                item.price <= amt &&
                (selectedFilters.length === 0 ||
                  selectedFilters.includes(item.category))
            )
            .map((item) => <ProductItem item={item} key={item.id} />)
        )}
      </div>
    </>
  );
}
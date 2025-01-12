import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store"; 
import { fetchDataSuccess, fetchDataStart , fetchDataFailure } from "../src/components/retail_data"; 
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import products from "./data.json"; 
import './App.css';
import { ProductData } from "../src/components/retail_data";

// Mock API call 
const fetchProductData = (): Promise<ProductData> => {
  return new Promise((resolve, reject) => {
      setTimeout(() => { 
          try {
              resolve(products[0]);
          } catch (error) {
              reject("Error loading data");
          }
      }, 500); // 500ms delay
  });
};

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state: RootState) => state.data.productData);
  const loading = useSelector((state: RootState) => state.data.loading);
  const error = useSelector((state: RootState) => state.data.error);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDataStart());
      try {
        const productData = await fetchProductData();
        dispatch(fetchDataSuccess(productData));
      } catch (error: any) {
        dispatch(fetchDataFailure(error.toString()));
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
}

if (error) {
    return <div>Error: {error}</div>
}


  if (!productData) {
    return <div>Loading...</div>;
  }

  const salesData = productData.sales;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <img src="stackline_logo.svg" alt="Product" className="product-image" />
        <h2>{productData.title}</h2>
        <p>{productData.subtitle}</p>
        <div className="tags">
          {productData.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="main-content">
        <h1>Retail Sales</h1>
        {salesData && salesData.length > 0 && (
          <LineChart width={1000} height={300} data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="weekEnding" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="retailSales" stroke="#8884d8" />
            <Line type="monotone" dataKey="wholesaleSales" stroke="#82ca9d" />
            <Line type="monotone" dataKey="retailerMargin" stroke="#ffc658" />
          </LineChart>
        )}

        {/* Table */}
        <table className="sales-table">
          <thead>
            <tr>
              <th>Week Ending</th>
              <th>Retail Sales</th>
              <th>Wholesale Sales</th>
              <th>Units Sold</th>
              <th>Retailer Margin</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((row) => (
              <tr key={row.weekEnding}>
                <td>{row.weekEnding}</td>
                <td>{row.retailSales.toLocaleString()}</td>
                <td>{row.wholesaleSales.toLocaleString()}</td>
                <td>{row.unitsSold.toLocaleString()}</td>
                <td>{row.retailerMargin.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default App;

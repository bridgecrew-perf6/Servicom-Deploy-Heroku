import React , { useEffect, useState } from 'react';
import { Section} from 'components/organisms';
import { Hero, Partners ,Result, } from './components';
import axios from 'axios';

import { partners,result} from './data';

const Products = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      axios.get('http://localhost:8080/products')
      .then(response => {
        setData(response.data.rows);
        //console.log(response.data.rows)
      })
      .catch((error) => {
        console.log(error);
      })
    };
     fetchData()

},[]);
return(
  <div>
    {console.log("data",data)}
    <Hero />
    <Section>
      <Result data={result}/>
      <Partners data={partners} />
    </Section>

  </div>
);
}

export default Products;

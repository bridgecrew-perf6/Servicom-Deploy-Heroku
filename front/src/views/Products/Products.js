import React , { useEffect, useState } from 'react';
import { Section} from 'components/organisms';
import { Hero, Partners ,Result, } from './components';
import axios from 'axios';

//import { partners} from './data';

const Products = () => {
  const [tags, setTags] =useState([])
  const [partners,setPartners]=useState([])
  
  useEffect(()=>{
    axios.get('https://nodev1.herokuapp.com/products/categories')
    .then(response => {
      //setTags([{tags__c:"all"}].concat(response.data));
      setTags([{family:'all'}].concat(response.data))
      //console.log(response.data.rows)
    })
    .catch((error) => {
      console.log(error);
    })
  },[])

useEffect(() => {
  axios.get('http://localhost:8080/products/partners')
  .then(response => {
    setPartners(response.data);
    //console.log(response.data.rows)
  })
  .catch((error) => {
    console.log(error);
  })
},[]);
return(
  <div>
    
    <Hero/>
    <Section>
      <Result  tags={tags}/>
      <Partners data={partners} />
    </Section>

  </div>
);
}
//
export default Products;

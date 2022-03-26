import React , { useEffect, useState } from 'react';
import { Section} from 'components/organisms';
import { Hero, Partners ,Result, } from './components';
import axios from 'axios';

const Products = () => {
  const [tags, setTags] =useState([])
  const [partners,setPartners]=useState([])
  
  useEffect(()=>{
    axios.get(process.env.REACT_APP_DOMAIN+'/productss/categories')
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
  axios.get(process.env.REACT_APP_DOMAIN+'/productss/partners')
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
    {console.log("domain",process.env.REACT_APP_DOMAIN)}
    <Section>
      <Result  tags={tags}/>
      <Partners data={partners} />
    </Section>

  </div>
);
}
//
export default Products;

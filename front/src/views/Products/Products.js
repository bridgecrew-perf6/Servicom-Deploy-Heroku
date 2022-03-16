import React from 'react';
import { Section} from 'components/organisms';
import { Hero, Partners ,Result } from './components';

import { partners,result} from './data';

const Products = () => (
  <div>
    <Hero />
    <Section>
      <Result data={result}/>
      <Partners data={partners} />
    </Section>

  </div>
);

export default Products;

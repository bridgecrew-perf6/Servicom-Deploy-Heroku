import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';

import {
  Categories,
  Courses,
  Hero,
  PromoNumbers,
  Reviews,
  LatestProducts,
  News,
  Newsletter,
  Overview,
  Products,
  QuickSearch,
  Sales,
} from './components';

import {
  promoNumbers,
  courseCategories,
  popularCourses,
  reviews,
  featuredProducts,
  mostSoldProducts,
  news,
  latestProducts,
} from './data';

const useStyles = makeStyles(theme => ({
    pagePaddingTop: {
        paddingTop: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
          paddingTop: theme.spacing(5),
        },
      },
      sectionNoPaddingTop: {
        paddingTop: 0,
      },
      sectionFeaturedProducts: {
        background: theme.palette.secondary.main,
      },
      reviewSection: {
        background: theme.palette.primary.dark,
      },
    coursesSection: {
        maxWidth: 800,
        margin: '0 auto',
    },
    paddingBottom0: {
        paddingBottom: 0,
    },
    sectionAlternate: {
        background: 'transparent',
        backgroundImage: `linear-gradient(180deg, ${theme.palette.background.paper} 40%, ${theme.palette.primary.dark} 0%)`,
    },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Hero />
      <Section>
        <PromoNumbers data={promoNumbers} />
      </Section>
      <SectionAlternate>
        <>
        <Categories data={courseCategories} />
        <Section>
          <Divider />
        </Section>
        <Courses data={popularCourses} className={classes.coursesSection} />
        </>
      </SectionAlternate>
      
      <Section>
        <Products data={featuredProducts} />
      </Section>
      <SectionAlternate>
        <Sales data={mostSoldProducts} />
      </SectionAlternate>
      <Section className={classes.sectionNoPaddingTop}>
        <LatestProducts data={latestProducts} />
      </Section>
      <Section className={classes.paddingBottom0}>
        <Reviews data={reviews} />
      </Section>
      <Section className={classes.pagePaddingTop}>
      <Overview />
      </Section>
      <Section className={classes.sectionNoPaddingTop}>
        <QuickSearch />
      </Section>
      <Section>
        <News data={news} />
      </Section>
      <Section>
        <Newsletter />
      </Section>
    </div>
  );
};

export default Home;

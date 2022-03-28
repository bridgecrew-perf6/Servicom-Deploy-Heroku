import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import { Grid,useMediaQuery} from '@material-ui/core';
import { Image } from 'components/atoms';
import { SectionHeader } from 'components/molecules';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  noBg: {
    background: 'transparent',
  },
  copy: {
    textAlign: 'center',
    maxWidth: 700,
    margin: '0 auto',
    padding: theme.spacing(2, 2, 0, 2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 2, 0, 2),
    },
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  logoImg: {
    height:'120px',
    width:'180px',
  
  },
  logoImgMd: {
    height:'120px',
    width:'180px',
    marginTop:25,
    
  
  },
  logoImgXs: {
    height:'150px',
    width:'250px',
    marginTop:50,
    //border:'2px solid red',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(4),
    },
    
  
  },
  fontWeight700: {
    fontWeight: 700,
  },
}));

const Partners = props => {
  const { data} = props;
  const classes = useStyles();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div>
      <div className={classes.copy} >
        <SectionHeader
          title="Our work has been featured"
          subtitle="We design & build products, tools, apps, and sites for companies trying to do great things for our planet."
          data-aos="fade-up"
          align="center"
        />
        </div>
        <Grid container  justifyContent={isSm?'space-between':'center'}>
          {data.map((partner, index) => (
              <a href={partner.website} key={index}>
                  <Image
                className={isSm?classes.logoImg:classes.logoImgXs}
                src={partner.companylogo__c}
                alt={partner.name}
                lazy={false}  
              />
              </a>
          ))}
        </Grid>
      
    </div>
  );
};

Partners.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default Partners;

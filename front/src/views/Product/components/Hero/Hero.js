import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import { Section, Parallax } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    background: 'white',
    overflow: 'hidden',
  },
  sectionWrapper: {
    height: 400,
    //backgroundColor: '#003c0580',
  },
  textWhite: {
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
  },
  section: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemAvatar: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    height: 60,
    width: 60,
  },
}));

const Hero = props => {
  const { className, cover, title, subtitle,authorPhoto,dateAdded,author, ...rest } = props;
  const months=['Jun','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
  console.log((new Date(dateAdded)).getFullYear())
  const date=months[(new Date(dateAdded)).getMonth()]+"  " + (new Date(dateAdded)).getDate()+","+(new Date(dateAdded)).getFullYear()
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Parallax backgroundImage={cover}>
        <div className={classes.sectionWrapper}>
          <Section className={classes.section}>
            <>
            <SectionHeader
              title={title}
              subtitle={subtitle}
              align="left"
              data-aos="fade-up"
              titleProps={{
                className: clsx(classes.title, classes.textWhite),
                variant: 'h3',
              }}
              subtitleProps={{
                className: classes.textWhite,
              }}
            />
            <List disablePadding>
              <ListItem disableGutters>
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar
                    src={authorPhoto}
                    alt={author}
                    className={classes.avatar}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`Published by ${author}`}
                  secondary={`on ${date}`}
                  primaryTypographyProps={{
                    className: classes.textWhite,
                    variant: 'subtitle1',
                  }}
                  secondaryTypographyProps={{
                    className: classes.textWhite,
                    variant: 'subtitle1',
                  }}
                />
              </ListItem>
            </List>
            </>
          </Section>
        </div>
      </Parallax>
    </div>
  );
};

Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * Cover of the hero
   */
  cover: PropTypes.string.isRequired,
  /**
   * Title of the hero
   */
  title: PropTypes.string.isRequired,
  /**
   * Subtitle of the hero
   */
  subtitle: PropTypes.string.isRequired,
  /**
   * Author of the post
   */
  author: PropTypes.string.isRequired,
};

export default Hero;

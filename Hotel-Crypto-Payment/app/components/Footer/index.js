import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

function Footer() {
  return (
    <FooterWrapper>
        @ Hotel project 
    </FooterWrapper>
  );
}
const FooterWrapper=styled.div`
  width:100%;
  background:black;
  padding :20px;
  color: #FFF;
  text-align:center;
  position: absolute;
  bottom: 0;
`

export default Footer;

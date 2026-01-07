import React from 'react';
import { LandingPage } from '../LandingPage';
import { CA_CONTENT } from '../../data/landingContent';

const LandingPageCA: React.FC = () => {
  return <LandingPage content={CA_CONTENT} region="CA" />;
};

export default LandingPageCA;

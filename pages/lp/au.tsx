import React from 'react';
import { LandingPage } from '../LandingPage';
import { AU_CONTENT } from '../../data/landingContent';

const LandingPageAU: React.FC = () => {
  return <LandingPage content={AU_CONTENT} region="AU" />;
};

export default LandingPageAU;

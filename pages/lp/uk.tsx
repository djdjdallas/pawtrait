import React from 'react';
import { LandingPage } from '../LandingPage';
import { UK_CONTENT } from '../../data/landingContent';

const LandingPageUK: React.FC = () => {
  return <LandingPage content={UK_CONTENT} region="UK" />;
};

export default LandingPageUK;

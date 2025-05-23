import { useRef } from 'react';

export const useLaunchTo = () => {
  const PrivacyPolicy = useRef('/static/Privacy-Policy-Multiple-Network.pdf');
  const TeamCondition = useRef('/static/Terms-Conditions-Multiple-Network.pdf');

  const launchTo = (link: string) => {
    window.open(link);
  };

  return {
    PrivacyPolicy,
    TeamCondition,
    launchTo,
  };
};

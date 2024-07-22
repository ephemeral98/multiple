'use client';
import { styled } from 'styled-components';
import VideoBox from '@cps/VideoBox';
import { useVideoPlay } from './hooks/useVideoPlay';
import Image from 'next/image';
import useAppStore from '@/store/appStore';
import Banner from './product/components/Banner';
import { flexPos } from '@/styled/mixin';
import Computer from './components/Computer';
import Advantage from './components/Advantage';
import DataReport from './components/DataReport';
import Feedback from './components/Feedback';
import Blog from './components/Blog';
import AboutDownload from './components/AboutDownload';

const HomeWrap = styled.div`
  /* background-color: #00000087; */
  /* background-color: #008c8c; */
  /* height: 280vh; */
  /* ${flexPos('center', 'flex-start')} */
`;

const Home: React.FC = () => {
  const appStore = useAppStore();

  return (
    <HomeWrap>
      <Banner />

      <Computer />

      <Advantage />

      <DataReport />

      <Feedback />

      <Blog />

      <AboutDownload />
    </HomeWrap>
  );
};

export default Home;

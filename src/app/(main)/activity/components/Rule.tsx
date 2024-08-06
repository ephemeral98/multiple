import { styled } from 'styled-components';
import Image from 'next/image';
import { $fontSize, $marginBottom, $width, phoneSize } from '@/styled/mediaSize';
import { useEffect } from 'react';

const RuleWrap = styled.div`
  background-color: #008c8c;
  ${$width('100%', '900rem', '900rem')}
  height: 836rem;
  background: #131313;
  box-shadow: 0px 0 5rem 0px rgba(255, 255, 255, 0.25);
  border-radius: 45rem 45rem 45rem 45rem;
  padding-top: 55rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .rule-header {
    width: 100%;
    display: grid;
    grid-template-columns: 27rem auto 27rem;
    justify-content: space-between;
    place-items: center;
    align-content: center;
    padding: 0 31rem;
    ${$fontSize('26rem', '14rem', '14rem')}

    .rule-title {
      font-size: 24rem;
    }
  }

  .rule-main {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-bottom: 53rem;
    ${$fontSize('26rem', '14rem', '14rem')}

    .content-title {
      color: #fff;
      font-weight: bold;
      margin-bottom: 12rem;
      ${$fontSize('26rem', '20rem', '20rem')}
    }
  }

  .ol-title {
    margin-bottom: 14rem;
  }

  .ul-round {
    position: relative;
    margin-left: 15rem;
    ${$marginBottom('26rem', '16rem', '16rem')}

    &::before {
      left: -15rem;
      content: '';
      width: 10rem;
      height: 10rem;
      background-color: #fff;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      border-radius: 50%;

      @media (max-width: ${phoneSize}) {
        left: -25rem;
        width: 20rem;
        height: 20rem;
      }
    }
  }

  .ul-circle {
    position: relative;
    margin-left: 32rem;
    margin-bottom: 16rem;

    &::before {
      left: -16rem;
      content: '';
      width: 10rem;
      height: 10rem;
      border: solid 1rem #fff;
      position: absolute;
      top: 0%;
      transform: translate(0, 5rem);
      border-radius: 50%;

      @media (max-width: ${phoneSize}) {
        left: -30rem;
        width: 18rem;
        height: 18rem;
        transform: translate(0, 7rem);
      }
    }
  }
`;

const Rule: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  // useEffect(() => {
  //   const t = document.querySelector('.rule-main');
  //   console.log('ttt', t);
  //   t.addEventListener('scroll', function (event) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   });
  // }, []);
  return (
    <RuleWrap>
      <header className="rule-header">
        <div></div>
        <div className="rule-title">Multiple Network Testnet Genesis Airdrop</div>
        <Image
          priority
          className="w-27 cursor-pointer"
          src={require('@img/common/icon-close.svg')}
          alt=""
          onClick={() => onClose()}
        />
      </header>

      <main className="rule-main px-30 md:px-40 mt-56 text-22 md:text-16">
        <div className="content-title">Event Introduction</div>

        <div>Dear Multiple Network Users,</div>
        <div className="mt-16">
          We are excited to announce that the Multiple Network Testnet Genesis Airdrop is about to
          begin. We are nearing the end of the deployment phase for our testnet, and we will soon
          launch the prototype testing network (specific launch time to be announced). The first
          round of the Multiple Network Testnet will offer 5,000 testing slots, marking the
          preliminary phase of technical validation aimed at ensuring the network's core
          functionality and performance.
        </div>
        <div className="mt-16">
          The testnet will be divided into three phases: the Prototype Testing Network, Large-Scale
          Stress Testing Network, and On-Chain Testing Network. To incentivize early community
          participation and contributions, the team will allocate 15% of the tokens for the testnet
          airdrop activities. Early participants will have the opportunity to earn rewards based on
          their contribution rankings. The official rules for each phase will be set, and users can
          earn rewards by participating in the activities.
        </div>

        <div className="content-title mt-32">Event Rules</div>

        <div className="ol-title">
          1. How to Participate and Obtain a Multiple Testnet Genesis Airdrop:
        </div>
        <div className="ul-circle">
          Obtain through Multiple’s partners (details will be announced gradually).
        </div>
        <div className="ul-circle">Complete our tasks on the Galxe platform.</div>
        <div className="ul-circle">
          Multiple Network will periodically select testnet slots through various activities (e.g.,
          AMAs, active community users, Twitter giveaways, etc.).
        </div>
        <div className="ol-title">2. How to Complete Our Tasks on the Galxe Platform:</div>
        <div className="ul-round">Participation Criteria & Rules:</div>
        <div className="ul-circle">
          A minimum of 300 points is required for the points to be considered valid.
        </div>
        <div className="ul-circle">
          A snapshot will be taken weekly to rank users based on their points from high to low.
          Multiple whitelist test users will be selected accordingly, and users can check if they
          have been selected on this official event page.
        </div>
        <div className="ul-circle">
          Weekly selection quota: approximately 500 slots, with the exact number to be confirmed by
          the official announcement.
        </div>
        <div className="ul-circle flex items-center">
          <div style={{ whiteSpace: 'nowrap' }}>Participation Link:</div>
          <a className="ml-5 text-#fff underline">
            https://app.galxe.com/quest/CMJag55imV76sQFspz2ciy/GCASqtkNqD
          </a>
        </div>
        <div className="ul-round">Task List and Points Rules on Galxe</div>
        <div className="ml-15 mb-16">Task 1: Social Media</div>
        <div className="ul-circle">Follow Twitter: @MTP_Network & @multiple_global (50 Points)</div>
        <div className="ul-circle">Join Multiple Network Telegram (50 Points)</div>
        <div className="ul-circle">Join Multiple Network Discord (50 Points)</div>
        <div className="ml-15 mb-16">Task 2: Daily Tasks</div>
        <div className="ul-circle">Visit the official website daily (10 Points)</div>
        <div className="ul-circle">Visit Gitbook daily (10 Points)</div>
        <div className="ul-circle">Visit LinkedIn daily (70 Points)</div>
        <div className="ml-15 mb-16">Task 3: Daily Updates</div>
        <div className="ul-circle">
          Retweet/Like @MTP_Network Testnet Genesis Airdrop tweet (10 Points)
        </div>
        <div className="ul-circle">
          Retweet/Like @multiple_global Testnet Genesis Airdrop tweet (10 Points)
        </div>
        <div className="ul-circle">Retweet/Like @MTP_Network daily update tweet (10 Points)</div>
        <div className="ul-circle">
          Retweet/Like @multiple_global daily update tweet (10 Points)
        </div>

        <div className="content-title">Event Time</div>
        <div className="ul-circle">Campaign Start Time: 7/26 at 8:00 (UTC)</div>
        <div className="ul-circle">
          Campaign End Time: To be determined based on the allocation of test slots; specific end
          time will be announced by the official team.
        </div>
      </main>
    </RuleWrap>
  );
};

export default Rule;

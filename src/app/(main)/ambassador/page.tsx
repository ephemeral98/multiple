'use client';

import { styled } from 'styled-components';
import Image from 'next/image';

import Banner from './components/Banner';
import { $fontSize, $marginTop, $paddingX, $width } from '@/styled/mediaSize';

const AmbassadorWrap = styled.div`
  .ambassador-main {
    ${$width('100%', '100%', '1024rem')}
    margin: 0 auto 249rem;
    margin-top: 157rem;
    ${$paddingX('44rem', '44rem', '0')}
  }

  .ambassador-title {
    ${$fontSize('30rem', '24rem', '24rem')}
    font-weight: 600;
    color: #fff;
    margin-bottom: 16rem;
  }

  .ambassador-text {
    ${$fontSize('22rem', '16rem', '16rem')}
    font-weight: 400;
    color: #5c5c5c;
  }

  .section-one-last {
    /* margin-bottom: 157rem; */
    border-bottom: 1px solid #545454;
    padding-bottom: 56rem;
    margin-top: 48rem;
  }

  .application-cycles {
    margin-top: 56rem;
    padding-top: 56rem;
    border-top: 1px solid #545454;
  }
`;

const Roles = styled.section`
  margin-top: 31rem;
  background-color: #1a1d1f;
  border-radius: 26rem;
  padding: 39rem 65rem;

  .role-title {
    color: #fff;
    ${$fontSize('30rem', '24rem', '24rem')}
  }
  .role-content {
  }
  .role-item {
    ${$fontSize('22rem', '16rem', '16rem')}
    color: #5c5c5c;
    padding-left: 5rem;
    margin-top: 16rem;
  }
`;

const Rewards = styled.section`
  padding: 35rem 65rem;
  margin-top: 31rem;
  background-color: #1a1d1f;
  border-radius: 26rem;
  color: #5c5c5c;
  font-size: 16rem;
  ${$fontSize('22rem', '16rem', '16rem')}

  .reward-item {
    &:not(:first-child) {
      ${$marginTop('20rem', '15rem', '15rem')}
    }
  }

  .hight-light {
    color: #fff;
    margin-right: 7rem;
  }
`;

const Ambassador = () => {
  return (
    <AmbassadorWrap>
      <Banner />

      <main className="ambassador-main">
        <section>
          <div className="ambassador-title">What is the Multiple Network A mbassador Program?</div>
          <div className="ambassador-text">
            We're looking for passionate and proactive individuals to join the Multiple Network
            (MTP) Ambassador Program. As an MTP ambassador, you'll play a key role in growing and
            engaging our community, both online and offline. This is a unique opportunity to be at
            the forefront of the AI + DePIN revolution, representing Multiple Network across
            platforms and events.
          </div>
        </section>

        <section className="section-one-last">
          <div className="ambassador-title">How does the Ambassador program work?</div>
          <div className="ambassador-text">
            The Multiple Network Ambassador Program is structured with multiple tiers to recognize
            and reward contributions. Currently, it consists of two levels: Ambassadors and Senior
            Ambassadors. Each tier comes with its own set of responsibilities and benefits. Everyone
            begins as an Ambassador, with the chance to advance to Senior Ambassador through
            consistent dedication and meaningful impact.
          </div>
        </section>

        <div className="text-30 md:text-24 font-bold mt-56">Roles and Responsibilities</div>

        <Roles>
          <div className="role-title">1. Online Community Management</div>
          <li className="role-item">
            Lead and manage the community for your country's language on Multiple Network's official
            Telegram and Discord channels.
          </li>
          <li className="role-item">
            Provide feedback from the Telegram and Discord members to Multiple Network's core team
            for discussion/solutions.
          </li>
          <li className="role-item">
            Actively join local blockchain/web3/depin/ai related TG/Discord/local social groups to
            spread the word
          </li>
          <div className="role-title mt-32">2. Social Media Influence</div>
          <div className="role-item">
            <li className="role-item">
              Translate the content of Multiple Network's X (Twitter) posts to your country's
              language and repost on the Telegram and Discord community.
            </li>
            <li className="role-item">
              Like & Retweet Multiple Network's X (Twitter) posts on your personal X (Twitter)
            </li>
            <li className="role-item">
              Invite more new node users from your country with your ambassador's referral link.
            </li>
          </div>

          <div className="role-title mt-32">3. Other Initiatives/Milestones:</div>
          <div className="role-item">
            <li className="role-item">
              Actively research online-offline activities/events on Web3/DePin/AI to engage Multiple
              Network's official or affiliated members (including x space, offline meet-up, etc)
            </li>
            <li className="role-item">
              Represent Multiple Network to join major blockchain events in your country (wearing
              MTP shirt)
            </li>
            <li className="role-item">
              Invite more new node users from your country with your ambassador's referral link at
              the main events and side events.
            </li>
            <li className="role-item">
              Organize small offline events centered on Multiple when necessary and provide
              promotional materials such as event photos. (Funding support may be available based on
              circumstances.)
            </li>
          </div>
        </Roles>

        <div className="text-30 md:text-24 font-bold mt-56">Rewards</div>

        <Rewards>
          <li className="reward-item">
            <span className="hight-light">Exclusive Ambassador Channels</span>
            in Discord and Telegram to connect with the Multiple Network team and community.
          </li>
          <li className="reward-item">
            <span className="hight-light">Ambassador Role & Badge</span>
            on Discord for recognition.
          </li>
          <li className="reward-item">
            <span className="hight-light">Show Your Role</span> Add Multiple Network Ambassador' to
            your social media profiles.
          </li>
          <li className="reward-item">
            <span className="hight-light">Early Access</span>
            to Multiple Network events, both online and offline.
          </li>
          <li className="reward-item">
            <span className="hight-light">Exclusive Merch & Perks,</span>
            including Multiple-branded goodies and potential collabs.
          </li>
          <li className="reward-item">
            <span className="hight-light">$MTP Token Rewards</span>
            for contributions and engagement.
          </li>
          <li className="reward-item">
            <span className="hight-light">Support for Initiatives,</span>
            with $ funding available on a case-by-case basis.
          </li>
        </Rewards>

        <section className="application-cycles">
          <div className="ambassador-title">Monthly Application Cycles for Ambassadors</div>
          <div className="ambassador-text">
            Applications for the Multiple Network Ambassador Program run on a monthly cycle. To
            boost your chances of selection, we encourage you to actively engage with the
            community—join discussions, answer questions, create content, and support regional
            groups. Your contribution will be seen through different channels. Building a strong
            community presence and aligning with Multiple Network's vision are key factors in the
            selection process.
          </div>
        </section>

        <section className="section-one-last">
          <div className="ambassador-title">Merit-Based Ambassador Growth</div>
          <div className="ambassador-text">
            Advancement in the Multiple Network Ambassador Program is earned through dedication and
            impact. Ambassadors who consistently contribute, engage, and support the Multiple
            Network ecosystem will have the opportunity to grow within the program and unlock
            greater rewards. Senior Ambassadors will take on additional responsibilities, such as
            leading Ambassador teams, supporting key projects, and mentoring new members in the
            program.
          </div>
        </section>

        <div
          onClick={() => {
            window.open('https://forms.gle/eYR9K1UjuugJ3Jtb9');
          }}
          className="bg-#2865FF px-36 py-18 rounded-16 flex justify-between items-center cursor-pointer mt-41"
        >
          <div className="text-22 md:text-16 font-bold">
            You can apply for the Multiple Network Ambassador Program here.
          </div>
          <Image
            priority
            className="w-30 h-30 md:w-20 md:h-20"
            src={require('@img/common/icon-apply.svg')}
            alt=""
          />
        </div>
      </main>
    </AmbassadorWrap>
  );
};

export default Ambassador;

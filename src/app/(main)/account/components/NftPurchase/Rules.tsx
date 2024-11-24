'use client';
import { $fontSize, $marginBottom, $paddingX } from '@/styled/mediaSize';
import { styled } from 'styled-components';

const RulesWrap = styled.div`
  ${$paddingX('60rem', '0', '0')}

  .rule-title {
    ${$fontSize('31rem', '24rem', '24rem')}
    ${$marginBottom('31rem', '21rem', '21rem')}
    font-weight: bold;
    color: #fff;
  }

  .rule-content {
    ${$fontSize('23rem', '16rem', '16rem')}
    color: #5c5c5c;

    > div {
      ${$fontSize('23rem', '16rem', '16rem')}
      color: #5c5c5c;

      &:not(:first-child) {
        margin-top: 13rem;
      }
    }
  }

  .rule-item {
    &:not(:first-child) {
      margin-top: 32rem;
    }
  }
`;

const Rules: React.FC = () => {
  return (
    <RulesWrap>
      <div className="rule-title mb-41! md:mb-21!">Pioneer NFT Rules</div>

      <div className="rule-item">
        <div className="rule-title">Introduction</div>
        <div className="rule-content">
          The Multiple Network Pioneer NFT is an NFT asset issued on the TON chain, granting holders
          various benefits related to the Multiple Network project.
        </div>
      </div>
      <div className="rule-item">
        <div className="rule-title">Benefits Explanation</div>
        <div className="rule-content">
          <div>
            1. Each NFT represents 10,000 MTP tokens, which will be unlocked according to specific
            rules once the project goes live.
          </div>
          <div>
            2. NFT holders can participate in staking and mining during the second phase of the
            Multiple Network testnet, earning testnet points. These points can be exchanged for MTP
            tokens without any lock-up. For details on point exchange and MTP release timelines,
            please refer to official announcements.
          </div>
          <div>
            3. NFT holders will periodically receive official airdrops from Multiple Network.
            Details on airdrop rules will be announced on the official channels.
          </div>
        </div>
      </div>
      <div className="rule-item">
        <div className="rule-title">MTP Unlock Rules</div>
        <div className="rule-content">
          <div>
            1. Each Pioneer NFT includes 10,000 MTP tokens, with a three-month lock-up period after
            listing on exchanges. Following the lock-up, tokens will be released monthly over an
            18-month period at a linear rate, with 5.56% of tokens unlocked each month until fully
            released.
          </div>
          <div>
            2. The wallet address holding the Pioneer NFT can claim MTP tokens directly on the
            official website once they are released, in accordance with official announcements.
          </div>
        </div>
      </div>
      <div className="rule-item">
        <div className="rule-title">NFT Purchase Process</div>
        <div className="rule-content">
          <div>
            1. Multiple Network will issue 100,000 Pioneer NFTs, each priced at 1,200 USDT, with
            10,000 MTP tokens embedded in each NFT, corresponding to an MTP price of 0.12 USDT.
          </div>
          <div>
            2. Users can purchase the Multiple Network Pioneer NFT directly through the TON chain
            wallet on the official website or contact Multiple Network representatives for OTC
            purchases. Pioneer NFTs are transferable between wallets.
          </div>
        </div>
      </div>
    </RulesWrap>
  );
};

export default Rules;

import { styled } from 'styled-components';
import Image from 'next/image';
import { useTonAddress } from '@tonconnect/ui-react';
import { $fontSize, $marginBottom, $maxWidth, $paddingBottom } from '@/styled/mediaSize';
import useAppStore from '@/store/appStore';
import { FC, useMemo } from 'react';
import { plusStar } from '@/utils';

interface IAccountInfoProps {
  balance: string | number;
}

const AccountInfoWrap = styled.div`
  /* max-width: 870rem; */

  ${$maxWidth('100%', '870rem', '870rem')}

  .account-info-content {
    border: solid 1px #d9d9d9;
    border-radius: 10rem;
    padding: 32rem;

    .account-item {
      &:not(:last-child) {
        ${$paddingBottom('31rem', '40rem', '40rem')}
        ${$marginBottom('31rem', '40rem', '40rem')}
        border-bottom: solid 1px #545454;
      }

      .title {
        ${$fontSize('23rem', '14rem', '14rem')}
      }

      .content {
        ${$fontSize('27rem', '24rem', '24rem')}
      }
    }
  }
`;

const AccountInfo: FC<IAccountInfoProps> = (props) => {
  const appStore = useAppStore();
  const walletAddress = useTonAddress();
  const showWalletAddr = useMemo(
    () => (appStore.curDevice === 'phone' ? plusStar(walletAddress, 6, 6) : walletAddress),
    [walletAddress, appStore.curDevice]
  );

  return (
    <AccountInfoWrap>
      <div className="text-31 md:text-24 mb-32">Account Information</div>

      <section className="account-info-content">
        <div className="account-item">
          <div className="title">Wallet Account</div>
          <div className="flex items-center">
            <div className="content">{showWalletAddr}</div>
            <Image
              priority
              data-clipboard-text={walletAddress}
              className="w-31 md:w-20 ml-5 copy-btn cursor-pointer"
              src={require('@img/common/icon-copy.svg')}
              alt=""
            />
          </div>
        </div>
        <div className="account-item">
          <div className="title">Account Balance</div>
          <div>
            <div className="content">{props.balance} MTP</div>
          </div>
        </div>
      </section>
    </AccountInfoWrap>
  );
};

export default AccountInfo;

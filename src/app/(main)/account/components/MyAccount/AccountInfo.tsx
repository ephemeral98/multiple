import { styled } from 'styled-components';
import Image from 'next/image';

const AccountInfoWrap = styled.div`
  max-width: 870rem;

  .account-info-content {
    border: solid 1px #d9d9d9;
    border-radius: 10rem;
    padding: 32rem;

    .account-item {
      &:not(:last-child) {
        padding-bottom: 40rem;
        margin-bottom: 40rem;
        border-bottom: solid 1px #545454;
      }

      .title {
        font-size: 14rem;
      }

      .content {
        font-size: 24rem;
      }
    }
  }
`;

const AccountInfo = () => {
  return (
    <AccountInfoWrap>
      <div className="text-24 mb-32">Account Information</div>

      <section className="account-info-content">
        <div className="account-item">
          <div className="title">Wallet Account</div>
          <div className="flex items-center">
            <div className="content">usdfdfsdfslkdfjlksjklsjfjlsdkjfkldsjfklsjdfljsdklfj</div>
            <Image
              priority
              data-clipboard-text={'alksjdlkjs'}
              className="w-26 md:w-20 ml-5 copy-btn cursor-pointer"
              src={require('@img/common/icon-copy.svg')}
              alt=""
              onClick={() => {
                console.log('click');
              }}
            />
          </div>
        </div>
        <div className="account-item">
          <div className="title">Account Balance</div>
          <div>
            <div className="content">2000 MTP</div>
          </div>
        </div>
      </section>
    </AccountInfoWrap>
  );
};

export default AccountInfo;

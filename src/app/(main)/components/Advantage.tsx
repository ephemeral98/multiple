import { styled } from 'styled-components';
import AdvantagesItem from './AdvantagesItem';
import useAppStore from '@/store/appStore';
import TitleWrap from '@cps/Title';

const AdvantageWrap = styled.div`
  /* background-color: pink; */
`;

const Advantage: React.FC = () => {
  const appStore = useAppStore();

  return (
    <AdvantageWrap className="pb-192 md:pb-224">
      <TitleWrap className='mb-80'>Advantages</TitleWrap>

      <div className="px-38 md:px-0">
        <div className="flex-center flex-col md:flex-row">
          <AdvantagesItem
            reverseBg={false}
            title="Flexible deployment"
            face={require('@img/product/product-1.png')}
            className="w-full md:w-638 md:mr-32"
          >
            <div className="mt-16 text-23 md:text-16">
              Earn/pay as you go. No fixed-term commitments required.
            </div>
          </AdvantagesItem>

          <AdvantagesItem
            reverseBg
            title="Stability and Robustness"
            face={require('@img/product/product-2.png')}
            className="w-full mt-46 md:w-450 md:mt-0"
          >
            <div className="mt-16 text-23 md:text-16 leading-[1.5]">
              <div>With global peer node coverage,</div>
              <div>we overcome regular internet traffic congestion.</div>
            </div>
          </AdvantagesItem>
        </div>
        <div className="flex-center mt-46 md:mt-32 flex-col md:flex-row">
          <AdvantagesItem
            reverseBg={false}
            title="Cost efficiency"
            face={require('@img/product/product-3.png')}
            className="w-full md:w-450 md:mr-32"
          >
            <div className="mt-16 text-23 md:text-16 leading-[1.5]">
              <div>Priced at a fraction of traditional SD-WAN and</div>
              <div>dedicated connection costs.</div>
            </div>
          </AdvantagesItem>

          <AdvantagesItem
            reverseBg
            title="Privacy through Decentralization"
            face={require('@img/product/product-4.png')}
            className="w-full mt-46 md:w-638 md:mt-0"
          >
            <div className="mt-16 text-23 md:text-16 leading-[1.5]">
              <div>
                All data is completely encrypted, ensuring that no centralized storage provider is
                training on your proprietary data.
              </div>
            </div>
          </AdvantagesItem>
        </div>
      </div>
    </AdvantageWrap>
  );
};

export default Advantage;

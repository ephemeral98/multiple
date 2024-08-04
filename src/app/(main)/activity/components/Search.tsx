import { IconSearch } from '@/assets/img/svg/Icons';
import { flexPos } from '@/styled/mixin';
import { FC } from 'react';
import { styled } from 'styled-components';
import Image from 'next/image';

const SearchWrap = styled.div`
  .search-container {
    ${flexPos('center')}

    margin-top: 32rem;

    .search-content {
      margin-right: 16rem;
      flex: auto;
      height: 72rem;
      border-radius: 10rem;
      border: 1px solid #585858;
      padding: 24rem;
      font-size: 16rem;
      color: #fff;

      &::placeholder {
        color: #585858;
      }
    }

    .search-btn {
      width: 72rem;
      height: 72rem;
      border-radius: 10rem;
      ${flexPos('center')}
      border: 1px solid #585858;
      transition: all 0.3s;

      &:hover {
        background-color: #fff;
        color: #585858;
      }
    }
  }
`;

const Search: FC<{
  value: string;
  onRuleClick?: () => void;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
}> = (props) => {
  return (
    <SearchWrap>
      <div className="flex justify-between items-center">
        <div className="text-24 font-bold">Multiple Network Testnet Eligibility Checker</div>
        <div onClick={props.onRuleClick} className="flex-center cursor-pointer">
          <Image
            priority
            className="w-24 mr-8"
            src={require('@img/common/icon-alert.png')}
            alt=""
          />
          <div className="text-24">Rules & Details</div>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-content"
          placeholder="Enter your EVM address to check reward eligibility"
          value={props.value}
          onChange={(e) => {
            props.onChange(e.target.value?.trim?.());
          }}
        />
        <button onClick={(e) => props.onSearch(props.value)} className="search-btn">
          <IconSearch color="#545454" className="w-20" />
        </button>
      </div>
    </SearchWrap>
  );
};

export default Search;

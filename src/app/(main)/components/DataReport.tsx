import { ReactNode } from 'react';
import { styled } from 'styled-components';

const DataReportWrap = styled.div`
  background-image: url('/static/bg-data-report.png');
  background-size: 100% 100%;
  height: 419rem;
  padding-top: 69rem;
  font-size: 16rem;

  .data-report-main {
    width: 1200rem;
    height: 100%;
    margin: 0 auto;
  }

  .linear-text-box {
    text-transform: none;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .linear-text {
    font-size: 64rem;
    background-image: linear-gradient(180deg, #ffffff 59%, #1d1e30 100%);
  }

  .linear-unit {
    font-size: 24rem;
    background-image: linear-gradient(180deg, #ffffff 0%, #161515 100%);
  }
`;

const DataReport = () => {
  return (
    <DataReportWrap>
      <main className="data-report-main">
        <div>Multiple network bandwidth capacity</div>
        <div>
          <span className="linear-text linear-text-box">1,108,205,060.957</span>
          <span className="linear-unit linear-text-box">Mbps</span>
        </div>

        <div className="flex justify-between mt-58">
          <div>
            <div>Multiple network nodes</div>
            <div>
              <span className="linear-text linear-text-box">1,108,205,060.957</span>
            </div>
          </div>

          <div className="ml-100">
            <div>Multiple network storage files</div>
            <div>
              <span className="linear-text linear-text-box">1,108,205,060.957</span>
              <span className="linear-unit linear-text-box">Gb</span>
            </div>
          </div>
        </div>
      </main>
    </DataReportWrap>
  );
};

export default DataReport;

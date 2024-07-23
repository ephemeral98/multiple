import { ReactNode } from 'react';
import { styled } from 'styled-components';
import TitleWrap from '@cps/Title';
import CountUp from 'react-countup';
import { $fontSize, $width } from '@/styled/mediaSize';

const DataReportWrap = styled.div`
  padding-top: 69rem;
  font-size: 16rem;

  .data-report-main {
    background-image: url('/static/bg-data-report.png');
    background-size: 100% 100%;
    width: 100%;
    height: 419rem;

    .data-report-content {
      ${$width('100%', '1200rem', '1200rem')}
      margin: 0 auto;
    }
  }

  .linear-text-box {
    text-transform: none;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .linear-text {
    ${$fontSize('46rem', '64rem', '64rem')}
    background-image: linear-gradient(180deg, #ffffff 59%, #1d1e30 100%);
  }

  .linear-unit {
    margin-left: 14rem;
    ${$fontSize('22rem', '24rem', '24rem')}
    background-image: linear-gradient(180deg, #ffffff 0%, #161515 100%);
  }
`;

const DataReport = () => {
  return (
    <DataReportWrap>
      <TitleWrap className="mb-80">Data Report</TitleWrap>

      <main className="data-report-main">
        <div className="data-report-content px-40 md:px-0">
          <div className="text-23 md:text-16">Multiple network bandwidth capacity</div>
          <div>
            <CountUp
              decimals={3}
              className="linear-text linear-text-box"
              start={0}
              end={1108205060.957}
              duration={5}
              separator=","
            />
            <span className="linear-unit linear-text-box">Mbps</span>
          </div>

          <div className="flex justify-start md:justify-between flex-col md:flex-row mt-58">
            <div>
              <div className="text-23 md:text-16">Multiple network nodes</div>
              <div>
                <CountUp
                  decimals={3}
                  className="linear-text linear-text-box"
                  start={0}
                  end={1108205060.957}
                  duration={5}
                  separator=","
                />
              </div>
            </div>

            <div className="mt-58 md:mt-0 md:ml-100">
              <div>Multiple network storage files</div>
              <div>
                <CountUp
                  decimals={3}
                  className="linear-text linear-text-box"
                  start={0}
                  end={11108205060.957}
                  duration={5}
                  separator=","
                />
                <span className="linear-unit linear-text-box">Gb</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DataReportWrap>
  );
};

export default DataReport;

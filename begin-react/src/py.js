import React from 'react';
import Plot from 'react-plotly.js';

const BEPAnalysis = ({ 
  revenuePerson = 1000,  // 기본값 설정
  variableCost = 500, 
  fixedCosts = 18500 
}) => {
  // 데이터 계산 함수
  const calculateBEPData = () => {
    const contributionMargin = revenuePerson - variableCost;
    const contributionMarginRatio = (contributionMargin / revenuePerson) * 100;
    const bepSales = fixedCosts / (contributionMargin / revenuePerson);
    const bepPeople = bepSales / revenuePerson;

    // 데이터 포인트 생성
    const individuals = Array.from({ length: 100 }, (_, i) => i * (2 * bepPeople / 100));
    const sales = individuals.map(x => x * revenuePerson);
    const totalCost = sales.map(x => fixedCosts + (x * (variableCost / revenuePerson)));
    const profit = sales.map((x, i) => x - totalCost[i]);
    const cumulativeProfit = profit.reduce((acc, curr, i) => {
      acc[i] = (acc[i - 1] || 0) + curr;
      return acc;
    }, []);

    return {
      individuals,
      sales,
      totalCost,
      profit,
      cumulativeProfit,
      bepPeople,
      contributionMargin,
      contributionMarginRatio,
      bepSales
    };
  };

  const data = calculateBEPData();

  // 그래프 데이터 구성
  const plots = [
    // 상단 그래프 데이터
    {
      data: [
        // 매출선
        {
          x: data.individuals,
          y: data.sales.map(v => v/1000),
          mode: 'lines',
          name: '매출',
          line: { color: '#2E86C1', width: 3 }
        },
        // 총비용선
        {
          x: data.individuals,
          y: data.totalCost.map(v => v/1000),
          mode: 'lines',
          name: '총비용',
          line: { color: '#E74C3C', width: 3 }
        },
        // 고정비용선
        {
          x: data.individuals,
          y: Array(data.individuals.length).fill(fixedCosts/1000),
          mode: 'lines',
          name: '고정비용',
          line: { color: '#95A5A6', width: 2, dash: 'dash' }
        }
      ],
      layout: {
        title: {
          text: `손익분기점(BEP) 분석<br><span style="font-size:16px">1인당 매출: ${(revenuePerson/1000).toFixed(1)}천원 | 1인당 변동비: ${(variableCost/1000).toFixed(1)}천원 | 고정비: ${(fixedCosts/1000).toFixed(1)}천원</span>`,
          y: 0.98
        },
        xaxis: { title: '인원 수 (명)' },
        yaxis: { title: '금액 (천원)' },
        height: 600,
        shapes: [{
          type: 'line',
          x0: data.bepPeople,
          x1: data.bepPeople,
          y0: 0,
          y1: 1,
          yref: 'paper',
          line: { color: 'red', dash: 'dot', width: 2 }
        }],
        annotations: [
          // BEP 표시
          {
            x: data.bepPeople,
            y: 1,
            yref: 'paper',
            text: `손익분기점: ${Math.round(data.bepPeople).toLocaleString()}명`,
            showarrow: true,
            arrowhead: 7
          },
          // 공헌이익 정보
          {
            x: 0.02,
            y: 0.85,
            xref: 'paper',
            yref: 'paper',
            text: `<b>공헌이익 분석</b><br>공헌이익: ${(data.contributionMargin/1000).toFixed(1)}천원/인<br>공헌이익률: ${data.contributionMarginRatio.toFixed(1)}%`,
            showarrow: false,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            bordercolor: '#c7c7c7',
            borderwidth: 1,
            borderpad: 4
          },
          // BEP 정보
          {
            x: 0.02,
            y: 0.70,
            xref: 'paper',
            yref: 'paper',
            text: `<b>손익분기점 정보</b><br>BEP 매출액: ${(data.bepSales/1000).toFixed(1)}천원<br>BEP 인원: ${Math.round(data.bepPeople).toLocaleString()}명`,
            showarrow: false,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            bordercolor: '#c7c7c7',
            borderwidth: 1,
            borderpad: 4
          }
        ]
      }
    },
    // 하단 그래프 데이터
    {
      data: [
        // 이익선
        {
          x: data.individuals,
          y: data.profit.map(v => v/1000),
          mode: 'lines',
          name: '이익',
          line: { color: '#27AE60', width: 2 }
        },
        // 누적이익선
        {
          x: data.individuals,
          y: data.cumulativeProfit.map(v => v/1000),
          mode: 'lines',
          name: '누적이익',
          line: { color: '#8E44AD', width: 2 }
        }
      ],
      layout: {
        xaxis: { title: '인원 수 (명)' },
        yaxis: { title: '이익/누적이익 (천원)' },
        height: 300,
        shapes: [{
          type: 'line',
          x0: data.bepPeople,
          x1: data.bepPeople,
          y0: 0,
          y1: 1,
          yref: 'paper',
          line: { color: 'red', dash: 'dot', width: 2 }
        }]
      }
    }
  ];

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      {plots.map((plot, index) => (
        <div key={index} className="mb-4">
          <Plot
            data={plot.data}
            layout={{
              ...plot.layout,
              width: null,  // 반응형을 위해 null로 설정
              autosize: true,
              margin: { l: 50, r: 50, t: 80, b: 50 },
              showlegend: true,
              legend: {
                y: 0.99,
                x: 0.01,
                bgcolor: 'rgba(255, 255, 255, 0.8)'
              },
              hovermode: 'x unified',
              template: 'plotly_white'
            }}
            useResizeHandler={true}
            className="w-full"
            config={{
              responsive: true,
              displayModeBar: true,
              modeBarButtonsToRemove: [
                'lasso2d',
                'select2d'
              ]
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BEPAnalysis;
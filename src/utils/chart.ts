import G2 from '@antv/g2'

class Chart {
	static topChart1(config: G2.ChartProps, data) {
		const chart = new G2.Chart(config)
		chart.source(data)
		chart.tooltip({
			showTitle: false,
			shared: true,
			crosshairs: {
				type: 'line',
			}
		});
		chart.axis(false)
		chart.area().position('date*value').shape('smooth');
		chart.line().position('date*value').shape('smooth');
		chart.render()
	}

	static topChart2(config: G2.ChartProps, data) {
		const chart = new G2.Chart(config);
		chart.source(data);
		chart.scale('value', {
			tickInterval: 20
		});
		chart.axis(false)
		chart.interval().position('date*value');
		chart.render();
	}

	static topChart3(config: G2.ChartProps, data) {
		const chart = new G2.Chart(config)
		chart.source(data)
		chart.tooltip({
			showTitle: false,
			shared: true,
			crosshairs: {
				type: 'line',
			}
		});
		chart.axis(false)
		chart.area().position('date*value').shape('smooth');
		chart.line().position('date*value').shape('smooth');
		chart.render()
	}
}

export default Chart
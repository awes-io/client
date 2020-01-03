<template>
    <div>
        <AwChart
            type="bar"
            :height="300"
             :data="{
                labels: ['10.31', '11.31', '12.31', '13.31', '14.31', '15.31', '16.31', '17.31', '18.31', '19.31', '20.31', '21.31', '22.31', '23.31', '24.31', '25.31', '26.31'],
                datasets: [
                    {
                        label: 'standart',
                        backgroundColor: '#4856D8',
                        data: [4, 2, 3, 5, 3, 2, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                    },
                    {
                        label: 'Premium',
                        backgroundColor: '#466DDF',
                        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                    },
                    {
                        label: 'Priveleged',
                        backgroundColor: '#6898EC',
                        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                    },
                    {
                        label: 'VIP',
                        backgroundColor: '#9EBFF8',
                        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                    },
                    {
                        label: 'Previous',
                        backgroundColor: '#BED6FF',
                        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                    }
                ]
             }"
             :options="{
                tooltips: {
                  displayColors: true,
                  callbacks: {
                    mode: 'x',
                  },
                },
                scales: {
                  xAxes: [
                    {
                        stacked: true,
                        gridLines: {
                          display: false,
                        },
                        radius: 25
                    }
                  ],
                  yAxes: [
                    {
                        stacked: true,
                        ticks: {
                          beginAtZero: true,
                        },
                        type: 'linear',
                    }
                  ]
                },
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true
                    }
                }
             }"
        ></AwChart>
    </div>
</template>

<script>
export default {
    name: "Chart"
}
</script>

<template>
    <AwPage title="AwContentWrapper">
        <AwButton @click="check" class="my-4">Check param 'status_id'</AwButton>
        <AwContentWrapper
            url="/api/chart"
            :watch-params="['status_id', 'search']"
        >
            <template slot-scope="{ data }">
                <AwChart
                    v-if="data"
                    type="bar"
                    :height="500"
                    :data="data"
                    :options="{
                        tooltips: {
                            displayColors: true,
                            callbacks: {
                                mode: 'x'
                            }
                        },
                        scales: {
                            xAxes: [
                                {
                                    stacked: true,
                                    gridLines: {
                                        display: false
                                    },
                                    radius: 25
                                }
                            ],
                            yAxes: [
                                {
                                    stacked: true,
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    type: 'linear'
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
            </template>
        </AwContentWrapper>
    </AwPage>
</template>

<script>
import AwContentWrapper from '../components/AwContentWrapper'
import { mergeRouteQuery } from '../assets/js/router'

export default {
    components: { AwContentWrapper },
    head() {
        return {
            title: 'AwContentWrapper'
        }
    },

    methods: {
        check() {
            this.$router.replace(
                mergeRouteQuery(
                    {
                        status_id: Math.floor(Math.random() * Math.floor(10))
                    },
                    this.$route
                )
            )
        }
    }
}
</script>

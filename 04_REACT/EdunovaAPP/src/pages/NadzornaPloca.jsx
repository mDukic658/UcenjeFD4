import { useState, useEffect } from "react";
import GrupaService from "../services/grupe/GrupaService";
import { Container } from "react-bootstrap";
import Highcharts from 'highcharts';
import {HighchartsReact} from 'highcharts-react-official';

export default function NadzornaPloca() {

    const [podaci, setPodaci] = useState([]);




    async function getPodaci() {
        const odgovor = await GrupaService.get();
        setPodaci(odgovor.data.map((grupa) => {
            return {
                y: grupa.polaznici.length,
                name: grupa.naziv,
            };
        }));
    }

    useEffect(() => {
        getPodaci();
    }, []);

    const fixedOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: 'Broj polaznika po grupi',
            align: 'left',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
            enabled: false,
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                },
            },
        },
    };


    return (
        <>
            <Container className='mt-4'>
                {podaci.length > 0 && (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            ...fixedOptions,
                            series: [
                                {
                                    name: 'Polaznici',
                                    colorByPoint: true,
                                    data: podaci,
                                },
                            ],
                        }}
                    />
                )}
            </Container>
        </>
    )
}

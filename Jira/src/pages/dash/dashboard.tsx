/* eslint-disable jsx-a11y/anchor-is-valid */

import type { FC } from "react";
import { useEffect, useState } from "react"
import { HiArrowRight } from 'react-icons/hi'; // Importar el icono HiArrowRight de Hero Icons React


import NavbarSidebarLayout2 from "../../layouts/navbar-sidebar2";
import axios from "axios";

import CryptoJS from "crypto-js";
import CountUp from "react-countup";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import { Badge, Card, } from 'flowbite-react';

import ApexCharts from 'apexcharts';
import 'apexcharts/dist/apexcharts.css';




const created_user3 = localStorage.getItem("badgeSession") || "";
const created_user2 = (created_user3 ? CryptoJS.AES.decrypt(created_user3, "Tyrannosaurus") : "");
const created_user = (created_user2 ? created_user2.toString(CryptoJS.enc.Utf8) : "");


const GiftDashboard: FC = function () {


  const [sharedState, setSharedState] = useState(false);


  return (
    <NavbarSidebarLayout2 isFooter={true}>
      <CurrentTasksView
        sharedState={sharedState} />

    </NavbarSidebarLayout2>
  );
};



interface GiftData {
  account: string;
  total_count: number;
}
interface GiftData2 {
  total_amount: string;
  total_count: number;
}
interface GiftData3 {
  account: string;
  total_count: number;
}
interface GiftData4 {
  [x: string]: any;
  total_count: string;
  total_amount: number;
}
interface GiftData5 {
  total_amount: number;
  total_count: string;
}



const CurrentTasksView: FC<any> = function ({ sharedState }: any) {


  const [data, setData] = useState<GiftData[]>([]);
  const [data2, setData2] = useState<GiftData2[]>([]);
  const [data3, setData3] = useState<GiftData3[]>([]);
  const [data4, setData4] = useState<GiftData4[]>([]);
  const [data5, setData5] = useState<GiftData5[]>([]);

  const fetchData = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const [result1, result2, result3, result4, result5] = await Promise.all([
        fetchData('https://bn.glassmountainbpo.com:8080/gift/dashboard'),
        fetchData('https://bn.glassmountainbpo.com:8080/gift_number/dashboard'),
        fetchData('https://bn.glassmountainbpo.com:8080/gift_caduc/dashboard'),
        fetchData('https://bn.glassmountainbpo.com:8080/gift_expire/dashboard'),
        fetchData('https://bn.glassmountainbpo.com:8080//gift_delivered/dashboard')
      ]);

      setData(result1);
      setData2(result2);
      setData3(result3);
      setData4(result4);
      setData5(result5);
    };

    fetchDataAndSetData();
  }, [sharedState]);

  // Verificar los datos recibidos
  console.log('Data:', data);
  console.log('Data2:', data2);
  console.log('Data3:', data3);
  console.log('Data4:', data4);
  console.log('Data5:', data5);



  const expire = data3; // Establecer taskArray como un array vacío si data3 es falsy
  const countDash = data2;
  const taskArray = data; // Establecer taskArray como un array vacío si data es falsy
  const expireAmount = data4;

  console.log('data', data); // Imprimir taskArray de manera legible


  // Realiza la lógica de mapeo de taskArray solo después de que el componente se monte
  const mappedDatas = data.map(row => row.total_count);
  const mappedAccountNames = data.map(row => row.account);

  // Realiza la lógica para el conteo de tarjetas proximas a vencer 
  const mappedDatas_ = data3.map(row => row.total_count);
  const mappedAccountNames_ = data3.map(row => row.account);

  // Realizar la logica para el conteo de tarjetas proximas a vencer entregadas
  const mappedDatasDely = data5.map(row => row.total_amount);
  const mappedAccountDelyNames = data5.map(row => row.total_count);

  console.log('account', mappedDatas, mappedAccountDelyNames)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const getRandomImageUrl = () => {
    const randomId = Math.floor(Math.random() * 1000); // Genera un ID aleatorio

    const keywords = "landscape"; // Palabras clave para buscar paisajes
    // const keywords = "people"; // Palabras clave para buscar paisajes

    // URL de imagen aleatoria de Unsplash con palabras clave de paisajes
    return `https://source.unsplash.com/random/400x200?${keywords}&sig=${randomId}`
    // return `https://source.unsplash.com/random/400x200?sig=${randomId}`; // URL de imagen aleatoria de Unsplash


  };

  const getRandomColor2 = () => {
    const letters = '1234'; // Quitamos los colores muy saturados y oscuros
    let color = '#';
    for (let i = 0; i < 5; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  const getRandomColor3 = () => {
    return '#000000'; // Devuelve el color negro
  };


  const getRandomColor = () => {
    const specificColors = [
      '#B7F44B',
      '#65F481',
      '#444EF5',
      '#5333F5',
      '#00F596',
      '#00E1F5',
      '#00F439'


    ];
    return specificColors[Math.floor(Math.random() * specificColors.length)];
  };



  const getRandomColorUrl = () => {
    return `linear-gradient(to bottom right, ${getRandomColor()}, ${getRandomColor()})`;
  };

  //Creando graficas

  // Calcular el total de todas las cuentas
  const total = taskArray.reduce((acc, task) => acc + task.total_count, 0);

  const totalExpire: number[] = expireAmount.map((row) => parseInt(row.total_count, 10));


  const totalSum = totalExpire.reduce((acc, currentValue) => acc + currentValue, 0) + total;
  const totalDife = total - totalExpire.reduce((acc, currentValue) => acc + currentValue, 0);

  // Ahora totalExpire es un array de números (row.total_count) convertidos a tipo number


  // console.log(total);
  // console.log(totalExpire);
  // console.log(totalSum);
  // console.log(totalDife);


  //Calculando el porcentaje
  const percentage = (totalExpire.reduce((acc, currentValue) => acc + currentValue, 0) / total) * 100;
  console.log("Porcentaje de totalExpire con respecto a total:", percentage.toFixed(2) + "%");

  console.log(percentage)

  // Calcular los porcentajes de cada cuenta
  const percentages: number[] = taskArray.map(task => parseFloat(((task.total_count / total) * 100).toFixed(2)));

  // Calcular el ángulo de inicio para cada cuent



  const getChartOptions = () => {
    return {
      series: mappedDatas,
      colors: [
        '#FDBA8C',
        '#FF6B52',
        '#00F596',
        '#FFCC6A',
        '#F5A65A',
        '#FF5052',
        '#FFEC75',
        '#65F481',
        '#5333F5',
        '#F85771',
        '#00E1F5',
        '#F54747',
        '#FFA552',
        '#B7F44B',
        '#FFB16D',
        '#00F439',
        '#1A56DB',
        '#FF9378',
        '#F5D76A',
        '#FFBF52',
        '#FDBF5A',
        '#FFD354',
        '#444EF5',
        '#FF8752'
      ],

      color: "#A9B0AF",

      chart: {
        height: 320,
        width: "100%",
        type: "donut",
        color: "#A9B0AF",
      },
      stroke: {
        colors: ["transparent"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: 20,
                style: {
                  colors: ['#6c757d'], // Cambiar a tu tono de gris deseado
                }
              },
              total: {
                showAlways: true,
                show: true,
                label: "Total by account",
                style: {
                  fill: ['#6c757d'], // Cambiar a tu tono de gris deseado
                },
                color: "#A7B0AF ",
                formatter: function (w: { globals: { seriesTotals: any[]; }; }) {
                  const sum = w.globals.seriesTotals.reduce((a: any, b: any) => {
                    return a + b
                  }, 0)
                  return sum + " " + 'Gifts'
                },
              },
              value: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: -20,
                color: "#A9B0AF",
                style: {
                  fill: ['#ffffff'], // Cambiar a tu tono de gris deseado
                },
                formatter: function (total: string) {
                  return total + "Gift"
                },
              },
            },
            color: "#A9B0AF",
            size: "80%",
          },
        },
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal text-gray-100 dark:text-gray-100' // Puedes ajustar el tono de gris según tus preferencias
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },
      labels: mappedAccountNames,
      dataLabels: {
        enabled: false,
        color: "#A9B0AF",
      },

      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal text-gray-500 dark:text-gray-200'
        },
        color: "#A9B0AF",
      },
      yaxis: {
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal text-gray-100 dark:text-gray-200'
        },
        labels: {
          formatter: function (value: string) {
            return value + "Gift"
          },
        },
      },
      xaxis: {
        labels: {
          color: "#A9B0AF",
          formatter: function (value: string) {
            return value + "Gift"
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      // Añadido bloque de estilo con color gris suave
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: 'text-xs font-normal text-gray-100 dark:text-gray-100' // Puedes ajustar el tono de gris según tus preferencias
      },
    };
  }




  if ((document.getElementById("donut-chart") || typeof ApexCharts !== 'undefined') || (document.querySelectorAll('input[type="checkbox"]'))) {
    const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions());
    const dataSeries = data.map((row: { total_count: number }) => row.total_count);



    console.log('set ', dataSeries);


    useEffect(() => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', handleCheckboxChange);
      });

      return () => {
        checkboxes.forEach((checkbox) => {
          checkbox.removeEventListener('change', handleCheckboxChange);
        });
      };
    }, [dataSeries, chart]);

    function handleCheckboxChange(event: Event) {
      const checkbox = event.target as HTMLInputElement;
      const index = parseInt(checkbox.value, 10);

      const newValue = (checkbox.checked && !isNaN(index) && index >= 0 && index < dataSeries.length)
        ? [dataSeries[index]]
        : dataSeries;
      chart.updateSeries(newValue);
    }
    chart.render();

  }



  const options = {
    series: [

      {
        name: "quantity",
        data: mappedDatas_,
        color: "#FDBA8C",
        colors: ["#B7F44B", "#5333F5", "#00F596", "#E74694", "#65F481", "#00E1F5", "#00F439", "#444EF5", "#464EF5"],
      },
      {
        name: "delivered",
        color: "#1A56DB",
        data: mappedDatasDely,
      },

    ],
    chart: {
      sparkline: {
        enabled: false,
      },
      type: "bar",
      width: "100%",
      height: 280,
      toolbar: {
        show: false,
      }
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        // horizontal: true,
        vertical: true,
        columnWidth: "40%",
        columnHeight: "200%",
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: {
          position: "top",
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      formatter: function (value: string) {
        return value
      }
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-600 dark:fill-gray-300'
        },
        formatter: function (value: string) {
          return value
        }
      },
      categories: mappedAccountNames_,
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-600 dark:fill-gray-400'
        }
      }
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20
      },
    },

  }


  const chart = new ApexCharts(document.getElementById("bar-chart"), options);
  chart.render();



  //@___________________Lable vendor Graphics___________________________________@amelendez7

  const options_vendors = {
    dataLabels: {
      enabled: true,
      // offsetX: 10,
      style: {
        cssClass: 'text-xs text-white font-medium'
      },
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 16,
        right: 16,
        top: -26
      },
    },
    series: [
      {
        name: "Developer Edition",
        data: 
          [34,12,34,6,6,74,7,8,9]
          ,
        color: "#1A56DB",
      },
      {
        name: "Designer Edition",
        data: [
          [34,12,23], [23,44],[34,12], [23,44],[34,12], [23,44],[34,12], [23,44],[34,12], [23,44],
          
        ],
        color: "#7E3BF2"
      }
    ],
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    legend: {
      show: true
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    stroke: {
      width: 6,
    },
    xaxis: {
      categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      },
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: 'text-xs font-normal fill-gray-200 dark:fill-gray-200'
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },

    },
    yaxis: {
      show: false,
      labels: {
        formatter: function (value: any) {
          return '$' + value;
        }
      }
    },
  }

  if (document.getElementById("data-labels-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("data-labels-chart"), options_vendors);
    chart.render();
  }


  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
      {/* Cuadro 1 */}
      <div className="col-span-3 bg-white-200 p-4 rounded-lg border-b dark:bg-gray-800 dark:border-gray-700 ">
        {Array.isArray(taskArray) && taskArray.length && (
          <Slider {...settings} className="ml-4 mr-4">
            {taskArray.map((task, index) => (
              <div key={"row" + index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/2 mb-2 ml-2 p-2">
                <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 rounded-lg p-8 flex flex-col justify-between items-center relative">

                  <div style={{ position: 'relative' }}>
                    <div className="absolute top-0 left-0 w-full h-full rounded-lg dark:opacity-50 opacity-10" style={{ background: getRandomColor3(), zIndex: 2, position: 'absolute' }}></div>
                    <div className="absolute top-0 left-0 w-full h-full rounded-lg dark:opacity-50 opacity-10" style={{ background: 'transparent', zIndex: 2, position: 'absolute' }}>
                      {/* Aquí coloca tu texto */}
                    </div>
                  </div>

                  <div className="absolute top-0 left-0 w-full h-full rounded-lg dark:opacity-96 opacity-95" style={{ background: getRandomColorUrl() }}></div>
                  <div className="absolute top-0 left-0 w-full h-full rounded-lg dark:opacity-30 opacity-20" style={{ background: getRandomColor2() }}></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-cover rounded-lg dark:opacity-20 opacity-20" style={{ backgroundImage: `url(${getRandomImageUrl()})` }}></div>
                  <div className="text-center relative z-10 w-full">

                    <h3 className="font-semibold text-lg text-white dark:text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{task.account}</h3>
                    <h1 className="text-lg text-white dark:text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Gift's:
                      <CountUp
                        className="text-center ml-1"
                        start={0}
                        end={task.total_count}
                        duration={2.0}
                        separator=","
                        decimals={0}
                        decimal="."
                        prefix=""
                      />
                    </h1>
                    <button className="bg-indigo-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full absolute right-0 top-12">Go</button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>

      {/* incido cudro tres */}






      {/* Cuadro 3 */}
      <div className="bg-gray-100  rounded-lg border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-30 dark:hover:bg-gray-600 hover:bg-white-200">

        <Card className='max-w-ms border-none'>
          {/* <h2 className="mb-4 text-2xl font-medium text-gray-500 dark:text-gray-400"> Gift card's inventory  </h2> */}


          <div className="max-w-ms w-ms bg-white rounded-lg  dark:bg-gray-800  md:p-3">


            <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 ">
              <dl>


                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Gift card's inventory </h5>

                <div className="flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-4xl font-semibold"></span>
                  {countDash.map((row, _index) => (
                    <span className="text-4xl font-extrabold tracking-tight mr-12"><Badge className='text-5xl font-extrabold tracking-tight' color={''}><CountUp
                      className="text-center ml-1"
                      start={0}
                      end={row.total_count}
                      duration={2.0}
                      separator=","
                      decimals={0}
                      decimal="."
                      prefix=""
                    ></CountUp>   <span className="ml-1 text-2xl font-normal text-gray-500 dark:text-gray-400">available  </span></Badge>
                    </span>

                  ))}

                </div>


              </dl>


              <div>

                <>
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Total Amount</dt>
                  <dd className="leading-none text-4xl font-semibold text-gray-900 dark:text-white"> $ <span className="text-4xl font-semibold"></span>
                    {countDash.map((row, _index) => (
                      <span className=""><CountUp
                        className="text-center "
                        start={0}
                        end={row.total_amount}
                        duration={2.0}
                        separator=","
                        decimals={0}
                        decimal="."
                        prefix=""
                      ></CountUp>
                      </span>

                    ))}</dd>


                </>

              </div>


            </div>
          </div>


          <div className="overflow-x-auto">
            <table className="w-full mt-0">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-300">Account</th>
                  <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-300">Available</th>
                  <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-300">Percentage</th>
                  <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {taskArray.map((task, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800 hover:bg-white-800' : 'bg-white dark:bg-gray-900 hover:bg-gray-200'}>
                    <td className="px-4 py-2 text-xs font-semibold text-gray-800 dark:text-gray-200 ">{task.account}</td>
                    <td className="px-4 py-2 text-ls font-semibold text-gray-800 dark:text-gray-200">{task.total_count}</td>
                    <td className="px-4 py-2 text-xs text-gray-900 dark:text-gray-200">{percentages[index]}%</td>
                    <td className="px-4 py-2 text-ls text-gray-800 dark:text-gray-200">

                      <button className="dark:bg-gray-800 dark:hover:bg-indigo-500 hover:bg-indigo-500 bg-indigo-700 text-white font-bold py-1 px-1 rounded-full  right-0 top-12">
                        <HiArrowRight className="h-5 w-5" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full"
            onClick={() => window.location.href = "/cards"}

          >
            View all
          </button>
        </Card>

      </div>




      <div className="bg-green-400 p-4 rounded-lg border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-30 dark:hover:bg-gray-600 hover:bg-white-100 ">

        <div className="max-w-ms w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
          <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
            <dl>
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">total about to expire</dt>
              <dd className="leading-none text-4xl font-semibold text-gray-900 dark:text-white"> $ <span className="text-4xl font-semibold"></span>
                {expireAmount.slice(0, 2).map((row_, _index) => (
                  <span className=""><CountUp
                    className="text-center "
                    start={0}
                    end={row_.total_amount}
                    duration={2.0}
                    separator=","
                    decimals={0}
                    decimal="."
                    prefix=""
                  ></CountUp>
                  </span>

                ))}</dd>
            </dl>
            <div>
              {parseFloat(percentage.toFixed(2)) > 10 ? (
                <span className="bg-red-500 text-white text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-red-500 dark:text-red-100">

                  <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                  </svg>
                  Loss rate {percentage.toFixed(2) + "%"}
                </span>
              ) : (
                <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">

                  <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                  </svg>
                  Loss rate {percentage.toFixed(2) + "%"}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 py-3">
            <dl>
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Expiring Quantity</dt>

              <dd className="leading-none text-4xl font-bold text-orange-500 dark:text-orange-300">
                {expireAmount.slice(0, 2).map((row_, _index) => (

                  // {expireAmount.map((row_, _index) => (
                  <span className=""><CountUp
                    className="text-center "
                    start={0}
                    end={row_.total_count}
                    duration={2.0}
                    separator=","
                    decimals={0}
                    decimal="."
                    prefix=""
                  ></CountUp>
                  </span>

                ))}
              </dd>
            </dl>
          </div>

          <div id="bar-chart"></div>
          <div className="py-6" id="radial-chart"></div>

          <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
            <div className="flex justify-between items-center pt-5">

              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="lastDaysdropdown"
                data-dropdown-placement="bottom"
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                type="button">
                Next 2 months
                <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 6 months</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last year</a>
                  </li>
                </ul>
              </div>
              {/* <a
                href="#"
                className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                Revenue Report
                <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
              </a> */}
            </div>
          </div>
        </div>



      </div>


      {/* Cuadro 3*/}
      <div className="bg-indigo-600 p-4 rounded-lg border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-30 dark:hover:bg-gray-600 hover:bg-white-200 max-w-auto ">

        <div className="max-w-auto w-full bg-white  rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 ">
          <div className="flex justify-between mb-3 ">
            <div className="flex justify-center items-center max-w-auto">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Account transaction total</h5>
              <svg data-popover-target="chart-info" data-popover-placement="bottom" className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
              </svg>
              <div data-popover id="chart-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                <div className="p-3 space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Activity growth - Incremental</h3>
                  <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                  <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
                  <a href="#" className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg className="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg></a>
                </div>
                <div data-popper-arrow></div>
              </div>
            </div>
            <div>
              <button type="button" data-tooltip-target="data-tooltip" data-tooltip-placement="bottom" className="hidden sm:inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm"><svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
              </svg><span className="sr-only">Download data</span>
              </button>
              <div id="data-tooltip" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Download CSV
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex" id="devices">
              <div className="flex flex-wrap">
                {data.map((roww, x) => (
                  <div key={x} id="devices" className="flex items-center me-4 mb-2 w-full md:w-auto">
                    <input type="checkbox" value={x} name='tast' id='tast' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{roww.account}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="py-6" id="donut-chart"></div>
          <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
            <div className="flex justify-between items-center pt-5">

            </div>
          </div>
        </div>

      </div>

      <div className="">


        {/* Cuadro 4 : pendiente*/}

      </div>




      <div className="col-span-3 bg-white-200 p-4 rounded-lg border-b dark:bg-gray-800 dark:border-gray-700 ">
        <div className="bg-green-400 p-4 rounded-lg border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-30 dark:hover:bg-gray-600 hover:bg-white-100 ">



          <div className="max-w-ms w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">

            <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
              <dl>
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">total about to expire</dt>
                <dd className="leading-none text-4xl font-semibold text-gray-900 dark:text-white"> $ <span className="text-4xl font-semibold"></span>
                  {expireAmount.slice(0, 2).map((row_, _index) => (
                    <span className=""><CountUp
                      className="text-center "
                      start={0}
                      end={row_.total_amount}
                      duration={2.0}
                      separator=","
                      decimals={0}
                      decimal="."
                      prefix=""
                    ></CountUp>
                    </span>

                  ))}</dd>
              </dl>
              <div>
                {parseFloat(percentage.toFixed(2)) > 10 ? (
                  <span className="bg-red-500 text-white text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-red-500 dark:text-red-100">

                    <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                    </svg>
                    Loss rate {percentage.toFixed(2) + "%"}
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">

                    <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                    </svg>
                    Loss rate {percentage.toFixed(2) + "%"}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 py-3">
              <dl>
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Expiring Quantity</dt>

                <dd className="leading-none text-4xl font-bold text-orange-500 dark:text-orange-300">
                  {expireAmount.slice(0, 2).map((row_, _index) => (

                    // {expireAmount.map((row_, _index) => (
                    <span className=""><CountUp
                      className="text-center "
                      start={0}
                      end={row_.total_count}
                      duration={2.0}
                      separator=","
                      decimals={0}
                      decimal="."
                      prefix=""
                    ></CountUp>
                    </span>

                  ))}
                </dd>
              </dl>
            </div>

            <div id="data-labels-chart" className="px-2.5"></div>
            <div className="py-6" id="radial-chart"></div>

            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
              <div className="flex justify-between items-center pt-5">

                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="lastDaysdropdown"
                  data-dropdown-placement="bottom"
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                  type="button">
                  Next 2 months
                  <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 6 months</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last year</a>
                    </li>
                  </ul>
                </div>
                {/* <a
                href="#"
                className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                Revenue Report
                <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
              </a> */}
              </div>
            </div>
          </div>



        </div>
      </div>


    </div>
  );


};






export default GiftDashboard;


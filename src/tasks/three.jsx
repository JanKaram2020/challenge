import {BackToHome} from "../App";
import {useEffect, useState} from "react";
import {Bar, Doughnut, Line, Pie} from 'react-chartjs-2';


/*
  Think about the data you've received, how can we best extract insights
  from this data?

  Feel free to come up with more visualization ideas 
  than the ones required below.
*/

const ChallengeThree = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    const ageData = {
        labels: ['0-25', '25-50', '50-75', '75-100'],
        datasets: [
            {
                label: 'no of people of this age',
                data: [
                    data.filter((person) => person.dob.age < 25).length,
                    data.filter((person) => person.dob.age >= 25 && person.dob.age < 50).length,
                    data.filter((person) => person.dob.age >= 50 && person.dob.age < 75).length,
                    data.filter((person) => person.dob.age >= 75 && person.dob.age < 100).length
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgb(255,255,255)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgb(255,255,255)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const genderData = {
        labels: ['male', 'female'],
        datasets: [
            {
                label: 'no of people of genders',
                data: [
                    data.filter((person) => person.gender === 'male').length,
                    data.filter((person) => person.gender === 'female').length,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const uniqueCountries = [...new Set(data.map((person) => person.location.country))];
    const countryData = {
        labels: uniqueCountries,
        datasets: [
            {
                label: 'no of people of this country',
                data: uniqueCountries.map((country) => {
                    return (
                        data.filter((person) => person.location.country === country).length
                    )
                }),
                backgroundColor: uniqueCountries.map(() => {
                    return ("#" + ((1 << 24) * Math.random() | 0).toString(16))
                }),
                borderWidth: 1,
            },
        ],
    };
    const uniqueDates = [...new Set(data.map((person) => person.registered.date.substr(0, 4)).sort((a, b) => a - b))];
    const registerData = {
        labels: uniqueDates,
        datasets: [
            {
                label: 'no of people of this year',
                data: uniqueDates.map((year) => {
                    return (
                        data.filter((person) => person.registered.date.substr(0, 4) === year).length
                    )
                }),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
            },
        ],
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await fetch(
                `https://randomuser.me/api/?seed=dexi-interview?page=1&results=100`
            );
            const response = await result.json();
            if (response.results.length === 0) {
                setEmpty(true);
            }
            setData(response.results);
            setLoading(false);
        };
        fetchData();
    }, []);
    const isDark = !document.querySelector('body').classList.contains('lightMode');
    return (
        <>
            <BackToHome/>
            <h1 className={`title is-1 ${isDark ? 'has-text-white' : 'has-text-black'}`}>Challenge 3</h1>
            <h2 className={`subtitle ${isDark ? 'has-text-grey-lighter' : 'has-text-grey-dark'}`}>
                Fetch 100 users from the same api as before, and visualize their
                distribution by <code>age</code>, <code>gender</code>,
                <code>country</code>, and <code>registration date</code>.
            </h2>

            {/* Insert your data visualizations here */}
            {loading ? (<h3>Loading.....</h3>) : (empty ? (<h3>Empty dataset</h3>) : (
                <div className="visualization">
                    <Pie data={ageData}/>
                    <Doughnut data={genderData}/>
                    <Bar data={countryData} options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    min: 0
                                }
                            }]
                        }
                    }}/>
                    <Line data={registerData} options={{
                        indexAxis: 'y',
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    min: 0
                                }
                            }]
                        }
                    }}/>
                </div>))}
        </>
    );
};

export default ChallengeThree;

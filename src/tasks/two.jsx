import {BackToHome} from "../App";
import {useEffect, useState} from "react";
/*
  hint: the API takes page and results as query string
  eg: `?page=3&results=10`
*/
const TableRow = ({person, data, setData}) => {
    const [edit, setEdit] = useState(false);
    const [firstName, setFirstName] = useState(person.name.first);
    const [lastName, setLastName] = useState(person.name.last);
    const [email, setEmail] = useState(person.email);
    const [title, setTitle] = useState(person.name.title);
    const changeHandler = (e, id) => {
        if (e.target.name === "firstName") {
            setFirstName(e.target.value);
            const newData = data;
            const index = newData.findIndex((obj) => obj.id.value === id);
            newData[index].name.first = e.target.value;
            setData(newData);
        }
        if (e.target.name === "lastName") {
            setLastName(e.target.value);
            const newData = data;
            const index = newData.findIndex((obj) => obj.id.value === id);
            newData[index].name.last = e.target.value;
            setData(newData);
        }
        if (e.target.name === "email") {
            setEmail(e.target.value);
            const newData = data;
            const index = newData.findIndex((obj) => obj.id.value === id);
            newData[index].email = e.target.value;
            setData(newData);
        }
        if (e.target.name === "title") {
            setTitle(e.target.value);
            const newData = data;
            const index = newData.findIndex((obj) => obj.id.value === id);
            newData[index].title = e.target.value;
            setData(newData);
        }
    };
    return (
        <tr>
            <td
                style={{display: "flex", gap: "10px", alignItems: "center"}}
            >
                <img
                    src={person.picture.thumbnail}
                    alt={person.id.name}
                    style={{maxWidth: "40px", borderRadius: "50%"}}
                />
                <div>
                    <div className="is-size-6">
                        {edit === true ? (
                            <div className="is-flex">
                                <input
                                    className="input is-inline"
                                    name="firstName"
                                    value={`${firstName}`}
                                    onChange={(e) => changeHandler(e, person.id.value)}
                                />
                                <input
                                    className="input is-inline"
                                    name="lastName"
                                    value={`${lastName}`}
                                    onChange={(e) => changeHandler(e, person.id.value)}
                                />
                            </div>
                        ) : (
                            `${firstName} ${lastName}`
                        )}
                    </div>
                    <p className="has-text-grey is-size-7">
                        {edit === true ? (
                            <input
                                className="input is-small"
                                name="email"
                                value={`${email}`}
                                onChange={(e) => changeHandler(e, person.id.value)}
                            />
                        ) : (
                            `za
                        ${email}`
                        )}
                    </p>
                </div>
            </td>
            <td>
                {edit === true ? (
                    <input
                        className="input"
                        name="title"
                        value={`${title}`}
                        onChange={(e) => changeHandler(e, person.id.value)}
                    />
                ) : (
                    `${title}`
                )}
            </td>
            <td>
                <button className="button is-primary is-rounded is-small">
                    active
                </button>
            </td>
            <td>
                <button
                    className="button is-primary is-inverted"
                    onClick={() => setEdit(!edit)}
                >
                    edit
                </button>
            </td>
        </tr>
    )
}
const ChallengeTwo = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [page, setPage] = useState(2);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await fetch(
                `https://randomuser.me/api/?seed=dexi-interview?page=1&results=5`
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
    const handleClick = async () => {
        setPage(page + 1);
        setLoading(true);
        const result = await fetch(
            `https://randomuser.me/api/?seed=dexi-interview?page=${page}&results=5`
        );
        const response = await result.json();
        if (response.results.length === 0) {
            setEmpty(true);
        }
        setData(data.concat(response.results));
        setLoading(false);
    };
    const isDark = !document.querySelector('body').classList.contains('lightMode');
    return (
        <>
            <BackToHome/>
            <h1 className={`title is-1 ${isDark ? 'has-text-white' : 'has-text-black'}`}>Challenge 2</h1>
            <h2 className={`subtitle ${isDark ? 'has-text-grey-lighter' : 'has-text-grey-dark'}`}>
                Fetch 5 users from the api
                <code>https://randomuser.me/api/?seed=dexi-interview</code> and display
                them in a table.
            </h2>
            <h2 className={`subtitle ${isDark ? 'has-text-grey-lighter' : 'has-text-grey-dark'}`}>
                A <code>table-example.png</code> has been provided for guidance on
                styling.
            </h2>
            <h2 className={`subtitle ${isDark ? 'has-text-grey-lighter' : 'has-text-grey-dark'}`}>
                Pay close attention to empty and loading states
            </h2>
            <h2 className={`subtitle ${isDark ? 'has-text-grey-lighter' : 'has-text-grey-dark'}`}>
                The table should also have a <code>Load More</code> button that fetches
                the next page of the API and appends the results to the existing users.
            </h2>
            {/* Insert your table code here */}
            {empty ? '' : (<table
                className="table is-hoverable is-fullwidth"
                style={{borderRadius: "15px"}}
            >
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>{' '}</th>
                </tr>
                </thead>
                <tbody>
                {data.map((person, i) => {
                    return (
                        <TableRow key={i + person.id.name + " " + person.id.value} person={person} data={data}
                                  setData={setData}/>
                    )
                })}
                </tbody>
            </table>)}
            <button className={`button is-primary ${loading ? 'is-loading' : ''}`} onClick={handleClick}>
                load more
            </button>
        </>
    );
};

export default ChallengeTwo;

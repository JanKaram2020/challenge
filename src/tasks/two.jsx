import { BackToHome } from "../App";
import { useState, useEffect } from "react";
/*
  hint: the API takes page and results as query string
  eg: `?page=3&results=10`
*/
const ChallengeTwo = () => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [page, setPage] = useState(2);
  console.log(data, loading, empty);
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
  const changeHandler = (e, id) => {
    console.log(e.target);
    if (e.target.name === "firstName") {
      const newData = data;
      const index = newData.findIndex((obj) => obj.id.value === id);
      newData[index].name.first = e.target.value;
      setData(newData);
      console.log(data);
    }
  };
  return (
    <>
      <BackToHome />
      <h1 className="title is-1 has-text-white">Challenge 2</h1>
      <h2 className="subtitle has-text-grey-lighter">
        Fetch 5 users from the api
        <code>https://randomuser.me/api/?seed=dexi-interview</code> and display
        them in a table.
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        A <code>table-example.png</code> has been provided for guidance on
        styling.
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        Pay close attention to empty and loading states
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        The table should also have a <code>Load More</code> button that fetches
        the next page of the API and appends the results to the existing users.
      </h2>
      {/* Insert your table code here */}
      <table
        className="table  is-hoverable is-fullwidth"
        style={{ borderRadius: "15px" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Status</th>
            <th>Role</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, i) => {
            return (
              <tr key={i + person.id.name + " " + person.id.value}>
                <td
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <img
                    src={person.picture.thumbnail}
                    alt={person.id.name}
                    style={{ maxWidth: "40px", borderRadius: "50%" }}
                  />
                  <div>
                    <p className="is-size-6">
                      {edit === true ? (
                        <div className="is-flex">
                          <input
                            className="input is-inline"
                            name="firstName"
                            value={`${person.name.first}`}
                            onChange={(e) => changeHandler(e, person.id.value)}
                          />
                          <input
                            className="input is-inline"
                            name="lastName"
                            value={`${person.name.last}`}
                            onChange={(e) => changeHandler(e, person.id.value)}
                          />
                        </div>
                      ) : (
                        `${person.name.first} ${person.name.last}`
                      )}
                    </p>
                    <p className="has-text-grey is-size-7">
                      {edit === true ? (
                        <input
                          className="input is-small"
                          name="email"
                          value={`${person.email}`}
                          onChange={(e) => changeHandler(e, person.id.value)}
                        />
                      ) : (
                        `${person.email}`
                      )}
                    </p>
                  </div>
                </td>
                <td>
                  {edit === true ? (
                    <input
                      className="input"
                      value={`${person.name.title}`}
                      onChange={(e) => changeHandler(e, person.id.value)}
                    />
                  ) : (
                    `${person.name.title}`
                  )}
                </td>
                <td>
                  <button className="button is-primary is-rounded is-small">
                    active
                  </button>
                </td>
                <td>role</td>
                <td>
                  <button
                    className="button is-primary is-inverted"
                    onClick={() => setEdit(!edit)}
                  >
                    edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="button is-primary" onClick={handleClick}>
        load more
      </button>
    </>
  );
};

export default ChallengeTwo;

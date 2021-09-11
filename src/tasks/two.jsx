import { BackToHome } from "../App";
import { useState, useEffect } from "react";
/*
  hint: the API takes page and results as query string
  eg: `?page=3&results=10`
*/

const ChallengeTwo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [page, setPage] = useState(1);
  console.log(data, loading, empty);
  const fetchData = async () => {
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
  useEffect(() => {
    fetchData();
  }, [page]);
  const handleClick = () => {
    setPage(page + 1);
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
      <table className="table">
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
                <td>
                  {person.name.first} {person.name.last}
                </td>
                <td>{person.name.title}</td>
                <td>active</td>
                <td>role</td>
                <td>edit</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleClick}>load more</button>
    </>
  );
};

export default ChallengeTwo;

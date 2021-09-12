import {BackToHome} from "../App";

const array1 = [
  ["name", "id", "age", "weight", "job"],
  ["Mohammed", "3", "20", "120", "developer"],
  ["John", "1", "21", "150", "designer"],
  ["Ali", "2", "23", "90", "doctor"],
  ["Mariam", "4", "20", "100", "lawyer"],
  ["Tony", "5", "25", "110", "teacher"]
];
const array2 = [
  ["name", "id", "height"],
  ["Ali", "2", "50"],
  ["John", "1", "45"],
  ["Mariam", "4", "43"],
  ["Mohammed", "3", "48"],
  ["Tony", "5", "96"]
];
const array3 = [
  ["name", "id", "parent"],
  ["Ali", "2", "yes"],
  ["John", "1", "yes"],
  ["Tony", "5", "yes"]
];
const array4 = [
  ["name", "id", "hobby"],
  ["Mariam", "4", "video games"],
  ["Ali", "2", "kickboxing"],
  ["Tony", "5", "football"]
];
const array5 = [
  ["id", "status"],
  ["1", "active"],
  ["2", "inactive"],
  ["3", "active"],
  ["4", "active"],
  ["5", "active"]
];
//if you wanted just a merge
const solution = [...array1,...array2,...array3,...array4,...array5];
console.table(solution);

//solution
const arrayOfObjects = array1.map(([name, id, age, weight, job]) => {
  return ({name, id, age, weight, job})
})
arrayOfObjects.shift();
array2.shift();
array2.map((person) => {
  arrayOfObjects.map((obj) => {
    if (person[1] === obj.id) {
      obj.height = person[2]
    }
  })
})
array3.shift();
array3.map((person) => {
  arrayOfObjects.map((obj) => {
    if (person[1] === obj.id) {
      obj.parent = person[2]
    }
  })
})
array4.shift();
array4.map((person) => {
  arrayOfObjects.map((obj) => {
    if (person[1] === obj.id) {
      obj.hobby = person[2]
    }
  })
})
array5.shift();
array5.map((person) => {
  arrayOfObjects.map((obj) => {
    if (person[1] === obj.id) {
      obj.status = person[1]
    }
  })
})
console.table(arrayOfObjects);
const arrayOfArrays = arrayOfObjects.map((obj) =>  {
  return Object.keys(obj).map((key) => {
    return obj[key];
  });
});
console.table(arrayOfArrays);
//end of solution
/* 
  Combine the arrays into one table. 
  You may find console.table()
  useful for monitoring your progress
  You may not install any external libraries.
*/

const ChallengeOne = () => {
  const isDark = !document.querySelector('body').classList.contains('lightMode');
  return (
      <>
        <BackToHome/>
        <h1 className={`title is-1 ${isDark ? 'has-text-white' : 'has-text-black'}`}>Challenge 1</h1>
        <h2 className={`subtitle ${isDark ? 'has-text-grey-lighter' : 'has-text-grey-dark'}`}>
          Inside <code>/tasks/one.js</code> you will find a set of arrays. Merge
          them into one array.
        </h2>
        <h2 className={`subtitle ${isDark ? 'has-text-grey-lighter' : 'has-text-grey-dark'}`}>
          You may not install any additional libraries.
        </h2>
        <sub className={`subtitle ${isDark ? 'has-text-grey-lighter' : 'has-text-grey-dark'}`}>{JSON.stringify(arrayOfObjects)}</sub>
      </>
  );
};

export default ChallengeOne;

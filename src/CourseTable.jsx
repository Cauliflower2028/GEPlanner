import CourseLookupPage from './CourseLookupPage.jsx';
import { useState, useEffect } from 'react';
import React, { memo } from "react";

const nameToAttribute = new Map([
    ["Race, Ethnicity and Gender Diversity", "F7"],
    ["Social and Behavioral Sciences", "F6"],
    ["Historical or Cultural Studies", "F4"],
    ["Writing and Information Literacy", "F1"],
    ["Literary, Visual, and Performing Arts", "F3"],
    ["Natural Sciences", "F5"],
    ["Mathematical and Quantitative Reasoning", "F2"],
    ["Citizenship for a Diverse and Just World", "T1"],
    ["Lived Environments", "T2"],
    ["Health and Well-being", "T3"],
    ["Sustainability", "T4"],
    ["Traditions, Cultures, and Transformations", "T8"],
    ["Number, Nature, Mind", "T6"],
    ["Origins and Evolution", "T7"],
    ["Migration, Mobility, and Immobility", "T5"]
]);
const CourseSelection = React.memo(({ GetCourses, CourseType }) => {
    const [inputValue, setInputValue] = useState("");

    const setCourse = (name) => {
        setInputValue(name);
    }
    const handleManualChange = (event) => {
        setInputValue(event.target.value);
      };

    return (
        <tr className="CourseRow">
            <td><p className="CategoryName">{CourseType}</p></td>
            <td className="SearchBarCourseRow"><input value={inputValue} onChange={handleManualChange} type="text" />
                <CourseLookupPage SetCourse={setCourse} Header={CourseType} Courses={GetCourses(CourseType)}/>
            </td>
        </tr>
    );
});


const SpecialCourseSelection = React.memo(({ GetCourses, CourseType }) => {
    const [themeName, setThemeName] = useState("Lived Environments");
    const [inputValue, setInputValue] = useState("");
    const setCourse = (name) => {
        setInputValue(name);
    }
    const handleManualChange = (event) => {
        setInputValue(event.target.value);
      };

    const options = [];
    CourseType.forEach((element, index) => {
        if (index >= 1)
            options.push(<option key={element} value={element}>{element}</option>)
    })
    return (
        <tr className="CourseRow">
            <td className="SpecialRow">
                <select id="searchTheme" onChange={(e) => setThemeName(e.target.value)}>
                    {options}
                </select>
            </td> 
            <td className="SearchBarCourseRow"><input value={inputValue} onChange={handleManualChange} type="text" />
                <CourseLookupPage SetCourse={setCourse} Header={themeName} Courses={GetCourses(themeName)}/>
            </td> 
        </tr>
    )
});

export default function CourseTable({ CategoryName, CourseType }) {
    // Code for fetching course data
    const [courseData, setCourseData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("https://cauliflower2028.github.io/GEPlanner/GECourseData.json");
        const data = await response.json();
        setCourseData(data);
      };
  
      fetchData();
    }, []); 
    if (!courseData) return <div>loading</div>;

    const getCourses = (CourseType) => {
        return courseData[nameToAttribute.get(CourseType)];
    }

    if (CategoryName === "Foundations") {
        const courseRows = [];
        CourseType.forEach(element => {
            courseRows.push(<CourseSelection key={element} GetCourses={getCourses} CourseType={element} />);
        });
        return (
            <tbody>
                <tr><th>{CategoryName}</th></tr>
                {courseRows}
            </tbody>
        );
    } else {
        return (
            <tbody>
                <tr><th>{CategoryName}</th></tr>
                <CourseSelection key={CourseType[0]} GetCourses={getCourses} CourseType={CourseType[0]} />
                <tr id="SpecialRowHeader">Choose a Theme</tr>
                <SpecialCourseSelection key="ChooseTheme" GetCourses={getCourses} CourseType={CourseType} />
            </tbody>
        );
    }
}
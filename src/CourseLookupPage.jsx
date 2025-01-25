import React from "react";
import Modal from "react-modal";
import { useState } from 'react';
import { useRef } from 'react';

Modal.setAppElement("#root");


export default function CourseLookupPage({ SetCourse, Header, Courses }) {
  const [isOpen, setIsOpen] = useState(false);

  const [titleFilter, setTitleFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [unitFilter, setUnitFilter] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Code for filtering and adding courses
  const courseList = [];
  const courseSubjects = new Set();
  const courseUnits = new Set();
  Courses.forEach((course) => {
    let titleCheck = false;
    let subjectCheck = false;
    let unitCheck = false;
    
    let title = course["Title"];
    let subject = title.substring(0, title.indexOf(' '));
    let units = course["Units"].substring(0, 1);
    if (titleFilter === "" || title.toLowerCase().indexOf(titleFilter.toLowerCase()) !== -1)
        titleCheck = true;
    if (subjectFilter === "" || subject === subjectFilter)
        subjectCheck = true;
    if (unitFilter === "" || units === unitFilter)
        unitCheck = true;

    if (titleCheck && subjectCheck && unitCheck)
        courseList.push(<Course SetCourse={SetCourse} CloseModal={closeModal} CourseTitle={title} CourseDescription={course["Description"]} CourseUnits={units}/>);
    courseSubjects.add(subject);
    courseUnits.add(units);
  })

  // Code for scrolling back to the top
  const scrollableRef = useRef(null);
  const scrollToTop = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Code for modal component
  return (
    <div className="ModalDiv">
      <button onClick={openModal} className="CourseSearchButton">Search for Courses</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Scrollable Modal"
        bodyOpenClassName="overflow-hidden" // Add this class to <body> when modal is open
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            maxWidth: "70%",
            margin: "auto",
            maxHeight: "80vh",
            overflowY: "scroll",
            borderRadius: "16px",
            padding: "24px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
        onAfterOpen={() => {
            const scrollableArea = document.querySelector(".ReactModal__Content");
            if (scrollableArea) {
              scrollableRef.current = scrollableArea;
            }
        }}
      >
        <div className="ModalHeaderDiv">
          <h2 className="ModalHeader">{Header}</h2>
          <button onClick={closeModal} className="ModalCloseButtonTop">✕</button>
        </div>
        <CourseFilterBar SetTitleFilter={setTitleFilter} SetSubjectFilter={setSubjectFilter} SetUnitFilter={setUnitFilter} CourseSubjects={courseSubjects} CourseUnits={courseUnits} />
        <div className="ModalCourses">
            {courseList}
        </div>
        <div className="ModalFooterDiv">
          <button onClick={scrollToTop} className="ModalCloseButtonBottom">Back to Top</button>
        </div>
      </Modal>
    </div>
  );
}

function CourseFilterBar({ SetTitleFilter, SetSubjectFilter, SetUnitFilter, CourseSubjects, CourseUnits }) {
    const subjects = []
    subjects.push(<option key="nothing"></option>);
    CourseSubjects.forEach((subject) => {
        subjects.push(<option key={subject} value={subject}>{subject}</option>);
    })
    const units = []
    units.push(<option key="nothing"></option>);
    CourseUnits.forEach((unit) => {
        units.push(<option key={unit} value={unit}>{unit}</option>);
    })
    return (
        <div className="CourseFilterBar">
            <label>Search: </label><input className="Filter" type="text" onChange={(e) => SetTitleFilter(e.target.value)}/>
            <label>Subject: </label><select className="Filter" onChange={(e) => SetSubjectFilter(e.target.value)}>{subjects}</select>
            <label>Credit Hours: </label><select className="Filter" onChange={(e) => SetUnitFilter(e.target.value)}>{units}</select>
        </div>
    );
}

function Course({ SetCourse, CloseModal, CourseTitle, CourseDescription, CourseUnits }) {
    return (
        <div className="Course">
            <p id="courseTitle">🎓 {CourseTitle}</p>
            <p id="courseDescription">{CourseDescription}</p>
            <p id="courseUnits">🕒 {CourseUnits}</p>
            <button onClick={() => {
                SetCourse(CourseTitle)
                CloseModal()
            }}>
                Add Course
            </button>
        </div>
    );
}


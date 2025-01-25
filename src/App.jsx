import './App.css'
import CourseTable from './CourseTable.jsx'
import BookendCourse from './BookendCourse.jsx'
import Print from './Print.jsx'

function Planner(){
  const foundationsList = [
    "Race, Ethnicity and Gender Diversity",
    "Social and Behavioral Sciences",
    "Historical or Cultural Studies",
    "Writing and Information Literacy",
    "Literary, Visual, and Performing Arts",
    "Natural Sciences",
    "Mathematical and Quantitative Reasoning"
    ];
  const themesList = [
    "Citizenship for a Diverse and Just World",
    "Lived Environments",
    "Health and Well-being",
    "Sustainability",
    "Traditions, Cultures, and Transformations",
    "Number, Nature, Mind",
    "Origins and Evolution",
    "Migration, Mobility, and Immobility"
  ];
  
  return (
    <div>
      <h1 id='Title'>General Education Planner for Ohio State Students</h1>
      <div className='Print'>
        <Print />
      </div>
      <div className='BookendParent'>
        <BookendCourse CourseName="Launch Seminar"/>
        <BookendCourse CourseName="Reflection Seminar"/>
      </div>
      <table>
        <CourseTable CategoryName="Foundations" CourseType={foundationsList} />
        <CourseTable CategoryName="Themes" CourseType={themesList} />
      </table>
    </div>
  );
}

export default function App() {
  return <Planner />;
}

export default function BookendCourse({ CourseName }) {
    return (
        <div className="Bookend">
            <h2>{CourseName}</h2>
            <label>
                <input type="checkbox" />
                {' '}
                Finished
            </label>
        </div>
    );
}
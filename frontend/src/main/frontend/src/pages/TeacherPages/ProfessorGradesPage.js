import { useState, useEffect } from 'react';
import './styles/ProfessorGradesStyling.css';
import editIcon from '../AdminPages/edit.png';
import { setCurrentCourse } from '../../redux/features/courseSlice';
import { current } from '@reduxjs/toolkit';
import { Line } from 'react-chartjs-2';
import Table from './Table';
import { LinearScale, Chart } from "chart.js";
import { CategoryScale } from "chart.js";
import { LineElement, PointElement } from "chart.js";
import axios from 'axios';
import NavigationContainerComponent from "../../components/NavigationComponents/NavigationContainerComponent";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import bulkDownloadLogo from "../../assets/icons/navigation/default/Bulk Download.svg";

Chart.register(LineElement);
Chart.register(PointElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);

function ProfessorGradesPage() {
    // const [userList, setUserList] = useState([
    //     { assignment: 'Assignment 1', name: 'Danny Dimes', team: 'New York Giants', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 1', name: 'Saquads Barkley', team: 'New York Giants', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 1', name: 'Gardner Minshew', team: 'Indianapolis Colts', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 2', name: 'Danny Dimes', team: 'New York Giants', grade: '93', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 2', name: 'Saquads Barkley', team: 'New York Giants', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 2', name: 'Gardner Minshew', team: 'Indianapolis Colts', grade: '6', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 2', name: 'Caleb Williams', team: 'Indianapolis Colts', grade: '100', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 2', name: 'Patty Mahomes', team: 'Kansas City Chiefs', grade: '100', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 3', name: 'Carl Wheezer', team: 'New York Jets', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 3', name: 'Perry P', team: 'New York Jets', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 3', name: 'Larry Lobster', team: 'Baltimore Ravens', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 3', name: 'Danny Dimes', team: 'New York Giants', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 4', name: 'Jimmy Neut', team: 'Tennessee Titans', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 4', name: 'Big Chungus', team: 'Tennessee Titans', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 4', name: 'Dak Prescott', team: 'Syracuse BenchWarmers', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 4', name: 'Danny Dimes', team: 'New York Giants', grade: '92', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 5', name: 'John Bones', team: 'New York Giants', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 5', name: 'Danny Dimes', team: 'New York Giants', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    //     { assignment: 'Assignment 6', name: 'Danny Dimes', team: 'New York Giants', grade: '95', prGiven: '75', prReceived: '60', submitted: '3/25/23 | 8:19am' },
    // ]);

    const [userStatsList, setUserStatsList] = useState([
        { name: 'Danny Dimes', grade1: '100', grade2: '93', grade3: '95', grade4: '92', grade5: '95', grade6: '100' },
        { name: 'Saquads Barkley', grade1: '91', grade2: '93', grade3: '95', grade4: '92', grade5: '95', grade6: '100' },
        { name: 'Gardner Minshew', grade1: '95', grade2: '93', grade3: '95', grade4: '92', grade5: '95', grade6: '100' },
        { name: 'Caleb Williams', grade1: '95', grade2: '93', grade3: '95', grade4: '92', grade5: '95', grade6: '100' },
        { name: 'Patty Mahomes', grade1: '20', grade2: '93', grade3: '40', grade4: '92', grade5: '95', grade6: '100' },
        { name: 'Carl Wheezer', grade1: '95', grade2: '93', grade3: '95', grade4: '92', grade5: '95', grade6: '100' },
        { name: 'Perry P', grade1: '95', grade2: '93', grade3: '100', grade4: '92', grade5: '95', grade6: '100' },
        { name: 'Larry Lobster', grade1: '95', grade2: '93', grade3: '95', grade4: '92', grade5: '95', grade6: '100' },
        { name: 'Big Chungus', grade1: '95', grade2: '93', grade3: '100', grade4: '92', grade5: '95', grade6: '100' },
        { name: 'Dak Prescott', grade1: '13', grade2: '93', grade3: '95', grade4: '92', grade5: '13', grade6: '100' },
        { name: 'John Bones', grade1: '95', grade2: '93', grade3: '95', grade4: '92', grade5: '95', grade6: '100' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAssignment, setSelectedAssignment] = useState("all");
    const [selectedStudent, setSelectedStudent] = useState("all");
    const [selectedVisualStudent, setSelectedVisualStudent] = useState("all");
    const [selectedTeam, setSelectedTeam] = useState("all");
    const courseId = window.location.pathname;
    const course = courseId.split("/")[2];
    const getAllAssignmentsUrl = `${process.env.REACT_APP_URL}/assignments/student/${course}/all-grades`;
    const getAllStudentsUrl = `${process.env.REACT_APP_URL}/course/professor/courses/${course}/students`;
    const [showEditModal, setShowEditModal] = useState(false);

    let [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get(getAllAssignmentsUrl)
            .then(response => {
                console.log(response.data);
                console.log(getAllAssignmentsUrl);
                setUserList(response.data);
            })
            .catch(error => console.error(error.message));
    }, []);

    for (let i = 0; i < userList.length; i++) {
        if (userList[i].type == "peer_review_submission") {
            // for (let j = 0; j < userList.length; j++) {
            //     //userList[j].submission_name = "";
            //     if (userList[i].reviewed_by == userList[j].team_name && userList[j].type == "team_submission") {
            //         userList[j].submission_name = userList[i].reviewed_team;
            //     }
            // }
            userList.splice(i, 2);
        }
    }

    function refreshPage() {
        window.location.reload(false);
      }

    const convertDate = (dateString) => {
        const utcDate = dateString.slice(0, 19);
        const utcTime = utcDate.replace('T', ' ');

        const date = new Date(utcTime);

        date.setHours(date.getHours() - 4);

        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)} | ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;


        return (
            <div>{formattedDate}</div>
        )
    }

    const filteredUsers = userList.filter((user) =>
        (selectedAssignment === "all" || user.assigment_name === selectedAssignment) &&
        (selectedStudent === "all" || user.student_id === selectedStudent) &&
        (selectedTeam === "all" || user.team_name === selectedTeam)
    );

    const filteredUsersStats = userStatsList.filter((user) =>
        (selectedStudent === "All" || user.name === selectedStudent)
    );

    const filteredUsersVisualStats = userStatsList.filter((user) =>
        (selectedVisualStudent === "Select Student" || user.name === selectedVisualStudent)
    );

    const [page, setPage] = useState("roles")

    const changePage = (page) => {
        setPage(page)
    }

    const uniqueAssignments = userList
        .filter((user, index, arr) => arr.findIndex(u => u.assigment_name === user.assigment_name) === index)
        .map(user => user.assigment_name);

    const uniqueNames = userList
        .filter((user, index, arr) => arr.findIndex(u => u.student_id === user.student_id) === index)
        .map(user => user.student_id);

    const uniqueStatsNames = userStatsList
        .filter((user, index, arr) => arr.findIndex(u => u.name === user.name) === index)
        .map(user => user.name);

    const uniqueTeams = userList
        .filter((user, index, arr) => arr.findIndex(u => u.team_name === user.team_name) === index)
        .map(user => user.team_name);

    // const [students, setStudents] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //     const response = await fetch(`${process.env.REACT_APP_URL}/course/professor/courses/${course}/students`);
    //     const data = await response.json();
    //     setStudents(data);
    //     console.log(students)
    //     };
    //     fetchData();
    // }, []);

    // axios.get(getAllStudentsUrl)
    //     .then(response => console.log(response.data))
    //     .catch(error => console.error("Uh oh"));

    // axios.get(getAllAssignmentsUrl)
    //     .then(response => {
    //         //console.log(response.data); 
    //         const getAllSubmissions = response.data;
    //         for (let i = 1; i <= response.data.length; i++) {
    //             axios.get(`${process.env.REACT_APP_URL}/assignments/professor/courses/${course}/assignments/${i}`)
    //                 .then(response2 => {
    //                     console.log(response2.data)
    //                 })
    //         }
    //     })
    //     .catch(error => console.error("Uh oh"));


    const getChartData = () => {
        const data = {
            labels: [], // Labels for the x-axis
            datasets: [
                {
                    label: 'Grades', // Label for the dataset
                    backgroundColor: 'green',
                    borderColor: 'green',
                    borderWidth: 1,
                    data: [], // Array to store the data points
                    pointStyle: [], // Array to store the point styles
                    pointRadius: 5, // Radius of the points
                },
                {
                    label: 'Trend', // Label for the trend line
                    fill: false,
                    borderColor: 'blue', // Color of the trend line
                    borderWidth: 1,
                    data: [], // Array to store the trend line points
                    type: 'line', // Type of chart for the trend line
                    pointRadius: 0, // No points for the trend line
                },
                {
                    label: 'Grades2', // Label for the dataset
                    backgroundColor: 'purple',
                    borderColor: 'purple',
                    borderWidth: 1,
                    data: [], // Array to store the data points
                    pointStyle: [], // Array to store the point styles
                    pointRadius: 5, // Radius of the points
                },
                {
                    label: 'Trend2', // Label for the trend line
                    fill: false,
                    borderColor: 'orange', // Color of the trend line
                    borderWidth: 1,
                    data: [], // Array to store the trend line points
                    type: 'line', // Type of chart for the trend line
                    pointRadius: 0, // No points for the trend line
                },
            ],
        };

        uniqueAssignments.map(item => {
            data.labels.push(item);

            // Calculate trend line dynamically based on mean grades
            let meanSum = 0;
            let count = 0;

            filteredUsersVisualStats.map(user => {
                const grades = [
                    parseInt(user.grade1),
                    parseInt(user.grade2),
                    parseInt(user.grade3),
                    parseInt(user.grade4),
                    parseInt(user.grade5),
                    parseInt(user.grade6),
                ];
                const mean = grades.reduce((a, b) => a + b, 0) / grades.length;
                console.log(grades)
                meanSum += mean;
                count++;
                data.datasets[0].data.push(...grades);
                data.datasets[0].pointStyle.push('circle'); // Use 'circle' as the point style for individual grades
                data.datasets[1].data.push(meanSum / count);
            });
        });

        const grades2 = [[], [], [], [], [], []]; // initialize an array to store the grades for each assignment

        userStatsList.forEach((user) => {
            grades2[0].push(parseInt(user.grade1));
            grades2[1].push(parseInt(user.grade2));
            grades2[2].push(parseInt(user.grade3));
            grades2[3].push(parseInt(user.grade4));
            grades2[4].push(parseInt(user.grade5));
            grades2[5].push(parseInt(user.grade6));
        });

        // compute the mean of each assignment grade and push it to the data array
        for (let i = 0; i < grades2.length; i++) {
            const mean2 = grades2[i].reduce((a, b) => a + b, 0) / grades2[i].length;
            data.datasets[2].data.push(mean2);
            data.datasets[2].pointStyle.push('circle');

            // compute the mean of all grades and push it to the data array
            const allGrades = grades2.flat(); // get all grades in a flat array
            const meanSum2 = allGrades.reduce((a, b) => a + b, 0) / allGrades.length;
            data.datasets[3].data.push(meanSum2);
        }

        return data;
    };

    const [editName, setEditName] = useState("");

    const getEditUser = (userId) => {
        setEditName(userId);
    }

    const [assignmentName, setAssignmentName] = useState("");

    const getAssignmentName = (assignmentName) => {
        setAssignmentName(assignmentName);
    }

    const [studentGrade, setStudentGrade] = useState("");

    const getStudentGrade = (studentGrade) => {
        setStudentGrade(studentGrade);
    }

    const [assignmentID, setAssignmentID] = useState();

    const getAssignmentID= (assignmentID) => {
        setAssignmentID(assignmentID);
    }

    const [teamName, setTeamName] = useState();

    const getTeamName= (teamName) => {
        setTeamName(teamName);
    }

    const [newGrade, setNewGrade] = useState('');

    const handleGradeEdit = (event) => {
        setNewGrade(event.target.value);
    }

    const editGrade = async (studentId, assignmentId,teamName, newGrade) => {
        const url = `${process.env.REACT_APP_URL}/assignments/student/edit/${studentId}/${assignmentId}/${teamName}/teamSubmission/${newGrade}`;
        await axios
            .post(url)
            .then((res) => {
                alert('Succesfully edited grade');
                refreshPage();
                console.log(res.data);
            })
            .catch((e) => {
                alert(e.message);
            });
        }

    return (
        <div className="page-container">
            <HeaderBar />
            <div className='admin-container'>
                <NavigationContainerComponent />
                <div className='professor-user-roles'>
                    <h2>Grades Overview for {course}</h2>
                    <div className='admin-tabs'>
                        <button className='user-roles-tab' onClick={() => changePage('roles')} style={{
                            backgroundColor: page === "roles" ? "#4a7dfc" : "#E6E6E6",
                            color: page === "roles" ? "white" : "black"
                        }}>Grades
                        </button>
                        <button className='courses-tab' onClick={() => changePage('courses')} style={{
                            backgroundColor: page === "courses" ? "#4a7dfc" : "#E6E6E6",
                            color: page === "courses" ? "white" : "black"
                        }}>Numeric Stats
                        </button>
                        <button className='profanity-settings-tab' onClick={() => changePage('profanity')} style={{
                            backgroundColor: page === "profanity" ? "#4a7dfc" : "#E6E6E6",
                            color: page === "profanity" ? "white" : "black"
                        }}>Visual Stats
                        </button>
                    </div>
                    {page === "roles" && (
                        <>
                            <div className='search-filter-add'>
                                <div className='assignment-filter'>
                                    <label>Assignment</label>
                                    <div className='grades-assignment-dropdown'>
                                        <select name="assignment" id="grades-assignment"
                                            onChange={(e) => setSelectedAssignment(e.target.value)}>
                                            <option value="all">All</option>
                                            {uniqueAssignments.map(item => {
                                                return (<option key={item} value={item}>{item}</option>);
                                            })}
                                        </select>
                                    </div>
                                </div>
                                    <div className="grades-student-dropdown">
                                        <label htmlFor="role-filter">Student</label>
                                        <select name="student" id="grades-student"
                                            onChange={(e) => setSelectedStudent(e.target.value)}>
                                            <option value="all">All</option>
                                            {uniqueNames.map(item => {
                                                return (<option key={item} value={item}>{item}</option>);
                                            })}
                                        </select>
                                    </div>
                                    <div className="grades-team-dropdown">
                                        <label htmlFor="role-filter">Team</label>
                                        <select name="team" id="grades-team" onChange={(e) => setSelectedTeam(e.target.value)}>
                                            <option value="all">All</option>
                                            {uniqueTeams.map(item => {
                                                return (<option key={item} value={item}>{item}</option>);
                                            })}
                                        </select>
                                    </div>
                            </div>
                            <div>
                                <div className='professor-user-list'>
                                    <div className='user-item header'>
                                        <div>Assignment</div>
                                        <div>Name</div>
                                        <div>Team</div>
                                        <div>Grade</div>
                                        <div>PRs Given To</div>
                                        <div>PR Received</div>
                                        <div>Submitted</div>
                                        <div>Actions</div>
                                    </div>
                                    <div className='professor-all-user-items'>
                                        {filteredUsers.map((user) => (
                                            <div key={user.id} className='professor-user-item'>
                                                <div>{user.assigment_name}</div>
                                                <div className='name-div'>{user.student_id}</div>
                                                <div className='team-div'>{user.team_name}</div>
                                                <div className='grade-div'>{user.grade}</div>
                                                <div>{user.reviews}</div>
                                                <div></div>
                                                <div>{convertDate(user._id.date)}</div>
                                                <div>
                                                    <div className='grades-edit-container'>
                                                        <button className='edit-button' onClick={() => {
                                                            setShowEditModal(true);
                                                            getEditUser(user.student_id);
                                                            getAssignmentName(user.assigment_name);
                                                            getStudentGrade(user.grade);
                                                            getTeamName(user.team_name);
                                                            getAssignmentID(user.assignment_id)}}>
                                                            <img className='edit-icon' src={editIcon} />
                                                        </button>
                                                        {showEditModal && (
                                                            <div className="edit-modal">
                                                                <div className="modal-content">
                                                                    <h2 className='modal-head'>Edit {editName}'s {assignmentName} Grade</h2>
                                                                    <form>
                                                                        <div className='edit-grade-container'>
                                                                            <input className='edit-student-grade'
                                                                                type="number"
                                                                                id="gradeEdit"
                                                                                name="gradeEdit"
                                                                                placeholder={studentGrade}
                                                                                onChange={handleGradeEdit} />
                                                                        </div>
                                                                    </form>
                                                                    <div className='add-user-buttons'>
                                                                        <button className='add-user-popup-button' onClick={() => { setShowEditModal(false); editGrade(editName, assignmentID, teamName, newGrade) }}>Save Changes</button>
                                                                        <button className='cancel-user-button' onClick={() => setShowEditModal(false)}>Cancel</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='delete-container'>
                                                        <button className='delete-button'><img className='download-icon'
                                                            src={bulkDownloadLogo} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {page === "courses" && (
                        <Table></Table>
                    )}
                    {page === "profanity" && (
                        <div>
                            <div className="stats-student-dropdown">
                                <label htmlFor="role-filter">Student</label>
                                <select name="student" id="role" defaultValue="Select Student"
                                    onChange={(e) => setSelectedVisualStudent(e.target.value)}>
                                    <option disabled={true} value="Select Student">--Select Student--</option>
                                    {uniqueStatsNames.map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })}
                                </select>
                            </div>
                            <div style={{ height: '350px', width: '800px' }}>
                                <Line className='line-chart' data={getChartData()} />
                            </div>
                            <div className='key-container'>
                                <label className='key'>Key</label>
                                <div className="box">
                                    <div className="row">
                                        <div className="column">
                                            X-axis : Assignments
                                        </div>
                                        <div className="column">
                                            <span className="square blue"></span>
                                            Students total grade
                                        </div>
                                        <div className="column">
                                            <span className="square green"></span>
                                            Students assignment grades
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="column">
                                            Y-axis : Grades
                                        </div>
                                        <div className="column">
                                            <span className="square orange"></span>
                                            Mean of the class total grade
                                        </div>
                                        <div className="column">
                                            <span className="square purple"></span>
                                            Mean of the class assignment grades
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfessorGradesPage;
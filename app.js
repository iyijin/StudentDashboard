let students = JSON.parse(localStorage.getItem("students"))||[];
//display students when page loads
displayStudents();
//Add Students
document.getElementById("studentForm")
.addEventListener("submit",function(event){
    event.preventDefault();
    const rollNo = document.getElementById("rollNo").value;
    const name = document.getElementById("name").value;
    const course = document.getElementById("course").value;
    const marks = document.getElementById("marks").value;
    const student = {
        rollNo:rollNo,
        name:name,
        course:course,
        marks:marks
    };
    students.push(student);
    //store data in browser
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
    displayStudents();

    //clear form
    document.getElementById("studentForm").reset();
});
//display student records
function displayStudents(){
    const table = 
    document.getElementById("studentTable");
    table.innerHTML="";
    students.forEach(function(student,index){
        const row = document.createElement("tr");
        row.innerHTML=`
        <td>${student.rollNo}</td>
        <td>${student.name}</td>
        <td>${student.course}</td>
        <td>${student.marks}</td>
        <td>
            <button class="delete-btn" onclick="deleteStudent(${index})">
                delete
                </button>
                </td>
                `;
                table.appendChild(row);   
        });
}
//delete student
function deleteStudent(index){
    students.splice(index,1);
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
    displayStudents();
}
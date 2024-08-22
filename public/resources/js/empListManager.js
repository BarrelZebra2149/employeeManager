const serverHomeURL = '/home';

window.onload = function() {
    const addEmployee = document.querySelector('#addEmployee');
    const editButtons = document.querySelectorAll('.editButton');
    const deleteButtons = document.querySelectorAll('.deleteButton');

    addEmployee.addEventListener('click', function() {
        const empName = document.querySelector('#inpEmpName').value;
        const dept = document.querySelector('#inpDept').value;
        const grade = document.querySelector('#inpGrade').value;

        axios.post(serverHomeURL, {empName, dept, grade}).then(function () {
            console.log('Add employee successfully');
            document.querySelector('#inpEmpName').value = '';
            document.querySelector('#inpDept').value = '';
            document.querySelector('#inpGrade').value = '';
        }).then(function(response) {
            document.location.reload();
        }).catch(function (error) {
            console.error('Error:', error);
        });
    });

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const empNo = button.closest('tr').querySelector('#empNo').innerText;
            window.location.href = serverHomeURL + '/edit?empNo=' + empNo;
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const empNo = button.closest('tr').querySelector('#empNo').innerText;
            if(confirm("Are you sure?")) {
                axios.delete(`${serverHomeURL}?empNo=${empNo}`).then(function() {
                    console.log('Delete employee successfully');
                    document.location.reload();
                }).catch(function (error) {
                    console.error('Error:', error);
                });
            }
        });
    });

};
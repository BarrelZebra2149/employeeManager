const serverHomeURL = '/home';
window.onload = function() {
    document.getElementById('modifyBtn').addEventListener('click', function() {
        axios.put(serverHomeURL, { curData: {
                index: document.querySelector('#dataIndex').innerText,
                empName: document.querySelector('#editEmpName').value,
                dept: document.querySelector('#editDept').value,
                grade: document.querySelector('#editGrade').value,
            }}).then(function() {
            alert('Edit successfully');
            window.location.href = serverHomeURL;
        }).catch(function(error) {
            console.error('Error editing', error);
        });
    });
}
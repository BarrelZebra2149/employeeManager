const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

app.set('port', 3000);
console.log(path.join(__dirname, ''));
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use("/", express.static(path.join(__dirname,"public")));
app.use(cors());

let empCnt = 105;
const peopleList = [
    {empNo :101, empName: "Emp01", dept:"Customer Service", grade:"Staff"},
    {empNo :102, empName: "Emp02", dept:"Developer", grade:"CEO"},
    {empNo :103, empName: "Emp03", dept:"Data Scientist", grade:"Staff"}
]

//when requesting post, we can send body parameter.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//get
app.get('/home', (req, res) => {
    //console.log("get home request");
    res.render('home', {data : peopleList});
})

app.get('/home/edit', (req, res) => {
    //console.log("get edit request");
    //console.log(req.query);
    const empNo = parseInt(req.query.empNo);
    const editElementIndex = peopleList.findIndex((curElement) => curElement.empNo === empNo);
    if (editElementIndex !== -1) {
        res.render('edit', { data: peopleList[editElementIndex], dataIndex : editElementIndex });
    } else {
        res.status(404).send('Not Found');
    }
});

//send
app.post('/home', (req, res) => {
    peopleList.push({empNo: empCnt++, empName: req.body.empName, dept: req.body.dept, grade: req.body.grade});
    res.render('home', {data : peopleList});
})

//delete
app.delete('/home', (req, res) => {
    //console.log("delete request");
    const empNo = req.query.empNo; // Changed to req.query
    const index = peopleList.findIndex((curElement) => curElement.empNo === parseInt(empNo));
    if (index !== -1) {
        peopleList.splice(index, 1);
    }
    res.render('home', {data : peopleList});
});


//modify
app.put('/home', (req, res) => {
    //console.log("body sent : ", req.body.curData);
    //console.log(peopleList[parseInt(index)]);
    const { index, empName, dept, grade } = req.body.curData;
    peopleList[parseInt(index)] = {empNo: peopleList[parseInt(index)].empNo ,empName, dept, grade};
    res.sendStatus(200);
})

const server = http.createServer(app);
server.listen(app.get('port'), ()=>{
    console.log(`서버 실행 중>>> http://localhost:${app.get('port')}`);
});



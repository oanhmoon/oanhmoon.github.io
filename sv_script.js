const students = [
    {
        id: "B21DCCN123",
        name: "Nguyễn Văn A",
        exams: [
            {
                id: 101,
                name: "Đại số",
                score: 8.5,
                completed: true,
                time: "2020-02-2",
                answers: ["A", "B", "C", "D"],
                correctAnswers: ["A", "B", "C", "D"],
                pont: [1, 1, 1, 1],
                explanations: ["Explanation 1", "Explanation 2", "Explanation 3", "Explanation 4"]
            },
            {
                id: 102,
                name: "Tin học cơ sở 2",
                score: 7.5,
                completed: true,
                time: "2021-02-25",
                answers: ["A", "C", "C", "A"],
                correctAnswers: ["A", "B", "C", "D"],
                pont: [1, 0, 1, 0],
                explanations: ["Explanation 1", "Explanation 2", "Explanation 3", "Explanation 4"]
            }
        ]
    }
];
function search() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    const student = students.find(student => student.name.toLowerCase() === searchValue || student.id.toLowerCase() === searchValue);
    if (student) {
        resultsContainer.innerHTML = `<div class= "stu-inf"> <h2>Sinh viên: ${student.id}- ${student.name}</h2></div>`;
        const exams = student.exams;

        // Tạo bảng
        const table = document.createElement("table");
        table.classList.add("exam-table");

        // Tạo tiêu đề của bảng
        const tableHeader = table.createTHead();
        const headerRow = tableHeader.insertRow();
        const headers = ["Kỳ thi", "Trạng thái", "Điểm thi", "Thời gian tham gia", "Chi tiết"];

        // Thêm các tiêu đề vào hàng tiêu đề
        headers.forEach(headerText => {
            const header = document.createElement("th");
            header.textContent = headerText;
            headerRow.appendChild(header);
        });

        // Thêm dữ liệu từ mỗi kỳ thi vào hàng của bảng
        exams.forEach(exam => {
            const row = table.insertRow();
            row.insertCell().textContent = exam.name;
            row.insertCell().textContent = exam.completed ? 'Hoàn thành' : 'Chưa hoàn thành';
            row.insertCell().textContent = exam.score;
            row.insertCell().textContent = exam.time;
            const detailsCell = row.insertCell();
            const detailsButton = document.createElement("button");
            detailsButton.textContent = "Xem chi tiết";
            detailsButton.classList.add("details-button");
            detailsButton.addEventListener("click", function () {
                // Hiển thị thông tin chi tiết khi nút được nhấn
                showDetails(exam);
            });
            detailsCell.appendChild(detailsButton);
        });

        resultsContainer.appendChild(table);
    } else {
        resultsContainer.innerHTML = `<p class="notice">Không tìm thấy sinh viên, vui lòng thử lại!</p>`;
    }
}


function showDetails(exam) {
    let detailContainer = document.getElementById("detail");
    detailContainer.innerHTML = "";
    detailContainer.innerHTML = `<h2>Chi tiết bài thi ${exam.name}</h2>`

    const table = document.createElement("table");
    table.classList.add("exam-table");

    // Tạo tiêu đề của bảng
    const tableHeader = table.createTHead();
    const headerRow = tableHeader.insertRow();
    const headers = ["Câu trả lời", "Đáp án đúng", "Điểm", "Giải thích"];

    // Thêm các tiêu đề vào hàng tiêu đề
    headers.forEach(headerText => {
        const header = document.createElement("th");
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    // mỗi cột là 1 mảng trong kì thi
    for (i = 0; i < exam.answers.length; i++) {
        const row = table.insertRow();
        row.insertCell().textContent = exam.answers[i]; 
        row.insertCell().textContent = exam.correctAnswers[i];
        row.insertCell().textContent = exam.pont[i];
        row.insertCell().textContent = exam.explanations[i]; 

    }


    detailContainer.appendChild(table);
    detailContainer.innerHTML += `<p> Tổng điểm bài thi: ${exam.score}</p>`;
    document.querySelector(".export-pdf-button").style.display = "block";


}
function exportToPDF() {
    var pdf = new jsPDF('p', 'pt', 'letter');
    var source = document.getElementById('detail'); 
    var specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true; // Bỏ qua xử lý các phần tử có id là "bypassme"
        }
    };
    var margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    // Sử dụng font chữ hỗ trợ tiếng Việt
    var font = 'times';
    
    // pdf.addFont("Roboto", "Roboto-Regular.ttf"); nhung bang font tu tai
    pdf.setFont("Roboto");
    pdf.fromHTML(
        source, // Phần tử HTML hoặc chuỗi HTML
        margins.left, // Tọa độ x
        margins.top, {
        'width': margins.width, // Chiều rộng tối đa của nội dung trên PDF
        'elementHandlers': specialElementHandlers
    },
        function (dispose) {
            pdf.save('result.pdf'); // Lưu file PDF với tên "result.pdf"
        }, margins
    );
    
    alert("Xác nhận tải xuốngg file PDF!");
}

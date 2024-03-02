var exams = [
    { name: "Triết học", type: "Giữa kì", time: "60 phút", examType: "Tự do", examDate: "" },
    { name: "Mạng máy tính", type: "Cuối kì", time: "90 phút", examType: "", examDate: "2024-03-15" },
    // Các bài thi khác ...
  ];

  // Hiển thị danh sách các bài thi
  var examListElement = document.getElementById("examList");

  function renderExamList() {
    examListElement.innerHTML = "";
    exams.forEach(function(exam) {
      var row = document.createElement("tr");
      row.innerHTML = `
        <td>${exam.name}</td>
        <td>${exam.type}</td>
        <td>${exam.time}</td>
        <td>${exam.examType}${exam.examDate ? " (" + exam.examDate + ")" : ""}</td>
        <td>
          <button onclick="showDetail('${exam.name}')">Chi tiết</button>
          <button onclick="editExam('${exam.name}')">Chỉnh sửa</button>
          <button onclick="deleteExam('${exam.name}')">Xoá</button>
        </td>
      `;
      examListElement.appendChild(row);
    });
  }

  renderExamList();

  // Hàm hiển thị chi tiết bài thi
  function showDetail(examName) {
    // Chuyển hướng đến trang chi tiết bài thi
    window.location.href = "detail.html?name=" + encodeURIComponent(examName);
  }

  // Hàm chỉnh sửa bài thi
  function editExam(examName) {
    // Chuyển hướng đến trang chỉnh sửa bài thi
    window.location.href = "sua.html?name=" + encodeURIComponent(examName);
  }

  // Hàm xoá bài thi
  function deleteExam(examName) {
    // Xác nhận xoá bài thi
    var confirmDelete = confirm("Bạn có chắc muốn xoá bài thi này?");
    if (confirmDelete) {
      // Xoá bài thi khỏi danh sách và cập nhật giao diện
      exams = exams.filter(function(exam) {
        return exam.name !== examName;
      });
      renderExamList();
      // Hiển thị thông báo xoá thành công
      alert("Đã xoá bài thi thành công.");
    }
  }

  // Hàm lọc các bài thi theo kiểu bài
  function filterExams() {
    var filterType = document.getElementById("filterType").value;
    if (filterType) {
      var filteredExams = exams.filter(function(exam) {
        return exam.type === filterType;
      });
      // Render lại danh sách bài thi sau khi lọc
      examListElement.innerHTML = "";
      filteredExams.forEach(function(exam) {
        var row = document.createElement("tr");
        row.innerHTML = `
          <td>${exam.name}</td>
          <td>${exam.type}</td>
          <td>${exam.time}</td>
          <td>${exam.examType}${exam.examDate ? " (" + exam.examDate + ")" : ""}</td>
          <td>
            <button onclick="showDetail('${exam.name}')">Chi tiết</button>
            <button onclick="editExam('${exam.name}')">Chỉnh sửa</button>
            <button onclick="deleteExam('${exam.name}')">Xoá</button>
          </td>
        `;
        examListElement.appendChild(row);
      });
    } else {
      // Nếu không có bộ lọc được chọn, hiển thị lại danh sách toàn bộ bài thi
      renderExamList();
    }
  }
// Dữ liệu mẫu chi tiết bài thi
var examDetail = {
    name: "Triết học",
    type: "Giữa kì",
    time: "60 phút",
    examType: "Tự do",
    questions: [
      {
        question: "Câu hỏi 1?",
        options: ["A", "B", "C", "D"],
        correctAnswer: 0 // Chỉ số của phương án đúng trong mảng options
      },
      {
        question: "Câu hỏi 2?",
        options: ["A", "B", "C", "D"],
        correctAnswer: 1
      }
      // Thêm các câu hỏi khác...
    ]
  };

  // Hiển thị thông tin chi tiết bài thi
  var examDetailElement = document.getElementById("examDetail");
  renderExamDetail();

  // Hiển thị nội dung câu hỏi
  function renderExamDetail() {
    examDetailElement.innerHTML = `
      <h3>${examDetail.name}</h3>
      <p><strong>Kiểu bài:</strong> ${examDetail.type}</p>
      <p><strong>Thời gian:</strong> ${examDetail.time}</p>
      <p><strong>Kiểu thi:</strong> ${examDetail.examType}</p>
    `;
    examDetail.questions.forEach(function(question, index) {
      var questionElement = document.createElement("div");
      questionElement.classList.add("question");
      questionElement.innerHTML = `
        <h3>Câu hỏi ${index + 1}</h3>
        <p>${question.question}</p>
        <div class="answers">
          ${question.options.map((option, i) => `
            <div class="answer">
              <input type="radio" id="question${index}_option${i}" name="question${index}" value="${i}" ${i === question.correctAnswer ? 'checked' : ''}>
              <label for="question${index}_option${i}">${option}</label>
            </div>
          `).join('')}
        </div>
        <button onclick="editQuestion(${index})">Chỉnh sửa</button>
        <button onclick="deleteQuestion(${index})">Xoá</button>
      `;
      examDetailElement.appendChild(questionElement);
    });
  }
  // Hàm thêm câu hỏi mới
  function addQuestion() {
    // Thực hiện logic thêm câu hỏi ở đây
    // Sau khi thêm xong, gọi lại hàm renderExamDetail để cập nhật giao diện
    examDetail.questions.push({
      question: "Câu hỏi mới?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 0
    });
    renderExamDetail();
  }

  // Hàm xử lý khi nhấn nút chỉnh sửa câu hỏi
  function editQuestion(index) {
    // Chuyển hướng đến trang chỉnh sửa câu hỏi
    window.location.href = "editQuestion.html?exam=" + encodeURIComponent(examDetail.name) + "&index=" + index;
  }

  // Hàm xử lý khi nhấn nút xoá câu hỏi
  function deleteQuestion(index) {
    // Xác nhận xoá câu hỏi
    var confirmDelete = confirm("Bạn có chắc muốn xoá câu hỏi này?");
    if (confirmDelete) {
      // Xoá câu hỏi khỏi danh sách và cập nhật giao diện
      examDetail.questions.splice(index, 1);
      renderExamDetail();
      // Hiển thị thông báo xoá thành công
      alert("Đã xoá câu hỏi thành công.");
    }
  }
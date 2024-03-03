
//pho diem

let dataPho = [
    ["0", 24],["0.25", 8],["0.5", 19],["0.75", 29],["1", 12],
    ["1.25", 236],["1.5", 322],["1.75", 360],["2", 701],["2.25", 898],
    ["2.5", 1267],["2.75", 1723],["3", 2716],["3.25", 3387],["3.5", 5146],
    ["3.75", 6487],["4", 9399],["4.25", 10932],["4.5", 14910],["4.75", 15080],
    ["5", 30381],["5.25", 29500],["5.5", 40146],["5.75", 44329],["6", 59442],
    ["6.25", 59616],["6.5", 72128],["6.75", 68899],["7", 79164],["7.25", 67295],
    ["7.5", 73821],["7.75", 63628],["8", 67629],["8.25", 50848],["8.5", 48855],
    ["8.75", 35518],["9", 26206],["9.25", 12073],["9.5", 4661],["9.75", 443],
    ["10", 1], ["9.8", 1000], ["8.6", 29345], ["7.2", 45000], ["6.4", 50700]
];
dataPho.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
Highcharts.chart('pho_diem_chart', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Phổ điểm'
    },
    xAxis: {
        title: {
            text: 'Điểm'
        },
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Số lượng thí sinh'
        }
    },
    series: [{
        name: 'Số lượng thí sinh',
        data: dataPho,

        colorByPoint: false
    }]
  
});
// for export button

function exportToPDF() {
    var pdf = new jsPDF('p', 'pt', 'letter');
    var source = document.getElementById('container'); // Lấy phần tử chứa kết quả
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

    pdf.fromHTML(
        source, // Phần tử HTML hoặc chuỗi HTML
        margins.left, // Tọa độ x
        margins.top, {
            'width': margins.width, // Chiều rộng tối đa của nội dung trên PDF
            'elementHandlers': specialElementHandlers
        },
        function (dispose) {
            pdf.save('thongke.pdf'); // Lưu file PDF với tên "result.pdf"
        }, margins
    );
    alert("Xác nhận tải xuống file PDF!");
    
}

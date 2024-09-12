// 步骤1: 初始化计数值
let count = 0;

// 步骤2: 定义一个函数来增加计数值
function increaseCount() {
  count += 1; // 增加计数值
  console.log(count); // 在控制台输出当前的计数值

  // 步骤3: 更新网页上显示的计数值（如果需要）
  // 假设有一个元素的id是"counter"
  document.getElementById("counter").innerText = count;
}

function decreaseCount() {
    count -= 1; // 减少计数值
    console.log(count); // 在控制台输出当前的计数值

    // 步骤3: 更新网页上显示的计数值（如果需要）
    // 假设有一个元素的id是"counter"
    document.getElementById("counter").innerText = count;
}

function resetCount() {
    count = 0; // 重置计数值
    console.log(count); // 在控制台输出当前的计数值

    // 步骤3: 更新网页上显示的计数值（如果需要）
    // 假设有一个元素的id是"counter"
    document.getElementById("counter").innerText = count;
}

function getData() {
    // 示例URL，请替换为您想要请求的实际URL
    const dataUrl = 'http://localhost:3000/following';
  
    // 使用fetch请求数据
    fetch(dataUrl)
      .then(response => {
        // 确保请求成功
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // 解析JSON数据
      })
      .then(data => {
        console.log(data); // 处理数据
        document.getElementById("following").innerText = '追随数量：' + data.data.following; // 更新网页上显示的粉丝数
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }
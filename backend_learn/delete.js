// 使用动态导入
let id = 0;

import('node-fetch').then(({default: fetch}) => {
    fetch(`http://localhost:3000/delete/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  });
// 使用动态导入
import('node-fetch').then(({default: fetch}) => {
    fetch('http://localhost:3000/show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: 'my eighth task'})
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  });
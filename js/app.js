 

// 初始化vue
// 二、任务列表的初始化
			// 1.发送axios请求，获取到任务列表数据（思考：哈时候发）
			// 2.把结果给list存起来,
			// 3.v-for指令动态渲染
 const vm = new Vue({
	 el:'.todoapp',
	 data:{
		 list:[],
		 todoName:'',
		 url:'http://localhost:3000/todos/',
		 clickId:-1
	 },
	 methods:{
		// 3 添加功能
		addTodo(){
			// console.log(this.todoName)
			axios({
				method:'post',
				url:this.url,
				data:{
					name:this.todoName,
					completed:false
				}
			}).then(res =>
				 this.getTodoList(),
				 this.todoName=''
			)
		},

		//4 删除功能
		delTodo(id){
			// console.log(id)
			
			axios({
				method:'delete',
				url:this.url+id,
			}).then(res =>
				// 重新渲染
				 this.getTodoList(),
				 this.todoName=''
			)
		},

		//5 修改状态功能
		changeState(id,completed){
			// console.log(id,completed)
			axios({
				// live  server
				// http-server
				// patch打补丁,更新的是局部资源
				// put是全部更新，如果字段传的不完整，就会清空
				method:'patch',
				url:this.url + id,
				data:{
					completed:completed,
				}
			}).then(res =>
				this.getTodoList(),
				
			)
		},
		// 6 展示修改框
		updateIshow(id){
			this.clickId = id
		},
		// 7 真正的修改名字的功能
		updateTodo(id,name){
			axios({
				method:'patch',
				url:this.url + id,
				data:{
					name,
				}
			}).then(res =>
				 this.getTodoList(),
				 this.clickId=-1
			)
		},
		// 8  控制显示隐藏

		// 9-清空完成事件
		deleteAll(){
			// 获取已经完成任务的id
		// let tempArr =	this.list.filter(item=>item.completed)
		// let ids = tempArr.map(item => item.id).join()

		// console.log(ids);
		
		// 挨个删.因为自己写的接口不支持批量删除
		// 下面写的不好，性能不够优化，要发好几次axios，实际工作中就是有批量删除的接口
		
		this.list.filter(item=>completed).forEach(item=>this.delTodo(item.id))
		},
		// 封装渲染的函数
		getTodoList(){
			axios({
				method:'get',
				url:this.url
	
			}).then(res =>
				// console.log(res.data)
				// 不能写普通函数，需要箭头函数，this指向会有问题
				this.list = res.data
			)
		},
	 },
	//  初始化
  created(){
	  this.getTodoList()
	},

	computed:{
		isShowFooter(){
			return this.list.length > 0
		},
		leftCount(){
			return this.list.filter(item=>!item.completed).length
		},
		isShowClear(){
			return this.list.some(item=>item.completed)
		}
	}

 })

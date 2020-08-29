//index.js
//获取应用实例
const app = getApp()
// 获取应用实例
Page({
	data:{
		width:0,
		height:0,
jitang: 'Hello World'
  },
  play_music: function () {
    var music_src=['G.E.M.邓紫棋-句号.mp3','傅如乔-微微.mp3','华莎 (화사)-마리아.mp3','刘瑞琦-房间.mp3','R1SE-荣耀的战场.mp3', 'Rachel Platten-Lone Ranger.mp3', 'Sasha Sloan-Dancing With Your Ghost.mp3', '丸子呦-广寒宫.mp3', '余枫-荣耀.mp3', '八三夭乐团-想见你想见你想见你.mp3', '兮妹-往事如烟.mp3', '刘凤瑶-感官先生.mp3', '周兴哲-你，好不好.mp3', '小倩-不配怀念.mp3', '小曼-最远的你是我最近的爱.mp3', '张信哲-信仰.mp3', '张泽熙-那个女孩.mp3', '张韶涵-阿刁.mp3', '李荣浩-麻雀.mp3', '李袁杰_李俊佑-醉千年.mp3', '杨小壮-我承认我自卑.mp3', '梦然-少年.mp3', '毛不易-牧马城市.mp3', '海来阿木-点歌的人.mp3', '火箭少女101-5452830.mp3', '米津玄師-Lemon.mp3', '罗聪-简单的幸福.mp3', '谭晶-九儿.mp3', '郑亦辰-相思成灾.mp3', '锦零-归去来兮.mp3', '阿冗-你的答案.mp3', '阿悠悠-一生与你擦肩而过.mp3', '阿悠悠-你若三冬.mp3', '阿悠悠-念旧.mp3', '阿悠悠-旧梦一场.mp3', '阿悠悠-责无旁贷.mp3', '阿杜-撕夜.mp3', '阿杰-痴心绝对.mp3', '阿里郎-兰花指.mp3', '音阙诗听_赵方婧-芒种.mp3', '黄泳欣-地铁等待.mp3']
    const bg_music = wx.getBackgroundAudioManager();
    //随机背景音乐
    var a=Math.floor(Math.random() * 42) 
    bg_music.title = music_src[a].replace('.mp3', '');//音乐名
    bg_music.src = 'https://www.cxkboke.top/audio/'+music_src[a]; //音乐地址
  },
 shuaxin: function () {
    this.onLoad()
  },
  copy_text: function (e) {
    var that = this;
    console.log(e);
    wx.setClipboardData({
      data: that.data.OrderModel.OrderNo,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
	//onLoad生命周期函数，监听页面加载
onLoad: function(){
var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    });
    wx.request({
      url: app.globalData.url + 'getJitang',
      method: 'POST',
      data: {
        chiose: 'du'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          jitang: res.data.info
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    }),
		//将全局变量Index保存在that中，里面函数调用
		
		//获取系统信息
		wx.getSystemInfo({
			//获取系统信息成功，将系统窗口的宽高赋给页面的宽高
			success: function(res) {
				that.width = res.windowWidth
				that.height = res.windowHeight
			}
		})
	},
	//onReady生命周期函数，监听页面初次渲染完成
	onReady: function(){
		//调用canvasApp函数
		this.canvasClock()
		//对canvasAPP函数循环调用
		this.interval = setInterval(this.canvasClock,1000)
	},
	canvasClock: function(){
		var context = wx.createContext()//创建并返回绘图上下文（获取画笔）
		//设置宽高
		var width = this.width
		var height = this.height
		var R = width/2-55;//设置文字距离时钟中心点距离
		//重置画布函数
		function reSet(){
			context.height = context.height;//每次清除画布，然后变化后的时间补上
            context.translate(width/2, height/2);//设置坐标轴原点
            context.save();//保存中点坐标1
		}
		//绘制中心圆和外面大圆
		function circle(){
			//外面大圆
			context.setLineWidth(2);
            context.beginPath();
            context.arc(0, 0, width/2-30, 0, 2 * Math.PI,true);
            context.closePath();
            context.stroke();
            //中心圆
            context.beginPath();
            context.arc(0, 0, 8, 0, 2 * Math.PI, true);
            context.closePath();
            context.stroke();
		}
		//绘制字体
		function num(){
			// var R = width/2-60;//设置文字距离时钟中心点距离
			context.setFontSize(20)//设置字体样式
            context.textBaseline = "middle";//字体上下居中，绘制时间
            for(var i = 1; i < 13; i++) {
                //利用三角函数计算字体坐标表达式
                var x = R * Math.cos(i * Math.PI / 6 - Math.PI / 2);
                var y = R * Math.sin(i * Math.PI / 6 - Math.PI / 2);
                if(i==11||i==12){//调整数字11和12的位置
                    context.fillText(i, x-12, y+9);
                }else {
                    context.fillText(i, x-6, y+9);
                }
            }
		}
		//绘制小格
		function smallGrid(){
				context.setLineWidth(1);
                context.rotate(-Math.PI/2);//时间从3点开始，倒转90度
                for(var i = 0; i < 60; i++) {
                    context.beginPath();
                    context.rotate(Math.PI / 30);
                    context.moveTo(width/2-30, 0);
                    context.lineTo(width/2-40, 0);
                    context.stroke();
                }
         }
         //绘制大格
         function bigGrid(){
         	context.setLineWidth(5);
            for(var i = 0; i < 12; i++) {
                context.beginPath();
                context.rotate(Math.PI / 6);
                context.moveTo(width/2-30, 0);
                context.lineTo(width/2-45, 0);
                context.stroke();
            }
         }
         //指针运动函数
        function move(){
            var t = new Date();//获取当前时间
            var h = t.getHours();//获取小时
            h = h>12?(h-12):h;//将24小时制转化为12小时制
            var m = t.getMinutes();//获取分针
            var s = t.getSeconds();//获取秒针
            context.save();//再次保存2
            context.setLineWidth(7);
            //旋转角度=30度*（h+m/60+s/3600）
            //分针旋转角度=6度*（m+s/60）
            //秒针旋转角度=6度*s
            context.beginPath();
            //绘制时针
            context.rotate((Math.PI/6)*(h+m/60+s/3600));
            context.moveTo(-20,0);
            context.lineTo(width/4.5-20,0);
            context.stroke();
            context.restore();//恢复到2,（最初未旋转状态）避免旋转叠加
            context.save();//3
            //画分针
            context.setLineWidth(5);
            context.beginPath();
            context.rotate((Math.PI/30)*(m+s/60));
            context.moveTo(-20,0);
            context.lineTo(width/3.5-20,0);
            context.stroke();
            context.restore();//恢复到3，（最初未旋转状态）避免旋转叠加
            context.save();
            //绘制秒针
            context.setLineWidth(2);
            context.beginPath();
            context.rotate((Math.PI/30)*s);
            context.moveTo(-20,0);
            context.lineTo(width/3-20,0);
            context.stroke();
        }
		function drawClock(){
			reSet();
			circle();
			num();
			smallGrid();
			bigGrid();
			move();
		}
		drawClock()//调用运动函数
		// 调用 wx.drawCanvas，通过 canvasId 指定在哪张画布上绘制，通过 actions 指定绘制行为
		wx.drawCanvas({
			canvasId:'myCanvas',
			actions: context.getActions()
		})
	},
	//页面卸载，清除画布绘制计时器
	onUnload:function(){
		clearInterval(this.interval)
	}
})



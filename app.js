//app.js
App({
  globalData: {
    // url:'http://127.0.0.1:5000/',
    url: 'https://www.cxkboke.top/',
  },
  bg_music_play() {
    var music_src=['G.E.M.邓紫棋-句号.mp3','傅如乔-微微.mp3','华莎 (화사)-마리아.mp3','刘瑞琦-房间.mp3','R1SE-荣耀的战场.mp3', 'Rachel Platten-Lone Ranger.mp3', 'Sasha Sloan-Dancing With Your Ghost.mp3', '丸子呦-广寒宫.mp3', '余枫-荣耀.mp3', '八三夭乐团-想见你想见你想见你.mp3', '兮妹-往事如烟.mp3', '刘凤瑶-感官先生.mp3', '周兴哲-你，好不好.mp3', '小倩-不配怀念.mp3', '小曼-最远的你是我最近的爱.mp3', '张信哲-信仰.mp3', '张泽熙-那个女孩.mp3', '张韶涵-阿刁.mp3', '李荣浩-麻雀.mp3', '李袁杰_李俊佑-醉千年.mp3', '杨小壮-我承认我自卑.mp3', '梦然-少年.mp3', '毛不易-牧马城市.mp3', '海来阿木-点歌的人.mp3', '火箭少女101-5452830.mp3', '米津玄師-Lemon.mp3', '罗聪-简单的幸福.mp3', '谭晶-九儿.mp3', '郑亦辰-相思成灾.mp3', '锦零-归去来兮.mp3', '阿冗-你的答案.mp3', '阿悠悠-一生与你擦肩而过.mp3', '阿悠悠-你若三冬.mp3', '阿悠悠-念旧.mp3', '阿悠悠-旧梦一场.mp3', '阿悠悠-责无旁贷.mp3', '阿杜-撕夜.mp3', '阿杰-痴心绝对.mp3', '阿里郎-兰花指.mp3', '音阙诗听_赵方婧-芒种.mp3', '黄泳欣-地铁等待.mp3']
    const bg_music = wx.getBackgroundAudioManager();
    //随机背景音乐
    var a=Math.floor(Math.random() * 42) 
    bg_music.title = music_src[a].replace('.mp3', '');//音乐名
    bg_music.src = 'https://www.cxkboke.top/audio/'+music_src[a]; //音乐地址
    bg_music.onPlay(() =>{
      console.log('开始播放')
    })
    bg_music.onEnded(() => {
      console.log('结束播放')
      wx.showModal({
        title: '背景音乐',
        content: '是否播放下一曲？',
        success(res) {
          if (res.confirm) {
            var a=Math.floor(Math.random() * 4)
          bg_music.title = music_src[a];//音乐名
          bg_music.src = 'https://www.cxkboke.top/audio/'+music_src[a]; //音乐地址
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    })
    bg_music.onNext(res => {
      swan.showToast({
          title: 'onNext',
          icon: 'none'
      });
      console.log('onNext', res);
  });
    bg_music.onPrev(res => {
      swan.showToast({
          title: 'onPrev',
          icon: 'none'
      });
      console.log('onPrev', res);
  });

},
onLaunch: function(){
    this.bg_music_play()
  }
})
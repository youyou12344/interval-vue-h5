// 背景音乐可能在不同的vue文件中都要做修改，所以放在在全局会比较方便

const bgmAudio = new Audio("https://sourl.co/CdRNkP") // 背景音乐（根据项目修改）

const moduleBgm = {
  state: () => ({
    isPlayingBgm: false, // 正在播放背景音乐
    isShowBtnMusic: true, // 显示播放按钮
  }),
  mutations: {
    // 设置是否播放背景音乐
    setIsPlayingBgm(state, v) {
      state.isPlayingBgm = v
    },
    // 设置是否显示播放按钮
    setIsShowBtnMusic(state, v) {
      state.isShowBtnMusic = v
    },
  },
  actions: {
    // 播放音乐（微信自动播放时调用）
    // eslint-disable-next-line no-unused-vars
    palyBgm({ state, commit }) {
      if (!bgmAudio) return
      bgmAudio.play()
      bgmAudio.volume = 1
      bgmAudio.loop = true
      commit("setIsPlayingBgm", true)
    },

    // （点击）切换背景音乐是否播放
    swichBgm({ state, commit }, type) {
      if (!bgmAudio) return
      if (type === "stop" && state.isPlayingBgm) {
        bgmAudio.pause()
        commit("setIsPlayingBgm", false)
      } else if (type === "play" && !state.isPlayingBgm) {
        bgmAudio.play()
        commit("setIsPlayingBgm", true)
      }
    },
  },
}

export default moduleBgm

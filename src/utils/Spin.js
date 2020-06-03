import {Spin} from "iview"
import {Message} from "iview"

export function loading() {
  Spin.show({
    render: (h) => {
      return h('div',[
        h('Icon', {
          'class': 'demo-spin-icon-load',
          props: {
            type: 'ios-loading',
            size: 72
          },
          style:{
            animation: 'ani-demo-spin 1s linear infinite',
          }
        }),
        h('div', 'Loading')
      ])
      setTimeout(() => {
        cancelLoad();
        Message.error("请求超时")
      }, 10000);
    }
  });
}

export function cancelLoad() {
  Spin.hide()
}

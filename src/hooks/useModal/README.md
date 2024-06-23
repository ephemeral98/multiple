## 弹窗组件

### 安装依赖：
```
npm i react-transition-group
npm i animate.css
npm i @types/react-transition-group -D
```

需要在入口文件，比如`main.ts`中引入 animate.cs
```ts
// main.ts

import 'animate.css';
```

### 使用方法：

```tsx
const CompA = (props: { bbc: string }) => {
  return (
    <div>
      <button
        onClick={() => {
          props.onClose();
        }}
      >
        关闭
      </button>
    </div>
  );
};
```

```tsx
const { open, close, toggle, isOpen } = useModal(CompA, {
  props: {},
  animate: {
    enterActive: 'animate__animated animate__flip',
    exitActive: 'animate__animated animate__fadeOutRight',
  },
});
```

以下方法控制打开关闭：
```tsx
<div onClick={() => open()}>打开弹窗</div>
<div onClick={() => close()}>关闭弹窗</div>
<div onClick={() => {
  toggle({show: !isOpen})
}}>切换弹窗</div>
<div>{isOpen ? '打开' : '关闭'}</div>
```

### 属性选项：

```
  root?: string; // 挂在的根节点

  props?: P; // 参数

  destroy?: boolean; // 点击关闭的时候整个销毁（目前还不建议使用）

  unmountOnExit?: boolean; // 是否在组件销毁的时候移除DOM (尽量不移除)

  animate?: {
    // 相关动画，可直接使用 animate.css 的class
    enterActive: string;
    exitActive: string;
  };

  style?: CSSProperties;

  className?: string; // 会放到 modal-wrapper 那一层，即第三层

  dir?: 'top' | 'bottom'; // 弹窗位置，top是靠上，bottom靠下，如果需要再精细就自行在使用的组件上挪位

  id?: string; // 挂到 modal-main 上的id

  onMounted?:() => void; // 弹窗打开之后的回调

  onUnmounted?: () => void; // 弹窗已关闭的回调

  maskColor?: string; // 遮罩层的background
```

### 其他

如果想传递一些结果给调用者(父组件), 可以通过`props`传递，比如：

表单中将提交结果交给父组件：

```tsx
const CompA: FC<{ onClose: () => void; onSubmit: (args: any) => void }> = (props) => {
  return (
    <button
      onClick={() => {
        props.onSubmit('表单数据...');
        props.onClose?.();
      }}
    >
      关闭
    </button>
  );
};
```

这样，父组件就可以通过 props 接收：

```tsx
  const { toggle: toggleB } = useModal(CompB, {
    props: {
      onDone: (args) => {
        console.log('子组件传递过来的参数...', args);
      }
    },
```

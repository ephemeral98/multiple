## 表单组件

### 使用方法：

```tsx
import Form from './components/Form';
  
const [phone, setPhone] = useState('');

return <Form.Wrap
  onError={(err) => {
    console.log('这里可以获取错误消息, true则是无错误', err);
    if(err !== true) {
      window.alert(err);
    }
  }}
  onSubmit={async () => {
    // 如果rules规则不通过 或者 isRequired不通过，则不会触发这个callback
    // await fetch(); // 等待提交表单
    // window.alert('提交成功');
    console.log('提交成功');
  }}
>
  <Form.Inp
    style={{ backgroundColor: 'skyblue' }}
    placeHolder="手机号"
    isRequired="输入框不能为空" // 这里可设置必填，value是提示
    name="one" // name不要写相同的
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    rules={(value) => {
      if (!/^\d+/.test(value)) {
        return '输入框不合法';
      }

      return true; // 必须只有 严格return true 才会通过规则
    }}
  />
  
  <Form.Btn>提交按钮</Form.Btn>
</Form.Wrap>
```

### 说明：
- input 主要通过 `onChange` 事件触发

- 提交表单是触发的`Form`的`onSubmit`事件，切记不要写`onClick`去做提交表单

- 如果你不需要提交按钮的`loading`状态，可以不实用这里的`<Form.Btn></Form.Btn>`，使用普通HTML的按钮也行，但是必须要有触发提交表单的事件(submit)

- 注意`<Form.Inp />`的name是唯一的，不要重复了

### 手动校验：
如果你是通过一个弹窗上的确认按钮触发的，这个按钮不在这个`Form.Wrap`里面，

则可以通过手动去校验，判断要不要提交表单：

```tsx
  const formRef = useRef<HTMLFormElement>();

  const handleSubmit = async () => {
    setLoading(true);
    await fetch();
    setLoading(false);
  };

<Modal
  confirmLoading={loading}
  title="Modal Title"
  visible={visible}
  onOk={() => {
    // 手动校验 判断是否通过
    const resp = formRef.current.handleValid();
    // 这里必须严格等于true 才是通过校验
    if (resp === true) {
      handleSubmit();
    }
  }}
  onCancel={() => setVisible(false)}
>
  <Form.Wrap
    ref={formRef}
    onSubmit={async () => {
      handleSubmit();
    }}
  >
    <Form.Inp
      style={{ backgroundColor: 'skyblue' }}
      placeHolder="手机号"
      isRequired="输入框不能为空" // 这里是必填项，value是提示
      name="one" // name不要写相同的
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      rules={(value) => {
        if (!/^\d+/.test(value)) {
          return '输入框不合法';
        }
        return true; // 必须只有 严格return true 才会通过规则
      }}
    />
    <Form.Btn>提交</Form.Btn>
  </Form.Wrap>
</Modal>
```

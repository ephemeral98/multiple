import React from 'react';

/**
 * 包装组件，为了使用ref拿到实例
 */
class WrapperComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...props,
    };
  }

  override render() {
    const { children } = this.props;
    const { state } = this;

    const id = state.modalId.replace('useModal__', '');

    return (
      <>
        <div
          className="modal-main"
          style={{
            display: state.show ? 'flex' : 'flex',
            position: 'relative',
            // left: 0,
            // top: 0,
            // width: '100%',
            // height: '100%',
            // backgroundColor: 'pink',
            // zIndex: state.show ? 10001 + +id : -1,
            zIndex: state.show ? 10001 + +id : 0,
            // justifyContent: 'center',
            // alignItems: 'center',
            // flexDirection: 'column',
          }}
        >
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) {
              return null;
            }
            return React.cloneElement(child, {
              ...state,
            });
          })}
        </div>

        {/* 遮罩层 */}
        <div
          className="modal-mask"
          style={{
            display: state.show ? 'block' : 'none',
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            background: this.state.maskColor || '#0000006f',
            zIndex: 10000 + +id,
          }}
        ></div>
      </>
    );
  }
}

export default WrapperComponent;

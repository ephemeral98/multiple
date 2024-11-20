import { IPayload, IState, EType } from './type.d';

export const formReducer = (state: IState, action: { type: EType; payload: IPayload }) => {
  switch (action.type) {
    case EType.updateInput:
      return {
        ...state,
        [action.payload.name]: { ...action.payload },
      };
    default:
      return state;
  }
};

export const useFormState = (
  state: IState,
  dispatch: (param: { type: EType; payload: IPayload }) => void
) => {
  /**
   * 必填 但输入框为空
   * @param itemName name
   * @returns string输入框为空时候的消息，undefined则是通过该规则
   */
  const requiredMsg = (itemName: string): string | undefined => {
    const item = state[itemName];
    if (item.isRequired && !item.value) {
      dispatch({
        type: EType.updateInput,
        payload: {
          ...item,
          message: item.isRequired,
        },
      });

      return item.isRequired;
    }
  };

  /**
   * 该项规则是否通过
   * @param itemName name
   * @returns !== true，则说明规则不通过
   */
  const permitRuleItem = (itemName: string): string | true => {
    const item = state[itemName];
    const res = item.validRules.fn?.(item.value) ?? true;
    // 更新规则是否合法
    dispatch({
      type: EType.updateInput,
      payload: {
        ...item,
        validRules: {
          ...item.validRules,
          val: !!res,
        },
      },
    });
    if (res !== true) {
      // 更新消息
      dispatch({
        type: EType.updateInput,
        payload: {
          ...item,
          message: res,
        },
      });
    }
    return res;
  };

  /**
   * 校验是否合法提交
   */
  const validSubmit = (): string | true => {
    for (const key in state) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        const resp = requiredMsg(key);
        if (resp) {
          return resp;
        }
      }
    }
    return true;
  };

  /**
   * 校验是否所有制定规则都通过
   */
  const permitRules = (): string | true => {
    let tag;
    for (const key in state) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        const resp = permitRuleItem(key);
        if (resp !== true) {
          tag = resp;
        }
      }
    }
    return tag ?? true;
  };

  /**
   * 提交表单的校验
   */
  const validResp = (): string | true => {
    let tag = true;
    const resp1 = validSubmit();
    if (resp1 !== true) {
      // window.alert('不合法：' + resp1);
      tag = false;
      return resp1;
    }
    const resp2 = permitRules();
    if (resp2 !== true) {
      // window.alert('不合法：' + resp2);
      tag = false;
      return resp2;
    }
    return tag;
  };

  return {
    requiredMsg,
    permitRuleItem,
    formReducer,
    validSubmit,
    permitRules,
    validResp,
  };
};

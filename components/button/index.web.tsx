import React from 'react';
import classNames from 'classnames';
import Icon from '../icon/index.web';
import splitObject from '../_util/splitObject';
import touchableFeedback from '../_util/touchableFeedback';
import tsProps from './PropsType';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
  return typeof str === 'string';
}

// Insert one space between two chinese characters automatically.
function insertSpace(child) {
  if (isString(child.type) && isTwoCNChar(child.props.children)) {
    return React.cloneElement(child, {},
                              child.props.children.split('').join(' '));
  }
  if (isString(child)) {
    if (isTwoCNChar(child)) {
      child = child.split('').join(' ');
    }
    return <span>{child}</span>;
  }
  return child;
}

class Button extends React.Component<tsProps, any> {
  static defaultProps = {
    prefixCls: 'am-button',
    size: 'large',
    inline: false,
    disabled: false,
    loading: false,
  };

  render() {
    let[{ children, className, prefixCls, type, size, inline, disabled,
      htmlType, icon, loading, touchFeedback }, restProps] = splitObject(this.props,
    ['children', 'className', 'prefixCls', 'type', 'size', 'inline',
      'disabled', 'htmlType', 'icon', 'loading', 'touchFeedback']);

    const wrapCls = {
      [className]: className,
      [prefixCls]: true,
      [`${prefixCls}-primary`]: type === 'primary',
      [`${prefixCls}-ghost`]: type === 'ghost',
      [`${prefixCls}-warning`]: type === 'warning',
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-inline`]: inline,
      [`${prefixCls}-disabled`]: disabled,
    };
    if (typeof touchFeedback === 'boolean') {
      wrapCls[`${prefixCls}-active`] = touchFeedback;
    } else if (typeof touchFeedback === 'string') {
      wrapCls[touchFeedback] = !!touchFeedback;
    }

    const iconType = loading ? 'loading' : icon;

    const kids = React.Children.map(children, insertSpace);

    return (<button {...restProps}
      type={htmlType || 'button'}
      className={classNames(wrapCls)}
      disabled={disabled}
      >{iconType ? <Icon type={iconType} /> : null}{kids}</button>);
  }
}

export default touchableFeedback(Button);

import React from 'react';
import {Button, Dropdown, Menu} from 'antd';
import {colors} from '../../../utilities';
import {Link} from 'react-router-dom';
import '../../../styles/button.css';
import { useSelector } from 'react-redux';

const CustomButton = ({
  type,
  text,
  rounded,
  block,
  loading,
  onClick,
  icon,
  size = 'large',
  htmlType,
  disabled,
  dashed,
  isButtonDropdown,
  menuDropdown,
}) => {
  const {loadingButton} = useSelector((state) => state.loading)
  const renderType = (type, disabled) => {
    if (!disabled) {
      switch (type) {
        case 'primary':
          return {
            backgroundColor: colors.primary,
            color: colors.white,
            fontWeight: 700,
            borderRadius: rounded ? 20 : 5,
          };
        case 'secondary':
          return {
            backgroundColor: colors.secondary,
            color: colors.white,
            fontWeight: 700,
            borderRadius: rounded ? 20 : 5,
          };
        case 'warning':
          return {
            backgroundColor: colors.warning,
            color: colors.white,
            borderRadius: rounded ? 20 : 5,
            fontWeight: 700,
          };
        case 'info':
          return {
            backgroundColor: colors.info,
            color: colors.white,
            borderRadius: rounded ? 20 : 5,
            fontWeight: 700,
          };
        case 'dark':
          return {
            backgroundColor: colors.dark,
            color: colors.white,
            borderRadius: rounded ? 20 : 5,
            fontWeight: 700,
          };
        case 'light':
          return {
            backgroundColor: colors.light,
            color: colors.dark,
            borderRadius: rounded ? 20 : 5,
            fontWeight: 700,
          };
        case 'danger':
          return {
            backgroundColor: colors.danger,
            color: colors.white,
            borderRadius: rounded ? 20 : 5,
            fontWeight: 700,
          };
        default:
          return {
            backgroundColor: colors.primary,
            color: colors.white,
            borderRadius: rounded ? 20 : 5,
            fontWeight: 700,
          };
      }
    } else {
      return {
        backgroundColor: colors.disabled,
        color: colors.white,
        borderRadius: rounded ? 20 : 5,
        fontWeight: 700,
      };
    }
  };
  if (isButtonDropdown) {
    return (
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu>
            {menuDropdown.map((item, index) => {
              if (item?.component) {
                return <Menu.Item key={index}>{item.component}</Menu.Item>;
              }
              return (
                <Menu.Item key={index}>
                  <Link target="_blank" to={item.value} download>
                    {item.label}
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        }>
        <Button
          type={dashed && 'dashed'}
          disabled={disabled}
          className="button"
          icon={icon}
          size={size}
          onClick={onClick}
          style={renderType(type, disabled)}
          htmlType={htmlType}
          block={block}
          loading={loading !== undefined ? loading : loadingButton}>
          {text}
        </Button>
      </Dropdown>
    );
  }
  return (
    <Button
      type={dashed && 'dashed'}
      disabled={disabled}
      className="button"
      icon={icon}
      size={size}
      onClick={onClick}
      style={renderType(type, disabled)}
      htmlType={htmlType}
      block={block}
      loading={loading !== undefined ? loading : loadingButton}
      >
      {text}
    </Button>
  );
};

export default CustomButton;

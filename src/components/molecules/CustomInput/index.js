import {FileOutlined, InboxOutlined, SearchOutlined} from '@ant-design/icons';
import {
  Col,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from 'antd';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {colors} from '../../../utilities';
import {Button} from '../../atoms';
import './style.css';

const CustomInput = ({
  name,
  type,
  placeholder,
  icon,
  rounded,
  className,
  setValue,
  onSearch,
  onChange,
  defaultValue,
  source = [],
  loading,
  urlUpload,
  requestUploadName,
  disabled,
  form,
  value,
  showPreview,
  min,
  max,
  prefix,
}) => {
  const {authData} = useSelector((state) => state.auth);
  const [visibleModalUpload, setVisibleModalUpload] = useState(false);
  const [fileUploadedName, setFileUploadedName] = useState('');
  const [fileList, setFileList] = useState([]);
  const {t} = useTranslation('customInput');
  const props = {
    name: requestUploadName,
    action: `${process.env.REACT_APP_API_URL}/${urlUpload}`,
    headers: {
      authorization: authData.token,
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        setFileList([info.file]);
      }
      if (info.file.status === 'done') {
        message.success(t('uploadSuccess', {fileName: info.file.name}));
        setFileUploadedName(info.file.response?.values?.filename);
      } else if (info.file.status === 'error') {
        message.success(t('uploadFailed', {fileName: info.file.name}));
      }
    },
    fileList,
    onRemove: () => {
      setFileList([]);
      setFileUploadedName('');
    },
  };
  if (type === 'text') {
    return (
      <Input
        value={form?.getFieldValue(name) || value}
        disabled={disabled}
        placeholder={placeholder}
        prefix={icon}
        style={rounded ? {borderRadius: 20} : {borderRadius: 5}}
        className={className}
      />
    );
  } else if (type === 'text-area') {
    return (
      <Input.TextArea
        value={form?.getFieldValue(name) || value}
        disabled={disabled}
        placeholder={placeholder}
        style={rounded ? {borderRadius: 20} : {borderRadius: 5}}
        className={className}
      />
    );
  } else if (type === 'password') {
    return (
      <Input.Password
        placeholder={placeholder}
        prefix={icon}
        style={rounded && {borderRadius: 20}}
        className={className}
      />
    );
  } else if (type === 'search') {
    return (
      <Input
        suffix={<SearchOutlined />}
        style={rounded && {borderRadius: 20}}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    );
  } else if (type === 'number') {
    return (
      <InputNumber
        min={min}
        max={max}
        disabled={disabled}
        defaultValue={defaultValue}
        style={
          rounded
            ? {borderRadius: 20, width: '100%'}
            : {borderRadius: 5, width: '100%'}
        }
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e, name)}
      />
    );
  } else if (type === 'money') {
    return (
      <InputNumber
        disabled={disabled}
        min={min || 0}
        max={max}
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        defaultValue={defaultValue || 0}
        value={value}
        style={
          rounded
            ? {borderRadius: 20, width: '100%'}
            : {borderRadius: 5, width: '100%'}
        }
        placeholder={placeholder}
        onChange={(e) => onChange(e, name)}
      />
    );
  } else if (type === 'select') {
    return (
      <Select
        showSearch
        className={rounded ? 'border-rounded' : 'border-normal'}
        onChange={(e) => onChange(e, name)}
        loading={loading}
        filterOption={(input, option) =>
          option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}>
        {source.length &&
          source.map((item, index) => (
            <Select.Option value={item.value || item.id} key={index}>
              {item.label}
            </Select.Option>
          ))}
      </Select>
    );
  } else if (type === 'upload-file') {
    return (
      <Row>
        <Modal
          title="Upload File"
          onCancel={() => {
            setVisibleModalUpload(false);
            setFileUploadedName('');
          }}
          visible={visibleModalUpload}
          footer={[
            <Button
              type="danger"
              text="Cancel"
              onClick={() => {
                setVisibleModalUpload(false);
                setFileUploadedName('');
                setFileList([]);
              }}
            />,
            <Button
              disabled={!fileUploadedName}
              type="secondary"
              text="Submit"
              onClick={() => {
                onChange(fileUploadedName, name);
                setVisibleModalUpload(false);
              }}
            />,
          ]}>
          <Upload.Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{t('uploadDescription')}</p>
          </Upload.Dragger>
        </Modal>
        <Col
          span={disabled && !showPreview ? 24 : 18}
          style={{marginRight: 10}}>
          <Input
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            prefix={icon}
            style={
              rounded
                ? {borderRadius: 20}
                : {borderRadius: 5, color: colors.black}
            }
            className={className}
            disabled
            value={form?.getFieldValue(name) || value}
            defaultValue={form?.getFieldValue(name)}
          />
        </Col>
        {(!disabled || showPreview) && (
          <Col span={4}>
            <Button
              type="light"
              text={showPreview ? 'Preview' : 'Choose File'}
              size="medium"
              onClick={() =>
                showPreview
                  ? showPreview(form?.getFieldValue(name) || value)
                  : setVisibleModalUpload(true)
              }
              icon={<FileOutlined />}
            />
          </Col>
        )}
      </Row>
    );
  } else if (type === 'phone-number') {
    return (
      <Input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        style={rounded ? {borderRadius: 20} : {borderRadius: 5}}
        className={className}
        addonBefore={prefix || '+62'}
      />
    );
  } else {
    return (
      <Input
        value={form?.getFieldValue(name) || value}
        disabled={disabled}
        placeholder={placeholder}
        prefix={icon}
        style={rounded ? {borderRadius: 20} : {borderRadius: 5}}
        className={className}
      />
    );
  }
};

export default CustomInput;

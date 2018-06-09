import React, { PureComponent, Fragment } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  List,
  message,
  Radio,
  Icon,
  Steps,
  Upload,
  Progress,
  Modal,
  Tag,
  Checkbox,
  InputNumber,
  Tooltip
} from "antd";
const CLASSIC = "CLASSIC";
const BUDGET = "BUDGET";
const DYNAMIC = "DYNAMIC";
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Step = Steps.Step;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 }
  }
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 }
  }
};
const Tips = ({ message }) => (
  <Tooltip title={message}>
    <Icon
      style={{
        marginLeft: 5,
        padding: 5,
        background: "#8144FE",
        color: "white",
        borderRadius: "3px",
        boxShadow: "rgba(129, 68, 254, 0.63) 0px 1px 10px"
      }}
      type="question"
    />
  </Tooltip>
);
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    dataSetList: [],
    coverList: [],
    uploadingNum: 0,
    modalVisible: false,
    current: 0,
    selectedCriterion: {},
    basicFormResult: {},
    dependencies: []
  };

  handleSubmitBasicForm = e => {
    e.preventDefault();
  };

  handleCardClicked = async criterionItem => {
    await this.setState({
      modalVisible: true,
      selectedCriterion: criterionItem
    });
  };

  handleSubmitAllData = e => {};

  aliCustomRequest = async ({
    onProgress,
    onError,
    onSuccess,
    data,
    filename,
    file,
    withCredentials,
    action,
    headers
  }) => {};

  handleDataImageListChange = fileList => {
    this.setState({ dataSetList: fileList });
    const list = fileList.slice(0);
    this.setState({
      uploadingNum: fileList.filter(item => item.status === "uploading").length
    });
  };

  handleCoverImageListChange = fileList => {
    fileList = fileList.slice(-1);
    this.setState({ coverList: fileList });
  };
  onSelectedChange = value => {
    this.setState({ dependencies: value });
  };

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  BasicForm = ({}) => {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      // TODO: ADD DEFAULT VALUE
      <Form
        onSubmit={this.handleSubmitBasicForm}
        hideRequiredMark
        style={{ marginTop: 8 }}
      >
        <FormItem {...formItemLayout} label="任务标题">
          {getFieldDecorator("task_name", {
            rules: [
              {
                required: true,
                message: "请输入标题"
              }
            ]
          })(<Input placeholder="给目标起个名字" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="任务要求">
          {getFieldDecorator("requirement", {
            rules: [
              {
                required: true,
                message: "请输入任务要求"
              }
            ]
          })(
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="请输入您的任务描述与要求"
              rows={4}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="预期截止时间"
          help="只作为任务结束时间的参考值"
        >
          {getFieldDecorator("ddl", {
            rules: [
              { type: "object", required: true, message: "请输入预期截止日期" }
            ]
          })(
            <DatePicker
              style={{ width: "100%" }}
              placeholder="请输入预期截止日期"
            />
          )}
        </FormItem>
        <FormItem
          key={"testKeyWord"}
          {...formItemLayout}
          label="关键词"
          help="请使用回车或逗号分词"
        >
          {getFieldDecorator("keywords", {
            initialValue: []
          })(
            <Select
              mode="tags"
              placeholder="请输入您期望的用户关键词"
              notFoundContent="无已经输入的关键词"
              onInputKeyDown={e => e.key === "Enter" && e.preventDefault()}
              style={{ width: "100%" }}
              tokenSeparators={[" "]}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="标注类型"
          help="每个数据集只有一种标注方式"
        >
          <div>
            {getFieldDecorator("type", {
              initialValue: "RECT"
            })(
              <Radio.Group>
                <Radio value="RECT">框选</Radio>
                <Radio value="DESC">描述</Radio>
                <Radio value="EDGE">描边</Radio>
              </Radio.Group>
            )}
          </div>
        </FormItem>
        <FormItem {...formItemLayout} label="预算支付方式">
          <div>
            {getFieldDecorator("reward_way.type", {
              initialValue: CLASSIC
            })(
              <Radio.Group>
                <Radio value={CLASSIC}>
                  标准支付<Tips message="最普通的balabala" />
                </Radio>
                <Radio value={BUDGET}>
                  固定上限<Tips message="最普通的balabala" />
                </Radio>
                <Radio value={DYNAMIC}>
                  动态计算<Tips message="最普通的balabala" />
                </Radio>
              </Radio.Group>
            )}
            <FormItem
              {...formItemLayout}
              style={{ marginTop: 20 }}
              label="目标标注人数/张"
            >
              {getFieldDecorator("reward_way.aim", {
                rules: [
                  {
                    required: true,
                    message: "请输入目标标注人数/张"
                  }
                ]
              })(
                <InputNumber
                  precision={0}
                  style={{ width: "100%" }}
                  min={1}
                  max={10000000}
                  placeholder="请输入目标标注人数/张"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="用户标注限制"
              style={{
                display:
                  getFieldValue("reward_way.type") === CLASSIC
                    ? "block"
                    : "none"
              }}
            >
              {getFieldDecorator("reward_way.limit", {
                rules: [
                  {
                    required: getFieldValue("reward_way.type") === CLASSIC,
                    message: "请输入单个用户最多标注的数量"
                  }
                ]
              })(
                <InputNumber
                  precision={0}
                  style={{
                    width: "100%"
                  }}
                  min={1}
                  max={100000000}
                  placeholder="填入单个用户最多标注的数量限制"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="奖励值"
              style={{
                display:
                  getFieldValue("reward_way.type") === CLASSIC
                    ? "block"
                    : "none"
              }}
            >
              {getFieldDecorator("reward_way.reward", {
                rules: [
                  {
                    required: getFieldValue("reward_way.type") === CLASSIC,
                    message: "请输入奖励值"
                  }
                ]
              })(
                <InputNumber
                  precision={0}
                  style={{
                    width: "100%"
                  }}
                  min={1}
                  max={100000000}
                  placeholder="请输入奖励值"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="预算上界"
              style={{
                display:
                  getFieldValue("reward_way.type") === BUDGET ? "block" : "none"
              }}
            >
              {getFieldDecorator("reward_way.budget", {
                rules: [
                  {
                    required: getFieldValue("reward_way.type") === BUDGET,
                    message: "请输入预算上界"
                  }
                ]
              })(
                <InputNumber
                  precision={0}
                  style={{
                    width: "100%"
                  }}
                  min={1}
                  max={100000000}
                  placeholder="请输入预算上界"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="取样阶段预算"
              style={{
                display:
                  getFieldValue("reward_way.type") === DYNAMIC
                    ? "block"
                    : "none"
              }}
            >
              {getFieldDecorator("reward_way.sample_budget", {
                rules: [
                  {
                    required: getFieldValue("reward_way.type") === DYNAMIC,
                    message: "请输入取样阶段的预算"
                  }
                ]
              })(
                <InputNumber
                  precision={0}
                  style={{
                    width: "100%"
                  }}
                  min={1}
                  max={100000000}
                  placeholder="请输入取样阶段的预算"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="取样阶段价格"
              style={{
                display:
                  getFieldValue("reward_way.type") === DYNAMIC
                    ? "block"
                    : "none"
              }}
            >
              {getFieldDecorator("reward_way.sample_price", {
                rules: [
                  {
                    required: getFieldValue("reward_way.type") === DYNAMIC,
                    message: "请输入取样阶段的价格"
                  }
                ]
              })(
                <InputNumber
                  precision={0}
                  style={{
                    width: "100%"
                  }}
                  min={1}
                  max={100000000}
                  placeholder="请输入取样阶段的价格"
                />
              )}
            </FormItem>
          </div>
        </FormItem>
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit">
            下一步
          </Button>
        </FormItem>
      </Form>
    );
  };
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { current } = this.state;
    const { allCriterion } = this.props.initiatorCriterion;
    const { modalVisible, selectedCriterion } = this.state;
    const criterionList = (
      <div>
        <Checkbox.Group
          defaultValue={this.state.dependencies}
          style={{ width: "100%" }}
          onChange={this.onSelectedChange}
        >
          <List
            rowKey="id"
            loading={this.props.criterionLoading}
            grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
            dataSource={allCriterion}
            renderItem={item => (
              <List.Item>
                <Card
                  hoverable
                  bodyStyle={{ padding: 0, position: "relative" }}
                >
                  <Card.Meta
                    avatar={
                      <img
                        onClick={() => this.handleCardClicked(item)}
                        height={100}
                        src={item.cover}
                      />
                    }
                    description={
                      <div style={{}}>
                        <div
                          style={{
                            fontWeight: "bold",
                            padding: "10px 10px 10px 0",
                            maxWidth: "100%"
                          }}
                        >
                        </div>
                      </div>
                    }
                  />
                  <div style={{ position: "absolute", right: 10, bottom: 10 }}>
                    <Tag color="blue">{item.type}</Tag>
                    <Checkbox value={item.criterion_id} />
                  </div>
                  {/* <div className={styles.cardItemContent}> */}
                  {/* <div className={styles.tag}> */}

                  {/* </div> */}
                  {/* </div> */}
                </Card>
              </List.Item>
            )}
          />
        </Checkbox.Group>
        <div style={{ width: 300, margin: "50px auto" }}>
          <Button style={{ marginRight: "20px" }} onClick={this.prev}>
            上一步
          </Button>
          <Button
            loading={this.props.submitting}
            onClick={this.handleSubmitAllData}
            type="primary"
          >
            最终提交
          </Button>
        </div>
      </div>
    );

    const result = (
      <div/>
    );

    const steps = [
      {
        title: "基本信息",
        content: <this.BasicForm />
      },
      {
        title: "标准集",
        content: criterionList
      },
      {
        title: "已完成",
        content: result
      }
    ];
    return (
      <div>
        <Card bordered={false}>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} icon={item.icon} />
            ))}
          </Steps>
          {steps[this.state.current].content}
        </Card>
      </div>
    );
  }
}

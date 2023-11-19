import {bitable} from "@lark-opdev/block-bitable-api";
import {FC, useEffect} from "react";
import {useAsync} from "react-async-hook";
import {getCurrentTask, setCompleted} from "./utils";
import {
    Typography,
    Tag,
    Button,
    Divider,
    Space,
    Toast,
} from "@douyinfe/semi-ui";

const {Title, Text} = Typography;

const defaultTask = {
    description: "",
    userName: "",
    completed: false,
    address: ""
};

export const App = () => {
    const task = useAsync(getCurrentTask, []);
    const {description, userName, completed, address} = task.result ?? defaultTask;

    // 切换上下一条记录时，触发 SelectionChange
    useEffect(() => {
        return bitable.base.onSelectionChange(({data}) =>
            task.execute()
        );
    }, []);

    const toggleCompleted = () => {
        setCompleted(!completed)
            .then(() => task.execute())
            .then(() => Toast.success("更新任务状态成功"))
            .catch(() => Toast.error("更新任务状态失败"));
    };

    if (task.loading) return <div>loading</div>;
    if (task.error) return <div>error: {task.error.message}</div>;

    return (
        <PureTaskComponment
            description={description}
            userName={userName}
            completed={completed}
            address={address}
            toggleCompleted={toggleCompleted}
        />
    );
};

interface PureTaskComponmentProps {
    description: string;
    userName: string;
    completed: boolean;
    address: string;
    toggleCompleted: () => void;
}

const PureTaskComponment: FC<PureTaskComponmentProps> = ({
                                                             description,
                                                             userName,
                                                             completed,
                                                             address,
                                                             toggleCompleted,
                                                         }) => {
    return (
        <Space vertical align="start">
            <div>
                <Title heading={2}><a href="https://wiki-migrate.lzpsap1.com/index">任务管理小应用</a></Title>
            </div>
            <div>
                <Text><a href="http://localhost:9000/">描述：</a></Text>
                <Text>{description}</Text>
            </div>
            <div>
                <Text>执行人：</Text>
                <Text>{userName}</Text>
            </div>
            <div>
                <Text>日历：</Text>
                <Text><a href="https://applink.feishu.cn/client/calendar/open">跳转日历</a></Text>
            </div>
            <div>
                <Text>完成状态：</Text>
                <Tag color={completed ? "green" : "blue"}>
                    {completed ? "已完成" : "未完成"}
                </Tag>
            </div>
            <div>
                <Text>网址：</Text>
                <Text>{address}</Text>
            </div>
            <Divider/>
            <div>
                <Button
                    type={completed ? "danger" : "primary"}
                    onClick={toggleCompleted}
                >
                    {completed ? "撤销完成任务" : "完成任务"}
                </Button>
            </div>
        </Space>
    );
};
